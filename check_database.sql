-- Check what's in the database
-- Run these queries in your Supabase SQL editor

-- 1. Check if products table exists and has data
SELECT 
  COUNT(*) as total_products,
  COUNT(CASE WHEN created_by IS NULL THEN 1 END) as null_created_by,
  COUNT(CASE WHEN created_by = '' THEN 1 END) as empty_created_by,
  COUNT(CASE WHEN created_by IS NOT NULL AND created_by != '' THEN 1 END) as has_created_by
FROM products;

-- 2. Show sample products if any exist
SELECT 
  id,
  design_name,
  collection,
  size,
  created_by,
  created_at
FROM products 
ORDER BY created_at DESC
LIMIT 5;

-- 3. Check if there are any products at all
SELECT EXISTS(SELECT 1 FROM products LIMIT 1) as products_exist;

-- 4. Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position; 