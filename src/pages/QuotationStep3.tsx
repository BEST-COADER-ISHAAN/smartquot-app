import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { Quotation } from '../types';
import { useAuth } from '../hooks/useAuth';
import QuotationStep3 from '../components/Quotations/QuotationStep3';
import { supabase } from '../lib/supabase';

const QuotationStep3Page: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    if (id) {
      loadQuotation(id);
    }
  }, [id]);

  const loadQuotation = async (quotationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const quotedId = quotationId.startsWith('#') ? quotationId : `#${quotationId}`;
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
        .or(`id.eq.${quotationId},quotation_number.eq.${quotedId}`)
        .single();

      if (quotationError) throw quotationError;
      if (!quotationData) {
        setError('Quotation not found');
        return;
      }

      let customerData = null;
      if (quotationData.customer_id) {
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .select('*')
          .eq('id', quotationData.customer_id)
          .single();
        if (!customerError) customerData = customer;
      }

      const transformedQuotation: Quotation = {
        ...quotationData,
        customer: customerData,
        rooms: (quotationData.quotation_rooms || []).map((room: any) => ({
          ...room,
          items: (room.quotation_room_items || []).map((item: any) => ({
            ...item,
            name: item.name || item.product_name,
          })),
        })),
      };
      setQuotation(transformedQuotation);
    } catch (error) {
      setError('Failed to load quotation');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    navigate('/quotations');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-3 text-gray-600">Loading quotation...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <button
            onClick={() => navigate('/quotations')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Quotations</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Quotation Not Found</h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!quotation) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <button
          onClick={() => navigate('/quotations')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quotations</span>
        </button>
      </div>
      <QuotationStep3
        quotation={quotation}
        onFinish={handleFinish}
        isViewMode={true}
        existingQuotation={quotation}
      />
    </div>
  );
};

export default QuotationStep3Page; 