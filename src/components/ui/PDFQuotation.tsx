import React from 'react';
import { useId } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, FileText, Hash, Image as ImageIcon, Sparkles, Award } from "lucide-react";
import { Quotation } from '../../types';

interface DotPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  cx?: any;
  cy?: any;
  cr?: any;
  className?: string;
  [key: string]: any;
}

function DotPattern({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 0.5,
  cr = 0.5,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-slate-500/50 md:fill-slate-500/70",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

interface PDFQuotationProps {
  quotation: Quotation;
  companyProfile: {
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    gstNo?: string;
  };
}

function PDFQuotation({ quotation, companyProfile }: PDFQuotationProps) {
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
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto" style={{ width: '95%' }}>
        <div className="bg-white">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-blue-700 tracking-tight mb-6">QUOTATION</h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
              </div>
            {/* From/To Section */}
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
              {/* From (Company) */}
              <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="font-bold text-blue-700 mb-1">From:</div>
                <div className="font-semibold text-gray-800">{companyProfile.companyName}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{companyProfile.companyAddress}</div>
                <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                  {companyProfile.companyPhone && <span>📞 {companyProfile.companyPhone}</span>}
                  {companyProfile.companyEmail && <span>✉️ {companyProfile.companyEmail}</span>}
                  {companyProfile.gstNo && <span>GST: {companyProfile.gstNo}</span>}
                </div>
              </div>
              {/* To (Customer) */}
              <div className="flex-1 border border-gray-200 rounded-lg p-4">
                <div className="font-bold text-purple-700 mb-1">To:</div>
                <div className="font-semibold text-gray-800">{quotation.customer?.name || 'Client Name'}</div>
                {quotation.customer?.site_address && <div className="text-sm text-gray-600 whitespace-pre-line">{quotation.customer.site_address}</div>}
                <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                  {quotation.customer?.phone && <span>📞 {quotation.customer.phone}</span>}
                  {quotation.customer?.email && <span>✉️ {quotation.customer.email}</span>}
                  {quotation.customer?.gst_number && <span>GST: {quotation.customer.gst_number}</span>}
                </div>
              </div>
            </div>
            {/* Quotation Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <div className="text-sm text-gray-600 font-medium">Quotation Number</div>
                <div className="text-lg font-bold text-gray-800">{quotation.quotation_number}</div>
                </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 font-medium">Quotation Date</div>
                <div className="text-lg font-bold text-gray-800">{formatDate(quotation.created_at)}</div>
              </div>
            </div>
            {/* Items Table */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Quotation Items</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ overflowX: 'visible' }}>
                {quotation.rooms && quotation.rooms.length > 0 && quotation.rooms.some(room => room.items && room.items.length > 0) ? (
                  <Table style={{ tableLayout: 'auto', width: '100%' }}>
                  <TableHeader>
                      <TableRow className="bg-blue-100">
                        <TableHead className="font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>Product</TableHead>
                        <TableHead className="font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>Size</TableHead>
                        <TableHead className="font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>Surface</TableHead>
                      {quotation.show_sqft_in_box && (
                          <TableHead className="text-center font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>
                          SQFT/Box ({quotation.sqft_in_box_type})
                        </TableHead>
                      )}
                      {quotation.show_sqft_needed && (
                          <TableHead className="text-center font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>SQFT Needed</TableHead>
                      )}
                      {quotation.show_box_needed && (
                          <TableHead className="text-center font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>Box Needed</TableHead>
                      )}
                        <TableHead className="text-center font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>Quantity</TableHead>
                      {quotation.show_price_per_sqft && (
                          <TableHead className="text-right font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>Price/SQFT</TableHead>
                      )}
                      {quotation.show_price_per_box && (
                          <TableHead className="text-right font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>Price/Box</TableHead>
                      )}
                      {quotation.show_amount && (
                          <TableHead className="text-right font-bold text-blue-700 text-xs" style={{ wordBreak: 'break-word', fontSize: '11px', padding: '6px 4px' }}>Amount</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotation.rooms?.map((room, roomIndex) => (
                      <React.Fragment key={roomIndex}>
                          {/* Room name as a section header row above items */}
                          <TableRow>
                            <TableCell 
                              colSpan={
                                3 +
                                (quotation.show_sqft_in_box ? 1 : 0) +
                                (quotation.show_sqft_needed ? 1 : 0) +
                                (quotation.show_box_needed ? 1 : 0) +
                                (quotation.show_price_per_sqft ? 1 : 0) +
                                (quotation.show_price_per_box ? 1 : 0) +
                                (quotation.show_amount ? 1 : 0)
                              } 
                              className="font-bold text-blue-700 text-xs text-left bg-blue-50"
                              style={{ fontSize: '12px', padding: '8px 6px' }}
                            >
                              {room.room_name}
                            </TableCell>
                          </TableRow>
                        {room.items.map((item, itemIndex) => (
                            <TableRow key={`${roomIndex}-${itemIndex}`} className={itemIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <TableCell className="text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>
                              <div className="flex items-center space-x-2">
                                {quotation.include_images && item.product?.image_url && (
                                  <img
                                    src={item.product.image_url}
                                    alt={item.product.design_name}
                                    className="w-12 h-12 object-cover rounded border border-gray-200"
                                  />
                                )}
                                <div>
                                  <div className="font-medium">{item.product?.design_name || 'Unknown Product'}</div>
                                  {item.product?.collection && (
                                    <div className="text-sm text-blue-600">{item.product.collection}</div>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                              <TableCell className="font-medium text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>{item.product?.size || '-'}</TableCell>
                              <TableCell className="text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>{item.product?.surface || 'Standard'}</TableCell>
                            {quotation.show_sqft_in_box && (
                                <TableCell className="text-center text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>
                                {quotation.sqft_in_box_type === 'actual' 
                                  ? item.product?.actual_sqft_per_box.toFixed(2)
                                  : item.product?.billed_sqft_per_box.toFixed(2)
                                }
                              </TableCell>
                            )}
                            {quotation.show_sqft_needed && (
                                <TableCell className="text-center text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>{item.sqft_needed?.toFixed(2)}</TableCell>
                            )}
                            {quotation.show_box_needed && (
                                <TableCell className="text-center text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>{item.box_needed?.toFixed(2)}</TableCell>
                            )}
                              <TableCell className="text-center text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>{item.quantity_boxes}</TableCell>
                            {quotation.show_price_per_sqft && (
                                <TableCell className="text-right text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>{formatCurrency(item.rate_per_sqft)}</TableCell>
                            )}
                            {quotation.show_price_per_box && (
                                <TableCell className="text-right text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>{formatCurrency(item.mrp_per_box)}</TableCell>
                            )}
                            {quotation.show_amount && (
                                <TableCell className="text-right font-bold text-blue-700 text-xs" style={{ fontSize: '11px', padding: '6px 4px' }}>
                                {formatCurrency(item.amount || 0)}
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
                ) : (
                  <div className="p-6 text-center text-gray-500">No items added to this quotation.</div>
                )}
              </div>
              {/* Totals */}
              <div className="mt-6 flex justify-end">
                <div className="w-80 space-y-3 p-6 bg-gray-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 font-medium">Subtotal:</span>
                    <span className="font-bold text-gray-800">{formatCurrency(quotation.total_amount || 0)}</span>
                  </div>
                  <div className="h-px bg-blue-200"></div>
                  <div className="flex justify-between py-3 px-4 bg-blue-600 rounded-lg text-white">
                    <span className="text-xl font-bold">Grand Total:</span>
                    <span className="text-xl font-bold">{formatCurrency(quotation.total_amount || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Terms & Conditions */}
              <div className="mb-8">
              <h3 className="text-lg font-bold mb-2 text-blue-700">Terms & Conditions</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-blue-100">
                <p className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                  {quotation.terms_conditions ? quotation.terms_conditions : <span className="italic text-gray-400">No terms provided.</span>}
                </p>
              </div>
            </div>
            {/* Footer */}
            <div className="text-center mt-12 p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-semibold text-blue-700">Thank you for your business!</p>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default PDFQuotation;