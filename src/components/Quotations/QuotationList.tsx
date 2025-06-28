import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Copy, Send, Eye, Trash2, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Quotation } from '../../types';
import { supabase } from '../../lib/supabase';
import QuotationWizard from './QuotationWizard';

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
      console.error('Error loading quotations:', error);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (quotation: Quotation) => {
    // Debug: log the quotation object
    console.log('Editing quotation:', quotation);
    // Defensive: merge with defaults to ensure all fields are present
    const defaultQuotation = {
      customer_id: '',
      status: 'draft',
      is_area_wise: true,
      include_images: false,
      export_type: 'pdf' as 'pdf',
      pdf_template: '',
      link_template: '',
      terms_conditions: '',
      notes: '',
      rooms: [
        {
          id: '',
          quotation_id: '',
          room_name: 'Living Room',
          room_total: 0,
          room_margin_amount: 0,
          room_margin_percentage: 0,
          sort_order: 0,
          items: []
        }
      ]
    };
    const mergedQuotation = {
      ...defaultQuotation,
      ...quotation,
      export_type: (quotation.export_type === 'pdf' || quotation.export_type === 'link' || quotation.export_type === 'both') ? quotation.export_type : 'pdf',
      rooms: quotation.rooms && quotation.rooms.length > 0 ? quotation.rooms : defaultQuotation.rooms
    };
    setEditingQuotation(mergedQuotation);
    setViewMode('edit');
    setShowWizard(true);
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
    setShowWizard(false);
    setEditingQuotation(undefined);
    setViewMode('edit');
    loadQuotations(); // Reload the list
  };

  const handleCancel = () => {
    setShowWizard(false);
    setEditingQuotation(undefined);
    setViewMode('edit');
  };

  const handleDuplicate = async (quotation: Quotation) => {
    // Create a copy of the quotation without IDs and quotation_number
    const duplicatedQuotation: Partial<Quotation> = {
      customer_id: quotation.customer_id,
      status: 'draft',
      quotation_number: undefined, // Explicitly set to undefined to let auto-generation work
      terms_conditions: quotation.terms_conditions,
      notes: quotation.notes,
      include_images: quotation.include_images,
      export_type: quotation.export_type,
      pdf_template: quotation.pdf_template,
      link_template: quotation.link_template,
      is_area_wise: quotation.is_area_wise,
      rooms: quotation.rooms.map(room => ({
        ...room,
        id: '',
        quotation_id: '',
        items: room.items.map(item => ({
          ...item,
          id: '',
          room_id: ''
        }))
      }))
    };

    setEditingQuotation(duplicatedQuotation as Quotation);
    setViewMode('edit');
    setShowWizard(true);
  };

  const handleDelete = async () => {
    if (!quotationToDelete) return;
    await supabase.from('quotations').delete().eq('id', quotationToDelete.id);
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
              {filteredQuotations.map((quotation) => (
                <div
                  key={quotation.id}
                  className="border-b border-gray-200 p-4 hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => navigate(`/quotations/${quotation.id}/step3`)}
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
                          handleEdit(quotation);
                        }}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
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
                  {filteredQuotations.map((quotation) => (
                    <tr
                      key={quotation.id}
                      className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                      onClick={() => navigate(`/quotations/${quotation.id}/step3`)}
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
                              handleEdit(quotation);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
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
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white shadow">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuotationList;