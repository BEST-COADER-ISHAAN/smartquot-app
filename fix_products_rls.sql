/*
  # Fix Products RLS Policy
  
  This script fixes the "new row violates row-level security policy for table products" error
  by making the products table RLS policy permissive for all authenticated users.
  
  Problem: When saving quotations, the quotation_room_items table references products,
  but the RLS policy on products is too restrictive.
  
  Solution: Allow all authenticated users to read products (at minimum) or manage all products.
*/

-- Step 1: Ensure created_by field is TEXT type (for Auth0 compatibility)
DO $$
DECLARE
    column_type text;
BEGIN
    SELECT data_type INTO column_type
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'created_by' 
    AND table_schema = 'public';
    
    IF column_type = 'uuid' THEN
        ALTER TABLE products DROP CONSTRAINT IF EXISTS products_created_by_fkey;
        ALTER TABLE products ALTER COLUMN created_by TYPE text;
        RAISE NOTICE 'SUCCESS: products.created_by changed from UUID to TEXT';
    ELSE
        RAISE NOTICE 'INFO: products.created_by is already TEXT type';
    END IF;
END $$;

-- Step 2: Drop all existing policies on products table
DROP POLICY IF EXISTS "Users can read own products" ON products;
DROP POLICY IF EXISTS "Users can insert own products" ON products;
DROP POLICY IF EXISTS "Users can update own products" ON products;
DROP POLICY IF EXISTS "Users can delete own products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Auth0 users can manage products" ON products;
DROP POLICY IF EXISTS "Allow all authenticated users" ON products;

-- Step 3: Create permissive policy for all authenticated users
CREATE POLICY "Allow all authenticated users"
  ON products FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Step 4: Verify the changes
DO $$
DECLARE
    policy_count integer;
    column_type text;
BEGIN
    -- Check created_by field type
    SELECT data_type INTO column_type
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'created_by' 
    AND table_schema = 'public';
    
    IF column_type = 'text' THEN
        RAISE NOTICE 'SUCCESS: products.created_by field is TEXT type';
    ELSE
        RAISE EXCEPTION 'ERROR: products.created_by field is still %', column_type;
    END IF;
    
    -- Check RLS policies
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE tablename = 'products'
    AND policyname = 'Allow all authenticated users';
    
    IF policy_count = 1 THEN
        RAISE NOTICE 'SUCCESS: RLS policy created for products table';
    ELSE
        RAISE EXCEPTION 'ERROR: Expected 1 policy, found %', policy_count;
    END IF;

    RAISE NOTICE '=== PRODUCTS RLS FIX COMPLETE ===';
    RAISE NOTICE '✅ created_by field is TEXT type';
    RAISE NOTICE '✅ Permissive RLS policy allows all authenticated users';
    RAISE NOTICE '✅ Quotation saving should now work without RLS errors';
END $$;

-- Show final configuration
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'created_by' 
AND table_schema = 'public';

SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY policyname; 