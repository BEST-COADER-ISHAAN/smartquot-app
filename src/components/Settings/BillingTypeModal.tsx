import React, { useState, useEffect } from 'react';
import { X, Save, Calculator, Package, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getBillingTypes, upsertBillingType } from '../../lib/api';

interface BillingTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

interface BillingTypeData {
  size: string;
  billing_type: 'per_sqft' | 'per_piece';
  product_count: number;
}

const BillingTypeModal: React.FC<BillingTypeModalProps> = ({ isOpen, onClose, onSave }) => {
  const [billingData, setBillingData] = useState<BillingTypeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      loadBillingData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user]);

  const loadBillingData = async () => {
    setLoading(true);
    try {
      // Get all sizes from products
      const { data: products, error } = await (await import('../../lib/supabase')).supabase
        .from('products')
        .select('size')
        .eq('is_archived', false)
        .order('size');
      if (error) throw error;

      // Try to get billing types from Supabase
      let billingTypes = [];
      if (user) {
        billingTypes = await getBillingTypes(user.id);
      }

      // If no billing types in Supabase, migrate from localStorage if present
      if (billingTypes.length === 0 && user) {
        const billingTypeMap = JSON.parse(localStorage.getItem('billing_types') || '{}');
        for (const size of [...new Set(products.map((p: any) => p.size))]) {
          await upsertBillingType(user.id, size, billingTypeMap[size] || 'per_sqft');
        }
        localStorage.removeItem('billing_types');
        billingTypes = await getBillingTypes(user.id);
      }

      // Group by size and set billing type
      const sizeGroups = products.reduce((acc: Record<string, BillingTypeData>, product) => {
        if (!acc[product.size]) {
          const found = billingTypes.find((b: any) => b.size === product.size);
          acc[product.size] = {
            size: product.size,
            billing_type: found ? found.billing_type : 'per_sqft',
            product_count: 0
          };
        }
        acc[product.size].product_count++;
        return acc;
      }, {});

      setBillingData(Object.values(sizeGroups));
    } catch (error) {
      console.error('Error loading billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBillingTypeChange = (size: string, billingType: 'per_sqft' | 'per_piece') => {
    setBillingData(prev => 
      prev.map(item => 
        item.size === size 
          ? { ...item, billing_type: billingType }
          : item
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (user) {
        for (const item of billingData) {
          await upsertBillingType(user.id, item.size, item.billing_type);
        }
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving billing data:', error);
      alert('Failed to save billing type settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const filteredData = billingData.filter(item =>
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
              <Calculator className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Billing Type Settings</h2>
              <p className="text-xs lg:text-sm text-gray-600">Configure billing calculation type for each product size</p>
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Mobile Cards View */}
              <div className="lg:hidden space-y-4">
                {filteredData.map((item) => (
                  <div key={item.size} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{item.size}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.product_count} products</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Billing Type</label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`billing_${item.size}`}
                              value="per_sqft"
                              checked={item.billing_type === 'per_sqft'}
                              onChange={() => handleBillingTypeChange(item.size, 'per_sqft')}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-sm">Per Square Foot</div>
                              <div className="text-xs text-gray-500">Calculate based on square footage</div>
                            </div>
                          </label>
                          
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`billing_${item.size}`}
                              value="per_piece"
                              checked={item.billing_type === 'per_piece'}
                              onChange={() => handleBillingTypeChange(item.size, 'per_piece')}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-sm">Per Piece</div>
                              <div className="text-xs text-gray-500">Calculate based on piece count</div>
                            </div>
                          </label>
                        </div>
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
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Products</th>
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Billing Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={item.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-medium text-gray-900">
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4 text-gray-500" />
                            <span>{item.size}</span>
                          </div>
                        </td>
                        <td className="p-3 border border-gray-200 text-gray-600">
                          {item.product_count} products
                        </td>
                        <td className="p-3 border border-gray-200">
                          <div className="space-y-2">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name={`billing_${item.size}`}
                                value="per_sqft"
                                checked={item.billing_type === 'per_sqft'}
                                onChange={() => handleBillingTypeChange(item.size, 'per_sqft')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                              />
                              <div>
                                <div className="font-medium text-gray-900 text-sm">Per Square Foot</div>
                                <div className="text-xs text-gray-500">Calculate based on square footage</div>
                              </div>
                            </label>
                            
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name={`billing_${item.size}`}
                                value="per_piece"
                                checked={item.billing_type === 'per_piece'}
                                onChange={() => handleBillingTypeChange(item.size, 'per_piece')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                              />
                              <div>
                                <div className="font-medium text-gray-900 text-sm">Per Piece</div>
                                <div className="text-xs text-gray-500">Calculate based on piece count</div>
                              </div>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredData.length === 0 && !loading && (
                <div className="text-center text-gray-500 py-8">
                  <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p>No sizes found matching your search.</p>
                </div>
              )}
            </>
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

export default BillingTypeModal;
