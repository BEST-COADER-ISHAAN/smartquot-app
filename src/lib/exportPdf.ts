// Ensure this file is recognized as a module
export {}; 

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportComponentAsPDF(element: HTMLElement, filename: string = 'document.pdf') {
  // Render the whole element to a single canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#fff'
  });
  const imgData = canvas.toDataURL('image/png');

  // A4 size in points
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Image size in PDF units
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = 0;
  let pageHeightLeft = imgHeight;

  // Add the first page
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

  // Add more pages if needed
  while (pageHeightLeft > pdfHeight) {
    position = position - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    pageHeightLeft -= pdfHeight;
  }

  pdf.save(filename);
}

async function exportWithContentHandling(element: HTMLElement, pdf: jsPDF, a4WidthPt: number, a4HeightPt: number) {
  console.log('=== Export with Content Handling ===');
  
  // Create a clone of the element
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Set up the cloned element for proper rendering
  clonedElement.style.position = 'absolute';
  clonedElement.style.left = '-9999px';
  clonedElement.style.top = '0';
  clonedElement.style.width = '794px'; // A4 width in pixels
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.display = 'block';
  clonedElement.style.visibility = 'visible';
  clonedElement.style.zIndex = '-1';
  clonedElement.style.fontFamily = 'Arial, sans-serif';
  
  // Add to DOM temporarily
  document.body.appendChild(clonedElement);

  try {
    // Wait for element to be rendered
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('Element prepared, dimensions:', clonedElement.offsetWidth, 'x', clonedElement.offsetHeight);
    console.log('Element scroll dimensions:', clonedElement.scrollWidth, 'x', clonedElement.scrollHeight);
    
    // Get the total height of the content
    const totalHeight = clonedElement.scrollHeight;
    const a4HeightPx = 1123; // A4 height in pixels
    const pagesNeeded = Math.ceil(totalHeight / a4HeightPx);
    
    console.log(`Content height: ${totalHeight}px, Pages needed: ${pagesNeeded}`);
    
    // If content fits in one page, render it directly
    if (pagesNeeded <= 1) {
      await renderSinglePage(clonedElement, pdf, a4WidthPt, a4HeightPt);
    } else {
      // Split content across multiple pages
      await renderMultiplePages(clonedElement, pdf, a4WidthPt, a4HeightPt, totalHeight, a4HeightPx, pagesNeeded);
    }
    
  } finally {
    // Clean up
    if (document.body.contains(clonedElement)) {
      document.body.removeChild(clonedElement);
    }
  }
}

async function renderSinglePage(element: HTMLElement, pdf: jsPDF, a4WidthPt: number, a4HeightPt: number) {
  console.log('Rendering single page...');
  
  try {
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      allowTaint: true,
      foreignObjectRendering: false,
      logging: false
    });

    console.log('Canvas created:', canvas.width, 'x', canvas.height);
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    const imgProps = {
      width: canvas.width,
      height: canvas.height
    };
    const pdfWidth = a4WidthPt;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    console.log('Adding to PDF:', pdfWidth, 'x', pdfHeight);
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    console.log('Single page added successfully!');
    
  } catch (error) {
    console.error('Error rendering single page:', error);
    throw error;
  }
}

async function renderMultiplePages(
  element: HTMLElement, 
  pdf: jsPDF, 
  a4WidthPt: number, 
  a4HeightPt: number,
  totalHeight: number,
  a4HeightPx: number,
  pagesNeeded: number
) {
  console.log(`Rendering ${pagesNeeded} pages...`);
  
  for (let page = 0; page < pagesNeeded; page++) {
    if (page > 0) {
      pdf.addPage();
      console.log(`Added new page ${page + 1}`);
    }
    
    try {
      // Calculate the viewport for this page
      const startY = page * a4HeightPx;
      const endY = Math.min((page + 1) * a4HeightPx, totalHeight);
      const pageHeight = endY - startY;
      
      console.log(`Page ${page + 1}: Y range ${startY} to ${endY}, height: ${pageHeight}`);
      
      // Create a container for this page's content
      const pageContainer = element.cloneNode(true) as HTMLElement;
      pageContainer.style.height = `${pageHeight}px`;
      pageContainer.style.overflow = 'hidden';
      pageContainer.style.position = 'relative';
      pageContainer.style.top = `-${startY}px`;
      pageContainer.style.backgroundColor = '#ffffff';
      pageContainer.style.display = 'block';
      pageContainer.style.visibility = 'visible';
      pageContainer.style.width = '794px';
      
      // Add to DOM temporarily
      document.body.appendChild(pageContainer);
      
      try {
        // Wait for layout
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Render this page
        const canvas = await html2canvas(pageContainer, {
          scale: 1,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: 794,
          height: pageHeight,
          scrollX: 0,
          scrollY: 0,
          allowTaint: true,
          foreignObjectRendering: false,
          logging: false
        });

        console.log(`Page ${page + 1} canvas:`, canvas.width, 'x', canvas.height);
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        const imgProps = {
          width: canvas.width,
          height: canvas.height
        };
        const pdfWidth = a4WidthPt;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        console.log(`Page ${page + 1} added to PDF`);
        
      } finally {
        // Clean up page container
        if (document.body.contains(pageContainer)) {
          document.body.removeChild(pageContainer);
        }
      }
      
    } catch (pageError) {
      console.error(`Error processing page ${page + 1}:`, pageError);
      // Continue with next page instead of failing completely
      continue;
    }
  }
} 