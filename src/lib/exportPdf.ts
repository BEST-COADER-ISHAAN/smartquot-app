import jsPDF from 'jspdf';
import { Quotation } from '../types';

// This function is kept for non-PDF exports (like link exports)
export async function exportComponentAsPDF(element: HTMLElement, filename: string = 'document.pdf') {
  try {
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Get the element's text content
    const textContent = element.textContent || '';
    
    // Split text into lines that fit the page width
    const pageWidth = pdf.internal.pageSize.getWidth() - 20; // 10mm margin on each side
    const fontSize = 12;
    pdf.setFontSize(fontSize);
    
    const lines = pdf.splitTextToSize(textContent, pageWidth);
    
    let yPosition = 20; // Start 20mm from top
    
    for (let i = 0; i < lines.length; i++) {
      if (yPosition > pdf.internal.pageSize.getHeight() - 20) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.text(lines[i], 10, yPosition);
      yPosition += fontSize * 0.5; // Line spacing
    }
    
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

// Note: All PDF template exports are now handled by the Netlify function
// which renders React components to HTML and generates pixel-perfect PDFs 