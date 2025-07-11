import React, { useRef, useEffect, useState } from 'react';
import { Quotation } from '../../../types';
import { formatSizeForDisplay } from '../../../lib/sizeUtils';
import { getQuotationCompanyDetailsAsync } from '../../../lib/companyUtils';
import OnlineQuotationComponent from '@/components/ui/OnlineQuotationComponent';
import { Building, User, Calendar, Image as ImageIcon, FileText, Layers, Package, Printer, Share2, ChevronDown, ChevronUp, IndianRupee, Phone, Mail, MapPin } from 'lucide-react';
import { usePreferredSizeUnit } from '../../../hooks/usePreferredSizeUnit';

interface LinkModernTemplateProps {
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
          total: item.amount || 0,
          margin: item.margin_amount || 0,
          marginPercentage: item.margin_percentage || 0,
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


const fontStack = 'font-sans antialiased';

const LinkModernTemplate: React.FC<LinkModernTemplateProps> = ({ quotation }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [formattedSizes, setFormattedSizes] = useState<{ [size: string]: string }>({});
  const { preferredSizeUnit } = usePreferredSizeUnit();

  useEffect(() => {
    setLoading(true);
    setError(null);
    mapQuotationToQuotationData(quotation, preferredSizeUnit)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load company details.');
        setLoading(false);
      });
  }, [quotation, preferredSizeUnit]);

  useEffect(() => {
    if (!data) return;
    async function fetchFormattedSizes() {
      const newFormatted: { [size: string]: string } = {};
      for (const item of data.items) {
        if (item.product?.size) {
          newFormatted[item.product.size] = await formatSizeForDisplay(item.product.size, preferredSizeUnit);
        }
      }
      setFormattedSizes(newFormatted);
    }
    fetchFormattedSizes();
  }, [data, preferredSizeUnit]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading company details...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!data) return <div className="p-8 text-center text-red-600">No company details found.</div>;

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Quotation ${data.quotationNumber}`,
        text: `View quotation ${data.quotationNumber}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Column visibility logic
  const visibleColumns = [
    { key: 'description', label: 'Name', always: true },
    { key: 'size', label: 'Size', visible: true },
    { key: 'surface', label: 'Surface', visible: true },
    { key: 'actualSqftPerBox', label: 'SQFT/Box', visible: data.showSqftInBox },
    { key: 'sqftNeeded', label: 'SQFT Needed', visible: data.showSqftNeeded },
    { key: 'boxNeeded', label: 'Box Needed', visible: data.showBoxNeeded },
    { key: 'quantity', label: 'Qty', visible: true },
    { key: 'unitPrice', label: 'Unit Price', visible: data.showPricePerSqft },
    { key: 'pricePerBox', label: 'Price/Box', visible: data.showPricePerBox },
    { key: 'total', label: 'Total', visible: data.showAmount },
    { key: 'margin', label: 'Margin', visible: data.showMargin },
  ];

  // Hero section animation
  // ...

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f8fafc] to-[#f0abfc] ${fontStack} relative border-none mb-0`} style={{minHeight: '100vh'}}>
      {/* Header */}
      <div className="w-[90%] mx-auto rounded-3xl shadow-2xl bg-white/60 backdrop-blur-md border border-white/40 p-8 mb-8" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-400 rounded-2xl p-4 shadow-lg">
              <span className="text-4xl font-extrabold text-white drop-shadow">Q</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-1">Quotation</h1>
              <div className="text-lg text-purple-700 font-semibold">{data.quotationNumber}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 font-bold">
            {/* <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold shadow ${data.status === 'approved' ? 'bg-green-200 text-green-800' : data.status === 'sent' ? 'bg-blue-200 text-blue-800' : data.status === 'rejected' ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'}`}>{data.status.charAt(0).toUpperCase() + data.status.slice(1)}</span> */}
            <span className="text-xs text-gray-500">Date: {data.date}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Company Info */}
          <div className="flex-1 space-y-6">
            <div className="rounded-2xl bg-white/80 p-6 shadow-md border border-white/60">
              <div className="flex items-center gap-4 mb-2">
                <Building className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-lg text-blue-700">From:</span>
                <span className="text-gray-700 font-medium">{data.companyName}</span>
              </div>
              {data.companyAddress && <div className="text-sm text-gray-600 whitespace-pre-line">{data.companyAddress}</div>}
              <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                {data.companyPhone && <span>📞 {data.companyPhone}</span>}
                {data.companyEmail && <span>✉️ {data.companyEmail}</span>}
                {quotation.customer?.gst_number && <span>GST: {quotation.customer.gst_number}</span>}
                {quotation.customer?.notes && <span>📝 {quotation.customer.notes}</span>}
              </div>
            </div>
            {/* Client Info */}
            <div className="rounded-2xl bg-white/80 p-6 shadow-md border border-white/60">
              <div className="flex items-center gap-4 mb-2">
                <User className="w-6 h-6 text-purple-500" />
                <span className="font-bold text-lg text-purple-700">To:</span>
                <span className="text-gray-700 font-medium">{data.clientName}</span>
              </div>
              {data.clientAddress && <div className="text-sm text-gray-600 whitespace-pre-line">{data.clientAddress}</div>}
              <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                {quotation.customer?.email && <span>✉️ {quotation.customer.email}</span>}
                {quotation.customer?.phone && <span>📞 {quotation.customer.phone}</span>}
                {quotation.customer?.gst_number && <span>GST: {quotation.customer.gst_number}</span>}
                {quotation.customer?.notes && <span>📝 {quotation.customer.notes}</span>}
              </div>
            </div>
          </div>
          {/* Summary */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="rounded-2xl bg-white/80 p-6 shadow-md border border-white/60 flex flex-col items-center">
              <span className="font-bold text-lg text-blue-700 mb-2">Total Amount</span>
              <span className="text-3xl font-extrabold text-purple-700 mb-1">₹{data.totalAmount.toLocaleString()}</span>
              {/* <span className="text-xs text-gray-500">(Incl.)</span> */}
            </div>
          </div>
        </div>
      </div>
      {/* Items Section */}
      <div className="w-[90%] mx-auto mb-8">
        {data.isAreaWise && data.rooms && data.rooms.length > 0 ? (
          data.rooms.map((room: any, idx: number) => (
            <div key={idx} className="mb-8">
              <div className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-blue-400" />{room.room_name}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {room.items.map((item: any, i: number) => (
                  <div key={item.id || i} className="rounded-xl bg-white/80 p-4 shadow-md border border-white/60 flex flex-col items-center">
                    {data.includeImages && item.imageUrl && (
                      <img src={item.imageUrl} alt={item.description} className="h-24 w-24 object-contain rounded shadow mb-3 bg-gray-50" />
                    )}
                    <div className="font-bold text-lg text-gray-800 mb-1 flex items-center gap-2"><Package className="w-5 h-5 text-purple-400" />{item.description}</div>
                    <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex gap-3 text-sm text-gray-600 mb-2">
                        <span>Size: <b>{item.size ? formattedSizes[item.size] || item.size : ''}</b></span>
                        <span>Surface: <b>{item.surface}</b></span>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-600 mb-2">
                        <span>Qty: <b>{item.quantity}</b></span>
                        {data.showBoxNeeded && <span>Box Needed: <b>{item.boxNeeded}</b></span>}
                        {data.showSqftInBox && <span>SQFT/Box: <b>{data.sqftInBoxType === 'actual' ? item.actualSqftPerBox : item.billedSqftPerBox}</b></span>}
                        {data.showSqftNeeded && <span>SQFT Needed: <b>{item.sqftNeeded}</b></span>}
                      </div>
                      {data.showPricePerSqft && (
                        <div className="flex justify-between text-xs"><span>Unit Price:</span><span>₹{item.unitPrice.toFixed(2)}</span></div>
                      )}
                      {data.showPricePerBox && (
                        <div className="flex justify-between text-xs"><span>Price/Box:</span><span>₹{item.pricePerBox.toFixed(2)}</span></div>
                      )}
                      {data.showAmount && (
                        <div className="flex justify-between text-xs font-bold"><span>Total:</span><span>₹{item.total.toFixed(2)}</span></div>
                      )}
                      {data.showMargin && (
                        <div className="flex justify-between text-xs"><span>Margin:</span><span>₹{item.margin.toFixed(2)} ({item.marginPercentage.toFixed(1)}%)</span></div>
                      )}
                    </div>
                    {item.discount > 0 && <div className="mt-2 text-xs text-green-600">Discount: {item.discount}%</div>}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {data.items.map((item: any, i: number) => (
              <div key={item.id || i} className="rounded-xl bg-white/80 p-4 shadow-md border border-white/60 flex flex-col items-center">
                {data.includeImages && item.imageUrl && (
                  <img src={item.imageUrl} alt={item.description} className="h-24 w-24 object-contain rounded shadow mb-3 bg-gray-50" />
                )}
                <div className="font-bold text-lg text-gray-800 mb-1 flex items-center gap-2"><Package className="w-5 h-5 text-purple-400" />{item.description}</div>
                <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex gap-3 text-sm text-gray-600 mb-2">
                    <span>Size: <b>{item.size ? formattedSizes[item.size] || item.size : ''}</b></span>
                    <span>Surface: <b>{item.surface}</b></span>
                  </div>
                  <div className="flex gap-3 text-sm text-gray-600 mb-2">
                    <span>Qty: <b>{item.quantity}</b></span>
                    {data.showBoxNeeded && <span>Box Needed: <b>{item.boxNeeded}</b></span>}
                    {data.showSqftInBox && <span>SQFT/Box: <b>{data.sqftInBoxType === 'actual' ? item.actualSqftPerBox : item.billedSqftPerBox}</b></span>}
                    {data.showSqftNeeded && <span>SQFT Needed: <b>{item.sqftNeeded}</b></span>}
                  </div>
                  {data.showPricePerSqft && (
                    <div className="flex justify-between text-xs"><span>Unit Price:</span><span>₹{item.unitPrice.toFixed(2)}</span></div>
                  )}
                  {data.showPricePerBox && (
                    <div className="flex justify-between text-xs"><span>Price/Box:</span><span>₹{item.pricePerBox.toFixed(2)}</span></div>
                  )}
                  {data.showAmount && (
                    <div className="flex justify-between text-xs font-bold"><span>Total:</span><span>₹{item.total.toFixed(2)}</span></div>
                  )}
                  {data.showMargin && (
                    <div className="flex justify-between text-xs"><span>Margin:</span><span>₹{item.margin.toFixed(2)} ({item.marginPercentage.toFixed(1)}%)</span></div>
                  )}
                </div>
                {item.discount > 0 && <div className="mt-2 text-xs text-green-600">Discount: {item.discount}%</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Product Images Attachments */}
      {data.includeImages && data.items.filter((item: any) => item.imageUrl).length > 0 && (
        <div className="w-[90%] mx-auto mb-8">
          <div className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-purple-400" />Product Images</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.items.filter((item: any) => item.imageUrl).map((item: any, idx: number) => (
              <div key={item.id || idx} className="flex flex-col items-center border rounded-2xl p-4 bg-white/80 shadow-md border-white/60">
                <img
                  src={item.imageUrl}
                  alt={item.description}
                  className="h-24 w-24 object-contain rounded shadow mb-2 bg-gray-50"
                  style={{ maxWidth: 96, maxHeight: 96 }}
                />
                <div className="text-xs font-medium text-center truncate w-full" title={item.description}>{item.description}</div>
                <div className="text-xs text-muted-foreground text-center">{item.size ? formattedSizes[item.size] || item.size : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Notes & Terms */}
      <div className="w-[90%] mx-auto mb-8">
        <div className="rounded-2xl bg-white/80 p-6 shadow-md border border-white/60">
          <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold"><FileText className="w-5 h-5 text-purple-400" />Terms & Conditions</div>
          <div className="text-sm text-gray-700 whitespace-pre-line">{data.terms || <span className="italic text-gray-400">No terms provided.</span>}</div>
        </div>
      </div>
    </div>
  );
};

export default LinkModernTemplate;