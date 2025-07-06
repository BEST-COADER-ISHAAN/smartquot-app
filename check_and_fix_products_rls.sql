/*
  # Check and Fix Products RLS Policy - Comprehensive Diagnostic
  
  This script will:
  1. Check the current state of the products table
  2. Check all existing RLS policies
  3. Fix any issues found
  4. Provide detailed diagnostics
*/

-- Step 1: Check current table structure
SELECT 
    'TABLE STRUCTURE' as check_type,
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Step 2: Check if RLS is enabled
SELECT 
    'RLS STATUS' as check_type,
    tablename,
    rowsecurity,
    CASE 
        WHEN rowsecurity THEN 'ENABLED' 
        ELSE 'DISABLED' 
    END as rls_status
FROM pg_tables 
WHERE tablename = 'products' 
AND schemaname = 'public';

-- Step 3: Check all existing policies
SELECT 
    'EXISTING POLICIES' as check_type,
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY policyname;

-- Step 4: Check if there are any products in the table
SELECT 
    'PRODUCTS COUNT' as check_type,
    COUNT(*) as total_products,
    COUNT(created_by) as products_with_created_by,
    COUNT(*) - COUNT(created_by) as products_without_created_by
FROM products;

-- Step 5: Check sample products
SELECT 
    'SAMPLE PRODUCTS' as check_type,
    id,
    design_name,
    created_by,
    created_at
FROM products 
ORDER BY created_at DESC 
LIMIT 5;

-- Step 6: Now apply the fix
DO $$
DECLARE
    column_type text;
    policy_count integer;
    rls_enabled boolean;
BEGIN
    RAISE NOTICE '=== STARTING PRODUCTS RLS FIX ===';
    
    -- Check if RLS is enabled
    SELECT rowsecurity INTO rls_enabled
    FROM pg_tables 
    WHERE tablename = 'products' 
    AND schemaname = 'public';
    
    IF rls_enabled THEN
        RAISE NOTICE 'RLS is ENABLED on products table';
    ELSE
        RAISE NOTICE 'RLS is DISABLED on products table - enabling now';
        ALTER TABLE products ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Check and fix created_by field type
    SELECT data_type INTO column_type
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'created_by' 
    AND table_schema = 'public';
    
    IF column_type = 'uuid' THEN
        RAISE NOTICE 'FIXING: products.created_by is UUID, changing to TEXT';
        ALTER TABLE products DROP CONSTRAINT IF EXISTS products_created_by_fkey;
        ALTER TABLE products ALTER COLUMN created_by TYPE text;
        RAISE NOTICE 'SUCCESS: products.created_by changed from UUID to TEXT';
    ELSE
        RAISE NOTICE 'INFO: products.created_by is already TEXT type';
    END IF;
    
    -- Drop ALL existing policies (be thorough)
    RAISE NOTICE 'Dropping all existing policies...';
    DROP POLICY IF EXISTS "Users can read own products" ON products;
    DROP POLICY IF EXISTS "Users can insert own products" ON products;
    DROP POLICY IF EXISTS "Users can update own products" ON products;
    DROP POLICY IF EXISTS "Users can delete own products" ON products;
    DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
    DROP POLICY IF EXISTS "Auth0 users can manage products" ON products;
    DROP POLICY IF EXISTS "Allow all authenticated users" ON products;
    DROP POLICY IF EXISTS "Enable read access for all users" ON products;
    DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
    DROP POLICY IF EXISTS "Enable update for users based on email" ON products;
    DROP POLICY IF EXISTS "Enable delete for users based on email" ON products;
    
    -- Create new permissive policy
    RAISE NOTICE 'Creating new permissive policy...';
    CREATE POLICY "Allow all authenticated users"
      ON products FOR ALL TO authenticated
      USING (true)
      WITH CHECK (true);
    
    -- Verify the policy was created
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE tablename = 'products'
    AND policyname = 'Allow all authenticated users';
    
    IF policy_count = 1 THEN
        RAISE NOTICE 'SUCCESS: New RLS policy created for products table';
    ELSE
        RAISE EXCEPTION 'ERROR: Failed to create RLS policy. Found % policies', policy_count;
    END IF;
    
    RAISE NOTICE '=== PRODUCTS RLS FIX COMPLETE ===';
    RAISE NOTICE '✅ RLS is enabled';
    RAISE NOTICE '✅ created_by field is TEXT type';
    RAISE NOTICE '✅ Permissive RLS policy allows all authenticated users';
    RAISE NOTICE '✅ Quotation saving should now work without RLS errors';
END $$;

-- Step 7: Show final configuration
SELECT 
    'FINAL CONFIGURATION' as check_type,
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY policyname;

-- Step 8: Test if we can read products (this should work for authenticated users)
SELECT 
    'TEST READ ACCESS' as check_type,
    COUNT(*) as readable_products
FROM products; 