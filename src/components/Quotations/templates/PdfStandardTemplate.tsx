import React from 'react';
import { Quotation } from '../../../types';
import PDFQuotation from '../../../components/ui/PDFQuotation';

interface PdfStandardTemplateProps {
  quotation: Quotation;
}

const PdfStandardTemplate: React.FC<PdfStandardTemplateProps> = ({ quotation }) => {
  // Fetch company profile from localStorage
  const companyProfile = {
    companyName: typeof window !== 'undefined' ? localStorage.getItem('company_name') || 'Your Company Name' : 'Your Company Name',
    companyAddress: typeof window !== 'undefined' ? localStorage.getItem('company_address') || 'Your Company Address' : 'Your Company Address',
    companyPhone: typeof window !== 'undefined' ? localStorage.getItem('company_phone') || '+91-0000000000' : '+91-0000000000',
    companyEmail: typeof window !== 'undefined' ? localStorage.getItem('company_email') || 'info@yourcompany.com' : 'info@yourcompany.com',
    gstNo: typeof window !== 'undefined' ? localStorage.getItem('gst_no') || '' : '',
  };
  return <PDFQuotation quotation={quotation} companyProfile={companyProfile} />;
};

export default PdfStandardTemplate;