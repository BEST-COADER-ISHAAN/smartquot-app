import React from 'react';
import { Quotation } from '../../../types';

interface PdfDetailedTemplateProps {
  quotation: Quotation;
}

const PdfDetailedTemplate: React.FC<PdfDetailedTemplateProps> = ({ quotation }) => {
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

  const calculateRoundOff = (amount: number) => {
    const rounded = Math.round(amount);
    return rounded - amount;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-serif" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
      <div className="mx-auto" style={{ width: '95%' }}>
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-900 text-white p-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-5xl font-bold tracking-wider mb-5" style={{ letterSpacing: '0.1em' }}>QUOTATION</h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-4"></div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="p-8 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <h2 className="text-xl font-bold text-slate-800">From: Your Company</h2>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold text-lg">Your Company Name</p>
                  <p>123 Business Street, Suite 100</p>
                  <p>City, State 12345</p>
                  <p className="text-blue-600 font-medium">+91-98765-43210</p>
                  <p className="text-blue-600 font-medium">info@yourcompany.com</p>
                  <p className="text-sm text-gray-500 mt-2">GST: 27ABCDE1234F1Z5</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                  <h2 className="text-xl font-bold text-slate-800">To: Client Information</h2>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold text-lg">{quotation.customer?.name || 'Client Name'}</p>
                  {quotation.customer?.site_address && <p>{quotation.customer.site_address}</p>}
                  {quotation.customer?.phone && <p className="text-green-600 font-medium">{quotation.customer.phone}</p>}
                  {quotation.customer?.email && <p className="text-green-600 font-medium">{quotation.customer.email}</p>}
                  {quotation.customer?.gst_number && <p className="text-sm text-gray-500 mt-2">GST: {quotation.customer.gst_number}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Quotation Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-purple-600 font-medium mb-1">Quotation Number</div>
                <div className="text-xl font-bold text-purple-800">{quotation.quotation_number}</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                <div className="text-sm text-orange-600 font-medium mb-1">Quotation Date</div>
                <div className="text-xl font-bold text-orange-800">{formatDate(quotation.created_at)}</div>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center border border-blue-200">
                <div className="text-2xl font-bold text-blue-800">{quotation.rooms?.length || 0}</div>
                <div className="text-sm text-blue-600 font-medium">Total Rooms</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-800">{quotation.rooms?.reduce((sum, room) => sum + room.items.length, 0) || 0}</div>
                <div className="text-sm text-green-600 font-medium">Total Products</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 text-center border border-purple-200">
                <div className="text-2xl font-bold text-purple-800">{quotation.rooms?.reduce((sum, room) => sum + room.items.reduce((itemSum, item) => itemSum + (item.quantity_boxes || 0), 0), 0) || 0}</div>
                <div className="text-sm text-purple-600 font-medium">Total Boxes</div>
              </div>
            </div>
          </div>

          {/* Detailed Products Table */}
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
              <div className="w-3 h-10 bg-gradient-to-b from-blue-600 to-indigo-700 rounded mr-4"></div>
              Detailed Product Specifications
            </h3>
            
            {quotation.rooms && quotation.rooms.length > 0 && quotation.rooms.some(room => room.items && room.items.length > 0) ? (
              <div className="space-y-6">
                {quotation.rooms.map((room, roomIndex) => (
                  <div key={roomIndex} className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4">
                      <h4 className="text-xl font-bold flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        Room {roomIndex + 1}: {room.room_name}
                      </h4>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                            <th className="font-semibold px-4 py-3 text-left">Product Details</th>
                            <th className="font-semibold px-4 py-3 text-left">Size & Surface</th>
                            {quotation.show_sqft_in_box && (
                              <th className="font-semibold px-4 py-3 text-center">SQFT/Box</th>
                            )}
                            {quotation.show_sqft_needed && (
                              <th className="font-semibold px-4 py-3 text-center">SQFT Needed</th>
                            )}
                            {quotation.show_box_needed && (
                              <th className="font-semibold px-4 py-3 text-center">Boxes Needed</th>
                            )}
                            <th className="font-semibold px-4 py-3 text-center">Quantity</th>
                            {quotation.show_price_per_sqft && (
                              <th className="font-semibold px-4 py-3 text-right">Price/SQFT</th>
                            )}
                            {quotation.show_price_per_box && (
                              <th className="font-semibold px-4 py-3 text-right">Price/Box</th>
                            )}
                            {quotation.show_amount && (
                              <th className="font-semibold px-4 py-3 text-right">Amount</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {room.items.map((item, itemIndex) => (
                            <tr key={itemIndex} className={itemIndex % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-gray-50 to-blue-50"}>
                              <td className="px-4 py-4 align-top">
                                <div className="space-y-1">
                                  <div className="font-bold text-blue-900 text-base">{item.product?.design_name || 'Unknown Product'}</div>
                                  {item.product?.collection && (
                                    <div className="text-sm text-purple-600 font-medium">Collection: {item.product.collection}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4 align-top">
                                <div className="space-y-1">
                                  <div className="text-sm text-gray-700">
                                    <span className="font-medium">Size:</span> {item.product?.size || '-'}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    <span className="font-medium">Surface:</span> {item.product?.surface || 'Standard'}
                                  </div>
                                </div>
                              </td>
                              {quotation.show_sqft_in_box && (
                                <td className="px-4 py-4 align-top text-center">
                                  <div className="text-sm font-medium text-green-700">
                                    {quotation.sqft_in_box_type === 'actual'
                                      ? item.product?.actual_sqft_per_box.toFixed(2)
                                      : item.product?.billed_sqft_per_box.toFixed(2)
                                    }
                                  </div>
                                  <div className="text-xs text-gray-500">({quotation.sqft_in_box_type})</div>
                                </td>
                              )}
                              {quotation.show_sqft_needed && (
                                <td className="px-4 py-4 align-top text-center">
                                  <div className="text-sm font-medium text-orange-700">{item.sqft_needed?.toFixed(2)}</div>
                                </td>
                              )}
                              {quotation.show_box_needed && (
                                <td className="px-4 py-4 align-top text-center">
                                  <div className="text-sm font-medium text-purple-700">{item.box_needed?.toFixed(2)}</div>
                                </td>
                              )}
                              <td className="px-4 py-4 align-top text-center">
                                <div className="text-lg font-bold text-blue-800">{item.quantity_boxes}</div>
                                <div className="text-xs text-gray-500">boxes</div>
                              </td>
                              {quotation.show_price_per_sqft && (
                                <td className="px-4 py-4 align-top text-right">
                                  <div className="text-sm font-medium text-green-700">{formatCurrency(item.rate_per_sqft)}</div>
                                </td>
                              )}
                              {quotation.show_price_per_box && (
                                <td className="px-4 py-4 align-top text-right">
                                  <div className="text-sm font-medium text-indigo-700">{formatCurrency(item.mrp_per_box)}</div>
                                </td>
                              )}
                              {quotation.show_amount && (
                                <td className="px-4 py-4 align-top text-right">
                                  <div className="text-base font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded">
                                    {formatCurrency(item.amount || 0)}
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-xl text-gray-600">No products added to this quotation</p>
              </div>
            )}
          </div>

          {/* Spacer to help avoid page break in Financial Summary */}
          <div style={{ height: '100px' }}></div>

          {/* Financial Summary */}
          <div className="p-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 max-w-md ml-auto">
              <h3 className="text-xl font-bold mb-4 text-green-800 flex items-center">
                <div className="w-2 h-6 bg-green-600 rounded mr-3"></div>
                Financial Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-green-200">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-green-800">{formatCurrency(quotation.total_amount || 0)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-green-200">
                  <span className="text-gray-700">Round Off:</span>
                  <span className="font-semibold text-green-800">{formatCurrency(calculateRoundOff(quotation.total_amount || 0))}</span>
                </div>
                <div className="flex justify-between py-3 bg-green-100 rounded-lg px-3">
                  <span className="text-lg font-bold text-green-900">Grand Total:</span>
                  <span className="text-lg font-bold text-green-900">{formatCurrency(Math.round(quotation.total_amount || 0))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="p-8">
            <h3 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
              <div className="w-2 h-6 bg-orange-600 rounded mr-3"></div>
              Terms & Conditions
            </h3>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {quotation.terms_conditions ? (
                  quotation.terms_conditions
                ) : (
                  <div className="text-gray-500 italic">
                    <p>• Prices are valid for 30 days from the quotation date</p>
                    <p>• Payment terms: 50% advance, balance before delivery</p>
                    <p>• Delivery timeline: 7-10 business days after confirmation</p>
                    <p>• Installation charges are not included unless specified</p>
                    <p>• Warranty: 10 years on manufacturing defects</p>
                    <p>• Returns accepted within 7 days in original packaging</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-lg text-center mt-8">
              <p className="text-xl font-bold mb-2">Thank you for choosing our services!</p>
              <p className="text-slate-300 mb-4">We look forward to working with you on this project.</p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDetailedTemplate;