-- Script to fix user isolation for existing products
-- This script will help assign existing products to the current user

-- First, let's see what products exist and their current created_by values
SELECT 
  id,
  design_name,
  created_by,
  created_at
FROM products 
ORDER BY created_at DESC
LIMIT 10;

-- To fix this, you have a few options:

-- Option 1: Update all products to belong to your current Auth0 user ID
-- Replace 'your-auth0-user-id-here' with your actual Auth0 user ID
-- You can find your Auth0 user ID in the browser console when you log in
-- UPDATE products 
-- SET created_by = 'your-auth0-user-id-here'
-- WHERE created_by IS NULL OR created_by = '';

-- Option 2: If you want to keep user isolation but allow access to all products temporarily
-- You can temporarily disable RLS on the products table:
-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Option 3: Create a more permissive RLS policy for products
-- This will allow users to see all products but only edit their own:
-- DROP POLICY IF EXISTS "Users can view all products" ON products;
-- CREATE POLICY "Users can view all products" ON products
--   FOR SELECT USING (true);

-- Option 4: Update the RLS policy to allow access to products with null created_by
-- DROP POLICY IF EXISTS "Users can view their own products" ON products;
-- CREATE POLICY "Users can view their own products" ON products
--   FOR SELECT USING (
--     created_by = current_setting('app.auth0_user_id', true)::text
--     OR created_by IS NULL
--     OR created_by = ''
--   ); 