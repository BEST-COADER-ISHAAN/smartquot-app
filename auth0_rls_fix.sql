/*
  # Simple Auth0 RLS Fix

  This script creates a very simple RLS policy that allows any authenticated user
  to manage products. This should work with Auth0 authentication.
*/

-- First, let's see what policies currently exist
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename = 'products';

-- Drop all existing policies for products
DROP POLICY IF EXISTS "Users can read own products" ON products;
DROP POLICY IF EXISTS "Users can insert own products" ON products;
DROP POLICY IF EXISTS "Users can update own products" ON products;
DROP POLICY IF EXISTS "Users can delete own products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Auth0 users can manage products" ON products;

-- Create a very simple policy that allows all authenticated users
CREATE POLICY "Allow all authenticated users"
  ON products FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Verify the policy was created
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename = 'products';

-- Show status messages
DO $$
BEGIN
    RAISE NOTICE '=== SIMPLE RLS POLICY CREATED ===';
    RAISE NOTICE 'Products table now allows all authenticated users';
    RAISE NOTICE 'This should work with Auth0 authentication';
END $$; 