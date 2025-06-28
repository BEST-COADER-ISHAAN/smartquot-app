import React, { useState } from 'react';
import { Building, Mail, Phone, MapPin, Calendar, FileText, Package, Download, Copy, Check, User } from 'lucide-react';
import { Quotation } from '../../../types';

interface LinkPrintTemplateProps {
  quotation: Quotation;
}

const LinkPrintTemplate: React.FC<LinkPrintTemplateProps> = ({ quotation }) => {
  const [copied, setCopied] = useState(false);

  // Company info from localStorage
  const companyName = typeof window !== 'undefined' ? localStorage.getItem('company_name') || 'Your Company Name' : 'Your Company Name';
  const companyAddress = typeof window !== 'undefined' ? localStorage.getItem('company_address') || 'Your Company Address' : 'Your Company Address';
  const companyPhone = typeof window !== 'undefined' ? localStorage.getItem('company_phone') || '+91-0000000000' : '+91-0000000000';
  const companyEmail = typeof window !== 'undefined' ? localStorage.getItem('company_email') || 'info@yourcompany.com' : 'info@yourcompany.com';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate the number of columns for colspan
  const getColumnCount = () => {
    let count = 4; // Product, Size, Surface, Quantity (always shown)
    if (quotation.show_sqft_in_box) count++;
    if (quotation.show_sqft_needed) count++;
    if (quotation.show_box_needed) count++;
    if (quotation.show_price_per_sqft) count++;
    if (quotation.show_price_per_box) count++;
    if (quotation.show_amount) count++;
    if (quotation.show_margin) count++;
    return count;
  };

  const columnCount = getColumnCount();

  return (
    <div className="min-h-screen bg-white p-0">
      <div className="w-[95vw] max-w-[95vw] mx-auto">
        {/* Print-friendly header */}
        <div className="mb-8 border-b border-gray-300 pb-6 print:border-b-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Print Template</h1>
              <h2 className="text-xl font-semibold text-gray-700">Quotation {quotation.quotation_number}</h2>
              <p className="text-gray-600 mt-2 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(quotation.created_at)}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900 mb-1">SmartQuot</div>
              <div className="text-gray-600">Professional Quotation System</div>
              
              {/* Only show in screen view, not in print */}
              <div className="mt-4 flex space-x-2 print:hidden">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  <Download className="w-3 h-3" />
                  <span>Print</span>
                </button>
                <button 
                  onClick={handleCopyLink}
                  className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${
                    copied ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Company Information */}
        <div className="mb-8 print:mb-6 flex flex-col md:flex-row gap-6">
          {/* Company Info */}
          <div className="flex-1 border border-gray-300 rounded-lg p-4 print:border-2 print:p-3 bg-gray-50">
            <div className="flex items-center gap-2 mb-2 font-bold text-blue-700"><Building className="w-5 h-5 text-blue-400" />From:</div>
            <div className="font-semibold text-gray-800">{companyName}</div>
            <div className="text-sm text-gray-600 whitespace-pre-line">{companyAddress}</div>
            <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
              {companyPhone && <span>📞 {companyPhone}</span>}
              {companyEmail && <span>✉️ {companyEmail}</span>}
            </div>
          </div>
          {/* Customer Info */}
          <div className="flex-1 border border-gray-300 rounded-lg p-4 print:border-2 print:p-3">
            <div className="flex items-center gap-2 mb-2 font-bold text-purple-700"><User className="w-5 h-5 text-purple-400" />To:</div>
            <div className="font-semibold text-gray-800">{quotation.customer?.name || 'Client Name'}</div>
            {quotation.customer?.site_address && <div className="text-sm text-gray-600 whitespace-pre-line">{quotation.customer.site_address}</div>}
            <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
              {quotation.customer?.phone && <span>📞 {quotation.customer.phone}</span>}
              {quotation.customer?.email && <span>✉️ {quotation.customer.email}</span>}
              {quotation.customer?.gst_number && <span>GST: {quotation.customer.gst_number}</span>}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 print:text-lg">Products</h2>
          
          {quotation.rooms?.length ? (
            <div>
              <div>
                <table className="w-full border-collapse table-auto scale-table-to-fit">
                  <thead>
                    <tr className="bg-gray-100 print:bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2 text-left print:text-sm">Product</th>
                      <th className="border border-gray-300 px-4 py-2 text-left print:text-sm">Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left print:text-sm">Surface</th>
                      {quotation.show_sqft_in_box && (
                        <th className="border border-gray-300 px-4 py-2 text-center print:text-sm">
                          SQFT/Box<br />({quotation.sqft_in_box_type})
                        </th>
                      )}
                      {quotation.show_sqft_needed && (
                        <th className="border border-gray-300 px-4 py-2 text-center print:text-sm">SQFT Needed</th>
                      )}
                      {quotation.show_box_needed && (
                        <th className="border border-gray-300 px-4 py-2 text-center print:text-sm">Box Needed</th>
                      )}
                      <th className="border border-gray-300 px-4 py-2 text-center print:text-sm">Quantity</th>
                      {quotation.show_price_per_sqft && (
                        <th className="border border-gray-300 px-4 py-2 text-right print:text-sm">Price/SQFT</th>
                      )}
                      {quotation.show_price_per_box && (
                        <th className="border border-gray-300 px-4 py-2 text-right print:text-sm">Price/Box</th>
                      )}
                      {quotation.show_amount && (
                        <th className="border border-gray-300 px-4 py-2 text-right print:text-sm">Amount</th>
                      )}
                      {quotation.show_margin && (
                        <th className="border border-gray-300 px-4 py-2 text-right print:text-sm">Margin</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {quotation.rooms.map((room, roomIndex) => (
                      <React.Fragment key={roomIndex}>
                        {quotation.is_area_wise && (
                          <tr className="bg-gray-50 print:bg-gray-100">
                            <td colSpan={columnCount} className="border border-gray-300 px-4 py-2 font-medium print:text-sm">
                              {room.room_name}
                            </td>
                          </tr>
                        )}
                        
                        {room.items.map((item, itemIndex) => (
                          <tr key={`${roomIndex}-${itemIndex}`} className="print:text-sm">
                            <td className="border border-gray-300 px-4 py-2 text-xs break-words">
                              <div className="flex items-center space-x-2">
                                {quotation.include_images && item.product?.image_url && (
                                  <img
                                    src={item.product.image_url}
                                    alt={item.product.design_name}
                                    className="w-8 h-8 object-cover rounded border border-gray-200 print:hidden"
                                  />
                                )}
                                <div>
                                  <div className="font-medium">{item.product?.design_name || 'Unknown Product'}</div>
                                  {item.product?.collection && (
                                    <div className="text-xs text-blue-600">{item.product.collection}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-xs break-words">
                              {item.product?.size || '-'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-xs break-words">
                              {item.product?.surface || 'Standard'}
                            </td>
                            {quotation.show_sqft_in_box && (
                              <td className="border border-gray-300 px-4 py-2 text-center text-xs break-words">
                                {quotation.sqft_in_box_type === 'actual' 
                                  ? item.product?.actual_sqft_per_box.toFixed(2)
                                  : item.product?.billed_sqft_per_box.toFixed(2)
                                }
                              </td>
                            )}
                            {quotation.show_sqft_needed && (
                              <td className="border border-gray-300 px-4 py-2 text-center text-xs break-words">
                                {item.sqft_needed?.toFixed(2)}
                              </td>
                            )}
                            {quotation.show_box_needed && (
                              <td className="border border-gray-300 px-4 py-2 text-center text-xs break-words">
                                {item.box_needed?.toFixed(2)}
                              </td>
                            )}
                            <td className="border border-gray-300 px-4 py-2 text-center text-xs break-words">
                              {item.quantity_boxes}
                            </td>
                            {quotation.show_price_per_sqft && (
                              <td className="border border-gray-300 px-4 py-2 text-right text-xs break-words">
                                ₹{item.rate_per_sqft.toFixed(2)}
                              </td>
                            )}
                            {quotation.show_price_per_box && (
                              <td className="border border-gray-300 px-4 py-2 text-right text-xs break-words">
                                ₹{item.mrp_per_box.toFixed(2)}
                              </td>
                            )}
                            {quotation.show_amount && (
                              <td className="border border-gray-300 px-4 py-2 text-right font-medium text-xs break-words">
                                ₹{item.amount?.toFixed(2) || '0.00'}
                              </td>
                            )}
                            {quotation.show_margin && (
                              <td className="border border-gray-300 px-4 py-2 text-right text-xs break-words">
                                <div className="text-green-700 font-medium">
                                  ₹{item.margin_amount?.toFixed(2) || '0.00'}
                                </div>
                                <div className="text-xs text-green-600">
                                  ({(item.margin_percentage || 0).toFixed(1)}%)
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                        
                        <tr className="bg-gray-50 print:bg-gray-100">
                          <td colSpan={columnCount - 1} className="border border-gray-300 px-4 py-2 text-right font-medium print:text-sm">
                            Room Total:
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right font-bold print:text-sm">
                            ₹{room.room_total?.toFixed(2) || '0.00'}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                    
                    <tr className="bg-gray-100 print:bg-gray-200">
                      <td colSpan={columnCount - 1} className="border border-gray-300 px-4 py-2 text-right font-medium print:text-sm">
                        Grand Total:
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-bold print:text-sm">
                        ₹{quotation.total_amount?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No products available</p>
          )}
        </div>

        {/* Product Images Section */}
        {quotation.include_images && quotation.rooms?.some(room => room.items.some(item => item.product?.image_url)) && (
          <div className="mb-8 print:mb-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-purple-400" />Product Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quotation.rooms.flatMap(room => room.items)
                .filter(item => item.product?.image_url)
                .map((item, idx) => (
                  <div key={item.id || idx} className="flex flex-col items-center border rounded-2xl p-4 bg-white/80 shadow-md border-white/60">
                    <img
                      src={item.product?.image_url}
                      alt={item.product?.design_name}
                      className="h-24 w-24 object-contain rounded shadow mb-2 bg-gray-50"
                      style={{ maxWidth: 96, maxHeight: 96 }}
                    />
                    <div className="text-xs font-medium text-center truncate w-full" title={item.product?.design_name}>{item.product?.design_name}</div>
                    <div className="text-xs text-muted-foreground text-center">{item.product?.size}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Terms & Conditions */}
        <div className="mb-8 print:mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 print:text-lg">Terms & Conditions</h2>
          <div className="border border-gray-300 rounded-lg p-4 text-gray-700 print:border-2 print:p-3 print:text-sm">
            {quotation.terms_conditions ? quotation.terms_conditions : <span className="italic text-gray-400">No terms provided.</span>}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-gray-300 pt-6 mt-8 print:border-t-2 print:pt-4">
          <p className="text-gray-700 print:text-sm">This quotation is valid for 30 days from the date of issue.</p>
          <p className="text-gray-500 mt-2 print:text-xs">Generated by SmartQuot • {formatDate(quotation.created_at)}</p>
          
          {/* Print footer - only visible when printing */}
          <div className="hidden print:block mt-4 text-xs text-gray-500">
            <p>Printed from SmartQuot • {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPrintTemplate;

/*
To ensure the table never causes a horizontal scrollbar, add the following CSS to your global stylesheet:

.scale-table-to-fit {
  display: block;
  width: 100%;
  max-width: 100vw;
}
@media screen {
  .scale-table-to-fit {
    overflow: visible;
  }
  body, html, #root, .min-h-screen {
    overflow-x: hidden !important;
  }
}
*/