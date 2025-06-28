/*
  # Targeted Products Import Fix
  
  This script only fixes the products table without affecting other tables.
  It removes only the products-specific triggers and policies.
*/

-- Step 1: Drop only products-specific INSERT policies
DROP POLICY IF EXISTS "Users can insert own products" ON products;
DROP POLICY IF EXISTS "Allow all authenticated users to insert" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to insert products" ON products;
DROP POLICY IF EXISTS "Auth0 users can manage products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;

-- Step 2: Drop only products-specific triggers
DROP TRIGGER IF EXISTS trigger_auto_set_created_by ON products;
DROP TRIGGER IF EXISTS trigger_set_created_by_for_imports ON products;
DROP TRIGGER IF EXISTS trigger_set_created_by_products ON products;
DROP TRIGGER IF EXISTS trigger_handle_product_created_by ON products;
DROP TRIGGER IF EXISTS trigger_set_created_by ON products;

-- Step 3: Drop only products-specific trigger functions (if they exist)
DROP FUNCTION IF EXISTS auto_set_created_by();
DROP FUNCTION IF EXISTS set_created_by_for_imports();
DROP FUNCTION IF EXISTS handle_product_created_by();
DROP FUNCTION IF EXISTS set_created_by();
DROP FUNCTION IF EXISTS set_created_by_products();

-- Step 4: Create a completely permissive INSERT policy for products only
CREATE POLICY "Allow all authenticated users to insert products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (true);

-- Step 5: Verify the fix
DO $$
DECLARE
  trigger_count integer;
  policy_count integer;
BEGIN
  -- Check if any triggers remain on products table
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger 
  WHERE tgrelid = 'products'::regclass;
  
  IF trigger_count = 0 THEN
    RAISE NOTICE 'SUCCESS: All triggers removed from products table';
  ELSE
    RAISE NOTICE 'WARNING: % triggers still exist on products table', trigger_count;
  END IF;

  -- Check if INSERT policy exists on products table
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies 
  WHERE tablename = 'products' 
  AND cmd = 'INSERT';
  
  IF policy_count >= 1 THEN
    RAISE NOTICE 'SUCCESS: Permissive INSERT policy created for products';
  ELSE
    RAISE EXCEPTION 'ERROR: Failed to create INSERT policy for products';
  END IF;

  RAISE NOTICE '=== TARGETED PRODUCTS FIX COMPLETE ===';
  RAISE NOTICE 'Only products table affected';
  RAISE NOTICE 'Other tables (customers, quotations) unchanged';
  RAISE NOTICE 'Products INSERT policy is completely permissive';
  RAISE NOTICE 'Application must provide created_by field for products';
END $$;

-- Step 6: Show final configuration for products table only
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY cmd, policyname; 