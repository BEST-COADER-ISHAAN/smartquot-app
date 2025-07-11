import React, { useMemo } from 'react';
import { Quotation } from '../../../types';
import { formatSizeForDisplay } from '../../../lib/sizeUtils';
import { getCompanyDetailsFromQuotationAsync } from '../../../lib/companyUtils';

interface PdfTemplateProps {
  quotation: Quotation;
  formattedSizeMap: Record<string, string>;
  companyProfile: any;
  preferredSizeUnit?: 'inches' | 'mm' | 'feet' | 'custom'; // Add this prop for clarity
}

const getUnitLabel = (unit: string) => {
  switch (unit) {
    case 'inches': return 'in';
    case 'feet': return 'ft';
    case 'mm': return 'mm';
    case 'custom': return '';
    default: return unit;
  }
};

const PdfTemplate: React.FC<PdfTemplateProps> = ({ quotation, formattedSizeMap, companyProfile, preferredSizeUnit }) => {
  try {
    // Defensive: fallback for missing quotation object
    if (!quotation) {
      return <div className="text-red-600 p-4">No quotation data provided.</div>;
    }
    if (!companyProfile) {
      return <div className="p-8 text-center text-gray-500">Loading company details...</div>;
    }

    // Get company details from quotation (preserved when quotation was created)
    // Use companyProfile instead of getCompanyDetailsFromQuotation

    // Process items based on area-wise setting
    const isAreaWise = quotation.is_area_wise || false;
    
    // Get column visibility settings with defaults
    const showSqftInBox = quotation.show_sqft_in_box !== false;
    const showSqftNeeded = quotation.show_sqft_needed !== false;
    const showBoxNeeded = quotation.show_box_needed !== false;
    const showPricePerSqft = quotation.show_price_per_sqft !== false;
    const showPricePerBox = quotation.show_price_per_box !== false;
    const showAmount = quotation.show_amount !== false;
    const showMargin = quotation.show_margin !== false;

    // Calculate totals
    const totalAmount = quotation.total_amount || 0;
    
    // Calculate round off
    const roundOff = Math.round(totalAmount) - totalAmount;
    const finalAmount = Math.round(totalAmount);

    // Ensure we have rooms data
    const rooms = Array.isArray(quotation.rooms) ? quotation.rooms : [];
    const hasItems = rooms.some(room => Array.isArray(room.items) && room.items.length > 0);

    // Format date to MM/DD/YYYY
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    // Defensive: fallback for missing customer
    const customer = quotation.customer || { name: 'Customer Name' };

    return (
      <div className="min-h-screen bg-white p-4" style={{ fontFamily: 'Open Sans' }}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-sky-700 mb-1">QUOTATION</h1>
              <p className="text-gray-600 text-sm">Quotation No: {quotation.quotation_number || 'N/A'}</p>
              <p className="text-gray-600 text-sm">Date: {formatDate(quotation.created_at)}</p>
            </div>
            {companyProfile?.logo && (
              <div className="flex-shrink-0">
                <img 
                  src={companyProfile.logo} 
                  alt="Company Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Company and Customer Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#dce6f0] border rounded-lg p-3">
              <h2 className="text-sky-700 font-semibold mb-1 text-lg">Quotation From</h2>
              {companyProfile?.companyName && <p className="text-sm">{companyProfile.companyName}</p>}
              {companyProfile?.companyAddress && <p className="text-sm">{companyProfile.companyAddress}</p>}
              {companyProfile?.companyPhone && <p className="text-sm">Phone: {companyProfile.companyPhone}</p>}
              {companyProfile?.companyEmail && <p className="text-sm">Email: {companyProfile.companyEmail}</p>}
              {companyProfile?.gstNo && <p className="text-sm">GST: {companyProfile.gstNo}</p>}
            </div>
            <div className="bg-[#dce6f0] border rounded-lg p-3">
              <h2 className="text-sky-700 font-semibold mb-1 text-lg">Quotation For</h2>
              <p className="text-sm">{customer.name}</p>
              {'site_address' in customer && customer.site_address && <p className="text-sm">{customer.site_address}</p>}
              {'phone' in customer && customer.phone && <p className="text-sm">Phone: {customer.phone}</p>}
              {'email' in customer && customer.email && <p className="text-sm">Email: {customer.email}</p>}
              {'gst_number' in customer && customer.gst_number && <p className="text-sm">GST: {customer.gst_number}</p>}
            </div>
          </div>

          {/* Product Tables */}
          {hasItems ? (
            isAreaWise ? (
              // Area-wise: Show each room separately
              rooms.map((room, roomIndex) => (
                <div key={room?.id || roomIndex} className="mb-4 avoid-break">
                  <h3 className="text-base font-semibold text-sky-700 mb-2 bg-sky-50 p-2 rounded">
                    {room?.room_name || `Room ${roomIndex + 1}`}
                  </h3>
                  <div className="overflow-x-auto rounded border border-gray-300">
                    <table className="w-full text-left text-[14px] border-collapse table-fixed">
                      <thead className="bg-[#4f81bc] text-white uppercase">
                        <tr>
                          <th className="border border-gray-300 p-0.5 w-8 text-[11px]">#</th>
                          <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-left">Item</th>
                          <th className="border border-gray-300 p-0.5 w-24 text-[13px] text-center">Size</th>
                          <th className="border border-gray-300 p-0.5 w-16 text-[11px] text-center">Surface</th>
                          {showSqftInBox && <th className="border border-gray-300 p-0.5 w-20 text-[11px]">Sq.Ft in Box</th>}
                          {showSqftNeeded && <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-center">Sq.Ft Needed</th>}
                          {showBoxNeeded && <th className="border border-gray-300 p-0.5 w-16 text-[11px] text-center">Quantity</th>}
                          {showPricePerSqft && <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-center">Price/Sq.Ft</th>}
                          {showPricePerBox && <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-center">Price/Box</th>}
                          {showAmount && <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-center">Amount</th>}
                          {showMargin && <th className="border border-gray-300 p-0.5 w-20 text-[11px]">Margin</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(room.items) && room.items.map((item, index) => (
                          <tr key={item?.id || index} className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-50/70'}`}>
                            <td className="border border-gray-300 p-0.5 text-center text-[15px]">{index + 1}</td>
                            <td className="border border-gray-300 p-0.5 text-[15px]">{item?.product?.name || item?.name || 'Product Name'}</td>
                            <td className="border border-gray-300 p-0.5 text-center text-[15px]">
                              {item?.product?.size ? formattedSizeMap[item.product.size] || item.product.size || '' : ''}
                            </td>
                            <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item?.product?.surface || ''}</td>
                            {showSqftInBox && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item?.product?.[quotation.sqft_in_box_type === 'actual' ? 'actual_sqft_per_box' : 'billed_sqft_per_box'] ?? ''}</td>}
                            {showSqftNeeded && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item?.sqft_needed ?? 0}</td>}
                            {showBoxNeeded && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item?.quantity ?? 0}</td>}
                            {showPricePerSqft && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item?.price_per_sqft ?? 0}</td>}
                            {showPricePerBox && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item?.price_per_box ?? 0}</td>}
                            {showAmount && <td className="border border-gray-300 p-0.5 text-center text-[15px] font-semibold">₹{item?.total_price ?? 0}</td>}
                            {showMargin && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item?.margin_amount ?? 0}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Room Total */}
                  <div className="flex justify-end mt-2">
                    <div className="text-right">
                      <p className="font-semibold text-gray-700 text-[10px]">Room Total: ₹{room?.room_total?.toLocaleString?.() || 0}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // General: Show all items in one table
              <div className="overflow-x-auto rounded border border-gray-300 avoid-break">
                <table className="w-full text-left text-[14px] border-collapse table-fixed">
                  <thead className="bg-[#4f81bc] text-white uppercase">
                    <tr>
                      <th className="border border-gray-300 p-0.5 w-8 text-[11px]">#</th>
                      <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-left">Item</th>
                      <th className="border border-gray-300 p-0.5 w-24 text-[13px] text-center">Size</th>
                      <th className="border border-gray-300 p-0.5 w-16 text-[11px] text-center">Surface</th>
                      {showSqftInBox && <th className="border border-gray-300 p-0.5 w-20 text-[11px]">Sq.Ft in Box</th>}
                      {showSqftNeeded && <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-center">Sq.Ft Needed</th>}
                      {showBoxNeeded && <th className="border border-gray-300 p-0.5 w-16 text-[11px] text-center">Quantity</th>}
                      {showPricePerSqft && <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-center">Price/Sq.Ft</th>}
                      {showPricePerBox && <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-center">Price/Box</th>}
                      {showAmount && <th className="border border-gray-300 p-0.5 w-20 text-[11px] text-center">Amount</th>}
                      {showMargin && <th className="border border-gray-300 p-0.5 w-20 text-[11px]">Margin</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.flatMap((room, roomIndex) => 
                      Array.isArray(room.items) ? room.items.map((item, index) => (
                        <tr key={item?.id || `${roomIndex}-${index}`} className={`${(roomIndex * (room.items?.length || 0) + index) % 2 === 0 ? 'bg-blue-50' : 'bg-blue-50/70'}`}>
                          <td className="border border-gray-300 p-0.5 text-center text-[15px]">{(roomIndex * (room.items?.length || 0) + index + 1)}</td>
                          <td className="border border-gray-300 p-0.5 text-[15px]">{item?.product?.name || item?.name || 'Product Name'}</td>
                          <td className="border border-gray-300 p-0.5 text-center text-[15px]">
                            {item?.product?.size ? formattedSizeMap[item.product.size] || item.product.size || '' : ''}
                          </td>
                          <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item?.product?.surface || ''}</td>
                          {showSqftInBox && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item?.product?.[quotation.sqft_in_box_type === 'actual' ? 'actual_sqft_per_box' : 'billed_sqft_per_box'] ?? ''}</td>}
                          {showSqftNeeded && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item?.sqft_needed ?? 0}</td>}
                          {showBoxNeeded && <td className="border border-gray-300 p-0.5 text-center text-[15px]">{item?.quantity ?? 0}</td>}
                          {showPricePerSqft && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item?.price_per_sqft ?? 0}</td>}
                          {showPricePerBox && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item?.price_per_box ?? 0}</td>}
                          {showAmount && <td className="border border-gray-300 p-0.5 text-center text-[15px] font-semibold">₹{item?.total_price ?? 0}</td>}
                          {showMargin && <td className="border border-gray-300 p-0.5 text-center text-[15px]">₹{item?.margin_amount ?? 0}</td>}
                        </tr>
                      )) : null
                    )}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            // No items message
            <div className="text-center py-6 bg-gray-50 rounded border border-gray-200">
              <p className="text-gray-600 text-sm">No items found in this quotation.</p>
            </div>
          )}

          {/* Total Section */}
          <div className="flex justify-end mt-4 avoid-break">
            <table className="text-right">
              <tbody>
                {Number(quotation.local_freight || 0) > 0 && (
                  <tr>
                    <td className="pr-3 font-semibold text-gray-700 text-sm">Local Freight:</td>
                    <td className="text-sm">₹{Number(quotation.local_freight || 0).toFixed(2)}</td>
                  </tr>
                )}
                {Number(quotation.unloading || 0) > 0 && (
                  <tr>
                    <td className="pr-3 font-semibold text-gray-700 text-sm">Unloading:</td>
                    <td className="text-sm">₹{Number(quotation.unloading || 0).toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td className="pr-3 font-semibold text-gray-700 text-sm">Round Off:</td>
                  <td className="text-sm">₹{roundOff.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="pr-3 font-bold text-lg text-gray-800">Total:</td>
                  <td className="text-lg font-bold text-black">₹{finalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms and Conditions */}
          {quotation.terms_conditions && (
            <div className="mt-4 avoid-break">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 leading-relaxed">
                <h3 className="text-sm font-semibold text-sky-800 mb-2">Terms & Conditions:</h3>
                {quotation.terms_conditions.split('\n').map((line, index) => {
                  const trimmedLine = line.trim();
                  if (trimmedLine) {
                    return (
                      <p key={index} className="mb-1">
                        <span className="font-bold">{trimmedLine.match(/^(\d+)\./)?.[1] || ''}.</span> {trimmedLine.replace(/^\d+\.\s*/, '').toUpperCase()}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}

          {/* Product Images Section - Area-wise */}
          {quotation.include_images && hasItems && (
            <>
              {/* Page Break for Images */}
              <div className="page-break"></div>
              
              {isAreaWise ? (
                // Area-wise images: Each room on a new page
                rooms.map((room, roomIndex) => (
                  <div key={room?.id || roomIndex} className="avoid-break">
                    <div className="mt-6">
                      <h3 className="text-center text-gray-600 mb-4 font-semibold text-sm">
                        Product Images - {room?.room_name || `Room ${roomIndex + 1}`}
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                        {Array.isArray(room.items) && room.items.map((item, idx) => (
                          <div key={item?.id || idx} className="text-center">
                            <div className="w-20 h-20 border border-gray-300 bg-gray-100 flex items-center justify-center mb-1">
                              {item?.product?.image_url ? (
                                <img 
                                  src={item.product.image_url} 
                                  alt={item?.product?.name || item?.name || 'Product'}
                                  className="w-16 h-16 object-cover"
                                />
                              ) : (
                                <span className="text-gray-400 text-xs">No Image</span>
                              )}
                            </div>
                            <p className="text-xs font-medium text-gray-700">{item?.product?.name || item?.name || 'Product Name'}</p>
                            <p className="text-xs text-gray-500">{item?.product?.size ? formattedSizeMap[item.product.size] || item.product.size || '' : ''}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Page break between rooms (except for last room) */}
                    {roomIndex < rooms.length - 1 && <div className="page-break"></div>}
                  </div>
                ))
              ) : (
                // General images: All products on one page
                <div className="mt-6 avoid-break">
                  <h3 className="text-center text-gray-600 mb-4 font-semibold text-sm">Product Images</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {rooms.flatMap(room => 
                      Array.isArray(room.items) ? room.items.map((item, idx) => (
                        <div key={item?.id || idx} className="text-center">
                          <div className="w-20 h-20 border border-gray-300 bg-gray-100 flex items-center justify-center mb-1">
                            {item?.product?.image_url ? (
                              <img 
                                src={item.product.image_url} 
                                alt={item?.product?.name || item?.name || 'Product'}
                                className="w-16 h-16 object-cover"
                              />
                            ) : (
                              <span className="text-gray-400 text-xs">No Image</span>
                            )}
                          </div>
                          <p className="text-xs font-medium text-gray-700">{item?.product?.name || item?.name || 'Product Name'}</p>
                          <p className="text-xs text-gray-500">{item?.product?.size ? formattedSizeMap[item.product.size] || item.product.size || '' : ''}</p>
                        </div>
                      )) : null
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  } catch (err) {
    return <div className="text-red-600 p-4">Error rendering PDF preview: {err instanceof Error ? err.message : String(err)}</div>;
  }
};

export default PdfTemplate; 