import React, { useState, useRef } from 'react';
import { X, Download, Share2, ExternalLink, FileText, Link as LinkIcon, Copy, Check, Eye, Globe, QrCode } from 'lucide-react';
import { Quotation } from '../../types';
import PdfStandardTemplate from './templates/PdfStandardTemplate';
import PdfModernTemplate from './templates/PdfModernTemplate';
import PdfMinimalTemplate from './templates/PdfMinimalTemplate';
import PdfDetailedTemplate from './templates/PdfDetailedTemplate';
import LinkModernTemplate from './templates/LinkModernTemplate';
import LinkMobileTemplate from './templates/LinkMobileTemplate';
import LinkPrintTemplate from './templates/LinkPrintTemplate';
import OnlineQuotationComponent from '@/components/ui/OnlineQuotationComponent';
import { exportComponentAsPDF } from '@/lib/exportPdf';

// Import html2pdf
declare global {
  interface Window {
    html2pdf: any;
  }
}

interface QuotationExportPreviewProps {
  quotation: Quotation;
  exportType: 'pdf' | 'link';
  template: string;
  onClose: () => void;
}

const QuotationExportPreview: React.FC<QuotationExportPreviewProps> = ({
  quotation,
  exportType,
  template,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  // Use quotation_number instead of ID for the URL
  const shareUrl = `${window.location.origin}/quotations/shared/${quotation.quotation_number}`;

  const loadHtml2Pdf = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (window.html2pdf) {
        resolve(window.html2pdf);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => {
        if (window.html2pdf) {
          resolve(window.html2pdf);
        } else {
          reject(new Error('html2pdf failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load html2pdf script'));
      document.head.appendChild(script);
    });
  };

  const handleDownload = async () => {
    if (!pdfContentRef.current) return;
    setIsGeneratingPDF(true);
    try {
      await exportComponentAsPDF(pdfContentRef.current, `${quotation.quotation_number}-quotation.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Quotation ${quotation.quotation_number}`,
        text: `View quotation ${quotation.quotation_number}`,
        url: shareUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  const handleOpenLink = () => {
    window.open(shareUrl, '_blank');
  };

  const generateQRCode = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
  };

  const renderTemplate = () => {
    if (exportType === 'pdf') {
      switch (template) {
        case 'modern':
          return <PdfModernTemplate quotation={quotation} />;
        case 'minimal':
          return <PdfMinimalTemplate quotation={quotation} />;
        case 'detailed':
          return <PdfDetailedTemplate quotation={quotation} />;
        case 'standard':
        default:
          return <PdfStandardTemplate quotation={quotation} />;
      }
    } else {
      switch (template) {
        case 'mobile':
          return <LinkMobileTemplate quotation={quotation} />;
        case 'print':
          return <LinkPrintTemplate quotation={quotation} />;
        case 'modern':
        default:
          return <LinkModernTemplate quotation={quotation} />;
      }
    }
  };

  const getTemplateDisplayName = () => {
    if (exportType === 'pdf') {
      switch (template) {
        case 'modern':
          return 'Modern PDF Template';
        case 'minimal':
          return 'Minimal Template';
        case 'detailed':
          return 'Detailed Template';
        case 'standard':
        default:
          return 'Professional PDF Template';
      }
    } else {
      switch (template) {
        case 'mobile':
          return 'Mobile Optimized';
        case 'print':
          return 'Print Friendly';
        case 'modern':
        default:
          return 'Modern Web View';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-full p-2">
              {exportType === 'pdf' ? (
                <FileText className="w-6 h-6 text-white" />
              ) : (
                <LinkIcon className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {exportType === 'pdf' ? 'PDF Preview' : 'Link Preview & Sharing'}
              </h2>
              <p className="text-gray-600">
                {getTemplateDisplayName()} • {quotation.quotation_number}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-white rounded-full"
            title="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Link Sharing Panel (only for link exports) */}
          {exportType === 'link' && (
            <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Share This Quotation</span>
              </h3>

              {/* Share URL */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareable Link
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                    />
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                      copied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-green-600 text-sm mt-1">Link copied to clipboard!</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleOpenLink}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in New Tab</span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share via...</span>
                </button>

                <button
                  onClick={() => setShowQR(!showQR)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{showQR ? 'Hide' : 'Show'} QR Code</span>
                </button>
              </div>

              {/* QR Code */}
              {showQR && (
                <div className="mb-6 text-center">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block">
                    <img 
                      src={generateQRCode()} 
                      alt="QR Code for quotation link"
                      className="w-32 h-32"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Scan to view quotation on mobile
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Preview Content */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="min-h-full p-4" style={{ overflowX: 'auto' }}>
              <div
                ref={pdfContentRef}
                style={{
                  width: '1200px', // Design width
                  background: '#fff',
                  margin: '0 auto',
                  color: '#222',
                  boxShadow: 'none',
                  border: 'none',
                  position: 'relative',
                  display: 'block',
                }}
                className="pdf-export-content"
              >
              {renderTemplate()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {exportType === 'pdf' 
                ? `Preview of PDF export using ${getTemplateDisplayName().toLowerCase()}`
                : `Interactive web link ready for sharing • ${shareUrl}`
              }
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Close
              </button>
              {exportType === 'pdf' ? (
                <button
                  onClick={handleDownload}
                  disabled={isGeneratingPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
                </button>
              ) : (
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationExportPreview;