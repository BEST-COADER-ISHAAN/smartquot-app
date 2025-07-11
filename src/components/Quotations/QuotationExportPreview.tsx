import React, { useState } from 'react';
import { X, Share2, ExternalLink, Link as LinkIcon, Copy, Check, Eye, Globe, QrCode, Download, FileText, Loader } from 'lucide-react';
import { Quotation } from '../../types';
import LinkModernTemplate from './templates/LinkModernTemplate';
import LinkMobileTemplate from './templates/LinkMobileTemplate';
import LinkPrintTemplate from './templates/LinkPrintTemplate';
import PdfTemplate from './templates/PdfTemplate';
import { generatePDF, generatePDFBlob } from '../../lib/pdfExport';
import OnlineQuotationComponent from '@/components/ui/OnlineQuotationComponent';
import { usePreferredSizeUnit } from '../../hooks/usePreferredSizeUnit';
import { formatSizeForDisplay } from '../../lib/sizeUtils';
import { getCompanyDetailsFromQuotationAsync, getCurrentCompanySlugAsync } from '../../lib/companyUtils';

interface QuotationExportPreviewProps {
  quotation: Quotation;
  exportType: 'pdf' | 'link' | 'both';
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
  const { preferredSizeUnit } = usePreferredSizeUnit();
  const [formattedSizeMap, setFormattedSizeMap] = useState<Record<string, string>>({});
  const [sizeLoading, setSizeLoading] = useState(true);
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [companySlug, setCompanySlug] = useState<string | null>(null);

  React.useEffect(() => {
    async function computeSizes() {
      setSizeLoading(true);
      const uniqueSizes = new Set<string>();
      quotation.rooms?.forEach(room => {
        room.items?.forEach(item => {
          if (item?.product?.size) uniqueSizes.add(item.product.size);
        });
      });
      const map: Record<string, string> = {};
      for (const size of uniqueSizes) {
        map[size] = await formatSizeForDisplay(size, preferredSizeUnit);
      }
      setFormattedSizeMap(map);
      setSizeLoading(false);
    }
    computeSizes();
  }, [quotation, preferredSizeUnit]);

