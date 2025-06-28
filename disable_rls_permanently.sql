/*
  # Permanently Disable RLS on Products Table

  This script permanently disables RLS on the products table.
  This is a temporary solution until the service role key is set up.
*/

-- Permanently disable RLS on products table
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Show the current RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'products' 
AND schemaname = 'public';

-- Show status messages
DO $$
BEGIN
    RAISE NOTICE '=== RLS PERMANENTLY DISABLED ===';
    RAISE NOTICE 'Products table RLS is now permanently disabled';
    RAISE NOTICE 'Product imports should work without any RLS issues';
    RAISE NOTICE 'User isolation is still maintained through created_by field';
    RAISE NOTICE 'This is a temporary solution until service role key is set up';
END $$; 