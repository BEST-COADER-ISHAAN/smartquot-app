import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Users, Mail, Phone, MapPin } from 'lucide-react';
import { QuotationCustomer } from '../../types';
import { supabase } from '../../lib/supabase';
import CustomerEditor from './CustomerEditor';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<QuotationCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<QuotationCustomer | undefined>();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.phone?.toLowerCase().includes(searchLower) ||
      customer.gst_number?.toLowerCase().includes(searchLower)
    );
  });

  const handleEdit = (customer: QuotationCustomer) => {
    setEditingCustomer(customer);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingCustomer(undefined);
    setShowEditor(true);
  };

  const handleSave = () => {
    setShowEditor(false);
    setEditingCustomer(undefined);
    loadCustomers();
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingCustomer(undefined);
  };

  const handleDelete = async (customer: QuotationCustomer) => {
    if (confirm(`Are you sure you want to delete "${customer.name}"? This action cannot be undone.`)) {
      try {
        const { error } = await supabase
          .from('customers')
          .delete()
          .eq('id', customer.id);

        if (error) throw error;
        loadCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Failed to delete customer. They may be referenced in existing quotations.');
      }
    }
  };

  if (showEditor) {
    return (
      <CustomerEditor
        customer={editingCustomer}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Customers</h2>
          <p className="text-sm lg:text-base text-gray-600 mt-1">Manage your customer relationships</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Customers</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-2 lg:p-3">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">With Email</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">
                {customers.filter(c => c.email).length}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-2 lg:p-3">
              <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">With GST Number</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">
                {customers.filter(c => c.gst_number).length}
              </p>
            </div>
            <div className="bg-purple-100 rounded-full p-2 lg:p-3">
              <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers by name, email, phone, or GST number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-4 lg:p-8 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-4 lg:p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4 text-sm lg:text-base">
              {customers.length === 0 ? 'No customers found. Add your first customer to get started.' : 'No customers match your search criteria.'}
            </p>
            {customers.length === 0 && (
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                Add First Customer
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="lg:hidden">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="border-b border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center flex-1">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        {customer.notes && (
                          <div className="text-xs text-gray-500 truncate">
                            {customer.notes}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEdit(customer)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(customer)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    {(customer.email || customer.phone) && (
                      <div className="space-y-1">
                        {customer.email && (
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{customer.email}</span>
                          </div>
                        )}
                        {customer.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{customer.phone}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {customer.gst_number && (
                      <div className="text-gray-600">
                        <span className="font-medium">GST:</span> {customer.gst_number}
                      </div>
                    )}
                    {customer.site_address && (
                      <div className="flex items-start space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-xs">{customer.site_address}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GST Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {customer.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            {customer.notes && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {customer.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {customer.email && (
                            <div className="flex items-center space-x-1 mb-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span>{customer.email}</span>
                            </div>
                          )}
                          {customer.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span>{customer.phone}</span>
                            </div>
                          )}
                          {!customer.email && !customer.phone && (
                            <span className="text-gray-400">No contact info</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.gst_number || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {customer.site_address ? (
                            <div className="flex items-start space-x-1">
                              <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="max-w-xs truncate">{customer.site_address}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">No address</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(customer.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(customer)}
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
    </div>
  );
};

export default CustomerList;