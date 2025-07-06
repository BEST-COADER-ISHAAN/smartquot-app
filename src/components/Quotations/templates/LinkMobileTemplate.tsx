import React from 'react';
import { Quotation } from '../../../types';
import OnlineQuotationComponent from '@/components/ui/OnlineQuotationComponent';

interface LinkMobileTemplateProps {
  quotation: Quotation;
}

function mapQuotationToQuotationData(quotation: Quotation) {
  // Fetch company info from localStorage
  const companyName = localStorage.getItem('company_name') || 'Your Company Name';
  const companyAddress = localStorage.getItem('company_address') || 'Your Company Address';
  const companyPhone = localStorage.getItem('company_phone') || '+91-0000000000';
  const companyEmail = localStorage.getItem('company_email') || 'info@yourcompany.com';
  const includeImages = !!quotation.include_images;
  let rooms: any[] = [];
  let items: any[] = [];
  let imageUrls: string[] = [];
  if (quotation.rooms) {
    rooms = quotation.rooms.map((room: any) => ({
      room_name: room.room_name,
      items: (room.items || []).map((item: any) => {
        if (includeImages && item.product?.image_url) imageUrls.push(item.product.image_url);
        return {
          id: item.id || 'N/A',
          description: item.product?.name || 'Product',
          size: item.product?.size || '',
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
        };
      }),
      room_total: room.room_total || 0,
    }));
    items = (rooms ?? []).flatMap((r: any) => r.items);
  } else {
    items = ((quotation.rooms as any[] ?? [])).flatMap((room: any) =>
      (room.items || []).map((item: any) => {
        if (includeImages && item.product?.image_url) imageUrls.push(item.product.image_url);
        return {
          id: item.id || 'N/A',
          description: item.product?.name || 'Product',
          size: item.product?.size || '',
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
        };
      })
    );
  }
  return {
    id: quotation.id || 'N/A',
    quotationNumber: quotation.quotation_number || 'N/A',
    date: quotation.created_at?.split('T')[0] || '2024-01-01',
    validUntil: quotation.updated_at?.split('T')[0] || '2024-12-31',
    status: (quotation.status as 'draft' | 'sent' | 'approved' | 'rejected') || 'draft',
    companyLogo: '',
    companyName,
    companyAddress,
    companyPhone,
    companyEmail,
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
    imageUrls,
  };
}

const LinkMobileTemplate: React.FC<LinkMobileTemplateProps> = ({ quotation }) => {
  const quotationData = mapQuotationToQuotationData(quotation);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return <div className={`min-h-screen transition-colors duration-300`}>
    <OnlineQuotationComponent quotationData={quotationData} />
  </div>;
};

export default LinkMobileTemplate;