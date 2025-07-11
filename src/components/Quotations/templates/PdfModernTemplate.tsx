import React, { useEffect, useState } from 'react';
import { Quotation } from '../../../types';
import { formatSizeForDisplay } from '../../../lib/sizeUtils';
import { getCompanyDetailsFromQuotationAsync } from '../../../lib/companyUtils';
import { usePreferredSizeUnit } from '../../../hooks/usePreferredSizeUnit';

interface PdfModernTemplateProps {
  quotation: Quotation;
  companyProfile: any;
  formattedSizeMap?: Record<string, string>;
  preferredSizeUnit?: string;
}

const PdfModernTemplate: React.FC<PdfModernTemplateProps> = ({ quotation, companyProfile, formattedSizeMap = {}, preferredSizeUnit = 'mm' }) => {
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
  // const { preferredSizeUnit } = usePreferredSizeUnit();
  // const [formattedSizes, setFormattedSizes] = useState<{ [size: string]: string }>({});
  // useEffect(() => { ... }, [rooms, preferredSizeUnit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-2xl p-8 mb-8 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold mb-4">QUOTATION</h1>
              <div className="space-y-2 text-blue-100">
                <p className="text-lg"><strong>Quotation No:</strong> {quotation.quotation_number}</p>
                <p><strong>Date:</strong> {formatDate(quotation.created_at)}</p>
                <p><strong>Status:</strong> {quotation.status || 'Draft'}</p>
              </div>
            </div>
            {companyProfile.logo && (
              <div className="flex-shrink-0 bg-white p-4 rounded-lg">
                <img 
                  src={companyProfile.logo} 
                  alt="Company Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Company and Customer Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              FROM
            </h2>
            <div className="space-y-3 text-gray-700">
              {companyProfile.companyName && <p className="font-semibold text-lg">{companyProfile.companyName}</p>}
              {companyProfile.companyAddress && <p className="text-gray-600">{companyProfile.companyAddress}</p>}
              {companyProfile.companyPhone && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {companyProfile.companyPhone}
                </p>
              )}
              {companyProfile.companyEmail && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {companyProfile.companyEmail}
                </p>
              )}
              {companyProfile.gstNo && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  GST: {companyProfile.gstNo}
                </p>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              TO
            </h2>
            <div className="space-y-3 text-gray-700">
              <p className="font-semibold text-lg">{quotation.customer?.name || 'Customer Name'}</p>
              {quotation.customer?.site_address && (
                <p className="text-gray-600">{quotation.customer.site_address}</p>
              )}
              {quotation.customer?.phone && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {quotation.customer.phone}
                </p>
              )}
              {quotation.customer?.email && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {quotation.customer.email}
                </p>
              )}
              {quotation.customer?.gst_number && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  GST: {quotation.customer.gst_number}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Product Tables */}
        {hasItems ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <tr>
                    <th className="p-0.5 text-left font-semibold text-[11px]">#</th>
                    <th className="p-0.5 text-left font-semibold text-[11px] w-20">Item Description</th>
                    <th className="p-0.5 text-center font-semibold text-[13px] w-24">Size</th>
                    <th className="p-0.5 text-center font-semibold text-[11px]">Surface</th>
                    {showSqftInBox && <th className="p-0.5 text-center font-semibold text-[11px]">Sq.Ft in Box</th>}
                    {showSqftNeeded && <th className="p-0.5 text-center font-semibold text-[11px]">Sq.Ft Needed</th>}
                    {showBoxNeeded && <th className="p-0.5 text-center font-semibold text-[11px]">Quantity</th>}
                    {showPricePerSqft && <th className="p-0.5 text-center font-semibold text-[11px]">Price/Sq.Ft</th>}
                    {showPricePerBox && <th className="p-0.5 text-center font-semibold text-[11px]">Price/Box</th>}
                    {showAmount && <th className="p-0.5 text-center font-semibold text-[11px]">Amount</th>}
                    {showMargin && <th className="p-0.5 text-center font-semibold text-[11px]">Margin</th>}
                  </tr>
                </thead>
                <tbody>
                  {rooms.flatMap((room, roomIndex) => 
                    room.items?.map((item, index) => (
                      <tr key={item.id || `${roomIndex}-${index}`} className={`${(roomIndex * (room.items?.length || 0) + index) % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="p-0.5 font-medium text-gray-700 text-center text-[15px]">{(roomIndex * (room.items?.length || 0) + index + 1)}</td>
                        <td className="p-0.5 font-semibold text-gray-800 text-[15px]">{item.product?.name || item.name || 'Product Name'}</td>
                        <td className="p-0.5 text-gray-600 text-center text-[15px]">{item.product?.size ? formattedSizeMap[item.product.size] || item.product.size : ''}</td>
                        <td className="p-0.5 text-gray-600 text-center text-[15px]">{item.product?.surface || ''}</td>
                        {showSqftInBox && <td className="p-0.5 text-center text-gray-700 text-[15px]">{item.product?.[quotation.sqft_in_box_type === 'actual' ? 'actual_sqft_per_box' : 'billed_sqft_per_box'] || ''}</td>}
                        {showSqftNeeded && <td className="p-0.5 text-center text-gray-700 text-[15px]">{item.sqft_needed || 0}</td>}
                        {showBoxNeeded && <td className="p-0.5 text-center text-gray-700 text-[15px]">{item.quantity || 0}</td>}
                        {showPricePerSqft && <td className="p-0.5 text-center font-medium text-blue-600 text-[15px]">₹{item.price_per_sqft || 0}</td>}
                        {showPricePerBox && <td className="p-0.5 text-center font-medium text-blue-600 text-[15px]">₹{item.price_per_box || 0}</td>}
                        {showAmount && <td className="p-0.5 text-center font-bold text-green-600 text-[15px]">₹{item.total_price || 0}</td>}
                        {showMargin && <td className="p-0.5 text-center text-gray-700 text-[15px]">₹{item.margin_amount || 0}</td>}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <p className="text-gray-600 text-lg">No items found in this quotation.</p>
          </div>
        )}

        {/* Total Section */}
        <div className="flex justify-end mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6 min-w-80">
            <table className="w-full text-right">
              <tbody className="space-y-2">
                <tr>
                  <td className="p-2 font-medium">Subtotal:</td>
                  <td className="p-2">₹{totalAmount.toFixed(2)}</td>
                </tr>
                {Number(quotation.local_freight || 0) > 0 && (
                  <tr>
                    <td className="p-2 font-medium">Local Freight:</td>
                    <td className="p-2">₹{Number(quotation.local_freight || 0).toFixed(2)}</td>
                  </tr>
                )}
                {Number(quotation.unloading || 0) > 0 && (
                  <tr>
                    <td className="p-2 font-medium">Unloading:</td>
                    <td className="p-2">₹{Number(quotation.unloading || 0).toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td className="p-2 font-medium text-sm">Round Off:</td>
                  <td className="p-2 text-sm">₹{roundOff.toFixed(2)}</td>
                </tr>
                <tr className="border-t-2 border-white">
                  <td className="p-2 font-bold text-xl">TOTAL:</td>
                  <td className="p-2 font-bold text-xl">₹{finalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Terms and Conditions */}
        {quotation.terms_conditions && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
              TERMS & CONDITIONS
            </h3>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 text-gray-700 leading-relaxed">
              {quotation.terms_conditions.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                  return (
                    <p key={index} className="mb-3 flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>
                        <span className="font-bold">{trimmedLine.match(/^(\d+)\./)?.[1] || ''}.</span> {trimmedLine.replace(/^\d+\.\s*/, '')}
                      </span>
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-b-2xl p-6 text-center">
          <p className="text-lg font-semibold mb-2">Thank you for your business!</p>
          <p className="text-gray-300">For any queries, please contact us at {companyProfile.companyEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default PdfModernTemplate; 