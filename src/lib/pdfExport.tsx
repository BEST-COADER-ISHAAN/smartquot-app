import { Quotation } from '../types';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import PdfTemplate from '../components/Quotations/templates/PdfTemplate';
import PdfStandardTemplate from '../components/Quotations/templates/PdfStandardTemplate';
import PdfModernTemplate from '../components/Quotations/templates/PdfModernTemplate';
import PdfDetailedTemplate from '../components/Quotations/templates/PdfDetailedTemplate';
import { getCompanyDetailsFromQuotationAsync } from '../lib/companyUtils';
import { formatSizeForDisplay } from '../lib/sizeUtils';
import { getUserSettings } from '../lib/api';
import { supabase } from '../lib/supabase';

export async function generatePDF(quotation: Quotation): Promise<void> {
  const blob = await generatePDFBlob(quotation);
  
  // Create download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${quotation.quotation_number}-quotation.pdf`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Clean up
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 1000);
}

export async function generatePDFBlob(quotation: Quotation): Promise<Blob> {
  try {
    // Get user's actual preferred size unit from settings
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    let preferredSizeUnit: 'inches' | 'mm' | 'feet' | 'custom' = 'mm'; // default fallback
    
    if (userId) {
      try {
        const userSettings = await getUserSettings(userId);
        const userPreferred = userSettings?.preferred_size_unit;
        preferredSizeUnit = (userPreferred && ['inches', 'mm', 'feet', 'custom'].includes(userPreferred)) 
          ? userPreferred as 'inches' | 'mm' | 'feet' | 'custom' 
          : 'mm';
      } catch (error) {
        // Fallback to localStorage
        const localPreferred = localStorage.getItem('preferred_size_unit');
        preferredSizeUnit = (localPreferred && ['inches', 'mm', 'feet', 'custom'].includes(localPreferred)) 
          ? localPreferred as 'inches' | 'mm' | 'feet' | 'custom' 
          : 'mm';
      }
    } else {
      // Fallback to localStorage if no user
      const localPreferred = localStorage.getItem('preferred_size_unit');
      preferredSizeUnit = (localPreferred && ['inches', 'mm', 'feet', 'custom'].includes(localPreferred)) 
        ? localPreferred as 'inches' | 'mm' | 'feet' | 'custom' 
        : 'mm';
    }
    
    // Precompute formattedSizeMap for all templates
    const uniqueSizes = new Set<string>();
    (quotation.rooms || []).forEach(room => {
      (room.items || []).forEach(item => {
        if (item?.product?.size) uniqueSizes.add(item.product.size);
      });
    });
    const formattedSizeMap: Record<string, string> = {};
    for (const size of uniqueSizes) {
      formattedSizeMap[size] = await formatSizeForDisplay(size, preferredSizeUnit);
    }

    // Select the appropriate template based on the quotation's pdf_template setting
    let TemplateComponent;
    let extraProps: any = { formattedSizeMap, preferredSizeUnit };
    switch (quotation.pdf_template) {
      case 'standard':
        TemplateComponent = PdfStandardTemplate;
        break;
      case 'modern':
        TemplateComponent = PdfModernTemplate;
        break;
      case 'detailed':
        TemplateComponent = PdfDetailedTemplate;
        break;
      case 'minimal':
      default:
        TemplateComponent = PdfTemplate; // This is the minimal template
        break;
    }

    // Fetch company profile before rendering
    const companyProfile = await getCompanyDetailsFromQuotationAsync(quotation);

    // Render the PDF template to HTML
    const html = ReactDOMServer.renderToStaticMarkup(
      <TemplateComponent quotation={quotation} companyProfile={companyProfile} {...extraProps} />
    );

    // Wrap in a full HTML document with Tailwind CSS and custom styles
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quotation ${quotation.quotation_number}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    body, * {
      font-family: 'Oxygen', 'Noto Sans', 'Open Sans', Arial, sans-serif !important;
    }
    body {
      margin: 0;
      padding: 0;
    }
    /* Table styles for better PDF rendering */
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      word-wrap: break-word;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 8px;
      text-align: left;
      vertical-align: top;
      word-break: break-word;
      font-size: 12px;
    }
    /* Override table cell font sizes for specific classes */
    td.text-\\[9px\\] {
      font-size: 9px !important;
    }
    td.text-\\[10px\\] {
      font-size: 10px !important;
    }
    th.text-\\[9px\\] {
      font-size: 9px !important;
    }
    th.text-\\[10px\\] {
      font-size: 10px !important;
    }
    /* Add overrides for 11px and 13px */
    td.text-\\[11px\\] {
      font-size: 11px !important;
    }
    th.text-\\[11px\\] {
      font-size: 11px !important;
    }
    td.text-\\[13px\\] {
      font-size: 13px !important;
    }
    th.text-\\[13px\\] {
      font-size: 13px !important;
    }
    /* Add override for 14px */
    td.text-\\[14px\\] {
      font-size: 14px !important;
    }
    th.text-\\[14px\\] {
      font-size: 14px !important;
    }
    /* Add override for 15px */
    td.text-\\[15px\\] {
      font-size: 15px !important;
    }
    th.text-\\[15px\\] {
      font-size: 15px !important;
    }
    /* Add override for 18px */
    td.text-\\[18px\\] {
      font-size: 18px !important;
    }
    th.text-\\[18px\\] {
      font-size: 18px !important;
    }
    /* Add override for 22px */
    td.text-\\[22px\\] {
      font-size: 22px !important;
    }
    th.text-\\[22px\\] {
      font-size: 22px !important;
    }
    th {
      background-color: #4f81bc;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
    }
    /* Ensure tables don't overflow */
    .overflow-x-auto {
      overflow-x: visible !important;
      width: 100%;
    }
    /* Page break handling */
    .page-break {
      page-break-before: always;
    }
    .avoid-break {
      page-break-inside: avoid;
    }
    /* Table row styling */
    tr:nth-child(even) {
      background-color: #f8fafc;
    }
    tr:nth-child(odd) {
      background-color: #ffffff;
    }
    /* Responsive table */
    @media print {
      body { 
        margin: 0; 
        padding: 0;
      }
      .page-break { 
        page-break-before: always; 
      }
      table {
        page-break-inside: auto;
      }
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
      thead {
        display: table-header-group;
      }
      tfoot {
        display: table-footer-group;
      }
      /* Ensure content fits on page */
      .min-h-screen {
        min-height: auto !important;
      }
      /* Force table to fit page width */
      .max-w-4xl, .max-w-5xl {
        max-width: none !important;
        width: 100% !important;
      }
    }
    /* Additional styles for better table handling */
    .table-auto {
      table-layout: auto;
    }
    .table-fixed {
      table-layout: fixed;
    }
    /* Ensure text doesn't overflow */
    .text-left {
      text-align: left;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
    /* Font size adjustments for better fit */
    .text-sm {
      font-size: 11px !important;
    }
    .text-xs {
      font-size: 10px;
    }
    /* Specific font sizes for totals and room totals */
    .text-\\[10px\\] {
      font-size: 10px !important;
    }
    .text-base {
      font-size: 16px !important;
    }
    .text-lg {
      font-size: 18px !important;
    }
    .text-xl {
      font-size: 20px !important;
    }
    /* Ensure proper spacing */
    .p-3 {
      padding: 6px;
    }
    .p-4 {
      padding: 8px;
    }
    /* Grid adjustments for PDF */
    .grid {
      display: block;
    }
    .grid-cols-2 > * {
      display: block;
      width: 100%;
      margin-bottom: 20px;
    }
    .grid-cols-3 > * {
      display: block;
      width: 100%;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

    // Call the PDF generation API
    let apiUrl = '/.netlify/functions/generate-pdf';
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      apiUrl = '/api/generate-pdf';
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: fullHtml })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`PDF generation failed: ${response.status} - ${errorText}`);
    }

    // Get the PDF as base64
    const pdfBase64 = await response.text();
    
    // Convert base64 to blob
    const binaryString = atob(pdfBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const blob = new Blob([bytes], { type: 'application/pdf' });
    
    return blob;

  } catch (error) {
    throw new Error('Failed to generate PDF. Please try again.');
  }
} 