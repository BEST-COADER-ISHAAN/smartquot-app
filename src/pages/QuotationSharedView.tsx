import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, AlertCircle } from 'lucide-react';
import { Quotation } from '../types';
import LinkModernTemplate from '../components/Quotations/templates/LinkModernTemplate';
import LinkMobileTemplate from '../components/Quotations/templates/LinkMobileTemplate';
import LinkPrintTemplate from '../components/Quotations/templates/LinkPrintTemplate';
import { supabase } from '../lib/supabase';

const QuotationSharedView: React.FC = () => {
  const { company_slug, quotation_number } = useParams<{ company_slug: string; quotation_number: string }>();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (company_slug && quotation_number) {
      loadQuotation(company_slug, quotation_number);
    }
  }, [company_slug, quotation_number]);

  const loadQuotation = async (companySlug: string, quotationNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      // Find the user_id for the given company_slug
      const { data: userSettings, error: userError } = await supabase
        .from('user_settings')
        .select('user_id')
        .eq('company_slug', companySlug)
        .maybeSingle();
      if (userError || !userSettings) {
        setError('Company not found');
        setLoading(false);
        return;
      }
      const userId = userSettings.user_id;
      // Find the quotation for this user and quotation_number
      const { data: quotationData, error: quotationError } = await supabase
        .from('quotations')
        .select(`*, quotation_rooms(*, quotation_room_items(*, product:products(*)))`)
        .eq('user_id', userId)
        .eq('quotation_number', quotationNumber)
        .limit(1);
      if (quotationError) {
        setError('Failed to load quotation');
        setLoading(false);
        return;
      }
      if (!quotationData || quotationData.length === 0) {
        setError('Quotation not found');
        setLoading(false);
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
        if (!customerError) {
          customerData = customer;
        }
      }
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
              <strong>Looking for quotation:</strong> {quotation_number}
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