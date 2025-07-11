import React, { useEffect, useState } from 'react';
import { Quotation } from '../../../types';
import { formatSizeForDisplay } from '../../../lib/sizeUtils';
import { getQuotationCompanyDetailsAsync } from '../../../lib/companyUtils';
import OnlineQuotationComponent from '@/components/ui/OnlineQuotationComponent';
import { Building, User, Package, IndianRupee, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { usePreferredSizeUnit } from '../../../hooks/usePreferredSizeUnit';

interface LinkMobileTemplateProps {
  quotation: Quotation;
}

async function mapQuotationToQuotationData(quotation: Quotation, preferredSizeUnit: 'inches' | 'mm' | 'feet' | 'custom') {
  // Get current company details with preferences
  const companyDetails = await getQuotationCompanyDetailsAsync();
  const includeImages = !!quotation.include_images;
  let rooms: any[] = [];
  let items: any[] = [];
  if (quotation.rooms) {
    rooms = await Promise.all(quotation.rooms.map(async (room: any) => ({
      room_name: room.room_name,
      items: await Promise.all((room.items || []).map(async (item: any) => ({
        id: item.id || 'N/A',
        description: item.product?.name || 'Product',
        size: item.product?.size ? await formatSizeForDisplay(item.product.size, preferredSizeUnit) : '',
        surface: item.product?.surface || '',
        actualSqftPerBox: item.product?.actual_sqft_per_box || 0,
        billedSqftPerBox: item.product?.billed_sqft_per_box || 0,
        sqftNeeded: item.sqft_needed || 0,
        boxNeeded: item.box_needed || 0,
        quantity: item.quantity_boxes || 1,
        unitPrice: item.rate_per_sqft || 0,
        pricePerBox: item.mrp_per_box || 0,
        total: item.amount || 0,
        margin: item.margin_amount || 0,
        marginPercentage: item.margin_percentage || 0,
        imageUrl: item.product?.image_url || '',
      }))),
      room_total: room.room_total || 0,
    })));
    items = (rooms ?? []).flatMap((r: any) => r.items);
  } else {
    const itemPromises: Promise<any>[] = [];
    for (const room of (quotation.rooms as any[] ?? [])) {
      for (const item of (room.items || [])) {
        itemPromises.push((async () => ({
          id: item.id || 'N/A',
          description: item.product?.name || 'Product',
          size: item.product?.size ? await formatSizeForDisplay(item.product.size, preferredSizeUnit) : '',
          surface: item.product?.surface || '',
          actualSqftPerBox: item.product?.actual_sqft_per_box || 0,
          billedSqftPerBox: item.product?.billed_sqft_per_box || 0,
          sqftNeeded: item.sqft_needed || 0,
          boxNeeded: item.box_needed || 0,
          quantity: item.quantity_boxes || 1,
          unitPrice: item.rate_per_sqft || 0,
          pricePerBox: item.mrp_per_box || 0,
          discount: item.discount_percentage || 0,
          total: item.amount || 0,
          margin: item.margin_amount || 0,
          marginPercentage: item.margin_percentage || 0,
          category: item.product?.collection || 'Other',
          imageUrl: item.product?.image_url || '',
        }))());
      }
    }
    items = await Promise.all(itemPromises);
  }
  return {
    id: quotation.id || 'N/A',
    quotationNumber: quotation.quotation_number || 'N/A',
    date: quotation.created_at?.split('T')[0] || '2024-01-01',
    validUntil: quotation.updated_at?.split('T')[0] || '2024-12-31',
    status: (quotation.status as 'draft' | 'sent' | 'approved' | 'rejected') || 'draft',
    companyLogo: companyDetails.logo || '',
    companyName: companyDetails.companyName || 'Your Company Name',
    companyAddress: companyDetails.companyAddress || 'Your Company Address',
    companyPhone: companyDetails.companyPhone || '+91-0000000000',
    companyEmail: companyDetails.companyEmail || 'info@yourcompany.com',
    clientName: quotation.customer?.name || 'Client Name',
    clientCompany: '',
    clientAddress: quotation.customer?.site_address || 'Client Address',
    clientPhone: quotation.customer?.phone || '+91-0000000000',
    clientEmail: quotation.customer?.email || 'client@email.com',
    items,
    rooms,
    isAreaWise: !!quotation.is_area_wise,
    notes: quotation.notes || '',
    terms: quotation.terms_conditions || '',
    subtotal: quotation.total_amount || 0,
    taxRate: 0,
    taxAmount: 0,
    totalAmount: quotation.total_amount || 0,
    attachments: [],
    sqftInBoxType: quotation.sqft_in_box_type || 'billed',
    showSqftInBox: !!quotation.show_sqft_in_box,
    showSqftNeeded: !!quotation.show_sqft_needed,
    showBoxNeeded: !!quotation.show_box_needed,
    showPricePerSqft: !!quotation.show_price_per_sqft,
    showPricePerBox: !!quotation.show_price_per_box,
    showAmount: !!quotation.show_amount,
    showMargin: !!quotation.show_margin,
    includeImages,
  };
}

const LinkMobileTemplate: React.FC<LinkMobileTemplateProps> = ({ quotation }) => {
  const [quotationData, setQuotationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { preferredSizeUnit } = usePreferredSizeUnit();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    mapQuotationToQuotationData(quotation, preferredSizeUnit)
      .then((result) => {
        setQuotationData(result);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load company details.');
        setLoading(false);
      });
  }, [quotation, preferredSizeUnit]);

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading company details...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!quotationData) return <div className="p-8 text-center text-red-600">No company details found.</div>;

  return <div className={`min-h-screen transition-colors duration-300`}>
    <OnlineQuotationComponent quotationData={quotationData} />
  </div>;
};

export default LinkMobileTemplate;