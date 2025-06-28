import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Archive, Download, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import ProductEditor from './ProductEditor';
import ExcelImporter from './ExcelImporter';
import ProductDetailModal from './ProductDetailModal';
import { useDebounce } from '../../hooks/useDebounce';

interface Product {
  id: string;
  design_name: string;
  collection: string;
  size: string;
  surface: string;
  ex_factory_price: number;
  mrp_per_sqft: number;
  mrp_per_box: number;
  gst_percentage: number;
  insurance_percentage: number;
  actual_sqft_per_box: number;
  billed_sqft_per_box: number;
  is_archived: boolean;
  created_by: string;
  weight: number;
  freight: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const [filterArchived, setFilterArchived] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showImporter, setShowImporter] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState('design_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 20;
  const { user } = useAuth();

  const loadProducts = async () => {
    setLoading(true);
    try {
      console.log('Loading products for user:', user?.sub);
      
      // Build the query with user filtering
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('created_by', user?.sub) // Filter by current user
        .eq('is_archived', filterArchived)
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      // Add search filter if search term exists
      if (debouncedSearchTerm.trim()) {
        query = query.or(`design_name.ilike.%${debouncedSearchTerm}%,collection.ilike.%${debouncedSearchTerm}%,size.ilike.%${debouncedSearchTerm}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      console.log('Products loaded:', data?.length || 0, 'products');
      console.log('Sample product:', data?.[0]);

      setProducts(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalCount = async () => {
    try {
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('created_by', user?.sub) // Filter by current user
        .eq('is_archived', filterArchived);

      if (countError) throw countError;
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error getting total count:', error);
    }
  };

  useEffect(() => {
    if (user?.sub) {
      loadProducts();
    }
  }, [currentPage, debouncedSearchTerm, filterArchived, sortBy, sortOrder, user?.sub]);

  useEffect(() => {
    if (user?.sub) {
      getTotalCount();
    }
  }, [debouncedSearchTerm, filterArchived, user?.sub]);

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        // .eq('created_by', user?.sub) // Temporarily commented out for debugging

      if (error) throw error;

      setProducts(products.filter(p => p.id !== productId));
      getTotalCount();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleArchive = async (productId: string, archive: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_archived: archive })
        .eq('id', productId)
        // .eq('created_by', user?.sub) // Temporarily commented out for debugging

      if (error) throw error;

      setProducts(products.map(p => 
        p.id === productId ? { ...p, is_archived: archive } : p
      ));
    } catch (error) {
      console.error('Error archiving product:', error);
      alert('Failed to archive product');
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Filters (always visible) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <button
          onClick={() => setFilterArchived(!filterArchived)}
          className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm ${
            filterArchived 
              ? 'bg-gray-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Archive className="w-4 h-4" />
          <span>{filterArchived ? 'Show Active' : 'Show Archived'}</span>
        </button>
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
          <button
            onClick={() => setShowImporter(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Import Excel</span>
          </button>
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Table and loading spinner */}
      <div className="bg-white rounded-lg shadow overflow-visible min-h-[200px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {products.length === 0 && !loading && (
              <div className="p-8 text-center text-gray-500">
                <p>No products found.</p>
              </div>
            )}
            
            {/* Mobile Cards View */}
            <div className="lg:hidden">
              {products.map((product) => (
                <div key={product.id} className="border-b border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{product.design_name}</h3>
                      <p className="text-gray-500 text-xs">{product.collection}</p>
                      <p className="text-gray-500 text-xs">Size: {product.size}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowDetailModal(true);
                        }}
                        className="p-1 text-blue-600 hover:text-blue-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowEditor(true);
                        }}
                        className="p-1 text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleArchive(product.id, !product.is_archived)}
                        className="p-1 text-yellow-600 hover:text-yellow-900"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1 text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Surface:</span>
                      <span className="ml-1 font-medium">{product.surface}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Rate/SQFT:</span>
                      <span className="ml-1 font-medium">₹{product.mrp_per_sqft}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('design_name')}
                    >
                      Design Name
                      {sortBy === 'design_name' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('collection')}
                    >
                      Collection
                      {sortBy === 'collection' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('size')}
                    >
                      Size
                      {sortBy === 'size' && (
                        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Surface
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate/SQFT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowDetailModal(true);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.design_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.collection}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.surface}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{product.mrp_per_sqft}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingProduct(product);
                              setShowEditor(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArchive(product.id, !product.is_archived);
                            }}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product.id);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalCount)}</span>{' '}
                      of <span className="font-medium">{totalCount}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {(() => {
                        const pages = [];
                        const pageWindow = 2; // Show 2 pages before/after current
                        let start = Math.max(2, currentPage - pageWindow);
                        let end = Math.min(totalPages - 1, currentPage + pageWindow);
                        if (currentPage <= 3) {
                          start = 2;
                          end = Math.min(5, totalPages - 1);
                        }
                        if (currentPage >= totalPages - 2) {
                          start = Math.max(2, totalPages - 4);
                          end = totalPages - 1;
                        }
                        // Always show first page
                        pages.push(
                          <button
                            key={1}
                            onClick={() => setCurrentPage(1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === 1
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            1
                          </button>
                        );
                        // Ellipsis if needed
                        if (start > 2) {
                          pages.push(
                            <span key="start-ellipsis" className="px-2">...</span>
                          );
                        }
                        // Page window
                        for (let page = start; page <= end; page++) {
                          pages.push(
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === page
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                        // Ellipsis if needed
                        if (end < totalPages - 1) {
                          pages.push(
                            <span key="end-ellipsis" className="px-2">...</span>
                          );
                        }
                        // Always show last page
                        if (totalPages > 1) {
                          pages.push(
                            <button
                              key={totalPages}
                              onClick={() => setCurrentPage(totalPages)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === totalPages
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {totalPages}
                            </button>
                          );
                        }
                        return pages;
                      })()}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showEditor && (
        <ProductEditor
          product={editingProduct}
          onClose={() => {
            setShowEditor(false);
            setEditingProduct(null);
          }}
          onSave={() => {
            setShowEditor(false);
            setEditingProduct(null);
            loadProducts();
          }}
        />
      )}

      {showImporter && (
        <ExcelImporter
          onClose={() => setShowImporter(false)}
          onImportComplete={() => {
            setShowImporter(false);
            loadProducts();
          }}
        />
      )}

      {showDetailModal && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductList;