import React, { useEffect, useState } from 'react';
import { Quotation } from '../../../types';
import { formatSizeForDisplay } from '../../../lib/sizeUtils';
import { getCompanyDetailsFromQuotationAsync } from '../../../lib/companyUtils';
import { usePreferredSizeUnit } from '../../../hooks/usePreferredSizeUnit';

interface PdfStandardTemplateProps {
  quotation: Quotation;
  companyProfile: any;
  formattedSizeMap?: Record<string, string>;
  preferredSizeUnit?: string;
}

const PdfStandardTemplate: React.FC<PdfStandardTemplateProps> = ({ quotation, companyProfile, formattedSizeMap = {}, preferredSizeUnit = 'mm' }) => {
  if (!companyProfile) return <div className="p-8 text-center text-red-600">No company profile found. Please update your profile settings.</div>;

  // Get column visibility settings
  const showSqftInBox = quotation.show_sqft_in_box !== false;
  const showSqftNeeded = quotation.show_sqft_needed !== false;
  const showBoxNeeded = quotation.show_box_needed !== false;
  const showPricePerSqft = quotation.show_price_per_sqft !== false;
  const showPricePerBox = quotation.show_price_per_box !== false;
  const showAmount = quotation.show_amount !== false;
  const showMargin = quotation.show_margin !== false;

  // Calculate totals
  const totalAmount = quotation.total_amount || 0;
  const roundOff = Math.round(totalAmount) - totalAmount;
  const finalAmount = Math.round(totalAmount);

  // Ensure we have rooms data
  const rooms = quotation.rooms || [];
  const hasItems = rooms.some(room => room.items && room.items.length > 0);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString || Date.now());
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Remove the async size formatting useEffect and useState
  // const [formattedSizes, setFormattedSizes] = useState<{ [size: string]: string }>({});
  // useEffect(() => { ... }, [rooms]);
  // const { preferredSizeUnit } = usePreferredSizeUnit();

  return (
    <div className="min-h-screen bg-white p-8" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-gray-300 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">QUOTATION</h1>
              <div className="text-gray-600 space-y-1">
                <p><strong>Quotation No:</strong> {quotation.quotation_number}</p>
                <p><strong>Date:</strong> {formatDate(quotation.created_at)}</p>
                <p><strong>Status:</strong> {quotation.status || 'Draft'}</p>
              </div>
            </div>
            {companyProfile.logo && (
              <div className="flex-shrink-0">
                <img 
                  src={companyProfile.logo} 
                  alt="Company Logo" 
                  className="h-20 w-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Company and Customer Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="border border-gray-300 p-6 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">FROM</h2>
            <div className="space-y-2 text-gray-700">
              {companyProfile.companyName && <p className="font-semibold">{companyProfile.companyName}</p>}
              {companyProfile.companyAddress && <p>{companyProfile.companyAddress}</p>}
              {companyProfile.companyPhone && <p>Phone: {companyProfile.companyPhone}</p>}
              {companyProfile.companyEmail && <p>Email: {companyProfile.companyEmail}</p>}
              {companyProfile.gstNo && <p>GST: {companyProfile.gstNo}</p>}
            </div>
          </div>
          <div className="border border-gray-300 p-6 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">TO</h2>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">{quotation.customer?.name || 'Customer Name'}</p>
              {quotation.customer?.site_address && <p>{quotation.customer.site_address}</p>}
              {quotation.customer?.phone && <p>Phone: {quotation.customer.phone}</p>}
              {quotation.customer?.email && <p>Email: {quotation.customer.email}</p>}
              {quotation.customer?.gst_number && <p>GST: {quotation.customer.gst_number}</p>}
            </div>
          </div>
        </div>

        {/* Product Tables */}
        {hasItems ? (
          <div className="mb-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-[14px]">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border border-gray-300 p-0.5 text-left text-[11px]">#</th>
                    <th className="border border-gray-300 p-0.5 text-left text-[11px] w-20">Item Description</th>
                    <th className="border border-gray-300 p-0.5 text-center text-[13px] w-24">Size</th>
                    <th className="border border-gray-300 p-0.5 text-center text-[11px]">Surface</th>
                    {showSqftInBox && <th className="border border-gray-300 p-0.5 text-center text-[11px]">Sq.Ft in Box</th>}
                    {showSqftNeeded && <th className="border border-gray-300 p-0.5 text-center text-[11px]">Sq.Ft Needed</th>}
                    {showBoxNeeded && <th className="border border-gray-300 p-0.5 text-center text-[11px]">Quantity</th>}
                    {showPricePerSqft && <th className="border border-gray-300 p-0.5 text-center text-[11px]">Price/Sq.Ft</th>}
                    {showPricePerBox && <th className="border border-gray-300 p-0.5 text-center text-[11px]">Price/Box</th>}
                    {showAmount && <th className="border border-gray-300 p-0.5 text-center text-[11px]">Amount</th>}
                    {showMargin && <th className="border border-gray-300 p-0.5 text-center text-[11px]">Margin</th>}
                  </tr>
                </thead>
                <tbody>
                  {rooms.flatMap((room, roomIndex) => 
                    room.items?.map((item, index) => (
                      <tr key={item.id || `${roomIndex}-${index}`} className={`${(roomIndex * (room.items?.length || 0) + index) % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="border border-gray-300 p-0.5 text-center text-[15px]">{(roomIndex * (room.items?.length || 0) + index + 1)}</td>
                        <td className="border border-gray-300 p-0.5 font-medium text-[15px]">{item.product?.name || item.name || 'Product Name'}</td>
                        <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item.product?.size ? formattedSizeMap[item.product.size] || item.product.size : ''}</td>
                        <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item.product?.surface || ''}</td>
                        {showSqftInBox && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item.product?.[quotation.sqft_in_box_type === 'actual' ? 'actual_sqft_per_box' : 'billed_sqft_per_box'] || ''}</td>}
                        {showSqftNeeded && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item.sqft_needed || 0}</td>}
                        {showBoxNeeded && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item.quantity || 0}</td>}
                        {showPricePerSqft && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item.price_per_sqft || 0}</td>}
                        {showPricePerBox && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item.price_per_box || 0}</td>}
                        {showAmount && <td className="border border-gray-300 p-0.5 text-center font-semibold text-[15px]">₹{item.total_price || 0}</td>}
                        {showMargin && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item.margin_amount || 0}</td>}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 border border-gray-200 rounded">
            <p className="text-gray-600">No items found in this quotation.</p>
          </div>
        )}

        {/* Total Section */}
        <div className="flex justify-end mb-8">
          <table className="text-right border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-3 font-semibold text-gray-700">Subtotal:</td>
                <td className="p-3">₹{totalAmount.toFixed(2)}</td>
              </tr>
              {Number(quotation.local_freight || 0) > 0 && (
                <tr className="border-b border-gray-300">
                  <td className="p-3 font-semibold text-gray-700">Local Freight:</td>
                  <td className="p-3">₹{Number(quotation.local_freight || 0).toFixed(2)}</td>
                </tr>
              )}
              {Number(quotation.unloading || 0) > 0 && (
                <tr className="border-b border-gray-300">
                  <td className="p-3 font-semibold text-gray-700">Unloading:</td>
                  <td className="p-3">₹{Number(quotation.unloading || 0).toFixed(2)}</td>
                </tr>
              )}
              <tr className="border-b border-gray-300">
                <td className="p-3 font-semibold text-gray-700 text-sm">Round Off:</td>
                <td className="p-3 text-sm">₹{roundOff.toFixed(2)}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-3 font-bold text-xl text-gray-800">TOTAL:</td>
                <td className="p-3 font-bold text-xl text-gray-800">₹{finalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms and Conditions */}
        {quotation.terms_conditions && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">TERMS & CONDITIONS</h3>
            <div className="bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700 leading-relaxed">
              {quotation.terms_conditions.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                  return (
                    <p key={index} className="mb-2">
                      <span className="font-bold">{trimmedLine.match(/^(\d+)\./)?.[1] || ''}.</span> {trimmedLine.replace(/^\d+\.\s*/, '')}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t-2 border-gray-300 pt-6 text-center text-gray-600 text-sm">
          <p>Thank you for your business!</p>
          <p className="mt-1">For any queries, please contact us at {companyProfile.companyEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default PdfStandardTemplate; 