  React.useEffect(() => {
    let mounted = true;
    setCompanyLoading(true);
    setCompanyError(null);
    getCompanyDetailsFromQuotationAsync(quotation)
      .then(details => {
        if (mounted) {
          setCompanyProfile(details);
          setCompanyLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setCompanyError('Could not load company profile. Please check your login or profile settings.');
          setCompanyProfile(null);
          setCompanyLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [quotation]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const slug = await getCurrentCompanySlugAsync();
      if (mounted) setCompanySlug(slug);
    })();
    return () => { mounted = false; };
  }, []);

  // Use companySlug and quotation_number for the URL
  const shareUrl = companySlug
    ? `${window.location.origin}/${companySlug}/quotations/shared/${quotation.quotation_number}`
    : '';

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

  const handleShare = async (shareType: 'pdf' | 'link' = 'link') => {
    
    if (navigator.share) {
      if (shareType === 'pdf') {
        // For PDF sharing, generate the PDF first and then share it
        try {
          setIsGeneratingPDF(true);
          const pdfBlob = await generatePDFBlob(quotation);
          
          // Create a file from the blob
          const pdfFile = new File([pdfBlob], `quotation-${quotation.quotation_number}.pdf`, {
            type: 'application/pdf'
          });
          
          // Check if file sharing is supported
          const canShareFiles = navigator.canShare && navigator.canShare({ files: [pdfFile] });
          
          if (canShareFiles) {
            await navigator.share({
              title: `Quotation ${quotation.quotation_number} - PDF`,
              text: `Quotation ${quotation.quotation_number} PDF document`,
              files: [pdfFile]
            });
          } else {
            try {
              // Try to share the file even if canShare returns false
              await navigator.share({
                title: `Quotation ${quotation.quotation_number} - PDF`,
                text: `Quotation ${quotation.quotation_number} PDF document`,
                files: [pdfFile]
              });
            } catch (shareError) {
              // Fallback to link sharing if file sharing is not supported
              navigator.share({
                title: `Quotation ${quotation.quotation_number} - PDF`,
                text: `Quotation ${quotation.quotation_number} PDF document`,
                url: shareUrl,
              });
            }
          }
        } catch (error) {
          // Fallback to link sharing
          navigator.share({
            title: `Quotation ${quotation.quotation_number} - PDF`,
            text: `Quotation ${quotation.quotation_number} PDF document`,
            url: shareUrl,
          });
        } finally {
          setIsGeneratingPDF(false);
        }
      } else {
        // For link sharing
        navigator.share({
          title: `Quotation ${quotation.quotation_number}`,
          text: `View quotation ${quotation.quotation_number}`,
          url: shareUrl,
        });
      }
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

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDF(quotation);
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePreparePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdfBlob = await generatePDFBlob(quotation);
      setPdfFile(new File([pdfBlob], `quotation-${quotation.quotation_number}.pdf`, { type: 'application/pdf' }));
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSharePDF = async () => {
    if (!pdfFile) return;
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      try {
        await navigator.share({
          title: `Quotation ${quotation.quotation_number} - PDF`,
          text: `Quotation ${quotation.quotation_number} PDF document`,
          files: [pdfFile],
        });
      } catch (error) {
        alert('Sharing was cancelled or failed.');
      }
    } else {
      alert('PDF file sharing is not supported on this device/browser.');
    }
  };

  const renderTemplate = () => {
    if (exportType === 'pdf') {
      if (sizeLoading || companyLoading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
      if (companyError) return <div className="p-8 text-center text-red-600">{companyError}</div>;
      if (!companyProfile) return <div className="p-8 text-center text-red-600">No company profile found. Please update your profile settings.</div>;
      return <PdfTemplate quotation={quotation} formattedSizeMap={formattedSizeMap} companyProfile={companyProfile} preferredSizeUnit={preferredSizeUnit} />;
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
      return 'PDF Template';
    } else {
      switch (template) {
        case 'mobile':
          return 'Mobile Template';
        case 'print':
          return 'Print Template';
        case 'modern':
        default:
          return 'Modern Template';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" style={{ fontFamily: "Oxygen, Noto Sans, Open Sans, Arial, sans-serif" }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[92vh] overflow-hidden border border-gray-200">
        {/* Gradient Header Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500" />
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-gradient-to-r from-sky-50 to-blue-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 shadow">
              {exportType === 'pdf' ? (
                <FileText className="h-7 w-7 text-sky-700" />
              ) : (
                <LinkIcon className="h-7 w-7 text-blue-600" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                {exportType === 'pdf' ? 'Export PDF' : 'Share Quotation'}
                <span className="ml-2 px-2 py-0.5 rounded bg-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-wider border border-sky-200">
                  {getTemplateDisplayName()}
                </span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">Quotation #{quotation.quotation_number}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            title="Close"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-[calc(92vh-90px)]">
          {/* Preview */}
          <div className="flex-1 px-8 py-6 overflow-y-auto bg-gradient-to-br from-white to-blue-50">
            <div className="bg-white rounded-xl border border-sky-100 shadow p-6 mb-4">
              <div className="flex items-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mr-2 border border-sky-200">Preview</span>
              </div>
              <div className="bg-gray-50 rounded-lg border p-4 shadow-inner">
                {renderTemplate()}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 px-8 py-6 border-l bg-gradient-to-b from-sky-50 to-white flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg text-sky-800 mb-6">
                {exportType === 'pdf' ? 'Export Options' : 'Share Options'}
              </h3>
              {/* URL Display - Only for link exports */}
              {exportType !== 'pdf' && (
                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Share URL
                  </label>
                  <div className="flex rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 px-3 py-2 text-xs bg-white focus:outline-none"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-2 bg-sky-600 text-white hover:bg-sky-700 transition-colors text-xs font-semibold"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                {exportType === 'pdf' ? (
                  <>
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg shadow hover:from-sky-700 hover:to-blue-700 transition-colors disabled:opacity-50 text-base font-semibold"
                    >
                      <Download className="h-5 w-5" />
                      <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
                    </button>
                    {!pdfFile ? (
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={handlePreparePDF}
                        disabled={isGeneratingPDF}
                      >
                        {isGeneratingPDF ? <Loader className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                        {isGeneratingPDF ? 'Preparing PDF...' : 'Prepare PDF for Sharing'}
                      </button>
                    ) : (
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                        onClick={handleSharePDF}
                      >
                        <Share2 className="w-4 h-4" />
                        Share PDF
                      </button>
                    )}
                  </>
                ) : exportType === 'link' ? (
                  <>
                    <button
                      onClick={() => handleShare('link')}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-lg shadow hover:from-blue-700 hover:to-sky-600 transition-colors text-base font-semibold"
                    >
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                    <button
                      onClick={handleOpenLink}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg shadow hover:from-gray-700 hover:to-gray-900 transition-colors text-base font-semibold"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Open Link</span>
                    </button>
                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow hover:from-green-600 hover:to-emerald-700 transition-colors text-base font-semibold"
                    >
                      <QrCode className="h-5 w-5" />
                      <span>{showQR ? 'Hide' : 'Show'} QR Code</span>
                    </button>
                  </>
                ) : (
                  // exportType === 'both'
                  <>
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg shadow hover:from-sky-700 hover:to-blue-700 transition-colors disabled:opacity-50 text-base font-semibold"
                    >
                      <Download className="h-5 w-5" />
                      <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
                    </button>
                    <button
                      onClick={() => handleShare('pdf')}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-lg shadow hover:from-blue-700 hover:to-sky-600 transition-colors text-base font-semibold"
                    >
                      <Share2 className="h-5 w-5" />
                      <span>Share PDF</span>
                    </button>
                    <button
                      onClick={() => handleShare('link')}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg shadow hover:from-green-700 hover:to-emerald-700 transition-colors text-base font-semibold"
                    >
                      <Share2 className="h-5 w-5" />
                      <span>Share Link</span>
                    </button>
                    <button
                      onClick={handleOpenLink}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg shadow hover:from-gray-700 hover:to-gray-900 transition-colors text-base font-semibold"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Open Link</span>
                    </button>
                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow hover:from-purple-600 hover:to-indigo-700 transition-colors text-base font-semibold"
                    >
                      <QrCode className="h-5 w-5" />
                      <span>{showQR ? 'Hide' : 'Show'} QR Code</span>
                    </button>
                  </>
                )}
              </div>

              {/* QR Code */}
              {showQR && (
                <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow flex flex-col items-center">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">QR Code</h4>
                  <img 
                    src={generateQRCode()} 
                    alt="QR Code"
                    className="w-32 h-32 mb-2"
                  />
                  <p className="text-xs text-gray-500 text-center">
                    Scan to open the quotation
                  </p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className={`mt-8 p-4 rounded-xl border shadow-inner ${exportType === 'pdf' ? 'bg-sky-50 border-sky-100' : 'bg-blue-50 border-blue-100'}`}>
              <h4 className={`text-xs font-bold mb-2 ${exportType === 'pdf' ? 'text-sky-800' : 'text-blue-800'}`}>
                {exportType === 'pdf' ? 'PDF Export' : 'How it works'}
              </h4>
              <ul className={`text-xs space-y-1 ${exportType === 'pdf' ? 'text-sky-700' : 'text-blue-700'}`}>
                {exportType === 'pdf' ? (
                  <>
                    <li>• Generate a professional PDF</li>
                    <li>• Perfect for printing and sharing</li>
                    <li>• Includes all quotation details</li>
                    <li>• High-quality formatting</li>
                  </>
                ) : (
                  <>
                    <li>• Share the link with your customers</li>
                    <li>• They can view the quotation online</li>
                    <li>• No PDF download required</li>
                    <li>• Works on all devices</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationExportPreview;