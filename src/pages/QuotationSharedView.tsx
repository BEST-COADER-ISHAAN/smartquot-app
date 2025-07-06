import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, AlertCircle } from 'lucide-react';
import { Quotation } from '../types';
import LinkModernTemplate from '../components/Quotations/templates/LinkModernTemplate';
import LinkMobileTemplate from '../components/Quotations/templates/LinkMobileTemplate';
import LinkPrintTemplate from '../components/Quotations/templates/LinkPrintTemplate';

const QuotationSharedView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadQuotation(id);
    }
  }, [id]);

  const loadQuotation = async (quotationNumber: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: quotationData, error: quotationError } = await supabase
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
        .eq('quotation_number', quotationNumber)
        .limit(1);

      if (quotationError) {
        throw quotationError;
      }

      // Check if no quotation was found
      if (!quotationData || quotationData.length === 0) {
        setError('Quotation not found');
        return;
      }

      const quotationRecord = quotationData[0];

      // Get customer data if customer_id exists
      let customerData = null;
      if (quotationRecord.customer_id) {
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .select('*')
          .eq('id', quotationRecord.customer_id)
          .single();

        if (customerError) {
          console.error('Error loading customer:', customerError);
        } else {
          customerData = customer;
        }
      }

      // Transform the data to match our types
      const transformedQuotation: Quotation = {
        ...quotationRecord,
        customer: customerData,
        rooms: quotationRecord.quotation_rooms.map((room: any) => ({
          ...room,
          items: room.quotation_room_items
        }))
      };

      setQuotation(transformedQuotation);
    } catch (error) {
      console.error('Error loading quotation:', error);
      setError('Failed to load quotation');
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    if (!quotation) return null;

    // Get the link template from the quotation, default to 'modern' if not specified
    const linkTemplate = quotation.link_template || 'modern';

    switch (linkTemplate) {
      case 'mobile':
        return <LinkMobileTemplate quotation={quotation} />;
      case 'print':
        return <LinkPrintTemplate quotation={quotation} />;
      case 'modern':
      default:
        return <LinkModernTemplate quotation={quotation} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Quotation</h2>
          <p className="text-gray-600">Please wait while we fetch your quotation...</p>
        </div>
      </div>
    );
  }

  if (error || !quotation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quotation Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'The quotation you\'re looking for doesn\'t exist or may have been removed.'}
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              <strong>Looking for quotation:</strong> {id}
            </p>
            <p className="text-yellow-800 text-sm mt-2">
              If you believe this is an error, please contact the person who shared this link with you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return renderTemplate();
};

export default QuotationSharedView;