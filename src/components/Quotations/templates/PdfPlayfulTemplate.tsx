import React from 'react';
import { Quotation } from '../../../types';

interface PdfPlayfulTemplateProps {
  quotation: Quotation;
}

const accentColors = [
  'bg-yellow-200',
  'bg-pink-200',
  'bg-teal-200',
  'bg-purple-200',
  'bg-green-200',
];

const PdfPlayfulTemplate: React.FC<PdfPlayfulTemplateProps> = ({ quotation }) => {
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
    <div className="min-h-screen bg-yellow-50 p-8 font-sans" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive, sans-serif' }}>
      <div className="mx-auto" style={{ width: '95%' }}>
        <div className="bg-white rounded-3xl shadow-lg border-2 border-yellow-200 p-8 relative overflow-hidden">
          {/* Decorative playful circles */}
          <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-pink-200 opacity-40 -z-10" style={{ transform: 'translate(-30%,-30%)' }}></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-teal-200 opacity-30 -z-10" style={{ transform: 'translate(30%,30%)' }}></div>
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-extrabold text-pink-500 mb-2 tracking-wider" style={{ letterSpacing: '0.1em' }}>🎉 QUOTATION 🎉</h1>
            <div className="w-24 h-2 rounded-full bg-yellow-300 mx-auto mb-6"></div>
          </div>
          {/* From/To Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
            <div className="flex-1 border-2 border-teal-200 rounded-2xl p-4 bg-teal-50">
              <div className="font-bold text-teal-700 mb-1">From:</div>
              <div className="text-pink-700">Your Company Name</div>
              <div className="text-xs text-teal-500">Your Company Address</div>
              <div className="text-xs text-pink-400 mt-1">+91-0000000000 | info@yourcompany.com</div>
            </div>
            <div className="flex-1 border-2 border-pink-200 rounded-2xl p-4 bg-pink-50">
              <div className="font-bold text-pink-700 mb-1">To:</div>
              <div className="text-teal-700">{quotation.customer?.name || 'Client Name'}</div>
              {quotation.customer?.site_address && <div className="text-xs text-pink-500">{quotation.customer.site_address}</div>}
              <div className="text-xs text-teal-400 mt-1">
                {quotation.customer?.phone && <span>{quotation.customer.phone}</span>}
                {quotation.customer?.email && <span> | {quotation.customer.email}</span>}
                {quotation.customer?.gst_number && <span> | GST: {quotation.customer.gst_number}</span>}
              </div>
            </div>
          </div>
          {/* Quotation Details */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-xs text-yellow-600">Quotation Number</div>
              <div className="text-lg font-bold text-pink-600">{quotation.quotation_number}</div>
            </div>
            <div>
              <div className="text-xs text-yellow-600">Quotation Date</div>
              <div className="text-lg font-bold text-pink-600">{formatDate(quotation.created_at)}</div>
            </div>
          </div>
          {/* Items Table */}
          <div className="mb-6">
            <h3 className="text-lg font-extrabold mb-2 text-teal-600">Quotation Items</h3>
            <div className="border-2 border-yellow-200 rounded-2xl overflow-hidden">
              {quotation.rooms && quotation.rooms.length > 0 && quotation.rooms.some(room => room.items && room.items.length > 0) ? (
                <table className="w-full text-xs text-gray-800">
                  <thead>
                    <tr className="bg-yellow-100">
                      <th className="font-bold px-2 py-2 text-left">Product</th>
                      <th className="font-bold px-2 py-2 text-left">Size</th>
                      <th className="font-bold px-2 py-2 text-left">Surface</th>
                      {quotation.show_sqft_in_box && (
                        <th className="font-bold px-2 py-2 text-left">SQFT/Box ({quotation.sqft_in_box_type})</th>
                      )}
                      {quotation.show_sqft_needed && (
                        <th className="font-bold px-2 py-2 text-left">SQFT Needed</th>
                      )}
                      {quotation.show_box_needed && (
                        <th className="font-bold px-2 py-2 text-left">Box Needed</th>
                      )}
                      <th className="font-bold px-2 py-2 text-left">Quantity</th>
                      {quotation.show_price_per_sqft && (
                        <th className="font-bold px-2 py-2 text-left">Price/SQFT</th>
                      )}
                      {quotation.show_price_per_box && (
                        <th className="font-bold px-2 py-2 text-left">Price/Box</th>
                      )}
                      {quotation.show_amount && (
                        <th className="font-bold px-2 py-2 text-left">Amount</th>
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
                            className={`font-extrabold text-xs text-left px-2 py-2 ${accentColors[roomIndex % accentColors.length]}`}
                            style={{ fontSize: '12px' }}
                          >
                            <span role="img" aria-label="room">🧩</span> {room.room_name}
                          </td>
                        </tr>
                        {room.items.map((item, itemIndex) => (
                          <tr key={`${roomIndex}-${itemIndex}`} className={itemIndex % 2 === 0 ? "bg-white" : "bg-yellow-50"}>
                            <td className="px-2 py-2 align-middle" style={{ fontSize: '12px' }}>
                              <div className="font-bold text-pink-600">{item.product?.design_name || 'Unknown Product'}</div>
                              {item.product?.collection && (
                                <div className="text-xs text-teal-500">{item.product.collection}</div>
                              )}
                            </td>
                            <td className="font-bold px-2 py-2 align-middle text-teal-700" style={{ fontSize: '12px' }}>{item.product?.size || '-'}</td>
                            <td className="px-2 py-2 align-middle text-yellow-700" style={{ fontSize: '12px' }}>{item.product?.surface || 'Standard'}</td>
                            {quotation.show_sqft_in_box && (
                              <td className="px-2 py-2 align-middle text-center text-pink-700" style={{ fontSize: '12px' }}>
                                {quotation.sqft_in_box_type === 'actual'
                                  ? item.product?.actual_sqft_per_box.toFixed(2)
                                  : item.product?.billed_sqft_per_box.toFixed(2)
                                }
                              </td>
                            )}
                            {quotation.show_sqft_needed && (
                              <td className="px-2 py-2 align-middle text-center text-teal-700" style={{ fontSize: '12px' }}>{item.sqft_needed?.toFixed(2)}</td>
                            )}
                            {quotation.show_box_needed && (
                              <td className="px-2 py-2 align-middle text-center text-yellow-700" style={{ fontSize: '12px' }}>{item.box_needed?.toFixed(2)}</td>
                            )}
                            <td className="px-2 py-2 align-middle text-center text-pink-600" style={{ fontSize: '12px' }}>{item.quantity_boxes}</td>
                            {quotation.show_price_per_sqft && (
                              <td className="px-2 py-2 align-middle text-right text-teal-700" style={{ fontSize: '12px' }}>{formatCurrency(item.rate_per_sqft)}</td>
                            )}
                            {quotation.show_price_per_box && (
                              <td className="px-2 py-2 align-middle text-right text-pink-700" style={{ fontSize: '12px' }}>{formatCurrency(item.mrp_per_box)}</td>
                            )}
                            {quotation.show_amount && (
                              <td className="px-2 py-2 align-middle text-right font-extrabold text-yellow-700" style={{ fontSize: '12px' }}>
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
                <div className="p-6 text-center text-pink-300">No items added to this quotation. <span role="img" aria-label="sad">😢</span></div>
              )}
            </div>
          </div>
          {/* Totals */}
          <div className="mt-4 flex justify-end">
            <div className="w-64 space-y-2 p-4 bg-yellow-100 rounded-2xl border-2 border-pink-200">
              <div className="flex justify-between py-1">
                <span className="text-pink-600 text-xs">Subtotal:</span>
                <span className="font-extrabold text-teal-700 text-xs">{formatCurrency(quotation.total_amount || 0)}</span>
              </div>
              <div className="h-px bg-pink-200"></div>
              <div className="flex justify-between py-2">
                <span className="text-lg font-extrabold text-yellow-700">Grand Total:</span>
                <span className="text-lg font-extrabold text-yellow-700">{formatCurrency(quotation.total_amount || 0)}</span>
              </div>
            </div>
          </div>
          {/* Terms & Conditions */}
          <div className="mb-6 mt-8">
            <h3 className="text-lg font-extrabold mb-2 text-pink-600">Terms & Conditions</h3>
            <div className="bg-pink-50 p-3 rounded-2xl border-2 border-yellow-100">
              <p className="text-teal-700 leading-relaxed text-xs whitespace-pre-wrap">
                {quotation.terms_conditions ? quotation.terms_conditions : <span className="italic text-pink-300">No terms provided.</span>}
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className="text-center mt-8 p-2 bg-yellow-100 rounded-2xl">
            <p className="text-base text-pink-600 font-extrabold">Thanks for choosing us! <span role="img" aria-label="party">🥳</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfPlayfulTemplate; 