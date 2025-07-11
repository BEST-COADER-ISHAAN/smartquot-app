import React, { useState, useEffect } from 'react';
import { X, Save, Package, Percent, Building, User, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getDiscounts, upsertDiscount } from '../../lib/api';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

interface DiscountData {
  size: string;
  companyDiscount: number;
  customerDiscount: number;
  product_count: number;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose, onSave }) => {
  const [discountData, setDiscountData] = useState<DiscountData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      loadDiscountData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user]);

  const loadDiscountData = async () => {
    setLoading(true);
    try {
      const { data: products, error } = await (await import('../../lib/supabase')).supabase
        .from('products')
        .select('size')
        .eq('is_archived', false)
        .order('size');
      if (error) throw error;

      let discounts = [];
      if (user) {
        discounts = await getDiscounts(user.id);
      }

      if (discounts.length === 0 && user) {
        const companyDiscountMap = JSON.parse(localStorage.getItem('company_discount_percentages') || '{}');
        const customerDiscountMap = JSON.parse(localStorage.getItem('customer_discount_percentages') || '{}');
        for (const size of [...new Set(products.map((p: any) => p.size))]) {
          await upsertDiscount(user.id, size, companyDiscountMap[size] || 0, customerDiscountMap[size] || 0);
        }
        localStorage.removeItem('company_discount_percentages');
        localStorage.removeItem('customer_discount_percentages');
        discounts = await getDiscounts(user.id);
      }

      const sizeGroups = products.reduce((acc: Record<string, DiscountData>, product) => {
        if (!acc[product.size]) {
          const found = discounts.find((d: any) => d.size === product.size);
          acc[product.size] = {
            size: product.size,
            companyDiscount: found ? found.company_discount : 0,
            customerDiscount: found ? found.customer_discount : 0,
            product_count: 0
          };
        }
        acc[product.size].product_count++;
        return acc;
      }, {});

      setDiscountData(Object.values(sizeGroups));
    } catch (error) {
      console.error('Error loading discount data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscountChange = (size: string, field: 'companyDiscount' | 'customerDiscount', value: number) => {
    setDiscountData(prev => 
      prev.map(item => 
        item.size === size 
          ? { ...item, [field]: Math.max(0, Math.min(100, value)) }
          : item
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (user) {
        for (const item of discountData) {
          await upsertDiscount(user.id, item.size, item.companyDiscount, item.customerDiscount);
        }
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving discount data:', error);
      alert('Failed to save discount data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const filteredData = discountData.filter(item =>
    item.size.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 lg:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] lg:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 rounded-full p-2">
              <Percent className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Discount Manager</h2>
              <p className="text-xs lg:text-sm text-gray-600">Configure company and customer discounts for all product sizes</p>
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
            <input
              type="text"
              placeholder="Search sizes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {loading ? (
            <div className="p-4 lg:p-6 text-center">
              <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 text-sm">Loading discount data...</p>
            </div>
          ) : (
            <div className="p-4 lg:p-6">
              {/* Mobile Cards View */}
              <div className="lg:hidden space-y-3">
                {filteredData.map((item) => (
                  <div key={item.size} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{item.size}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {item.product_count} product{item.product_count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-600" />
                          Company Discount %
                        </label>
                        <input
                          type="number"
                          value={item.companyDiscount}
                          onChange={(e) => handleDiscountChange(item.size, 'companyDiscount', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          step="0.1"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <User className="w-4 h-4 text-green-600" />
                          Customer Discount %
                        </label>
                        <input
                          type="number"
                          value={item.customerDiscount}
                          onChange={(e) => handleDiscountChange(item.size, 'customerDiscount', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          step="0.1"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company Discount %
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer Discount %
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((item) => (
                        <tr key={item.size} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Package className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium text-gray-900">{item.size}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500">
                              {item.product_count} product{item.product_count !== 1 ? 's' : ''}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-blue-600" />
                              <input
                                type="number"
                                value={item.companyDiscount}
                                onChange={(e) => handleDiscountChange(item.size, 'companyDiscount', parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                step="0.1"
                                min="0"
                                max="100"
                              />
                              <span className="text-sm text-gray-500">%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-green-600" />
                              <input
                                type="number"
                                value={item.customerDiscount}
                                onChange={(e) => handleDiscountChange(item.size, 'customerDiscount', parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                step="0.1"
                                min="0"
                                max="100"
                              />
                              <span className="text-sm text-gray-500">%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredData.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No sizes found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-t border-gray-200 flex-shrink-0">
          <div className="text-sm text-gray-600">
            {filteredData.length} size{filteredData.length !== 1 ? 's' : ''} found
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Discounts</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal; 