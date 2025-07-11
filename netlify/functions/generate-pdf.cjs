const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const os = require('os');

exports.handler = async function(event, context) {
  try {
    // Parse request body
    const body = event.body ? JSON.parse(event.body) : {};
    const { html } = body;

    if (!html) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'HTML content is required' })
      };
    }

    // Create temporary HTML file
    const tempHtmlPath = path.join(os.tmpdir(), `quotation-${Date.now()}.html`);
    fs.writeFileSync(tempHtmlPath, html, 'utf8');

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

    const page = await browser.newPage();
    await page.setViewport({ 
      width: 1600, 
      height: 1200,
      deviceScaleFactor: 1
    });
    await page.goto('file://' + tempHtmlPath, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
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
      scale: 0.9
    });

    await browser.close();
    fs.unlinkSync(tempHtmlPath);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=quotation.pdf'
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, stack: error.stack })
    };
  }
}; 