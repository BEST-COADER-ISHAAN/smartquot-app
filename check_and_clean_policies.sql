/*
  # Check and Clean Existing RLS Policies
  
  This script checks what policies currently exist and cleans them up
  before applying the new user isolation policies.
*/

-- Step 1: Check current RLS status on all tables
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
AND schemaname = 'public'
ORDER BY tablename;

-- Step 2: Show all existing policies on products table
SELECT 
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY policyname;

-- Step 3: Show all existing policies on customers table
SELECT 
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename = 'customers'
ORDER BY policyname;

-- Step 4: Show all existing policies on quotations table
SELECT 
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename = 'quotations'
ORDER BY policyname;

-- Step 5: Show all existing policies on quotation_rooms table
SELECT 
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename = 'quotation_rooms'
ORDER BY policyname;

-- Step 6: Show all existing policies on quotation_room_items table
SELECT 
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename = 'quotation_room_items'
ORDER BY policyname;

-- Step 7: Drop ALL policies on products table (comprehensive cleanup)
DROP POLICY IF EXISTS "Users can read own products" ON products;
DROP POLICY IF EXISTS "Users can insert own products" ON products;
DROP POLICY IF EXISTS "Users can update own products" ON products;
DROP POLICY IF EXISTS "Users can delete own products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Auth0 users can manage products" ON products;
DROP POLICY IF EXISTS "Allow all authenticated users" ON products;
DROP POLICY IF EXISTS "Users can view all products" ON products;
DROP POLICY IF EXISTS "Users can view their own products" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable update for users based on email" ON products;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON products;

-- Step 8: Drop ALL policies on customers table
DROP POLICY IF EXISTS "Users can read own customers" ON customers;
DROP POLICY IF EXISTS "Users can insert own customers" ON customers;
DROP POLICY IF EXISTS "Users can update own customers" ON customers;
DROP POLICY IF EXISTS "Users can delete own customers" ON customers;
DROP POLICY IF EXISTS "Auth0 users can manage customers" ON customers;
DROP POLICY IF EXISTS "Allow all authenticated users" ON customers;
DROP POLICY IF EXISTS "Users can view all customers" ON customers;
DROP POLICY IF EXISTS "Users can view their own customers" ON customers;
DROP POLICY IF EXISTS "Enable read access for all users" ON customers;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON customers;
DROP POLICY IF EXISTS "Enable update for users based on email" ON customers;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON customers;

-- Step 9: Drop ALL policies on quotations table
DROP POLICY IF EXISTS "Users can read own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can insert own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can update own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can delete own quotations" ON quotations;
DROP POLICY IF EXISTS "Auth0 users can manage quotations" ON quotations;
DROP POLICY IF EXISTS "Allow all authenticated users" ON quotations;
DROP POLICY IF EXISTS "Users can view all quotations" ON quotations;
DROP POLICY IF EXISTS "Users can view their own quotations" ON quotations;
DROP POLICY IF EXISTS "Enable read access for all users" ON quotations;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON quotations;
DROP POLICY IF EXISTS "Enable update for users based on email" ON quotations;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON quotations;

-- Step 10: Drop ALL policies on quotation_rooms table
DROP POLICY IF EXISTS "Users can read own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can insert own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can update own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can delete own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Auth0 users can manage quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Allow all authenticated users" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can view all quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can view their own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Enable read access for all users" ON quotation_rooms;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON quotation_rooms;
DROP POLICY IF EXISTS "Enable update for users based on email" ON quotation_rooms;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON quotation_rooms;

-- Step 11: Drop ALL policies on quotation_room_items table
DROP POLICY IF EXISTS "Users can read own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can insert own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can update own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can delete own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Auth0 users can manage quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Allow all authenticated users" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can view all quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can view their own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Enable read access for all users" ON quotation_room_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON quotation_room_items;
DROP POLICY IF EXISTS "Enable update for users based on email" ON quotation_room_items;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON quotation_room_items;

-- Step 12: Verify all policies are dropped
DO $$
DECLARE
  policy_count integer;
BEGIN
  -- Count remaining policies on products table
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies 
  WHERE tablename = 'products';
  
  IF policy_count = 0 THEN
    RAISE NOTICE 'SUCCESS: All policies dropped from products table';
  ELSE
    RAISE NOTICE 'WARNING: % policies still exist on products table', policy_count;
  END IF;
  
  -- Count remaining policies on customers table
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies 
  WHERE tablename = 'customers';
  
  IF policy_count = 0 THEN
    RAISE NOTICE 'SUCCESS: All policies dropped from customers table';
  ELSE
    RAISE NOTICE 'WARNING: % policies still exist on customers table', policy_count;
  END IF;
  
  -- Count remaining policies on quotations table
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies 
  WHERE tablename = 'quotations';
  
  IF policy_count = 0 THEN
    RAISE NOTICE 'SUCCESS: All policies dropped from quotations table';
  ELSE
    RAISE NOTICE 'WARNING: % policies still exist on quotations table', policy_count;
  END IF;
  
  RAISE NOTICE '=== POLICY CLEANUP COMPLETE ===';
  RAISE NOTICE 'All existing policies have been dropped';
  RAISE NOTICE 'You can now run the enable_rls_fixed.sql script';
END $$;

-- Step 13: Show final policy count
SELECT 
    tablename,
    COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
GROUP BY tablename
ORDER BY tablename; 