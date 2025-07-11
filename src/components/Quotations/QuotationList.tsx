import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Copy, Send, Eye, Trash2, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Quotation } from '../../types';
import { supabase } from '../../lib/supabase';
import QuotationWizard from './QuotationWizard';
import { useAuth } from '../../hooks/useAuth';

const QuotationList: React.FC = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | undefined>();
  const [viewMode, setViewMode] = useState<'edit' | 'view'>('edit');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quotationToDelete, setQuotationToDelete] = useState<Quotation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { user, isAuthenticated } = useAuth();

  // Listen for keyboard shortcut events and handle /quotations/new route
  useEffect(() => {
    const handleOpenQuotationWizard = () => {
      handleCreate();
    };

    const handleProductSaved = () => {
      // Refresh quotations to show updated product data
      loadQuotations();
    };

    const handleCustomerSaved = () => {
      // Refresh quotations to show updated customer data
      loadQuotations();
    };

    // Check if we should open the wizard (for /quotations/new route)
    const pathname = window.location.pathname;
    if (pathname === '/quotations/new') {
      handleCreate();
    }

    window.addEventListener('openQuotationWizard', handleOpenQuotationWizard);
    window.addEventListener('productSaved', handleProductSaved);
    window.addEventListener('customerSaved', handleCustomerSaved);
    
    return () => {
      window.removeEventListener('openQuotationWizard', handleOpenQuotationWizard);
      window.removeEventListener('productSaved', handleProductSaved);
      window.removeEventListener('customerSaved', handleCustomerSaved);
    };
  }, []);

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    setLoading(true);
    try {
      // First, fetch quotations with rooms and items
      const { data: quotationsData, error: quotationsError } = await supabase
        .from('quotations')
        .select(`
          *,
          quotation_rooms(
            *,
            quotation_room_items(
              *,
              product:products(*)
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (quotationsError) throw quotationsError;

      // Extract unique customer IDs
      const customerIds = [...new Set(quotationsData
        .map(q => q.customer_id)
        .filter(id => id !== null)
      )];

      // Fetch customers separately
      let customersData = [];
      if (customerIds.length > 0) {
        const { data: customers, error: customersError } = await supabase
          .from('customers')
          .select('*')
          .in('id', customerIds);

        if (customersError) throw customersError;
        customersData = customers || [];
      }

      // Create a customer lookup map
      const customerMap = new Map(customersData.map(customer => [customer.id, customer]));

      // Transform the data to match our types and manually join customers
      const transformedQuotations: Quotation[] = quotationsData.map((q: any) => ({
        ...q,
        customer: q.customer_id ? customerMap.get(q.customer_id) : null,
        rooms: q.quotation_rooms.map((room: any) => ({
          ...room,
          items: room.quotation_room_items
        }))
      }));

      setQuotations(transformedQuotations);
    } catch (error) {
      // console.error('Error loading quotations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotation.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.quotation_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || quotation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get paginated quotations
  const paginatedQuotations = filteredQuotations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleView = (quotation: Quotation) => {
    navigate(`/quotations/${quotation.id}`);
  };

  const handleCreate = () => {
    setEditingQuotation(undefined);
    setViewMode('edit');
    setShowWizard(true);
  };

  const handleSave = (quotation: Quotation) => {
    navigate(`/quotations/${quotation.quotation_number.replace(/^#/, '')}/step3`);
  };

  const handleCancel = () => {
    setShowWizard(false);
    setEditingQuotation(undefined);
    setViewMode('edit');
  };

  const handleDuplicate = async (quotation: Quotation) => {
    // Create a copy of the quotation without IDs, quotation_number, created_at, updated_at
    const duplicatedQuotation: Partial<Quotation> = {
      customer_id: quotation.customer_id,
      customer: quotation.customer,
      status: 'draft',
      quotation_number: undefined, // Explicitly set to undefined to let auto-generation work
      terms_conditions: quotation.terms_conditions,
      notes: quotation.notes,
      include_images: quotation.include_images,
      export_type: quotation.export_type,
      pdf_template: quotation.pdf_template,
      link_template: quotation.link_template,
      is_area_wise: quotation.is_area_wise,
      // Copy all global settings and column visibility fields
      sqft_in_box_type: quotation.sqft_in_box_type,
      show_sqft_in_box: quotation.show_sqft_in_box,
      show_sqft_needed: quotation.show_sqft_needed,
      show_box_needed: quotation.show_box_needed,
      show_price_per_sqft: quotation.show_price_per_sqft,
      show_price_per_box: quotation.show_price_per_box,
      show_amount: quotation.show_amount,
      show_margin: quotation.show_margin,
      local_freight: quotation.local_freight,
      unloading: quotation.unloading,
      rooms: quotation.rooms.map(room => ({
        ...room,
        id: '',
        quotation_id: '',
        created_at: undefined,
        updated_at: undefined,
        items: room.items.map(item => ({
          ...item,
          id: '',
          room_id: '',
          created_at: undefined,
          updated_at: undefined,
          // Reset all calculated/user-editable fields
          amount: 0,
          margin_amount: 0,
          margin_percentage: 0,
          box_needed: 0,
          sqft_needed: 0,
          quantity_boxes: 1, // Default to 1 for new duplicate
          discount_percentage: item.discount_percentage ?? 0,
          rate_per_sqft: item.rate_per_sqft ?? 0,
          mrp_per_box: item.mrp_per_box ?? 0,
        }))
      })),
      created_at: undefined,
      updated_at: undefined,
      total_amount: undefined,
      total_margin_amount: undefined,
      total_margin_percentage: undefined,
    };
    setEditingQuotation(duplicatedQuotation as Quotation);
    setViewMode('edit');
    setShowWizard(true);
  };

  const handleDelete = async () => {
    if (!quotationToDelete) return;
    if (!isAuthenticated) {
      alert('You must be logged in to delete a quotation.');
      return;
    }
    // First, delete related quotation_rooms
    const { error: roomsError } = await supabase.from('quotation_rooms').delete().eq('quotation_id', quotationToDelete.id);
    if (roomsError) {
      alert('Failed to delete related rooms: ' + roomsError.message);
      return;
    }
    // Then, delete the quotation
    const { error } = await supabase.from('quotations').delete().eq('id', quotationToDelete.id);
    if (error) {
      alert('Failed to delete quotation: ' + error.message);
      return;
    }
    setDeleteDialogOpen(false);
    setQuotationToDelete(null);
    loadQuotations();
  };

  if (showWizard) {
    return (
      <QuotationWizard
        quotation={editingQuotation}
        onSave={handleSave}
        onCancel={handleCancel}
        viewMode={viewMode}
      />
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Quotations</h2>
          <p className="text-sm lg:text-base text-gray-600 mt-1">Manage all your quotations with the new multi-step wizard</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>New Quotation</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer or quotation number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

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
        </div>
      </div>

      {/* Quotations List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-4 lg:p-8 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading quotations...</p>
          </div>
        ) : filteredQuotations.length === 0 ? (
          <div className="p-4 lg:p-8 text-center">
            <p className="text-gray-600">No quotations found. Create your first quotation to get started.</p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="lg:hidden">
              {paginatedQuotations.map((quotation) => (
                <div
                  key={quotation.id}
                  className="border-b border-gray-200 p-4 hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => navigate(`/quotations/${quotation.quotation_number.replace(/^#/, '')}/step3`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{quotation.quotation_number}</h3>
                      <p className="text-gray-500 text-xs">{quotation.customer?.name || 'No Customer'}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicate(quotation);
                        }}
                        className="p-1 text-green-600 hover:text-green-800"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuotationToDelete(quotation);
                          setDeleteDialogOpen(true);
                        }}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <span className="ml-1 font-medium">₹{quotation.total_amount?.toLocaleString() || '0'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Margin:</span>
                      <span className="ml-1 font-medium">{quotation.total_margin_percentage?.toFixed(1) || '0'}%</span>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedQuotations.map((quotation) => (
                    <tr
                      key={quotation.id}
                      className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                      onClick={() => navigate(`/quotations/${quotation.quotation_number.replace(/^#/, '')}/step3`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {quotation.quotation_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quotation.customer?.name || 'No Customer'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{quotation.total_amount?.toLocaleString() || '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quotation.total_margin_percentage?.toFixed(1) || '0'}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicate(quotation);
                            }}
                            className="text-green-600 hover:text-green-800 transition-colors duration-150"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuotationToDelete(quotation);
                              setDeleteDialogOpen(true);
                            }}
                            className="text-red-600 hover:text-red-800 transition-colors duration-150"
                            title="Delete"
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
                      <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredQuotations.length)}</span>{' '}
                      of <span className="font-medium">{filteredQuotations.length}</span> results
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-red-50 border-red-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Delete Quotation
            </DialogTitle>
          </DialogHeader>
          <p className="text-red-700 font-medium mt-2 mb-4">Are you sure you want to delete this quotation? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-gray-300">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white shadow" disabled={!isAuthenticated}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuotationList;