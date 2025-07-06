// Simple script to give unlimited access to bestcoaderishaan@gmail.com
import https from 'https';

const data = JSON.stringify({
  email: 'bestcoaderishaan@gmail.com'
});

const options = {
  hostname: 'swkhbscrarghijklmnopqrst.supabase.co',
  port: 443,
  path: '/functions/v1/admin',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end(); 