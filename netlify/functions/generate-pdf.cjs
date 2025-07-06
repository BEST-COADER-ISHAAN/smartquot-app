const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const os = require('os');

exports.handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    console.log('=== PDF Generation Started ===');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Platform:', process.platform);
    console.log('Architecture:', process.arch);
    console.log('Node version:', process.version);
    console.log('Available memory:', process.memoryUsage());
    
    const { html } = JSON.parse(event.body);
    console.log('Received HTML length:', html.length);
    console.log('HTML preview (first 500 chars):', html.substring(0, 500));
    
    const fs = require('fs');
    const path = require('path');
    const tempHtmlPath = path.join(os.tmpdir(), 'temp-quotation.html');
    fs.writeFileSync(tempHtmlPath, html, 'utf8');
    console.log('HTML file written to:', tempHtmlPath);

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    console.log('Browser launched successfully');

    console.log('Creating new page...');
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log('Navigating to HTML file...');
    await page.goto('file://' + tempHtmlPath, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    console.log('Page loaded successfully');

    // Wait for CSS to load and render
    console.log('Waiting for CSS to load...');
    await new Promise(resolve => setTimeout(resolve, 3000)); // Increased wait time
    
    // Debug: Check what's actually on the page
    const pageContent = await page.evaluate(() => {
      return {
        title: document.title,
        bodyHTML: document.body.innerHTML.substring(0, 1000),
        bodyText: document.body.textContent ? document.body.textContent.substring(0, 500) : 'No text content',
        bodyChildren: document.body.children.length,
        computedStyles: {
          backgroundColor: getComputedStyle(document.body).backgroundColor,
          color: getComputedStyle(document.body).color,
          fontSize: getComputedStyle(document.body).fontSize
        }
      };
    });
    
    console.log('Page content debug:', pageContent);
    
    // Check if content is visible
    const contentCheck = await page.evaluate(() => {
      const body = document.body;
      const allText = body.textContent || '';
      const visibleElements = body.querySelectorAll('*');
      const styles = getComputedStyle(body);
      
      return {
        hasContent: body.textContent && body.textContent.trim().length > 0,
        bodyHeight: body.scrollHeight,
        bodyWidth: body.scrollWidth,
        textContent: body.textContent ? body.textContent.substring(0, 200) : 'No content',
        allTextLength: allText.length,
        visibleElementsCount: visibleElements.length,
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        fontSize: styles.fontSize,
        htmlContent: body.innerHTML.substring(0, 500)
      };
    });
    
    console.log('Content check:', contentCheck);
    
    if (!contentCheck.hasContent) {
      console.error('No content detected. HTML preview:', contentCheck.htmlContent);
      throw new Error('No content detected in HTML. PDF would be blank.');
    }

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '10mm', right: '10mm' },
      preferCSSPageSize: true
    });
    console.log('PDF generated successfully, size:', pdfBuffer.length);
    console.log('PDF buffer first 100 bytes:', Array.from(pdfBuffer.slice(0, 100)));
    console.log('PDF buffer last 100 bytes:', Array.from(pdfBuffer.slice(-100)));
    
    // Check if PDF starts with correct header
    const pdfHeader = pdfBuffer.slice(0, 8).toString();
    console.log('PDF header:', pdfHeader);
    console.log('Is valid PDF header:', pdfHeader.startsWith('%PDF'));

    if (!pdfHeader.startsWith('%PDF')) {
      throw new Error('Generated PDF does not have valid PDF header');
    }

    console.log('Closing browser...');
    await browser.close();
    console.log('Cleaning up temp file...');
    fs.unlinkSync(tempHtmlPath);
    console.log('PDF generation completed successfully');
    console.log('Base64 encoded size:', pdfBuffer.toString('base64').length);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=quotation.pdf',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: Buffer.from(pdfBuffer).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('=== PDF Generation Error ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error type:', error.constructor.name);
    console.error('Error code:', error.code);
    console.error('Error signal:', error.signal);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        type: error.constructor.name,
        code: error.code,
        signal: error.signal
      }),
    };
  }
}; 