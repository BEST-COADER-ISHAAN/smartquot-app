import React, { useState, useEffect } from 'react';
import { X, Package, Ruler, Layers, IndianRupee, Percent, Image as ImageIcon, Weight, Truck, Calculator, Edit3, Save } from 'lucide-react';
import { QuotationProduct } from '../../types';
import { getImageUrl } from '../../lib/storage';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { formatSizeForDisplay } from '../../lib/sizeUtils';
import { getBillingTypeForSize, formatBillingDisplay, formatPriceDisplay, getSqftValue, getPriceValue, getFreightValue, getColumnHeader } from '../../lib/billingUtils';
import { useAuth } from '../../hooks/useAuth';
import { usePreferredSizeUnit } from '../../hooks/usePreferredSizeUnit';

interface ProductDetailModalProps {
  product: QuotationProduct;
  onClose: () => void;
  onUpdate?: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onUpdate }) => {
  const [discount, setDiscount] = useState(0);
  const [companyDiscount, setCompanyDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [editingFreight, setEditingFreight] = useState(false);
  const [freightValue, setFreightValue] = useState(product.freight);
  const [savingFreight, setSavingFreight] = useState(false);
  const [billedSqftPerBox, setBilledSqftPerBox] = useState(product.billed_sqft_per_box);
  const [billingType, setBillingType] = useState<'per_sqft' | 'per_piece'>('per_sqft');
  const [billingTypeLoading, setBillingTypeLoading] = useState(false);
  const [formattedSize, setFormattedSize] = useState<string>('');

  const { user } = useAuth();
  const { preferredSizeUnit } = usePreferredSizeUnit();

  const getDiscounts = async (userId: string, size: string) => {
    const { data, error } = await supabase
      .from('discounts')
      .select('customer_discount, company_discount')
      .eq('user_id', userId)
      .eq('size', size)
      .single();
    if (error || !data) return { customer: 0, company: 0 };
    return {
      customer: data.customer_discount || 0,
      company: data.company_discount || 0,
    };
  };

  // In useEffect, fetch discounts from Supabase
  React.useEffect(() => {
    const fetchDiscounts = async () => {
      if (!product.size || !product.mrp_per_sqft || !user?.id) return;
      const { customer, company } = await getDiscounts(user.id, product.size);
      setDiscount(customer);
      setCompanyDiscount(company);
      setFinalPrice(product.mrp_per_sqft * (1 - customer / 100));
    };
    fetchDiscounts();
    // Load billed sqft from freight settings
    loadBilledSqftFromFreightSettings();
  }, [product.size, product.mrp_per_sqft, user?.id]);

  useEffect(() => {
    const fetchBillingType = async () => {
      setBillingTypeLoading(true);
      if (product.size) {
        const type = await getBillingTypeForSize(user?.id, product.size);
        setBillingType(type);
      }
      setBillingTypeLoading(false);
    };
    fetchBillingType();
  }, [product.size]);

  useEffect(() => {
    async function fetchFormattedSize() {
      setFormattedSize(await formatSizeForDisplay(product.size, preferredSizeUnit));
    }
    if (product.size) fetchFormattedSize();
  }, [product.size, preferredSizeUnit]);

  const loadBilledSqftFromFreightSettings = async () => {
    try {
      const { data: freightData, error } = await supabaseAdmin
        .from('products')
        .select('billed_sqft_per_box')
        .eq('size', product.size)
        .eq('is_archived', false)
        .limit(1);

      if (!error && freightData && freightData.length > 0) {
        setBilledSqftPerBox(freightData[0].billed_sqft_per_box || product.billed_sqft_per_box);
      }
    } catch (error) {
      console.error('Error loading freight settings:', error);
    }
  };

  const imageUrl = product.image_url || getImageUrl((product.name || '').toLowerCase().replace(/\s+/g, '-') + '.jpg');

  // Calculate MOP (MRP - 45%)
  const mopPerSqft = product.mrp_per_sqft * 0.55; // 55% of MRP (100% - 45%)

  // Calculate cost per sqft with freight as per sqft cost
  const calculateCostPerSqft = () => {
    // Ex-factory price is already per sqft (as clarified)
    const exFactoryPerSqft = product.ex_factory_price;
    
    // Get size-specific discount and freight
    const discountMap = JSON.parse(localStorage.getItem('discount_percentages') || '{}');
    const sizeDiscount = discountMap[product.size] || companyDiscount;
    const sizeFreight = product.freight || freightValue;
    
    // Apply company discount to ex-factory price first
    const exFactoryAfterCompanyDiscount = exFactoryPerSqft * (1 - sizeDiscount / 100);
    
    // Insurance is calculated on the ex-factory price after company discount
    const insuranceCostPerSqft = exFactoryAfterCompanyDiscount * (product.insurance_percentage / 100);
    
    // GST is calculated on (ex-factory after company discount + insurance)
    const baseForGst = exFactoryAfterCompanyDiscount + insuranceCostPerSqft;
    const gstCostPerSqft = baseForGst * (product.gst_percentage / 100);
    
    // Freight is already per sqft - no conversion needed
    const freightCostPerSqft = sizeFreight;
    
    // Total cost per sqft
    return exFactoryAfterCompanyDiscount + insuranceCostPerSqft + gstCostPerSqft + freightCostPerSqft;
  };

  const costPerSqft = calculateCostPerSqft();
  const marginAmount = finalPrice - costPerSqft;
  const marginPercentage = finalPrice > 0 ? (marginAmount / finalPrice) * 100 : 0;

  const handleSaveFreight = async () => {
    setSavingFreight(true);
    try {
      const { error } = await supabaseAdmin
        .from('products')
        .update({ freight: freightValue })
        .eq('id', product.id);

      if (error) throw error;
      
      setEditingFreight(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating freight:', error);
      alert('Failed to update freight cost. Please try again.');
    } finally {
      setSavingFreight(false);
    }
  };

  const handleCancelFreightEdit = () => {
    setFreightValue(product.freight);
    setEditingFreight(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-full p-2">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-gray-600">{product.size ? formattedSize : ''}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-white rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Calculations */}
            <div className="space-y-6">
              {/* Product Image */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2 mb-4">
                  <ImageIcon className="w-5 h-5" />
                  <span>Product Image</span>
                </h3>
                
                <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-64 bg-gray-100 flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">No Image Available</p>
                    <p className="text-sm text-gray-400 mt-1">Image not found for this product</p>
                  </div>
                </div>
              </div>

              {/* MOP and Discount Calculations */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Price Calculations</span>
                </h3>
                
                {/* MOP Display */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">MOP (MRP - 45%)</p>
                      <p className="text-2xl font-bold text-emerald-800">{formatPriceDisplay(getPriceValue(mopPerSqft, product.mrp_per_box, billingType), billingType)}</p>
                    </div>
                    <div className="bg-emerald-100 rounded-full p-3">
                      <IndianRupee className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Customer Discount Input */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-emerald-200">
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Customer Discount (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Company Discount Input */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-emerald-200">
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Company Discount for {product.size ? formattedSize : ''} (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                    <input
                      type="number"
                      value={companyDiscount}
                      onChange={(e) => setCompanyDiscount(parseFloat(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Billed SQFT Display */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">Billed SQFT per Box</p>
                      <p className="text-2xl font-bold text-emerald-800">{billedSqftPerBox.toFixed(2)} sqft</p>
                    </div>
                    <div className="bg-emerald-100 rounded-full p-3">
                      <Ruler className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Final Price Input */}
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Final Price (MRP - {discount.toFixed(1)}%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
                    <input
                      type="number"
                      value={finalPrice.toFixed(2)}
                      onChange={(e) => setFinalPrice(parseFloat(parseFloat(e.target.value).toFixed(2)) || 0)}
                      className="w-full pl-10 pr-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Basic Information</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Ruler className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Size</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{product.size ? formattedSize : ''}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Layers className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Collection</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{product.collection || 'Not specified'}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Surface</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{product.surface || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5" />
                  <span>Pricing Details</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">{getColumnHeader('MRP per sqft', billingType)}</p>
                        <p className="text-2xl font-bold text-green-800">{formatPriceDisplay(getPriceValue(product.mrp_per_sqft, product.mrp_per_box, billingType), billingType)}</p>
                      </div>
                      <div className="bg-green-600 rounded-full p-2">
                        <IndianRupee className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-700">MRP per box</p>
                      <p className="text-xl font-bold text-blue-800">₹{product.mrp_per_box.toFixed(2)}</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <p className="text-sm font-medium text-purple-700">{getColumnHeader('Ex-Factory Price per sqft', billingType)}</p>
                      <p className="text-xl font-bold text-purple-800">{formatPriceDisplay(getPriceValue(product.ex_factory_price, product.mrp_per_box, billingType), billingType)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Box Specifications</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">{getColumnHeader('SQFT in Box', billingType)}</p>
                    <p className="text-xl font-bold text-gray-900">{formatBillingDisplay(getSqftValue(product.actual_sqft_per_box, product.billed_sqft_per_box, billingType, 'actual'), billingType)}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">{getColumnHeader('SQFT in Box', billingType)} (Billed)</p>
                    <p className="text-xl font-bold text-gray-900">{formatBillingDisplay(getSqftValue(product.actual_sqft_per_box, product.billed_sqft_per_box, billingType, 'billed'), billingType)}</p>
                  </div>
                </div>
              </div>

              {/* Weight and Freight Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Weight className="w-5 h-5" />
                  <span>Weight & Freight</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Weight className="w-4 h-4 text-cyan-600" />
                      <span className="text-sm font-medium text-cyan-700">Weight per box</span>
                    </div>
                    <p className="text-xl font-bold text-cyan-800">{product.weight.toFixed(2)} kg</p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">{getColumnHeader('Freight per sqft', billingType)} for {product.size ? formattedSize : ''}</span>
                      </div>
                      {!editingFreight && (
                        <button
                          onClick={() => setEditingFreight(true)}
                          className="text-teal-600 hover:text-teal-800 transition-colors duration-200"
                          title="Edit freight cost"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {editingFreight ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={freightValue}
                          onChange={(e) => setFreightValue(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-1 border border-teal-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                          step="0.01"
                          min="0"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSaveFreight}
                            disabled={savingFreight}
                            className="flex items-center space-x-1 px-2 py-1 bg-teal-600 text-white rounded text-xs hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50"
                          >
                            {savingFreight ? (
                              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Save className="w-3 h-3" />
                            )}
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancelFreightEdit}
                            className="px-2 py-1 border border-teal-300 text-teal-700 rounded text-xs hover:bg-teal-50 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-xl font-bold text-teal-800">{formatPriceDisplay(getFreightValue(freightValue, billingType), billingType)}</p>
                        <p className="text-xs text-teal-600">size-specific</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Percent className="w-5 h-5" />
                  <span>Tax & Insurance</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-sm font-medium text-orange-700">GST</p>
                    <p className="text-xl font-bold text-orange-800">{product.gst_percentage.toFixed(2)}%</p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-700">Insurance</p>
                    <p className="text-xl font-bold text-yellow-800">{product.insurance_percentage.toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              {/* Corrected Margin Calculation */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
                <h3 className="text-lg font-semibold text-indigo-800 mb-4">Margin Analysis</h3>
                <div className="space-y-3">
                  {(() => {
                    // Calculate all values per sqft for consistency
                    const exFactoryPerSqft = product.ex_factory_price; // Already per sqft
                    
                    // Get size-specific discount and freight
                    const discountMap = JSON.parse(localStorage.getItem('discount_percentages') || '{}');
                    const sizeDiscount = discountMap[product.size] || companyDiscount;
                    const sizeFreight = product.freight || freightValue;
                    
                    const exFactoryAfterCompanyDiscount = exFactoryPerSqft * (1 - sizeDiscount / 100);
                    const insuranceCostPerSqft = exFactoryAfterCompanyDiscount * (product.insurance_percentage / 100);
                    
                    // GST is calculated on (ex-factory after company discount + insurance)
                    const baseForGst = exFactoryAfterCompanyDiscount + insuranceCostPerSqft;
                    const gstCostPerSqft = baseForGst * (product.gst_percentage / 100);
                    
                    // Freight is already per sqft - no conversion needed
                    const freightCostPerSqft = sizeFreight;
                    
                    return (
                      <>
                        <div className="bg-white p-3 rounded border border-indigo-200">
                          <h4 className="font-medium text-indigo-700 mb-2">Cost Breakdown (per sqft):</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-indigo-600">Ex-factory price per sqft:</span>
                              <span className="font-semibold text-indigo-800">₹{exFactoryPerSqft.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-indigo-600">After {sizeDiscount.toFixed(1)}% company discount:</span>
                              <span className="font-semibold text-indigo-800">₹{exFactoryAfterCompanyDiscount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-indigo-600">Insurance ({product.insurance_percentage.toFixed(2)}%):</span>
                              <span className="font-semibold text-indigo-800">₹{insuranceCostPerSqft.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between bg-yellow-50 px-2 py-1 rounded">
                              <span className="text-indigo-600">Base for GST (Ex-factory + Insurance):</span>
                              <span className="font-semibold text-indigo-800">₹{baseForGst.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-indigo-600">GST ({product.gst_percentage.toFixed(2)}% on base):</span>
                              <span className="font-semibold text-indigo-800">₹{gstCostPerSqft.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-indigo-600">Freight per sqft ({product.size ? formattedSize : ''}):</span>
                              <span className="font-semibold text-indigo-800">₹{freightCostPerSqft.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t border-indigo-200 pt-1">
                              <span className="text-indigo-700 font-medium">Total cost per sqft:</span>
                              <span className="font-bold text-indigo-900">₹{costPerSqft.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-indigo-700">Selling price per sqft:</span>
                          <span className="font-semibold text-indigo-800">₹{finalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-indigo-200 pt-2">
                          <span className="text-indigo-700">Margin per sqft:</span>
                          <span className="font-bold text-indigo-900">₹{marginAmount.toFixed(2)} ({marginPercentage.toFixed(1)}%)</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Metadata</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><strong>Created:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> {new Date(product.updated_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p><strong>Product ID:</strong> {product.id}</p>
                <p><strong>Status:</strong> {product.is_archived ? 'Archived' : 'Active'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;