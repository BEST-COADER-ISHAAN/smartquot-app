import React, { useState } from 'react';
import { CheckCircle, Download, Plus, TrendingUp, IndianRupee, Percent, Edit, Eye, FileText, ArrowLeft } from 'lucide-react';
import { Quotation } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../lib/api';
import QuotationExportPreview from './QuotationExportPreview';

interface QuotationStep3Props {
  quotation: Partial<Quotation>;
  onFinish: (quotation: Quotation) => void;
  onBack?: () => void;
  isViewMode?: boolean;
  existingQuotation?: Quotation;
}

const QuotationStep3: React.FC<QuotationStep3Props> = ({ 
  quotation, 
  onFinish, 
  onBack, 
  isViewMode = false, 
  existingQuotation 
}) => {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [savedQuotation, setSavedQuotation] = useState<Quotation | null>(existingQuotation || null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState<'pdf' | 'link' | 'both'>('pdf');
  const [previewTemplate, setPreviewTemplate] = useState<string>('standard');

  const token = session?.access_token;

  const handleSaveQuotation = async () => {
    if (!user) {
      console.error('No user found - cannot save quotation');
      alert('You must be logged in to save a quotation.');
      return;
    }
    setLoading(true);
    try {
      // Use only Supabase user.id
      const userId = user?.id;
      if (!userId) {
        throw new Error('No user ID available from Supabase');
      }
      console.log('Saving quotation with user ID:', userId);

      // Prepare quotation data
      const quotationData = {
        quotation_number: quotation.quotation_number,
        customer_id: quotation.customer_id,
        status: quotation.status,
        total_amount: quotation.total_amount,
        total_margin_amount: quotation.total_margin_amount,
        total_margin_percentage: quotation.total_margin_percentage,
        terms_conditions: quotation.terms_conditions,
        notes: quotation.notes,
        include_images: quotation.include_images || false,
        export_type: quotation.export_type || 'pdf',
        pdf_template: quotation.pdf_template || 'standard',
        link_template: quotation.link_template || 'modern',
        is_area_wise: quotation.is_area_wise || false,
        sqft_in_box_type: quotation.sqft_in_box_type || 'actual',
        show_sqft_in_box: quotation.show_sqft_in_box || false,
        show_sqft_needed: quotation.show_sqft_needed || false,
        show_box_needed: quotation.show_box_needed || false,
        show_price_per_sqft: quotation.show_price_per_sqft || false,
        show_price_per_box: quotation.show_price_per_box || false,
        show_amount: quotation.show_amount || false,
        show_margin: quotation.show_margin || false,
        created_by: userId,
        rooms: quotation.rooms || [], // <-- Ensure rooms are sent
      };

      console.log('Quotation data to save:', quotationData);

      // Debug log before API call
      console.log('Calling api.saveQuotation with:', quotationData, existingQuotation?.id, token);
      const response = await api.saveQuotation(quotationData, existingQuotation?.id, token);

      if (!response.success) {
        throw new Error(response.error || 'Failed to save quotation');
      }

      setSavedQuotation(response.data);
      console.log('Quotation saved successfully:', response.data);
      onFinish(response.data); // Pass the created quotation to parent
    } catch (error) {
      console.error('Error saving quotation:', error);
      alert(error instanceof Error ? error.message : 'Failed to save quotation');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    if (savedQuotation) {
      onFinish(savedQuotation);
    }
  };

  const handleDownload = () => {
    const quotationToUse = savedQuotation || quotation;
    if (quotationToUse) {
      setPreviewType('pdf');
      setPreviewTemplate(quotationToUse.pdf_template || 'standard');
      setShowPreview(true);
    }
  };

  const handlePreview = () => {
    const quotationToUse = savedQuotation || quotation;
    if (quotationToUse) {
      const exportType = quotationToUse.export_type || 'pdf';
      // Keep the original export type for the preview component
      setPreviewType(exportType as 'pdf' | 'link' | 'both');
      setPreviewTemplate(
        exportType === 'link' || exportType === 'both' 
          ? quotationToUse.link_template || 'modern'
          : quotationToUse.pdf_template || 'standard'
      );
      setShowPreview(true);
    }
  };

  const handleCreateNewQuotation = () => {
    // Navigate to the quotations list page where user can create a new quotation
    window.location.href = '/quotations';
  };

  // If we're in view mode and have an existing quotation, show the success state directly
  if (isViewMode && existingQuotation) {
    return (
      <>
        <div className="space-y-6">
          {/* Success Message */}
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quotation Details</h3>
            <p className="text-gray-600">
              Quotation <strong>{existingQuotation.quotation_number}</strong> - View and manage actions
            </p>
          </div>

          {/* Quotation Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quotation Information</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Basic Information</h5>
                <p className="text-gray-600">Quotation Number: <strong>{existingQuotation.quotation_number}</strong></p>
                <p className="text-gray-600">Customer: <strong>{existingQuotation.customer?.name || 'No Customer'}</strong></p>
                <p className="text-gray-600">Status: <strong>{existingQuotation.status}</strong></p>
                <p className="text-gray-600">Type: <strong>{existingQuotation.is_area_wise ? 'Area-wise' : 'General'}</strong></p>
                <p className="text-gray-600">Created: <strong>{new Date(existingQuotation.created_at).toLocaleDateString()}</strong></p>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Export Settings</h5>
                <p className="text-gray-600">Export Type: <strong>{existingQuotation.export_type?.toUpperCase() || 'PDF'}</strong></p>
                <p className="text-gray-600">Include Images: <strong>{existingQuotation.include_images ? 'Yes' : 'No'}</strong></p>
                <p className="text-gray-600">PDF Template: <strong>{existingQuotation.pdf_template || 'Standard'}</strong></p>
                <p className="text-gray-600">Link Template: <strong>{existingQuotation.link_template || 'Modern'}</strong></p>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-medium text-gray-700 mb-2">Products Summary</h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {existingQuotation.rooms?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      {existingQuotation.is_area_wise ? 'Rooms' : 'Sections'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {existingQuotation.rooms?.reduce(
                        (sum, room) =>
                          sum +
                          (room.items
                            ? room.items.filter(
                                item =>
                                  !!item.name ||
                                  !!item.product?.name
                              ).length
                            : 0),
                        0
                      ) || 0}
                    </div>
                    <div className="text-sm text-gray-600">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      ₹{existingQuotation.total_amount?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Notes */}
            {(existingQuotation.terms_conditions || existingQuotation.notes) && (
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                {existingQuotation.terms_conditions && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Terms & Conditions</h5>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                      {existingQuotation.terms_conditions}
                    </div>
                  </div>
                )}
                {existingQuotation.notes && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Internal Notes</h5>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                      {existingQuotation.notes}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profit Information */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Profit Information</span>
            </h4>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    ₹{existingQuotation.total_margin_amount?.toFixed(2) || '0.00'}
                  </div>
                  <div className="text-sm text-green-600">Total Margin Amount</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <Percent className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    {existingQuotation.total_margin_percentage?.toFixed(1) || '0.0'}%
                  </div>
                  <div className="text-sm text-green-600">Margin Percentage</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    ₹{((existingQuotation.total_amount || 0) - (existingQuotation.total_margin_amount || 0)).toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">Cost Price</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={handlePreview}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
          </div>

          {/* Final Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handleFinish}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Back to Quotations
            </button>
            
            <button
              onClick={handleCreateNewQuotation}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Quotation</span>
            </button>
          </div>
        </div>

        {/* Export Preview Modal */}
        {showPreview && existingQuotation && (
          <QuotationExportPreview
            quotation={existingQuotation}
            exportType={previewType}
            template={previewTemplate}
            onClose={() => setShowPreview(false)}
          />
        )}
      </>
    );
  }

  // Review step: always show before saving (for new/duplicated quotations)
  if (!savedQuotation && !loading) {
    return (
      <>
        <div className="space-y-6">
          {/* Review/Confirmation Step */}
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Quotation</h3>
            <p className="text-gray-600">Please review your quotation details below and click "Create Quotation" to save.</p>
          </div>
          {/* Quotation Details (same as final page) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quotation Details</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Basic Information</h5>
                <p className="text-gray-600">Customer: <strong>{quotation.customer?.name || 'Not selected'}</strong></p>
                <p className="text-gray-600">Type: <strong>{quotation.is_area_wise ? 'Area-wise' : 'General'}</strong></p>
                {quotation.created_at && (
                  <p className="text-gray-600">Created: <strong>{new Date(quotation.created_at).toLocaleString()}</strong></p>
                )}
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Export Settings</h5>
                <p className="text-gray-600">Export Type: <strong>{quotation.export_type?.toUpperCase() || 'PDF'}</strong></p>
                <p className="text-gray-600">Include Images: <strong>{quotation.include_images ? 'Yes' : 'No'}</strong></p>
                {quotation.terms_conditions && (
                  <p className="text-gray-600">Terms & Conditions: <strong>Added</strong></p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-medium text-gray-700 mb-2">Products Summary</h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {quotation.rooms?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      {quotation.is_area_wise ? 'Rooms' : 'Sections'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {quotation.rooms?.reduce(
                        (sum, room) =>
                          sum +
                          (room.items
                            ? room.items.filter(
                                item =>
                                  !!item.name ||
                                  !!item.product?.name
                              ).length
                            : 0),
                        0
                      ) || 0}
                    </div>
                    <div className="text-sm text-gray-600">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      ₹{quotation.total_amount?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profit Information */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Profit Information</span>
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    ₹{quotation.total_margin_amount?.toFixed(2) || '0.00'}
                  </div>
                  <div className="text-sm text-green-600">Total Margin Amount</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <Percent className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    {quotation.total_margin_percentage?.toFixed(1) || '0.0'}%
                  </div>
                  <div className="text-sm text-green-600">Margin Percentage</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    ₹{((quotation.total_amount || 0) - (quotation.total_margin_amount || 0)).toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">Cost Price</div>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back: Export Settings</span>
              </button>
            )}
            <button
              onClick={handleSaveQuotation}
              disabled={loading}
              className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span>{loading ? 'Creating...' : 'Create Quotation'}</span>
            </button>
          </div>
          {/* Export Preview Modal */}
          {showPreview && quotation && (
            <QuotationExportPreview
              quotation={quotation as Quotation}
              exportType={previewType}
              template={previewTemplate}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Creating Quotation...</h3>
        <p className="text-gray-600">Please wait while we save your quotation.</p>
      </div>
    );
  }

  // Final page: after saving, show same layout as review step, but with savedQuotation
  if (savedQuotation) {
    const sq: Quotation = savedQuotation as Quotation;
    return (
      <>
        <div className="space-y-6">
          {/* Success Message */}
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quotation Created Successfully!</h3>
            <p className="text-gray-600">
              Quotation <strong>{sq.quotation_number}</strong> has been created and saved.
            </p>
          </div>
          {/* Quotation Details (same as review step) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quotation Details</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Basic Information</h5>
                <p className="text-gray-600">Customer: <strong>{sq.customer?.name || 'Not selected'}</strong></p>
                <p className="text-gray-600">Type: <strong>{sq.is_area_wise ? 'Area-wise' : 'General'}</strong></p>
                {sq.created_at && (
                  <p className="text-gray-600">Created: <strong>{new Date(sq.created_at).toLocaleString()}</strong></p>
                )}
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Export Settings</h5>
                <p className="text-gray-600">Export Type: <strong>{sq.export_type?.toUpperCase() || 'PDF'}</strong></p>
                <p className="text-gray-600">Include Images: <strong>{sq.include_images ? 'Yes' : 'No'}</strong></p>
                {sq.terms_conditions && (
                  <p className="text-gray-600">Terms & Conditions: <strong>Added</strong></p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-medium text-gray-700 mb-2">Products Summary</h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {sq.rooms?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      {sq.is_area_wise ? 'Rooms' : 'Sections'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {sq.rooms?.reduce(
                        (sum, room) =>
                          sum +
                          (room.items
                            ? room.items.filter(
                                item =>
                                  !!item.name ||
                                  !!item.product?.name
                              ).length
                            : 0),
                        0
                      ) || 0}
                    </div>
                    <div className="text-sm text-gray-600">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      ₹{sq.total_amount?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profit Information */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Profit Information</span>
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    ₹{sq.total_margin_amount?.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">Total Margin Amount</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <Percent className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    {sq.total_margin_percentage?.toFixed(1)}%
                  </div>
                  <div className="text-sm text-green-600">Margin Percentage</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    ₹{((sq.total_amount || 0) - (sq.total_margin_amount || 0)).toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">Cost Price</div>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={handlePreview}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
          </div>
          {/* Final Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handleFinish}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Back to Quotations
            </button>
            <button
              onClick={handleCreateNewQuotation}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Quotation</span>
            </button>
          </div>
          {/* Export Preview Modal */}
          {showPreview && savedQuotation && (
            <QuotationExportPreview
              quotation={savedQuotation}
              exportType={previewType}
              template={previewTemplate}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Success Message */}
        <div className="text-center">
          <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quotation Created Successfully!</h3>
          <p className="text-gray-600">
            Quotation <strong>{savedQuotation?.quotation_number}</strong> has been created and saved.
          </p>
        </div>

        {/* Quotation Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Quotation Details</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Basic Information</h5>
              <p className="text-gray-600">Quotation Number: <strong>{savedQuotation?.quotation_number}</strong></p>
              <p className="text-gray-600">Status: <strong>{savedQuotation?.status}</strong></p>
              <p className="text-gray-600">Type: <strong>{savedQuotation?.is_area_wise ? 'Area-wise' : 'General'}</strong></p>
              <p className="text-gray-600">Created: <strong>{new Date(savedQuotation?.created_at || '').toLocaleDateString()}</strong></p>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Financial Summary</h5>
              <p className="text-gray-600">Total Amount: <strong>₹{savedQuotation?.total_amount?.toFixed(2)}</strong></p>
              <p className="text-gray-600">Margin: <strong>₹{savedQuotation?.total_margin_amount?.toFixed(2)} ({savedQuotation?.total_margin_percentage?.toFixed(1)}%)</strong></p>
            </div>
          </div>
        </div>

        {/* Profit Information */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Profit Information</span>
          </h4>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">
                  ₹{savedQuotation?.total_margin_amount?.toFixed(2)}
                </div>
                <div className="text-sm text-green-600">Total Margin Amount</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <Percent className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">
                  {savedQuotation?.total_margin_percentage?.toFixed(1)}%
                </div>
                <div className="text-sm text-green-600">Margin Percentage</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">
                  ₹{((savedQuotation?.total_amount || 0) - (savedQuotation?.total_margin_amount || 0)).toFixed(2)}
                </div>
                <div className="text-sm text-green-600">Cost Price</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={handlePreview}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Final Actions */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={handleFinish}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Back to Quotations
          </button>
          
          <button
            onClick={handleCreateNewQuotation}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Quotation</span>
          </button>
        </div>
      </div>

      {/* Export Preview Modal */}
      {showPreview && savedQuotation && (
        <QuotationExportPreview
          quotation={savedQuotation}
          exportType={previewType}
          template={previewTemplate}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default QuotationStep3;