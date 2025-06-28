import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Download, Share, ExternalLink, TrendingUp, DollarSign, Percent, FileText, Plus, Edit, Eye } from 'lucide-react';
import { Quotation } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
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
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [savedQuotation, setSavedQuotation] = useState<Quotation | null>(existingQuotation || null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState<'pdf' | 'link'>('pdf');
  const [previewTemplate, setPreviewTemplate] = useState<string>('standard');

  const handleSaveQuotation = async () => {
    if (!user) return;
    setLoading(true);
    try {
      console.log('Saving quotation with data:', quotation);
      const quotationData = {
        quotation_number: quotation.quotation_number,
        customer_id: quotation.customer_id || null,
        status: quotation.status || 'draft',
        total_amount: quotation.total_amount || 0,
        total_margin_amount: quotation.total_margin_amount || 0,
        total_margin_percentage: quotation.total_margin_percentage || 0,
        terms_conditions: quotation.terms_conditions || null,
        notes: quotation.notes || null,
        include_images: quotation.include_images || false,
        export_type: quotation.export_type || 'pdf',
        pdf_template: quotation.pdf_template || null,
        link_template: quotation.link_template || null,
        is_area_wise: quotation.is_area_wise !== undefined ? quotation.is_area_wise : true,
        sqft_in_box_type: quotation.sqft_in_box_type || 'billed',
        show_sqft_in_box: quotation.show_sqft_in_box || false,
        show_sqft_needed: quotation.show_sqft_needed || false,
        show_box_needed: quotation.show_box_needed || false,
        show_price_per_sqft: quotation.show_price_per_sqft || false,
        show_price_per_box: quotation.show_price_per_box || false,
        show_amount: quotation.show_amount || false,
        show_margin: quotation.show_margin || false,
        created_by: user.id
      };

      let quotationId = quotation.id;
      let newQuotation = null;
      if (quotationId) {
        // Update existing quotation
        const { error: updateError } = await supabase
          .from('quotations')
          .update(quotationData)
          .eq('id', quotationId);
        if (updateError) throw updateError;
        // Remove all old rooms and items for this quotation
        const { data: oldRooms } = await supabase
          .from('quotation_rooms')
          .select('id')
          .eq('quotation_id', quotationId);
        if (oldRooms && oldRooms.length > 0) {
          const roomIds = oldRooms.map((r: any) => r.id);
          await supabase.from('quotation_room_items').delete().in('room_id', roomIds);
          await supabase.from('quotation_rooms').delete().in('id', roomIds);
        }
        newQuotation = { id: quotationId };
      } else {
        // Create new quotation
        const { data, error: quotationError } = await supabase
          .from('quotations')
          .insert(quotationData)
          .select()
          .single();
        if (quotationError) throw quotationError;
        newQuotation = data;
        quotationId = data.id;
      }

      // Save rooms and items
      for (const room of quotation.rooms || []) {
        const roomData = {
          quotation_id: quotationId,
          room_name: room.room_name,
          room_total: room.room_total,
          room_margin_amount: room.room_margin_amount,
          room_margin_percentage: room.room_margin_percentage,
          sort_order: room.sort_order,
        };
        const { data: newRoom, error: roomError } = await supabase
          .from('quotation_rooms')
          .insert(roomData)
          .select()
          .single();
        if (roomError) throw roomError;
        const roomId = newRoom.id;
        for (const item of room.items) {
          const itemData = {
            room_id: roomId,
            product_id: item.product_id || null,
            quantity_boxes: item.quantity_boxes,
            rate_per_sqft: item.rate_per_sqft,
            mrp_per_box: item.mrp_per_box,
            amount: item.amount,
            margin_amount: item.margin_amount,
            margin_percentage: item.margin_percentage,
            sort_order: item.sort_order,
            sqft_needed: item.sqft_needed,
            box_needed: item.box_needed,
            discount_percentage: item.discount_percentage,
            price_per_sqft_override: item.price_per_sqft_override,
            price_per_box_override: item.price_per_box_override,
          };
          await supabase.from('quotation_room_items').insert(itemData);
        }
      }

      // Fetch the complete quotation data
      const { data: completeQuotation, error: fetchError } = await supabase
        .from('quotations')
        .select(`
          *,
          customer:customers(*),
          quotation_rooms(
            *,
            quotation_room_items(
              *,
              product:products(*)
            )
          )
        `)
        .eq('id', quotationId)
        .single();
      if (fetchError) throw fetchError;
      const transformedQuotation: Quotation = {
        ...completeQuotation,
        rooms: completeQuotation.quotation_rooms.map((room: any) => ({
          ...room,
          items: room.quotation_room_items
        }))
      };
      setSavedQuotation(transformedQuotation);
    } catch (error) {
      console.error('Error saving quotation:', error);
      alert('Failed to save quotation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    if (savedQuotation) {
      onFinish(savedQuotation);
    }
  };

  const handleShare = () => {
    if (savedQuotation) {
      // Use quotation_number instead of ID for the URL
      const shareUrl = `${window.location.origin}/quotations/shared/${savedQuotation.quotation_number}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert(`Shareable link copied to clipboard: ${shareUrl}`);
      }).catch(() => {
        alert(`Shareable link: ${shareUrl}`);
      });
    } else {
      alert('Link sharing will be available after the quotation is saved.');
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
      setPreviewType(exportType === 'both' ? 'link' : exportType as 'pdf' | 'link');
      setPreviewTemplate(
        exportType === 'link' || exportType === 'both' 
          ? quotationToUse.link_template || 'modern'
          : quotationToUse.pdf_template || 'standard'
      );
      setShowPreview(true);
    }
  };

  const handleEdit = () => {
    // Go back to edit mode by calling onFinish with current quotation
    if (savedQuotation) {
      // This will close the view mode and allow editing
      window.location.reload(); // Simple way to reset to edit mode
    }
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
                      {existingQuotation.rooms?.reduce((sum, room) => sum + room.items.length, 0) || 0}
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
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
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
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">
                    ₹{((existingQuotation.total_amount || 0) - (existingQuotation.total_margin_amount || 0)).toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">Cost Price</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-4 gap-4">
            <button
              onClick={handleEdit}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Edit className="w-5 h-5" />
              <span>Edit</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Share className="w-5 h-5" />
              <span>Share</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
            
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
              onClick={() => window.location.reload()}
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
  }

  // Rest of the component for create/edit mode (unchanged)
  if (!savedQuotation && !loading) {
    return (
      <>
        <div className="space-y-6">
          {/* Summary Before Save */}
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Create Quotation</h3>
            <p className="text-gray-600">Review your quotation details below and click "Create Quotation" to save.</p>
          </div>

          {/* Debug Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Debug Information</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>is_area_wise:</strong> {quotation.is_area_wise ? 'true' : 'false'}</p>
              <p><strong>export_type:</strong> {quotation.export_type}</p>
              <p><strong>rooms count:</strong> {quotation.rooms?.length || 0}</p>
              <p><strong>total_amount:</strong> ₹{quotation.total_amount?.toFixed(2) || '0.00'}</p>
            </div>
          </div>

          {/* Quotation Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quotation Preview</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Customer Information</h5>
                <p className="text-gray-600">Customer ID: {quotation.customer_id || 'Not selected'}</p>
                <p className="text-gray-600">Status: {quotation.status}</p>
                <p className="text-gray-600">Organization: {quotation.is_area_wise ? 'Area-wise' : 'General listing'}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Export Settings</h5>
                <p className="text-gray-600">Export Type: {quotation.export_type?.toUpperCase()}</p>
                <p className="text-gray-600">Include Images: {quotation.include_images ? 'Yes' : 'No'}</p>
                <p className="text-gray-600">Terms & Conditions: {quotation.terms_conditions ? 'Added' : 'None'}</p>
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
                      {quotation.rooms?.reduce((sum, room) => sum + room.items.length, 0) || 0}
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
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
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
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
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

  // Success state for newly created quotations
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
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
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
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">
                  ₹{((savedQuotation?.total_amount || 0) - (savedQuotation?.total_margin_amount || 0)).toFixed(2)}
                </div>
                <div className="text-sm text-green-600">Cost Price</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={handleShare}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Share className="w-5 h-5" />
            <span>Share</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
          
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
            onClick={() => window.location.reload()}
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