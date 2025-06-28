import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { Quotation } from '../types';
import { supabase } from '../lib/supabase';
import QuotationWizard from '../components/Quotations/QuotationWizard';

const QuotationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadQuotation(id);
    }
  }, [id]);

  const loadQuotation = async (quotationId: string) => {
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
        .eq('id', quotationId)
        .single();

      if (quotationError) throw quotationError;

      if (!quotationData) {
        setError('Quotation not found');
        return;
      }

      // Get customer data if customer_id exists
      let customerData = null;
      if (quotationData.customer_id) {
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .select('*')
          .eq('id', quotationData.customer_id)
          .single();

        if (customerError) {
          console.error('Error loading customer:', customerError);
        } else {
          customerData = customer;
        }
      }

      // Transform the data to match our types
      const transformedQuotation: Quotation = {
        ...quotationData,
        customer: customerData,
        rooms: quotationData.quotation_rooms.map((room: any) => ({
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

  const handleSave = (updatedQuotation: Quotation) => {
    navigate('/quotations');
  };

  const handleCancel = () => {
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
      </div>
    );
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
      
      <QuotationWizard
        quotation={quotation}
        onSave={handleSave}
        onCancel={handleCancel}
        viewMode="view"
      />
    </div>
  );
};

export default QuotationDetail;