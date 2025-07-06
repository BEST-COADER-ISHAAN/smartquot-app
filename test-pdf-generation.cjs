const fs = require('fs');
const path = require('path');

// Test base64 encoding/decoding
function testBase64Encoding() {
  console.log('Testing base64 encoding/decoding...');
  
  // Create a test PDF-like buffer (simulating PDF header)
  const testPdfHeader = Buffer.from('%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n');
  console.log('Original PDF header:', testPdfHeader.toString());
  
  // Encode to base64
  const base64 = testPdfHeader.toString('base64');
  console.log('Base64 encoded:', base64);
  
  // Decode from base64
  const decoded = Buffer.from(base64, 'base64');
  console.log('Decoded PDF header:', decoded.toString());
  
  // Verify they match
  console.log('Match:', testPdfHeader.equals(decoded));
  console.log('Original size:', testPdfHeader.length);
  console.log('Decoded size:', decoded.length);
}

// Test file operations
function testFileOperations() {
  console.log('\nTesting file operations...');
  
  const testContent = 'Test PDF content';
  const testFile = path.join(__dirname, 'test-output.pdf');
  
  // Write test content
  fs.writeFileSync(testFile, testContent);
  console.log('Test file written:', testFile);
  
  // Read and verify
  const readContent = fs.readFileSync(testFile, 'utf8');
  console.log('Read content:', readContent);
  console.log('Content match:', testContent === readContent);
  
  // Clean up
  fs.unlinkSync(testFile);
  console.log('Test file cleaned up');
}

// Run tests
testBase64Encoding();
testFileOperations();

console.log('\nTests completed successfully!'); 