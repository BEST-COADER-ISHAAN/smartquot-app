import React from 'react';
import { Quotation } from '../../../types';

interface PdfMinimalTemplateProps {
  quotation: Quotation;
}

const PdfMinimalTemplate: React.FC<PdfMinimalTemplateProps> = ({ quotation }) => {
  // Fetch company profile from localStorage (profile page)
  const companyProfile = {
    companyName: typeof window !== 'undefined' ? localStorage.getItem('company_name') || 'Your Company Name' : 'Your Company Name',
    companyAddress: typeof window !== 'undefined' ? localStorage.getItem('company_address') || 'Your Company Address' : 'Your Company Address',
    companyPhone: typeof window !== 'undefined' ? localStorage.getItem('company_phone') || '+91-0000000000' : '+91-0000000000',
    companyEmail: typeof window !== 'undefined' ? localStorage.getItem('company_email') || 'info@yourcompany.com' : 'info@yourcompany.com',
    gstNo: typeof window !== 'undefined' ? localStorage.getItem('gst_no') || '' : '',
    logo: typeof window !== 'undefined' ? localStorage.getItem('company_logo') || '' : '',
  };

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
  const rooms = quotation.rooms || [];
  const hasItems = rooms.some(room => room.items && room.items.length > 0);

  // Format date to MM/DD/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString || Date.now());
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };



  return (
    <div className="min-h-screen bg-white p-8" style={{ fontFamily: 'Open Sans' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-sky-700 mb-2">QUOTATION</h1>
            <p className="text-gray-600">Quotation No: {quotation.quotation_number}</p>
            <p className="text-gray-600">Date: {formatDate(quotation.created_at)}</p>
          </div>
          {companyProfile.logo && (
            <div className="flex-shrink-0">
              <img 
                src={companyProfile.logo} 
                alt="Company Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Company and Customer Details */}
        <div className="grid grid-cols-2 gap-6 mb-6" style={{ fontFamily: 'Open Sans' }}>
          <div className="bg-[#dce6f0] border rounded-xl p-4">
            <h2 className="text-sky-700 font-semibold mb-1 text-2xl">Quotation From</h2>
            <p>{companyProfile.companyName}</p>
            <p>{companyProfile.companyAddress}</p>
            <p>Phone: {companyProfile.companyPhone}</p>
            <p>Email: {companyProfile.companyEmail}</p>
            {companyProfile.gstNo && <p>GST: {companyProfile.gstNo}</p>}
          </div>
          <div className="bg-[#dce6f0] border rounded-xl p-4">
            <h2 className="text-sky-700 font-semibold mb-1 text-2xl">Quotation For</h2>
            <p>{quotation.customer?.name || 'Customer Name'}</p>
            {quotation.customer?.site_address && <p>{quotation.customer.site_address}</p>}
            {quotation.customer?.phone && <p>Phone: {quotation.customer.phone}</p>}
            {quotation.customer?.email && <p>Email: {quotation.customer.email}</p>}
            {quotation.customer?.gst_number && <p>GST: {quotation.customer.gst_number}</p>}
          </div>
        </div>



        {/* Product Tables */}
        {hasItems ? (
          isAreaWise ? (
            // Area-wise: Show each room separately
            rooms.map((room, roomIndex) => (
              <div key={room.id || roomIndex} className="mb-8">
                <h3 className="text-lg font-semibold text-sky-700 mb-4 bg-sky-50 p-3 rounded-lg">
                  {room.room_name || `Room ${roomIndex + 1}`}
                </h3>
                
                <div className="overflow-x-auto rounded-lg border border-gray-300">
                  <table className="table-auto w-full text-left text-sm border-collapse">
                    <thead className="bg-[#4f81bc] text-white uppercase">
                      <tr>
                        <th className="border border-gray-300 p-3">#</th>
                        <th className="border border-gray-300 p-3">Item</th>
                        <th className="border border-gray-300 p-3">Size</th>
                        <th className="border border-gray-300 p-3">Surface</th>
                        {showSqftInBox && <th className="border border-gray-300 p-3">Sq.Ft in Box</th>}
                        {showSqftNeeded && <th className="border border-gray-300 p-3">Sq.Ft Needed</th>}
                        {showBoxNeeded && <th className="border border-gray-300 p-3">Quantity</th>}
                        {showPricePerSqft && <th className="border border-gray-300 p-3">Price/Sq.Ft</th>}
                        {showPricePerBox && <th className="border border-gray-300 p-3">Price/Box</th>}
                        {showAmount && <th className="border border-gray-300 p-3">Amount</th>}
                        {showMargin && <th className="border border-gray-300 p-3">Margin</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {room.items?.map((item, index) => (
                        <tr key={item.id || index} className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-50/70'} text-center`}>
                          <td className="border border-gray-300 p-3">{index + 1}</td>
                          <td className="border border-gray-300 p-3 text-left">{item.product?.name || item.name || 'Product Name'}</td>
                          <td className="border border-gray-300 p-3">{item.product?.size || ''}</td>
                          <td className="border border-gray-300 p-3">{item.product?.surface || ''}</td>
                          {showSqftInBox && <td className="border border-gray-300 p-3">{item.product?.[quotation.sqft_in_box_type === 'actual' ? 'actual_sqft_per_box' : 'billed_sqft_per_box'] || ''}</td>}
                          {showSqftNeeded && <td className="border border-gray-300 p-3">{item.sqft_needed || 0}</td>}
                          {showBoxNeeded && <td className="border border-gray-300 p-3">{item.quantity || 0}</td>}
                          {showPricePerSqft && <td className="border border-gray-300 p-3">₹{item.price_per_sqft || 0}</td>}
                          {showPricePerBox && <td className="border border-gray-300 p-3">₹{item.price_per_box || 0}</td>}
                          {showAmount && <td className="border border-gray-300 p-3">₹{item.total_price || 0}</td>}
                          {showMargin && <td className="border border-gray-300 p-3">₹{item.margin_amount || 0}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Room Total */}
                <div className="flex justify-end mt-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-700">Room Total: ₹{room.room_total?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // General: Show all items in one table
            <div className="overflow-x-auto rounded-lg border border-gray-300">
              <table className="table-auto w-full text-left text-sm border-collapse">
                <thead className="bg-[#4f81bc] text-white uppercase">
                  <tr>
                    <th className="border border-gray-300 p-3">#</th>
                    <th className="border border-gray-300 p-3">Item</th>
                    <th className="border border-gray-300 p-3">Size</th>
                    <th className="border border-gray-300 p-3">Surface</th>
                    {showSqftInBox && <th className="border border-gray-300 p-3">Sq.Ft in Box</th>}
                    {showSqftNeeded && <th className="border border-gray-300 p-3">Sq.Ft Needed</th>}
                    {showBoxNeeded && <th className="border border-gray-300 p-3">Quantity</th>}
                    {showPricePerSqft && <th className="border border-gray-300 p-3">Price/Sq.Ft</th>}
                    {showPricePerBox && <th className="border border-gray-300 p-3">Price/Box</th>}
                    {showAmount && <th className="border border-gray-300 p-3">Amount</th>}
                    {showMargin && <th className="border border-gray-300 p-3">Margin</th>}
                  </tr>
                </thead>
                <tbody>
                  {rooms.flatMap((room, roomIndex) => 
                    room.items?.map((item, index) => (
                      <tr key={item.id || `${roomIndex}-${index}`} className={`${(roomIndex * (room.items?.length || 0) + index) % 2 === 0 ? 'bg-blue-50' : 'bg-blue-50/70'} text-center`}>
                        <td className="border border-gray-300 p-3">{roomIndex * (room.items?.length || 0) + index + 1}</td>
                        <td className="border border-gray-300 p-3 text-left">{item.product?.name || item.name || 'Product Name'}</td>
                        <td className="border border-gray-300 p-3">{item.product?.size || ''}</td>
                        <td className="border border-gray-300 p-3">{item.product?.surface || ''}</td>
                        {showSqftInBox && <td className="border border-gray-300 p-3">{item.product?.[quotation.sqft_in_box_type === 'actual' ? 'actual_sqft_per_box' : 'billed_sqft_per_box'] || ''}</td>}
                        {showSqftNeeded && <td className="border border-gray-300 p-3">{item.sqft_needed || 0}</td>}
                        {showBoxNeeded && <td className="border border-gray-300 p-3">{item.quantity || 0}</td>}
                        {showPricePerSqft && <td className="border border-gray-300 p-3">₹{item.price_per_sqft || 0}</td>}
                        {showPricePerBox && <td className="border border-gray-300 p-3">₹{item.price_per_box || 0}</td>}
                        {showAmount && <td className="border border-gray-300 p-3">₹{item.total_price || 0}</td>}
                        {showMargin && <td className="border border-gray-300 p-3">₹{item.margin_amount || 0}</td>}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )
        ) : (
          // No items message
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">No items found in this quotation.</p>
          </div>
        )}

        {/* Total Section */}
        <div className="flex justify-end mt-6">
          <table className="text-right text-sm">
            <tbody>
              <tr>
                <td className="pr-4 font-semibold text-gray-700">Round Off:</td>
                <td>₹{roundOff.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="pr-4 font-bold text-base text-gray-800">Total:</td>
                <td className="text-base font-bold text-black">₹{finalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms and Conditions */}
        {quotation.terms_conditions && (
          <div className="mt-6">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 leading-relaxed">
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
                <div key={room.id || roomIndex}>
                  <div className="mt-8">
                    <h3 className="text-center text-gray-600 mb-6 font-semibold">
                      Product Images - {room.room_name || `Room ${roomIndex + 1}`}
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {room.items?.map((item, idx) => (
                        <div key={item.id || idx} className="text-center">
                          <div className="w-24 h-24 border border-gray-300 bg-gray-100 flex items-center justify-center mb-2">
                            {item.product?.image_url ? (
                              <img 
                                src={item.product.image_url} 
                                alt={item.product?.name || item.name || 'Product'}
                                className="w-20 h-20 object-cover"
                              />
                            ) : (
                              <span className="text-gray-400 text-xs">No Image</span>
                            )}
                          </div>
                          <p className="text-xs font-medium text-gray-700">{item.product?.name || item.name || 'Product Name'}</p>
                          <p className="text-xs text-gray-500">{item.product?.size || ''}</p>
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
              <div className="mt-8">
                <h3 className="text-center text-gray-600 mb-6 font-semibold">Product Images</h3>
                <div className="grid grid-cols-4 gap-4">
                  {rooms.flatMap(room => 
                    room.items?.map((item, idx) => (
                      <div key={item.id || idx} className="text-center">
                        <div className="w-24 h-24 border border-gray-300 bg-gray-100 flex items-center justify-center mb-2">
                          {item.product?.image_url ? (
                            <img 
                              src={item.product.image_url} 
                              alt={item.product?.name || item.name || 'Product'}
                              className="w-20 h-20 object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">No Image</span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-gray-700">{item.product?.name || item.name || 'Product Name'}</p>
                        <p className="text-xs text-gray-500">{item.product?.size || ''}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PdfMinimalTemplate;