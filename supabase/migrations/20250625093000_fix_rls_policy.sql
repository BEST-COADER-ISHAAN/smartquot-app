/*
  # Fix RLS Policy for Products Table

  1. Problem
    - RLS policy requires created_by = auth.uid()
    - But when inserting products, created_by might not be set explicitly
    - This causes "new row violates row-level security policy" error

  2. Solution
    - Update the INSERT policy to allow insertion when created_by is NULL
    - Add a trigger to automatically set created_by to auth.uid() when NULL
    - This ensures all products get the correct created_by value
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own products" ON products;

-- Create new INSERT policy that allows insertion when created_by is NULL
CREATE POLICY "Users can insert own products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (
    created_by IS NULL OR created_by = auth.uid()
  );

-- Create a trigger function to automatically set created_by
CREATE OR REPLACE FUNCTION set_created_by()
RETURNS trigger AS $$
BEGIN
  IF NEW.created_by IS NULL THEN
    NEW.created_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set created_by before insert
DROP TRIGGER IF EXISTS trigger_set_created_by ON products;
CREATE TRIGGER trigger_set_created_by
  BEFORE INSERT ON products
  FOR EACH ROW
  EXECUTE FUNCTION set_created_by();

-- Verify the changes
DO $$
BEGIN
  -- Check if the policy exists
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' 
    AND policyname = 'Users can insert own products'
  ) THEN
    RAISE NOTICE 'SUCCESS: RLS policy updated for products table';
  ELSE
    RAISE EXCEPTION 'ERROR: Failed to update RLS policy';
  END IF;

  -- Check if the trigger exists
  IF EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trigger_set_created_by'
  ) THEN
    RAISE NOTICE 'SUCCESS: Trigger created for automatic created_by setting';
  ELSE
    RAISE EXCEPTION 'ERROR: Failed to create trigger';
  END IF;

  RAISE NOTICE '=== RLS POLICY FIX COMPLETE ===';
  RAISE NOTICE 'Products can now be imported without RLS violations';
END $$; 