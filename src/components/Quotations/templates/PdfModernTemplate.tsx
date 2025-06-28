import React from 'react';
import { Quotation } from '../../../types';

interface PdfModernTemplateProps {
  quotation: Quotation;
}

const PdfModernTemplate: React.FC<PdfModernTemplateProps> = ({ quotation }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 p-8">
      <div className="mx-auto" style={{ width: '95%' }}>
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-indigo-200 p-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight mb-4 drop-shadow-lg">QUOTATION</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 mx-auto rounded-full mb-8"></div>
          </div>
          {/* From/To Section */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
            {/* From (Company) */}
            <div className="flex-1 rounded-xl p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 shadow">
              <div className="font-bold text-indigo-700 mb-1">From:</div>
              <div className="font-semibold text-gray-900">Your Company Name</div>
              <div className="text-sm text-gray-600 whitespace-pre-line">Your Company Address</div>
              <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                <span>📞 +91-0000000000</span>
                <span>✉️ info@yourcompany.com</span>
              </div>
            </div>
            {/* To (Customer) */}
            <div className="flex-1 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow">
              <div className="font-bold text-blue-700 mb-1">To:</div>
              <div className="font-semibold text-gray-900">{quotation.customer?.name || 'Client Name'}</div>
              {quotation.customer?.site_address && <div className="text-sm text-gray-600 whitespace-pre-line">{quotation.customer.site_address}</div>}
              <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                {quotation.customer?.phone && <span>📞 {quotation.customer.phone}</span>}
                {quotation.customer?.email && <span>✉️ {quotation.customer.email}</span>}
                {quotation.customer?.gst_number && <span>GST: {quotation.customer.gst_number}</span>}
              </div>
            </div>
          </div>
          {/* Quotation Details */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="space-y-2">
              <div className="text-sm text-gray-600 font-medium">Quotation Number</div>
              <div className="text-lg font-bold text-indigo-700">{quotation.quotation_number}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 font-medium">Quotation Date</div>
              <div className="text-lg font-bold text-indigo-700">{formatDate(quotation.created_at)}</div>
            </div>
          </div>
          {/* Items Table */}
          <div className="mb-10">
            <h3 className="text-xl font-extrabold mb-4 text-indigo-700 tracking-wide">Quotation Items</h3>
            <div className="border-2 border-indigo-200 rounded-xl overflow-hidden shadow-lg" style={{ overflowX: 'visible' }}>
              {quotation.rooms && quotation.rooms.length > 0 && quotation.rooms.some(room => room.items && room.items.length > 0) ? (
                <table className="w-full text-xs text-gray-800">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-200 via-purple-200 to-blue-200">
                      <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>Product</th>
                      <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>Size</th>
                      <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>Surface</th>
                      {quotation.show_sqft_in_box && (
                        <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>SQFT/Box ({quotation.sqft_in_box_type})</th>
                      )}
                      {quotation.show_sqft_needed && (
                        <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>SQFT Needed</th>
                      )}
                      {quotation.show_box_needed && (
                        <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>Box Needed</th>
                      )}
                      <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>Quantity</th>
                      {quotation.show_price_per_sqft && (
                        <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>Price/SQFT</th>
                      )}
                      {quotation.show_price_per_box && (
                        <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>Price/Box</th>
                      )}
                      {quotation.show_amount && (
                        <th className="font-bold text-indigo-700 px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>Amount</th>
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
                            className="font-bold text-indigo-700 text-xs text-left bg-indigo-50 px-3 py-2 align-middle"
                            style={{ fontSize: '12px', verticalAlign: 'middle' }}
                          >
                            {room.room_name}
                          </td>
                        </tr>
                        {room.items.map((item, itemIndex) => (
                          <tr key={`${roomIndex}-${itemIndex}`} className={itemIndex % 2 === 0 ? "bg-white" : "bg-indigo-50/50"}>
                            <td className="px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>
                              <div className="flex items-center space-x-2">
                                {quotation.include_images && item.product?.image_url && (
                                  <img
                                    src={item.product.image_url}
                                    alt={item.product.design_name}
                                    className="w-10 h-10 object-cover rounded border border-gray-200"
                                  />
                                )}
                                <div>
                                  <div className="font-medium">{item.product?.design_name || 'Unknown Product'}</div>
                                  {item.product?.collection && (
                                    <div className="text-xs text-indigo-600">{item.product.collection}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="font-medium px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>{item.product?.size || '-'}</td>
                            <td className="px-3 py-2 align-middle" style={{ verticalAlign: 'middle' }}>{item.product?.surface || 'Standard'}</td>
                            {quotation.show_sqft_in_box && (
                              <td className="px-3 py-2 align-middle text-center" style={{ verticalAlign: 'middle' }}>
                                {quotation.sqft_in_box_type === 'actual'
                                  ? item.product?.actual_sqft_per_box.toFixed(2)
                                  : item.product?.billed_sqft_per_box.toFixed(2)
                                }
                              </td>
                            )}
                            {quotation.show_sqft_needed && (
                              <td className="px-3 py-2 align-middle text-center" style={{ verticalAlign: 'middle' }}>{item.sqft_needed?.toFixed(2)}</td>
                            )}
                            {quotation.show_box_needed && (
                              <td className="px-3 py-2 align-middle text-center" style={{ verticalAlign: 'middle' }}>{item.box_needed?.toFixed(2)}</td>
                            )}
                            <td className="px-3 py-2 align-middle text-center" style={{ verticalAlign: 'middle' }}>{item.quantity_boxes}</td>
                            {quotation.show_price_per_sqft && (
                              <td className="px-3 py-2 align-middle text-right" style={{ verticalAlign: 'middle' }}>{formatCurrency(item.rate_per_sqft)}</td>
                            )}
                            {quotation.show_price_per_box && (
                              <td className="px-3 py-2 align-middle text-right" style={{ verticalAlign: 'middle' }}>{formatCurrency(item.mrp_per_box)}</td>
                            )}
                            {quotation.show_amount && (
                              <td className="px-3 py-2 align-middle text-right font-bold text-indigo-700" style={{ verticalAlign: 'middle' }}>
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
                <div className="p-6 text-center text-gray-500">No items added to this quotation.</div>
              )}
            </div>
          </div>
          {/* Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-80 space-y-3 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 shadow-lg">
              <div className="flex justify-between py-2">
                <span className="text-gray-600 font-medium">Subtotal:</span>
                <span className="font-bold text-indigo-700">{formatCurrency(quotation.total_amount || 0)}</span>
              </div>
              <div className="h-px bg-indigo-200"></div>
              <div className="flex justify-between py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
                <span className="text-xl font-bold">Grand Total:</span>
                <span className="text-xl font-bold">{formatCurrency(quotation.total_amount || 0)}</span>
              </div>
            </div>
          </div>
          {/* Terms & Conditions */}
          <div className="mb-8 mt-10">
            <h3 className="text-lg font-bold mb-2 text-indigo-700">Terms & Conditions</h3>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                {quotation.terms_conditions ? quotation.terms_conditions : <span className="italic text-gray-400">No terms provided.</span>}
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className="text-center mt-12 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <p className="text-lg font-semibold text-indigo-700">Thank you for your business!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfModernTemplate;