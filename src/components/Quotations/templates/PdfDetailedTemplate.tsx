import React, { useEffect, useState } from 'react';
import { Quotation } from '../../../types';
import { formatSizeForDisplay } from '../../../lib/sizeUtils';
import { getCompanyDetailsFromQuotationAsync } from '../../../lib/companyUtils';
import { usePreferredSizeUnit } from '../../../hooks/usePreferredSizeUnit';

interface PdfDetailedTemplateProps {
  quotation: Quotation;
  companyProfile: any;
  formattedSizeMap?: Record<string, string>;
  preferredSizeUnit?: string;
}

const PdfDetailedTemplate: React.FC<PdfDetailedTemplateProps> = ({ quotation, companyProfile, formattedSizeMap = {}, preferredSizeUnit = 'mm' }) => {
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
    <div className="min-h-screen bg-white p-6" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="border-b-4 border-gray-800 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4">DETAILED QUOTATION</h1>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p><strong>Quotation Number:</strong> {quotation.quotation_number}</p>
                  <p><strong>Date Created:</strong> {formatDate(quotation.created_at)}</p>
                  <p><strong>Status:</strong> {quotation.status || 'Draft'}</p>
                </div>
                <div>
                  <p><strong>Type:</strong> {quotation.is_area_wise ? 'Area-wise' : 'General'}</p>
                  <p><strong>Include Images:</strong> {quotation.include_images ? 'Yes' : 'No'}</p>
                  <p><strong>Export Type:</strong> {quotation.export_type || 'PDF'}</p>
                </div>
              </div>
            </div>
            {companyProfile.logo && (
              <div className="flex-shrink-0 border-2 border-gray-300 p-4">
                <img 
                  src={companyProfile.logo} 
                  alt="Company Logo" 
                  className="h-24 w-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Company and Customer Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="border-2 border-gray-400 p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">COMPANY DETAILS</h2>
            <div className="space-y-3 text-gray-700">
              {companyProfile.companyName && <p className="font-bold text-lg">{companyProfile.companyName}</p>}
              {companyProfile.companyAddress && <p className="text-gray-600">{companyProfile.companyAddress}</p>}
              {companyProfile.companyPhone && <p><strong>Phone:</strong> {companyProfile.companyPhone}</p>}
              {companyProfile.companyEmail && <p><strong>Email:</strong> {companyProfile.companyEmail}</p>}
              {companyProfile.gstNo && <p><strong>GST Number:</strong> {companyProfile.gstNo}</p>}
            </div>
          </div>
          <div className="border-2 border-gray-400 p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">CUSTOMER DETAILS</h2>
            <div className="space-y-3 text-gray-700">
              <p className="font-bold text-lg">{quotation.customer?.name || 'Customer Name'}</p>
              {quotation.customer?.site_address && (
                <p><strong>Site Address:</strong> {quotation.customer.site_address}</p>
              )}
              {quotation.customer?.phone && <p><strong>Phone:</strong> {quotation.customer.phone}</p>}
              {quotation.customer?.email && <p><strong>Email:</strong> {quotation.customer.email}</p>}
              {quotation.customer?.gst_number && <p><strong>GST Number:</strong> {quotation.customer.gst_number}</p>}
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div className="border-2 border-gray-400 p-6 mb-8 bg-blue-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">PROJECT INFORMATION</h2>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <p><strong>Quotation Type:</strong> {quotation.is_area_wise ? 'Area-wise Quotation' : 'General Quotation'}</p>
              <p><strong>Total Rooms:</strong> {rooms.length}</p>
              <p><strong>Total Items:</strong> {rooms.reduce((total, room) => total + (room.items?.length || 0), 0)}</p>
            </div>
            <div>
              <p><strong>Include Product Images:</strong> {quotation.include_images ? 'Yes' : 'No'}</p>
              <p><strong>Terms & Conditions:</strong> {quotation.terms_conditions ? 'Included' : 'Not Included'}</p>
              <p><strong>Internal Notes:</strong> {quotation.notes ? 'Added' : 'None'}</p>
            </div>
            <div>
              <p><strong>Export Format:</strong> {quotation.export_type || 'PDF'}</p>
              <p><strong>PDF Template:</strong> {quotation.pdf_template || 'Standard'}</p>
              <p><strong>Link Template:</strong> {quotation.link_template || 'Modern'}</p>
            </div>
          </div>
        </div>

        {/* Product Tables */}
        {hasItems ? (
          <div className="mb-8">
            {quotation.is_area_wise ? (
              // Area-wise detailed display
              rooms.map((room, roomIndex) => (
                <div key={room.id || roomIndex} className="mb-8 border-2 border-gray-400">
                  <div className="bg-gray-800 text-white p-4">
                    <h3 className="text-xl font-bold">ROOM {roomIndex + 1}: {room.room_name || `Room ${roomIndex + 1}`}</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[14px]">
                      <thead className="bg-gray-600 text-white">
                        <tr>
                          <th className="border border-gray-400 p-0.5 text-left text-[11px]">Item #</th>
                          <th className="border border-gray-400 p-0.5 text-left text-[11px] w-20">Product Name</th>
                          <th className="border border-gray-400 p-0.5 text-center text-[13px] w-24">Size</th>
                          <th className="border border-gray-400 p-0.5 text-center text-[11px]">Surface</th>
                          <th className="border border-gray-400 p-0.5 text-left text-[11px]">Description</th>
                          {showSqftInBox && <th className="border border-gray-400 p-0.5 text-center text-[11px]">Sq.Ft in Box</th>}
                          {showSqftNeeded && <th className="border border-gray-400 p-0.5 text-center text-[11px]">Sq.Ft Needed</th>}
                          {showBoxNeeded && <th className="border border-gray-400 p-0.5 text-center text-[11px]">Quantity</th>}
                          {showPricePerSqft && <th className="border border-gray-400 p-0.5 text-center text-[11px]">Price/Sq.Ft</th>}
                          {showPricePerBox && <th className="border border-gray-400 p-0.5 text-center text-[11px]">Price/Box</th>}
                          {showAmount && <th className="border border-gray-400 p-0.5 text-center text-[11px]">Amount</th>}
                          {showMargin && <th className="border border-gray-400 p-0.5 text-center text-[11px]">Margin</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {room.items?.map((item, index) => (
                          <tr key={item.id || index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <td className="border border-gray-400 p-0.5 font-bold text-center text-[15px]">{index + 1}</td>
                            <td className="border border-gray-400 p-0.5 font-semibold text-[15px]">{item.product?.name || item.name || 'Product Name'}</td>
                            <td className="border border-gray-400 p-0.5 text-center text-[15px]">{item.product?.size ? formattedSizeMap[item.product.size] || item.product.size : ''}</td>
                            <td className="border border-gray-400 p-0.5 text-center text-[15px]">{item.product?.surface || ''}</td>
                            <td className="border border-gray-400 p-0.5 text-[15px]">{item.product_description || ''}</td>
                            {showSqftInBox && <td className="border border-gray-400 p-0.5 text-center text-[15px]">{item.product?.[quotation.sqft_in_box_type === 'actual' ? 'actual_sqft_per_box' : 'billed_sqft_per_box'] || ''}</td>}
                            {showSqftNeeded && <td className="border border-gray-400 p-0.5 text-center text-[15px]">{item.sqft_needed || 0}</td>}
                            {showBoxNeeded && <td className="border border-gray-400 p-0.5 text-center text-[15px]">{item.quantity || 0}</td>}
                            {showPricePerSqft && <td className="border border-gray-400 p-0.5 text-center font-medium text-[15px]">₹{item.price_per_sqft || 0}</td>}
                            {showPricePerBox && <td className="border border-gray-400 p-0.5 text-center font-medium text-[15px]">₹{item.price_per_box || 0}</td>}
                            {showAmount && <td className="border border-gray-400 p-0.5 text-center font-bold text-[15px]">₹{item.total_price || 0}</td>}
                            {showMargin && <td className="border border-gray-400 p-0.5 text-center text-[15px]">₹{item.margin_amount || 0}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Room Summary */}
                  <div className="bg-gray-100 p-4 border-t-2 border-gray-400">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">Room Summary:</p>
                        <p className="text-sm text-gray-600">Total Items: {room.items?.length || 0}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[10px]">Room Total: ₹{room.room_total?.toLocaleString() || 0}</p>
                        {room.room_margin_amount && (
                          <p className="text-sm text-gray-600">Margin: ₹{room.room_margin_amount}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // General detailed display
              <div className="border-2 border-gray-400">
                <div className="bg-gray-800 text-white p-4">
                  <h3 className="text-xl font-bold">PRODUCT DETAILS</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-600 text-white">
                      <tr>
                        <th className="border border-gray-400 p-3 text-left">Item #</th>
                        <th className="border border-gray-400 p-3 text-left">Product Name</th>
                        <th className="border border-gray-400 p-3 text-left">Size</th>
                        <th className="border border-gray-400 p-3 text-left">Surface</th>
                        <th className="border border-gray-400 p-3 text-left">Description</th>
                        {showSqftInBox && <th className="border border-gray-400 p-3 text-center">Sq.Ft in Box</th>}
                        {showSqftNeeded && <th className="border border-gray-400 p-3 text-center">Sq.Ft Needed</th>}
                        {showBoxNeeded && <th className="border border-gray-400 p-3 text-center">Quantity</th>}
                        {showPricePerSqft && <th className="border border-gray-400 p-3 text-center">Price/Sq.Ft</th>}
                        {showPricePerBox && <th className="border border-gray-400 p-3 text-center">Price/Box</th>}
                        {showAmount && <th className="border border-gray-400 p-3 text-center">Amount</th>}
                        {showMargin && <th className="border border-gray-400 p-3 text-center">Margin</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.flatMap((room, roomIndex) => 
                        room.items?.map((item, index) => (
                          <tr key={item.id || `${roomIndex}-${index}`} className={`${(roomIndex * (room.items?.length || 0) + index) % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <td className="border border-gray-400 p-3 font-bold">{(roomIndex * (room.items?.length || 0) + index + 1)}</td>
                            <td className="border border-gray-400 p-3 font-semibold">{item.product?.name || item.name || 'Product Name'}</td>
                            <td className="border border-gray-400 p-3">{item.product?.size ? formattedSizeMap[item.product.size] || item.product.size : ''}</td>
                            <td className="border border-gray-400 p-3">{item.product?.surface || ''}</td>
                            <td className="border border-gray-400 p-3 text-sm">{item.product_description || ''}</td>
                            {showSqftInBox && <td className="border border-gray-400 p-3 text-center">{item.product?.[quotation.sqft_in_box_type === 'actual' ? 'actual_sqft_per_box' : 'billed_sqft_per_box'] || ''}</td>}
                            {showSqftNeeded && <td className="border border-gray-400 p-3 text-center">{item.sqft_needed || 0}</td>}
                            {showBoxNeeded && <td className="border border-gray-400 p-3 text-center">{item.quantity || 0}</td>}
                            {showPricePerSqft && <td className="border border-gray-400 p-3 text-center font-medium">₹{item.price_per_sqft || 0}</td>}
                            {showPricePerBox && <td className="border border-gray-400 p-3 text-center font-medium">₹{item.price_per_box || 0}</td>}
                            {showAmount && <td className="border border-gray-400 p-3 text-center font-bold">₹{item.total_price || 0}</td>}
                            {showMargin && <td className="border border-gray-400 p-3 text-center">₹{item.margin_amount || 0}</td>}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="border-2 border-gray-400 p-8 text-center bg-gray-50">
            <p className="text-gray-600 text-lg">No items found in this quotation.</p>
          </div>
        )}

        {/* Detailed Summary */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="border-2 border-gray-400 p-6 bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">QUOTATION SUMMARY</h3>
            <div className="space-y-3 text-sm">
              <p><strong>Total Rooms:</strong> {rooms.length}</p>
              <p><strong>Total Items:</strong> {rooms.reduce((total, room) => total + (room.items?.length || 0), 0)}</p>
              <p><strong>Subtotal:</strong> ₹{totalAmount.toFixed(2)}</p>
              {Number(quotation.local_freight || 0) > 0 && (
                <p><strong>Local Freight:</strong> ₹{Number(quotation.local_freight || 0).toFixed(2)}</p>
              )}
              {Number(quotation.unloading || 0) > 0 && (
                <p><strong>Unloading:</strong> ₹{Number(quotation.unloading || 0).toFixed(2)}</p>
              )}
              <p><strong>Round Off:</strong> ₹{roundOff.toFixed(2)}</p>
              <p className="font-bold text-xl"><strong>Final Total:</strong> ₹{finalAmount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="border-2 border-gray-400 p-6 bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">EXPORT SETTINGS</h3>
            <div className="space-y-3 text-sm">
              <p><strong>Export Type:</strong> {quotation.export_type || 'PDF'}</p>
              <p><strong>PDF Template:</strong> {quotation.pdf_template || 'Standard'}</p>
              <p><strong>Include Images:</strong> {quotation.include_images ? 'Yes' : 'No'}</p>
              <p><strong>Terms & Conditions:</strong> {quotation.terms_conditions ? 'Included' : 'Not Included'}</p>
              <p><strong>Internal Notes:</strong> {quotation.notes ? 'Added' : 'None'}</p>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        {quotation.terms_conditions && (
          <div className="border-2 border-gray-400 p-6 mb-8 bg-yellow-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">TERMS & CONDITIONS</h3>
            <div className="text-gray-700 leading-relaxed">
              {quotation.terms_conditions.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                  return (
                    <p key={index} className="mb-3">
                      <span className="font-bold">{trimmedLine.match(/^(\d+)\./)?.[1] || ''}.</span> {trimmedLine.replace(/^\d+\.\s*/, '')}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Internal Notes */}
        {quotation.notes && (
          <div className="border-2 border-gray-400 p-6 mb-8 bg-blue-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">INTERNAL NOTES</h3>
            <div className="text-gray-700 leading-relaxed">
              {quotation.notes}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t-4 border-gray-800 pt-6 text-center">
          <p className="text-lg font-bold text-gray-800 mb-2">Thank you for your business!</p>
          <p className="text-gray-600">For any queries, please contact us at {companyProfile.companyEmail}</p>
          <p className="text-gray-600 mt-2">Phone: {companyProfile.companyPhone}</p>
        </div>
      </div>
    </div>
  );
};

export default PdfDetailedTemplate; 