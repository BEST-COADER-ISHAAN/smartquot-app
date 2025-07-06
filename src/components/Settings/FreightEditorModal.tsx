import React, { useState, useEffect } from 'react';
import { X, Save, Package, Truck, Ruler } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { QuotationProduct } from '../../types';

interface FreightEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

interface FreightData {
  size: string;
  freight: number;
  billed_sqft_per_box: number;
  product_count: number;
  discount_percentage: number;
}

const FreightEditorModal: React.FC<FreightEditorModalProps> = ({ isOpen, onClose, onSave }) => {
  const [freightData, setFreightData] = useState<FreightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadFreightData();
    }
  }, [isOpen]);

  const loadFreightData = async () => {
    setLoading(true);
    try {
      const { data: products, error } = await supabaseAdmin
        .from('products')
        .select('size, freight, billed_sqft_per_box')
        .eq('is_archived', false)
        .order('size');

      if (error) throw error;

      // Load discount mapping from localStorage
      const discountMap = JSON.parse(localStorage.getItem('discount_percentages') || '{}');

      // Group by size and calculate averages
      const sizeGroups = products.reduce((acc: Record<string, FreightData>, product) => {
        if (!acc[product.size]) {
          acc[product.size] = {
            size: product.size,
            freight: product.freight || 0,
            billed_sqft_per_box: product.billed_sqft_per_box || 0,
            product_count: 0,
            discount_percentage: discountMap[product.size] || 0
          };
        }
        acc[product.size].product_count++;
        return acc;
      }, {});

      setFreightData(Object.values(sizeGroups));
    } catch (error) {
      console.error('Error loading freight data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFreightChange = (size: string, field: 'freight' | 'billed_sqft_per_box' | 'discount_percentage', value: number) => {
    setFreightData(prev => 
      prev.map(item => 
        item.size === size 
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save discount mapping to localStorage
      const discountMap: Record<string, number> = {};
      for (const item of freightData) {
        discountMap[item.size] = item.discount_percentage;
      }
      localStorage.setItem('discount_percentages', JSON.stringify(discountMap));

      // Update all products with the new freight and billed sqft values
      for (const item of freightData) {
        const { error } = await supabaseAdmin
          .from('products')
          .update({
            freight: item.freight,
            billed_sqft_per_box: item.billed_sqft_per_box
          })
          .eq('size', item.size)
          .eq('is_archived', false);

        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving freight data:', error);
      alert('Failed to save freight data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const filteredData = freightData.filter(item =>
    item.size.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 lg:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] lg:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Freight & Billed SQFT Editor</h2>
              <p className="text-xs lg:text-sm text-gray-600">Edit freight costs and billed sqft for all product sizes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
            <input
              type="text"
              placeholder="Search sizes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {loading ? (
            <div className="p-4 lg:p-6 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 text-sm">Loading freight data...</p>
            </div>
          ) : (
            <div className="p-4 lg:p-6">
              {/* Mobile Cards View */}
              <div className="lg:hidden space-y-3">
                {filteredData.map((item) => (
                  <div key={item.size} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Ruler className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{item.size}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Freight (₹)</label>
                        <input
                          type="number"
                          value={item.freight}
                          onChange={(e) => handleFreightChange(item.size, 'freight', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Billed SQFT/Box</label>
                        <input
                          type="number"
                          value={item.billed_sqft_per_box}
                          onChange={(e) => handleFreightChange(item.size, 'billed_sqft_per_box', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                        <input
                          type="number"
                          value={item.discount_percentage}
                          onChange={(e) => handleFreightChange(item.size, 'discount_percentage', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          step="0.01"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Size</th>
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Freight (₹)</th>
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Billed SQFT/Box</th>
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Discount %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={item.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-medium text-gray-900">
                          <div className="flex items-center space-x-2">
                            <Ruler className="w-4 h-4 text-gray-500" />
                            <span>{item.size}</span>
                          </div>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <input
                            type="number"
                            value={item.freight}
                            onChange={(e) => handleFreightChange(item.size, 'freight', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            step="0.01"
                            min="0"
                          />
                        </td>
                        <td className="p-3 border border-gray-200">
                          <input
                            type="number"
                            value={item.billed_sqft_per_box}
                            onChange={(e) => handleFreightChange(item.size, 'billed_sqft_per_box', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            step="0.01"
                            min="0"
                          />
                        </td>
                        <td className="p-3 border border-gray-200">
                          <input
                            type="number"
                            value={item.discount_percentage}
                            onChange={(e) => handleFreightChange(item.size, 'discount_percentage', parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            step="0.01"
                            min="0"
                            max="100"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No sizes found matching your search.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 p-4 lg:p-6 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreightEditorModal; 