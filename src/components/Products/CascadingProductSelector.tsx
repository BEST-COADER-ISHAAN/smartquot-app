import React, { useState, useEffect } from 'react';
import { ChevronDown, Package, Ruler, Layers, AlertCircle, CheckCircle, ArrowLeft, Loader } from 'lucide-react';
import { QuotationProduct } from '../../types';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

interface CascadingProductSelectorProps {
  onProductSelect: (product: QuotationProduct) => void;
  className?: string;
  initialDesignName?: string;
  onResetInitialSelection?: () => void;
}

interface SizeOption {
  size: string;
  count: number;
}

interface SurfaceOption {
  surface: string;
  count: number;
}

const CascadingProductSelector: React.FC<CascadingProductSelectorProps> = ({ 
  onProductSelect, 
  className = '',
  initialDesignName,
  onResetInitialSelection
}) => {
  // State for dropdown selections
  const [selectedProduct, setSelectedProduct] = useState<string>(initialDesignName || '');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedSurface, setSelectedSurface] = useState<string>('');

  // State for available options
  const [sizeOptions, setSizeOptions] = useState<SizeOption[]>([]);
  const [surfaceOptions, setSurfaceOptions] = useState<SurfaceOption[]>([]);

  // State for final product selection
  const [finalProducts, setFinalProducts] = useState<QuotationProduct[]>([]);

  // Loading states
  const [loadingSizes, setLoadingSizes] = useState(false);
  const [loadingSurfaces, setLoadingSurfaces] = useState(false);
  const [loadingFinal, setLoadingFinal] = useState(false);

  // Error states
  const [error, setError] = useState<string | null>(null);

  // Auto-selection states
  const [autoSelectingSize, setAutoSelectingSize] = useState(false);
  const [autoSelectingSurface, setAutoSelectingSurface] = useState(false);

  // Load sizes when product is selected (including initial design name)
  useEffect(() => {
    if (selectedProduct) {
      loadSizeOptions(selectedProduct);
      // Reset subsequent selections
      setSelectedSize('');
      setSelectedSurface('');
      setSurfaceOptions([]);
      setFinalProducts([]);
    } else {
      setSizeOptions([]);
      setSurfaceOptions([]);
      setFinalProducts([]);
    }
  }, [selectedProduct]);

  // Auto-select size if only one option available
  useEffect(() => {
    if (sizeOptions.length === 1 && !selectedSize && !autoSelectingSize) {
      setAutoSelectingSize(true);
      setTimeout(() => {
        setSelectedSize(sizeOptions[0].size);
        setAutoSelectingSize(false);
      }, 500); // Small delay for visual feedback
    }
  }, [sizeOptions, selectedSize, autoSelectingSize]);

  // Load surfaces when size is selected
  useEffect(() => {
    if (selectedProduct && selectedSize) {
      loadSurfaceOptions(selectedProduct, selectedSize);
      // Reset subsequent selections
      setSelectedSurface('');
      setFinalProducts([]);
    } else {
      setSurfaceOptions([]);
      setFinalProducts([]);
    }
  }, [selectedProduct, selectedSize]);

  // Auto-select surface if only one option available
  useEffect(() => {
    if (surfaceOptions.length === 1 && !selectedSurface && !autoSelectingSurface) {
      setAutoSelectingSurface(true);
      setTimeout(() => {
        setSelectedSurface(surfaceOptions[0].surface);
        setAutoSelectingSurface(false);
      }, 500); // Small delay for visual feedback
    }
  }, [surfaceOptions, selectedSurface, autoSelectingSurface]);

  // Load final products when surface is selected
  useEffect(() => {
    if (selectedProduct && selectedSize && selectedSurface) {
      loadFinalProducts(selectedProduct, selectedSize, selectedSurface);
    } else {
      setFinalProducts([]);
    }
  }, [selectedProduct, selectedSize, selectedSurface]);

  // Auto-select product if only one final product available
  useEffect(() => {
    if (finalProducts.length === 1 && selectedProduct && selectedSize && selectedSurface) {
      // Auto-select the single product after a brief delay
      setTimeout(() => {
        handleProductSelect(finalProducts[0]);
      }, 800); // Slightly longer delay to show the user what's happening
    }
  }, [finalProducts, selectedProduct, selectedSize, selectedSurface]);

  const loadSizeOptions = async (productName: string) => {
    setLoadingSizes(true);
    setError(null);
    
    try {
      const { data, error } = await supabaseAdmin
        .from('products')
        .select('size')
        .eq('name', productName)
        .eq('is_archived', false)
        .order('size');

      if (error) throw error;

      // Group by size and count occurrences
      const sizeCounts = data.reduce((acc: Record<string, number>, product) => {
        acc[product.size] = (acc[product.size] || 0) + 1;
        return acc;
      }, {});

      const options = Object.entries(sizeCounts).map(([size, count]) => ({
        size,
        count
      }));

      setSizeOptions(options);
    } catch (error) {
      console.error('Error loading size options:', error);
      setError('Failed to load size options');
    } finally {
      setLoadingSizes(false);
    }
  };

  const loadSurfaceOptions = async (productName: string, size: string) => {
    setLoadingSurfaces(true);
    setError(null);
    
    try {
      const { data, error } = await supabaseAdmin
        .from('products')
        .select('surface')
        .eq('name', productName)
        .eq('size', size)
        .eq('is_archived', false)
        .order('surface');

      if (error) throw error;

      // Filter out null/empty surfaces and group by surface
      const validSurfaces = data.filter(product => product.surface && product.surface.trim());
      
      const surfaceCounts = validSurfaces.reduce((acc: Record<string, number>, product) => {
        acc[product.surface] = (acc[product.surface] || 0) + 1;
        return acc;
      }, {});

      const options = Object.entries(surfaceCounts).map(([surface, count]) => ({
        surface,
        count
      }));

      // If no surfaces available, add a default option
      if (options.length === 0) {
        options.push({ surface: 'Standard', count: data.length });
      }

      setSurfaceOptions(options);
    } catch (error) {
      console.error('Error loading surface options:', error);
      setError('Failed to load surface options');
    } finally {
      setLoadingSurfaces(false);
    }
  };

  const loadFinalProducts = async (productName: string, size: string, surface: string) => {
    setLoadingFinal(true);
    setError(null);
    
    try {
      let query = supabaseAdmin
        .from('products')
        .select('*')
        .eq('name', productName)
        .eq('size', size)
        .eq('is_archived', false);

      // Handle surface filtering
      if (surface === 'Standard') {
        // For 'Standard', get products with null or empty surface
        query = query.or('surface.is.null,surface.eq.');
      } else {
        query = query.eq('surface', surface);
      }

      const { data, error } = await query.order('created_at');

      if (error) throw error;

      setFinalProducts(data || []);
    } catch (error) {
      console.error('Error loading final products:', error);
      setError('Failed to load final products');
    } finally {
      setLoadingFinal(false);
    }
  };

  const handleProductSelect = (product: QuotationProduct) => {
    onProductSelect(product);
    // Reset all selections after successful selection
    setSelectedProduct(initialDesignName || '');
    setSelectedSize('');
    setSelectedSurface('');
    setSizeOptions([]);
    setSurfaceOptions([]);
    setFinalProducts([]);
    setAutoSelectingSize(false);
    setAutoSelectingSurface(false);
  };

  const resetSelections = () => {
    if (onResetInitialSelection) {
      onResetInitialSelection();
    } else {
      setSelectedProduct('');
      setSelectedSize('');
      setSelectedSurface('');
      setSizeOptions([]);
      setSurfaceOptions([]);
      setFinalProducts([]);
      setError(null);
      setAutoSelectingSize(false);
      setAutoSelectingSurface(false);
    }
  };

  const getSelectionStatus = () => {
    if (finalProducts.length === 1) {
      return {
        message: "Perfect match found! Auto-selecting product...",
        color: "text-green-600",
        icon: CheckCircle
      };
    }
    
    if (autoSelectingSize) {
      return {
        message: "Only one size available. Auto-selecting...",
        color: "text-blue-600",
        icon: Loader
      };
    }
    
    if (autoSelectingSurface) {
      return {
        message: "Only one surface available. Auto-selecting...",
        color: "text-blue-600",
        icon: Loader
      };
    }
    
    return null;
  };

  const status = getSelectionStatus();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800 flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>
            {initialDesignName ? `Select Size & Surface for "${initialDesignName}"` : 'Select Product'}
          </span>
        </h3>
        <button
          onClick={resetSelections}
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{initialDesignName ? 'Choose Different Product' : 'Reset Selection'}</span>
        </button>
      </div>

      {/* Auto-selection Status */}
      {status && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
          <status.icon className={`w-5 h-5 ${status.color} ${status.icon === Loader ? 'animate-spin' : ''}`} />
          <span className={`font-medium ${status.color}`}>{status.message}</span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Cascading Dropdowns */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Step 1: Size Selection (Product is pre-selected) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
            <Ruler className="w-4 h-4" />
            <span>1. Select Size</span>
            {autoSelectingSize && <Loader className="w-4 h-4 animate-spin text-blue-600" />}
          </label>
          <div className="relative">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              disabled={!selectedProduct || loadingSizes || autoSelectingSize}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 ${
                autoSelectingSize ? 'border-blue-300 bg-blue-50' : ''
              }`}
            >
              <option value="">
                {!selectedProduct 
                  ? 'Product not selected' 
                  : loadingSizes 
                    ? 'Loading sizes...' 
                    : autoSelectingSize
                      ? 'Auto-selecting...'
                      : 'Choose a size'
                }
              </option>
              {sizeOptions.map((option) => (
                <option key={option.size} value={option.size}>
                  {option.size} ({option.count} variant{option.count !== 1 ? 's' : ''})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
          {selectedSize && (
            <div className="flex items-center space-x-1 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Size selected{sizeOptions.length === 1 ? ' (auto)' : ''}</span>
            </div>
          )}
        </div>

        {/* Step 2: Surface Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>2. Select Surface</span>
            {autoSelectingSurface && <Loader className="w-4 h-4 animate-spin text-blue-600" />}
          </label>
          <div className="relative">
            <select
              value={selectedSurface}
              onChange={(e) => setSelectedSurface(e.target.value)}
              disabled={!selectedSize || loadingSurfaces || autoSelectingSurface}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-300 ${
                autoSelectingSurface ? 'border-blue-300 bg-blue-50' : ''
              }`}
            >
              <option value="">
                {!selectedSize 
                  ? 'Select size first' 
                  : loadingSurfaces 
                    ? 'Loading surfaces...' 
                    : autoSelectingSurface
                      ? 'Auto-selecting...'
                      : 'Choose a surface'
                }
              </option>
              {surfaceOptions.map((option) => (
                <option key={option.surface} value={option.surface}>
                  {option.surface} ({option.count} variant{option.count !== 1 ? 's' : ''})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
          {selectedSurface && (
            <div className="flex items-center space-x-1 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Surface selected{surfaceOptions.length === 1 ? ' (auto)' : ''}</span>
            </div>
          )}
        </div>
      </div>

      {/* Selection Progress Indicator */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${selectedProduct ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm text-gray-600">Product: {selectedProduct || 'Not selected'}</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300">
            <div className={`h-full transition-all duration-300 ${selectedProduct ? 'bg-green-500 w-full' : 'bg-gray-300 w-0'}`} />
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              selectedSize ? 'bg-green-500' : autoSelectingSize ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">Size</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300">
            <div className={`h-full transition-all duration-300 ${selectedSize ? 'bg-green-500 w-full' : 'bg-gray-300 w-0'}`} />
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              selectedSurface ? 'bg-green-500' : autoSelectingSurface ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">Surface</span>
          </div>
        </div>
      </div>

      {/* Final Product Selection */}
      {selectedProduct && selectedSize && selectedSurface && (
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h4 className="font-medium text-gray-800 mb-4">
            Available Products: {selectedProduct} • {selectedSize} • {selectedSurface}
          </h4>
          
          {loadingFinal ? (
            <div className="text-center py-8">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span className="text-gray-600">Loading products...</span>
            </div>
          ) : finalProducts.length > 0 ? (
            <div className="space-y-3">
              {finalProducts.length === 1 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      Perfect match! This product will be added automatically.
                    </span>
                  </div>
                </div>
              )}
              
              {finalProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                    finalProducts.length === 1 
                      ? 'border-green-300 bg-green-50 animate-pulse' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.size} • {product.collection || 'No Collection'} • {product.surface || 'Standard'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {product.actual_sqft_per_box.toFixed(2)} sqft/box • Weight: {product.weight.toFixed(2)} kg
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ₹{product.mrp_per_sqft.toFixed(2)}/sqft
                      </div>
                      <div className="text-sm text-gray-500">
                        ₹{product.mrp_per_box.toFixed(2)}/box
                      </div>
                      <div className="text-xs text-gray-400">
                        Ex-factory: ₹{product.ex_factory_price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  {finalProducts.length === 1 && (
                    <div className="mt-3 text-center">
                      <span className="text-sm text-green-600 font-medium">
                        Adding to quotation...
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No products found for this combination.</p>
              <p className="text-sm mt-1">Try selecting different options.</p>
            </div>
          )}
        </div>
      )}

      {/* Help Text */}
      
    </div>
  );
};

export default CascadingProductSelector;