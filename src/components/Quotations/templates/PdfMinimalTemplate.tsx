import React from 'react';
import { Quotation } from '../../../types';

interface PdfMinimalTemplateProps {
  quotation: Quotation;
}

const PdfMinimalTemplate: React.FC<PdfMinimalTemplateProps> = ({ quotation }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-serif" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
      <div className="mx-auto" style={{ width: '95%' }}>
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-lg shadow-md mb-4">
              <h1 className="text-4xl font-bold tracking-wide" style={{ letterSpacing: '0.05em' }}>QUOTATION</h1>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
          </div>
          
          {/* From/To Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div className="flex-1 border-2 border-blue-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
              <div className="font-semibold text-blue-800 mb-2 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                From:
              </div>
              <div className="text-gray-900 font-medium">Your Company Name</div>
              <div className="text-sm text-gray-600">Your Company Address</div>
              <div className="text-xs text-blue-600 mt-2 font-medium">+91-0000000000 | info@yourcompany.com</div>
            </div>
            <div className="flex-1 border-2 border-green-200 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm">
              <div className="font-semibold text-green-800 mb-2 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                To:
              </div>
              <div className="text-gray-900 font-medium">{quotation.customer?.name || 'Client Name'}</div>
              {quotation.customer?.site_address && <div className="text-sm text-gray-600">{quotation.customer.site_address}</div>}
              <div className="text-xs text-green-600 mt-2 font-medium">
                {quotation.customer?.phone && <span>{quotation.customer.phone}</span>}
                {quotation.customer?.email && <span> | {quotation.customer.email}</span>}
                {quotation.customer?.gst_number && <span> | GST: {quotation.customer.gst_number}</span>}
              </div>
            </div>
          </div>
          
          {/* Quotation Details */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="text-xs text-purple-600 font-medium mb-1">Quotation Number</div>
              <div className="text-lg font-bold text-purple-800">{quotation.quotation_number}</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
              <div className="text-xs text-orange-600 font-medium mb-1">Quotation Date</div>
              <div className="text-lg font-bold text-orange-800">{formatDate(quotation.created_at)}</div>
            </div>
          </div>
          
          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-blue-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded mr-3"></div>
              Quotation Items
            </h3>
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-md">
              {quotation.rooms && quotation.rooms.length > 0 && quotation.rooms.some(room => room.items && room.items.length > 0) ? (
                <table className="w-full text-xs text-gray-900">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                      <th className="font-semibold px-3 py-3 text-left">Product</th>
                      <th className="font-semibold px-3 py-3 text-left">Size</th>
                      <th className="font-semibold px-3 py-3 text-left">Surface</th>
                      {quotation.show_sqft_in_box && (
                        <th className="font-semibold px-3 py-3 text-left">SQFT/Box ({quotation.sqft_in_box_type})</th>
                      )}
                      {quotation.show_sqft_needed && (
                        <th className="font-semibold px-3 py-3 text-left">SQFT Needed</th>
                      )}
                      {quotation.show_box_needed && (
                        <th className="font-semibold px-3 py-3 text-left">Box Needed</th>
                      )}
                      <th className="font-semibold px-3 py-3 text-left">Quantity</th>
                      {quotation.show_price_per_sqft && (
                        <th className="font-semibold px-3 py-3 text-left">Price/SQFT</th>
                      )}
                      {quotation.show_price_per_box && (
                        <th className="font-semibold px-3 py-3 text-left">Price/Box</th>
                      )}
                      {quotation.show_amount && (
                        <th className="font-semibold px-3 py-3 text-left">Amount</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {quotation.rooms?.map((room, roomIndex) => (
                      <React.Fragment key={roomIndex}>
                        {/* Room name as a section header row above items */}
                        <tr>
                          <td
                            colSpan={
                              3 +
                              (quotation.show_sqft_in_box ? 1 : 0) +
                              (quotation.show_sqft_needed ? 1 : 0) +
                              (quotation.show_box_needed ? 1 : 0) +
                              (quotation.show_price_per_sqft ? 1 : 0) +
                              (quotation.show_price_per_box ? 1 : 0) +
                              (quotation.show_amount ? 1 : 0)
                            }
                            className="font-bold text-sm text-left bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-3 py-3"
                            style={{ fontSize: '12px' }}
                          >
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                              {room.room_name}
                            </div>
                          </td>
                        </tr>
                        {room.items.map((item, itemIndex) => (
                          <tr key={`${roomIndex}-${itemIndex}`} className={itemIndex % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-gray-50 to-blue-50"}>
                            <td className="px-3 py-3 align-middle" style={{ fontSize: '11px' }}>
                              <div className="font-semibold text-blue-900">{item.product?.design_name || 'Unknown Product'}</div>
                              {item.product?.collection && (
                                <div className="text-xs text-purple-600 font-medium">{item.product.collection}</div>
                              )}
                            </td>
                            <td className="font-medium px-3 py-3 align-middle text-gray-700" style={{ fontSize: '11px' }}>{item.product?.size || '-'}</td>
                            <td className="px-3 py-3 align-middle text-gray-700" style={{ fontSize: '11px' }}>{item.product?.surface || 'Standard'}</td>
                            {quotation.show_sqft_in_box && (
                              <td className="px-3 py-3 align-middle text-center text-green-700 font-medium" style={{ fontSize: '11px' }}>
                                {quotation.sqft_in_box_type === 'actual'
                                  ? item.product?.actual_sqft_per_box.toFixed(2)
                                  : item.product?.billed_sqft_per_box.toFixed(2)
                                }
                              </td>
                            )}
                            {quotation.show_sqft_needed && (
                              <td className="px-3 py-3 align-middle text-center text-orange-700 font-medium" style={{ fontSize: '11px' }}>{item.sqft_needed?.toFixed(2)}</td>
                            )}
                            {quotation.show_box_needed && (
                              <td className="px-3 py-3 align-middle text-center text-purple-700 font-medium" style={{ fontSize: '11px' }}>{item.box_needed?.toFixed(2)}</td>
                            )}
                            <td className="px-3 py-3 align-middle text-center font-bold text-blue-800" style={{ fontSize: '11px' }}>{item.quantity_boxes}</td>
                            {quotation.show_price_per_sqft && (
                              <td className="px-3 py-3 align-middle text-right text-green-700 font-medium" style={{ fontSize: '11px' }}>{formatCurrency(item.rate_per_sqft)}</td>
                            )}
                            {quotation.show_price_per_box && (
                              <td className="px-3 py-3 align-middle text-right text-indigo-700 font-medium" style={{ fontSize: '11px' }}>{formatCurrency(item.mrp_per_box)}</td>
                            )}
                            {quotation.show_amount && (
                              <td className="px-3 py-3 align-middle text-right font-bold text-blue-900 bg-blue-50" style={{ fontSize: '11px' }}>
                                {formatCurrency(item.amount || 0)}
                              </td>
                            )}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-gray-400 bg-gradient-to-br from-gray-50 to-blue-50">
                  <div className="text-4xl mb-2">📋</div>
                  No items added to this quotation.
                </div>
              )}
            </div>
          </div>
          
          {/* Totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-72 space-y-3 p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-lg text-white">
              <div className="flex justify-between py-2 border-b border-blue-400">
                <span className="text-blue-100 text-sm">Subtotal:</span>
                <span className="font-semibold text-sm">{formatCurrency(quotation.total_amount || 0)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-lg font-bold">Grand Total:</span>
                <span className="text-lg font-bold text-yellow-300">{formatCurrency(quotation.total_amount || 0)}</span>
              </div>
            </div>
          </div>
          
          {/* Terms & Conditions */}
          <div className="mb-6 mt-10">
            <h3 className="text-lg font-bold mb-4 text-blue-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded mr-3"></div>
              Terms & Conditions
            </h3>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200 shadow-sm">
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                {quotation.terms_conditions ? quotation.terms_conditions : <span className="italic text-gray-400">No terms provided.</span>}
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-10 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md">
            <p className="text-white font-bold text-lg">Thank you for your business!</p>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfMinimalTemplate;