import React, { useState, useEffect } from 'react';
import { Save, Package, IndianRupee, Layers, Ruler, Image, Weight, Truck, Percent, Box } from 'lucide-react';
import { QuotationProduct } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../lib/api';
import { getImageUrl, getFilenameFromUrl } from '../../lib/storage';

interface ProductEditorProps {
  product?: QuotationProduct;
  onSave: (product?: QuotationProduct) => void;
  onCancel: () => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onCancel }) => {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    size: product?.size || '',
    collection: product?.collection || '',
    surface: product?.surface || '',
    ex_factory_price: product?.ex_factory_price || 0,
    mrp_per_sqft: product?.mrp_per_sqft || 0,
    mrp_per_box: product?.mrp_per_box || 0,
    gst_percentage: product?.gst_percentage || 18,
    insurance_percentage: product?.insurance_percentage || 0.5,
    actual_sqft_per_box: product?.actual_sqft_per_box || 1,
    billed_sqft_per_box: product?.billed_sqft_per_box || 1,
    weight: product?.weight || 0,
    freight: product?.freight || 0,
    image_filename: product?.image_url ? getFilenameFromUrl(product.image_url) : '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateMRPPerBox = () => {
    return formData.mrp_per_sqft * formData.billed_sqft_per_box;
  };

  const handleSave = async () => {
    if (!user) {
      alert('You must be logged in to save a product.');
      return;
    }
    if (!formData.name.trim()) {
      setError('Product name (Design Name) is required.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const token = session?.access_token;
      console.log("Auth0 token:", token); // Debug log
      
      // Construct image URL if filename is provided
      let imageUrlToSave: string | null = null;
      if (formData.image_filename && formData.image_filename.trim()) {
        imageUrlToSave = getImageUrl(formData.image_filename.trim());
      }

      const productData = {
        name: formData.name,
        size: formData.size,
        collection: formData.collection || null,
        surface: formData.surface || null,
        ex_factory_price: formData.ex_factory_price,
        mrp_per_sqft: formData.mrp_per_sqft,
        mrp_per_box: calculateMRPPerBox(),
        gst_percentage: formData.gst_percentage,
        insurance_percentage: formData.insurance_percentage,
        actual_sqft_per_box: formData.actual_sqft_per_box,
        billed_sqft_per_box: formData.billed_sqft_per_box,
        weight: formData.weight,
        freight: formData.freight,
        image_url: imageUrlToSave,
        created_by: user.id,
      };

      const response = await api.saveProduct(productData, product?.id, token);
        
      if (!response.success) {
        throw new Error(response.error || 'Failed to save product');
      }

      onSave(response.data);
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error instanceof Error ? error.message : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Design Name *
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter design name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size *
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 600X1200"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collection
            </label>
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.collection}
                onChange={(e) => handleInputChange('collection', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter collection name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Surface
            </label>
            <input
              type="text"
              value={formData.surface}
              onChange={(e) => handleInputChange('surface', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter surface type"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Filename
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.image_filename}
                onChange={(e) => handleInputChange('image_filename', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., product-name.jpg"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter the filename of the image uploaded to Supabase Storage
            </p>
          </div>
        </div>

        {/* Image Preview */}
        {formData.image_filename && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h3>
            <div className="flex items-center space-x-4">
              <img
                src={getImageUrl(formData.image_filename)}
                alt="Product preview"
                className="h-20 w-20 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden bg-gray-100 h-20 w-20 rounded-lg border border-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500 text-center">Image not found</span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>URL:</strong> {getImageUrl(formData.image_filename)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Make sure this image exists in your Supabase Storage bucket 'product-images'
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Information */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Pricing Information</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ex-Factory Price *
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.ex_factory_price}
                  onChange={(e) => handleInputChange('ex_factory_price', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MRP per sqft *
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.mrp_per_sqft}
                  onChange={(e) => handleInputChange('mrp_per_sqft', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MRP per box (calculated)
              </label>
              <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                ₹{calculateMRPPerBox().toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Box Information */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Box Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actual sqft per box *
              </label>
              <input
                type="number"
                value={formData.actual_sqft_per_box}
                onChange={(e) => handleInputChange('actual_sqft_per_box', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billed sqft per box *
              </label>
              <input
                type="number"
                value={formData.billed_sqft_per_box}
                onChange={(e) => handleInputChange('billed_sqft_per_box', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
          </div>
        </div>

        {/* Weight and Freight Information */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Weight & Freight</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Weight per box in kilograms
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Freight Cost
              </label>
              <div className="relative">
                <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.freight}
                  onChange={(e) => handleInputChange('freight', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Freight cost per box
              </p>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Tax & Insurance</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Percentage
              </label>
              <input
                type="number"
                value={formData.gst_percentage}
                onChange={(e) => handleInputChange('gst_percentage', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="18.00"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Percentage
              </label>
              <input
                type="number"
                value={formData.insurance_percentage}
                onChange={(e) => handleInputChange('insurance_percentage', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.50"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded p-2">
            {error}
          </div>
        )}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !formData.name || !formData.size}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{loading ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;