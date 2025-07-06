const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF(htmlPath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load your HTML file (can be a file:// URL or a web URL)
  await page.goto('file://' + path.resolve(htmlPath), { waitUntil: 'networkidle0' });

  // Optional: set viewport size
  await page.setViewport({ width: 1200, height: 1600 });

  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm', left: '10mm', right: '10mm' }
  });

  await browser.close();
  console.log('PDF generated at:', outputPath);
}

// Usage: node scripts/generate-pdf.js path/to/input.html path/to/output.pdf
if (require.main === module) {
  const [,, htmlPath, outputPath] = process.argv;
  if (!htmlPath || !outputPath) {
    console.error('Usage: node generate-pdf.js input.html output.pdf');
    process.exit(1);
  }
  generatePDF(htmlPath, outputPath);
} 