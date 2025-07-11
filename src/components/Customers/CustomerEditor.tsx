import React, { useState, useEffect } from 'react';
import { X, Save, User as UserIcon, Mail, Phone, Building, MapPin, FileText, AlertCircle, Hash } from 'lucide-react';
import { QuotationCustomer } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../lib/api';
import type { User } from '@supabase/supabase-js';

interface CustomerEditorProps {
  customer?: QuotationCustomer;
  onSave: (customer?: QuotationCustomer) => void;
  onCancel: () => void;
}

const CustomerEditor: React.FC<CustomerEditorProps> = ({ customer, onSave, onCancel }) => {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    gst_number: customer?.gst_number || '',
    site_address: customer?.site_address || '',
    notes: customer?.notes || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!isFormValid) {
      return;
    }

    if (!user) {
      alert('You must be logged in to save a customer.');
      return;
    }
    if (!session?.access_token) {
      alert('No access token found. Please log in again.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const customerData = {
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        gst_number: formData.gst_number.trim() || null,
        site_address: formData.site_address.trim() || null,
        notes: formData.notes.trim() || null,
        created_by: user.id,
      };

      const response = await api.saveCustomer(customerData, customer?.id, session.access_token);
        
      if (!response.success) {
        throw new Error(response.error || 'Failed to save customer');
      }

      onSave(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name.trim().length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          {customer ? 'Edit Customer' : 'Add New Customer'}
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Basic Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="customer@example.com"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Number
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.gst_number}
                  onChange={(e) => handleInputChange('gst_number', e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="29ABCDE1234F1Z5"
                  maxLength={15}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                15-digit GST identification number
              </p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Address Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Address
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                value={formData.site_address}
                onChange={(e) => handleInputChange('site_address', e.target.value)}
                rows={3}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter complete site address including city, state, and pincode"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Additional Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional notes about this customer..."
              />
            </div>
          </div>
        </div>

        {/* Form Validation Info */}
        {!isFormValid && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full flex-shrink-0"></div>
              <p className="text-sm text-yellow-800">
                <strong>Customer name</strong> is required to save this customer.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !isFormValid}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{loading ? 'Saving...' : 'Save Customer'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerEditor;