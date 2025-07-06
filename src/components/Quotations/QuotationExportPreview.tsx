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
import ReactDOMServer from 'react-dom/server';

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

  const handleDownload = async () => {
    setIsGeneratingPDF(true);
    try {
      if (exportType === 'pdf') {
        // Render the selected template to HTML string
        let html = '';
        if (template === 'standard') {
          html = ReactDOMServer.renderToStaticMarkup(
            <PdfStandardTemplate quotation={quotation} />
          );
        } else if (template === 'modern') {
          html = ReactDOMServer.renderToStaticMarkup(
            <PdfModernTemplate quotation={quotation} />
          );
        } else if (template === 'minimal') {
          html = ReactDOMServer.renderToStaticMarkup(
            <PdfMinimalTemplate quotation={quotation} />
          );
        } else if (template === 'detailed') {
          html = ReactDOMServer.renderToStaticMarkup(
            <PdfDetailedTemplate quotation={quotation} />
          );
        } else {
          html = ReactDOMServer.renderToStaticMarkup(
            <PdfStandardTemplate quotation={quotation} />
          );
        }
        // Wrap in a full HTML document with Tailwind CDN
        const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title>Quotation PDF</title>
  <link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' rel='stylesheet'>
  <style>
    /* Fallback styles in case Tailwind doesn't load */
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 30px; }
    .section { margin-bottom: 20px; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .table th { background-color: #f8f9fa; }
  </style>
</head>
<body>
  <div class="container">
    ${html}
  </div>
</body>
</html>`;

        console.log('HTML being sent to Netlify function:');
        console.log('HTML length:', fullHtml.length);
        console.log('HTML preview:', fullHtml.substring(0, 500));
        
        // Call Netlify function
        const response = await fetch('/.netlify/functions/generate-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: fullHtml })
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Netlify function error:', errorText);
          throw new Error(`PDF generation failed: ${response.status} - ${errorText}`);
        }
        
        // Check if response is actually base64 or binary
        const responseText = await response.text();
        console.log('Response text length:', responseText.length);
        console.log('Response preview:', responseText.substring(0, 100));
        
        // Check if response is an error JSON
        try {
          const errorCheck = JSON.parse(responseText);
          if (errorCheck.error) {
            console.error('Netlify function returned error:', errorCheck);
            throw new Error(`PDF generation failed: ${errorCheck.error}`);
          }
        } catch (e) {
          // Not JSON, continue with PDF processing
        }
        
        let pdfData;
        
        // Check if it looks like base64
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        const cleanText = responseText.replace(/\s/g, '');
        const isBase64 = base64Regex.test(cleanText);
        
        console.log('Is base64 format:', isBase64);
        
        if (isBase64) {
            // Decode base64 to binary
            const binaryString = atob(cleanText);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            pdfData = bytes.buffer;
            console.log('Decoded PDF size:', pdfData.byteLength);
        } else {
            // It's binary data, convert text back to binary
            const bytes = new Uint8Array(responseText.length);
            for (let i = 0; i < responseText.length; i++) {
                bytes[i] = responseText.charCodeAt(i);
            }
            pdfData = bytes.buffer;
            console.log('Binary PDF size:', pdfData.byteLength);
        }
        
        // Debug: Check what we're actually getting
        const pdfHeader = new Uint8Array(pdfData.slice(0, 8));
        const pdfHeaderText = String.fromCharCode.apply(null, Array.from(pdfHeader));
        console.log('PDF header:', pdfHeaderText);
        console.log('PDF header bytes:', Array.from(pdfHeader));
        console.log('First 20 bytes:', Array.from(new Uint8Array(pdfData.slice(0, 20))));
        
        // Check if PDF is valid
        if (!pdfHeaderText.startsWith('%PDF')) {
          console.error('Invalid PDF header:', pdfHeaderText);
          throw new Error('Generated PDF is not valid. Please try again.');
        }
        
        // Create blob from PDF data
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        console.log('Blob size:', blob.size);
        console.log('Blob type:', blob.type);
        
        if (blob.size === 0) {
          throw new Error('Generated PDF is empty. Please try again.');
        }
        
        // Ensure blob is fully ready before creating URL
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Create blob URL only after ensuring blob is ready
        const url = window.URL.createObjectURL(blob);
        
        // Use a more reliable download method
        const a = document.createElement('a');
        a.href = url;
        a.download = `${quotation.quotation_number}-quotation.pdf`;
        a.style.display = 'none';
        document.body.appendChild(a);
        
        // Trigger download
        a.click();
        
        // Remove the element immediately
        document.body.removeChild(a);
        
        // Clean up the blob URL after a longer delay to ensure download completes
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 5000);
      } else {
        if (!pdfContentRef.current) return;
        await exportComponentAsPDF(pdfContentRef.current, `${quotation.quotation_number}-quotation.pdf`);
      }
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