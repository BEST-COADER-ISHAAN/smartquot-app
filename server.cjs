const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// PDF generation endpoint
app.post('/api/generate-pdf', async (req, res) => {
  console.log('=== PDF Generation Request ===');
  
  try {
    const { html } = req.body;
    
    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    console.log('Received HTML length:', html.length);
    
    // Create temporary HTML file
    const tempHtmlPath = path.join(os.tmpdir(), `quotation-${Date.now()}.html`);
    fs.writeFileSync(tempHtmlPath, html, 'utf8');
    console.log('HTML file written to:', tempHtmlPath);

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    console.log('Browser launched successfully');

    const page = await browser.newPage();
    
    // Set a larger viewport to handle wide tables
    await page.setViewport({ 
      width: 1600, 
      height: 1200,
      deviceScaleFactor: 1
    });
    
    console.log('Loading HTML...');
    await page.goto('file://' + tempHtmlPath, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    console.log('HTML loaded successfully');

    // Wait for content to render and fonts to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Inject additional CSS to ensure tables fit properly
    await page.addStyleTag({
      content: `
        @media print {
          body { margin: 0; padding: 0; }
          table { width: 100% !important; max-width: none !important; }
          .overflow-x-auto { overflow: visible !important; }
          th, td { 
            font-size: 10px !important; 
            padding: 4px !important;
            word-break: break-word !important;
          }
          .page-break { page-break-before: always; }
          tr { page-break-inside: avoid; }
          thead { display: table-header-group; }
          tfoot { display: table-footer-group; }
        }
      `
    });
    
    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { 
        top: '15mm', 
        bottom: '15mm', 
        left: '8mm', 
        right: '8mm' 
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      scale: 0.9 // Slightly scale down to ensure content fits
    });
    console.log('PDF generated successfully, size:', pdfBuffer.length);

    await browser.close();
    fs.unlinkSync(tempHtmlPath);
    console.log('Cleanup completed');

    // Return PDF as base64
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=quotation.pdf'
    });
    
    res.send(Buffer.from(pdfBuffer).toString('base64'));

  } catch (error) {
    console.error('=== PDF Generation Error ===');
    console.error('Error:', error.message);
    
    res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`PDF server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`PDF endpoint: http://localhost:${PORT}/api/generate-pdf`);
});

module.exports = app; 