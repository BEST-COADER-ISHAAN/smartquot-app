import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Archive, Download, Upload, Package, SortAsc, SortDesc } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import type { User } from '@supabase/supabase-js';
import ProductEditor from './ProductEditor';
import ExcelImporter from './ExcelImporter';
import ProductDetailModal from './ProductDetailModal';
import { useDebounce } from '../../hooks/useDebounce';
import { api } from '../../lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';
import { formatSizeForDisplay } from '../../lib/sizeUtils';
import { getBillingTypeForSize, formatPriceDisplay, getPriceValue } from '../../lib/billingUtils';
import { QuotationProduct } from '../../types';
import { supabase } from '../../lib/supabase';
import { usePreferredSizeUnit } from '../../hooks/usePreferredSizeUnit';

type Product = QuotationProduct & {
  user_id: string;
};

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
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { user, session } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [formattedSizes, setFormattedSizes] = useState<{ [size: string]: string }>({});
  const formattedSizesRef = useRef(formattedSizes);
  useEffect(() => { formattedSizesRef.current = formattedSizes; }, [formattedSizes]);
  const [formattedPrices, setFormattedPrices] = useState<{ [productId: string]: string }>({});
  const { preferredSizeUnit } = usePreferredSizeUnit();
  const [pricesLoading, setPricesLoading] = useState(false);

  // Optimized helper functions with caching
  const discountCacheRef = useRef<{ [size: string]: number }>({});
  const billingTypeCacheRef = useRef<{ [size: string]: string }>({});
  
  const getCustomerDiscount = useCallback(async (userId: string, size: string): Promise<number> => {
    if (discountCacheRef.current[size] !== undefined) return discountCacheRef.current[size];
    const { data, error } = await supabase
      .from('discounts')
      .select('customer_discount')
      .eq('user_id', userId)
      .eq('size', size)
      .single();
    if (error || !data) return 0;
    discountCacheRef.current[size] = data.customer_discount || 0;
    return discountCacheRef.current[size];
  }, []);

  const getBillingTypeForSizeCached = useCallback(async (userId: string, size: string): Promise<string> => {
    if (billingTypeCacheRef.current[size] !== undefined) return billingTypeCacheRef.current[size];
    const billingType = await getBillingTypeForSize(userId, size);
    billingTypeCacheRef.current[size] = billingType;
    return billingType;
  }, []);

  // Helper to calculate discounted price (returns number for calculations)
  const getDiscountedPrice = useCallback(async (product: Product, userId: string) => {
    const discount = await getCustomerDiscount(userId, product.size);
    const discountedPrice = product.mrp_per_sqft - (product.mrp_per_sqft * discount / 100);
    return discountedPrice;
  }, [getCustomerDiscount]);

  // Helper to get formatted discounted price display
  const getFormattedDiscountedPrice = useCallback(async (product: Product, userId: string = '') => {
    const [discountedPrice, billingType, discount] = await Promise.all([
      getDiscountedPrice(product, userId),
      getBillingTypeForSizeCached(userId, product.size),
      getCustomerDiscount(userId, product.size)
    ]);
    
    const formattedPrice = formatPriceDisplay(getPriceValue(discountedPrice, product.mrp_per_box, billingType), billingType);
    if (discount > 0) {
      return `${formattedPrice} (-${discount}%)`;
    }
    return formattedPrice;
  }, [getDiscountedPrice, getBillingTypeForSizeCached, getCustomerDiscount]);

  // Memoize filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filter by archived status
      if (filterArchived !== product.is_archived) return false;
      
      // Filter by search term
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          (product.collection?.toLowerCase() || '').includes(searchLower) ||
          product.size.toLowerCase().includes(searchLower) ||
          (product.surface?.toLowerCase() || '').includes(searchLower)
        );
      }
      
      return true;
    });
  }, [products, filterArchived, debouncedSearchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const aValue = (a as any)[sortBy] || '';
      const bValue = (b as any)[sortBy] || '';
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, sortBy, sortOrder]);

  // Memoize paginated products
  const paginatedProducts = useMemo(() => {
    return sortedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedProducts, currentPage, itemsPerPage]);

  // Batch async operations for formatted sizes
  useEffect(() => {
    let isMounted = true;
    
    async function fetchFormattedSizes() {
      const newFormatted: { [size: string]: string } = {};
      const uniqueSizes = new Set(paginatedProducts.map(p => p.size).filter(Boolean));
      
      for (const size of uniqueSizes) {
        if (!formattedSizes[size]) {
          newFormatted[size] = await formatSizeForDisplay(size, preferredSizeUnit);
        }
      }
      
      if (isMounted && Object.keys(newFormatted).length > 0) {
        setFormattedSizes(prev => ({ ...prev, ...newFormatted }));
      }
    }
    
    fetchFormattedSizes();
    return () => { isMounted = false; };
  }, [paginatedProducts, preferredSizeUnit]);

  // Batch async operations for formatted prices
  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    
    async function fetchFormattedPrices() {
      setPricesLoading(true);
      const newPrices: { [productId: string]: string } = {};
      
      // Batch process products
      const promises = paginatedProducts.map(async (product) => {
        const price = await getFormattedDiscountedPrice(product, typeof user?.id === 'string' ? user.id : '');
        return { id: product.id, price };
      });
      
      const results = await Promise.all(promises);
      
      if (isMounted) {
        const newPricesMap = results.reduce((acc, { id, price }) => {
          acc[id] = price;
          return acc;
        }, {} as { [productId: string]: string });
        
        setFormattedPrices(newPricesMap);
        setPricesLoading(false);
      }
    }
    
    // Debounce price calculations to avoid excessive API calls
    timeoutId = setTimeout(() => {
      fetchFormattedPrices();
    }, 300);
    
    return () => { 
      isMounted = false; 
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [paginatedProducts, user?.id, getFormattedDiscountedPrice]);

  // Memoize total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts.length, itemsPerPage]);

  // Memoize loadProducts function
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = session?.access_token;
      const response = await api.getProducts(token);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to load products');
      }

      setProducts(response.data || []);
      setTotalCount((response.data || []).length);
    } catch (error) {
      console.error('Error loading products:', error);
      setError(error instanceof Error ? error.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

  // Load products only when necessary
  useEffect(() => {
    if (session?.access_token) {
      loadProducts();
    }
  }, [loadProducts]);

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      const response = await api.deleteProduct(productToDelete.id, session?.access_token);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete product');
      }
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete product');
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

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleSave = (savedProduct?: QuotationProduct) => {
    if (savedProduct) {
      const productWithUserId = savedProduct as Product;
      setProducts(prev => {
        const existing = prev.find(p => p.id === productWithUserId.id);
        if (existing) {
          return prev.map(p => p.id === productWithUserId.id ? productWithUserId : p);
        } else {
          return [productWithUserId, ...prev];
        }
      });
    }
    setShowEditor(false);
  };

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
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">items</span>
          </div>
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
            {sortedProducts.length === 0 && !loading && (
              <div className="p-8 text-center text-gray-500">
                <p>{debouncedSearchTerm ? 'No products found matching your search.' : 'No products found.'}</p>
              </div>
            )}
            
            {/* Mobile Cards View */}
            <div className="lg:hidden">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDetailModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                      <p className="text-gray-500 text-xs">{product.collection}</p>
                      <p className="text-gray-500 text-xs">Size: {formattedSizes[product.size] || product.size}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProduct(product);
                          setShowEditor(true);
                        }}
                        className="p-1 text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setProductToDelete(product);
                          setDeleteDialogOpen(true);
                        }}
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
                      <span className="text-gray-500">Price:</span>
                      <span className="ml-1 font-medium">{formattedPrices[product.id] || '...'}</span>
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
                      onClick={() => handleSort('name')}
                    >
                      Design Name
                      {sortBy === 'name' && (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discounted Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
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
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.collection}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formattedSizes[product.size] || product.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.surface}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {pricesLoading && !formattedPrices[product.id] ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                              Calculating...
                            </div>
                          ) : (
                            formattedPrices[product.id] || '...'
                          )}
                        </div>
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
                              { setProductToDelete(product); setDeleteDialogOpen(true); }
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
                      <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span>{' '}
                      of <span className="font-medium">{filteredProducts.length}</span> results
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
          product={editingProduct || undefined}
          onCancel={() => {
            setShowEditor(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
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
          product={selectedProduct as any}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-red-50 border-red-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Delete Product
            </DialogTitle>
          </DialogHeader>
          <p className="text-red-700 font-medium mt-2 mb-4">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-gray-300">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white shadow">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;