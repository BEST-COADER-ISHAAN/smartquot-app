/*
  # Temporarily Disable RLS for Testing

  This script temporarily disables RLS on the products table to test if the import works.
  This will help us determine if the issue is with RLS policies or something else.
*/

-- Temporarily disable RLS on products table
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Show the current RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'products' 
AND schemaname = 'public';

-- Verify the created_by field type
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'created_by' 
AND table_schema = 'public';

-- Show status messages
DO $$
BEGIN
    RAISE NOTICE '=== RLS TEMPORARILY DISABLED ===';
    RAISE NOTICE 'Products table RLS is now disabled';
    RAISE NOTICE 'Try importing products now to see if it works';
    RAISE NOTICE 'If it works, we know the issue is with RLS policies';
    RAISE NOTICE 'If it still fails, there is another issue';
END $$; 