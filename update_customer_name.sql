-- Update the customer name from "PDF Minimal" to a proper name
UPDATE customers 
SET 
  name = 'John Doe',
  email = 'john.doe@example.com',
  phone = '+91-9876543210',
  site_address = '123 Main Street, City, State 12345',
  updated_at = NOW()
WHERE id = 'd0895e7b-2b46-4d58-bb95-7d78b76cf8a2';

-- Verify the update
SELECT id, name, email, phone, site_address, updated_at 
FROM customers 
WHERE id = 'd0895e7b-2b46-4d58-bb95-7d78b76cf8a2'; 