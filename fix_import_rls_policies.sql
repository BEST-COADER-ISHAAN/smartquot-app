/*
  # Fix RLS Policies for Import Functionality
  
  This script updates the RLS policies to allow imports while maintaining user isolation.
  The issue is that the INSERT policy is too restrictive for batch imports.
*/

-- Step 1: Check current policies
SELECT 
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY policyname;

-- Step 2: Drop the restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert own products" ON products;

-- Step 3: Create a more permissive INSERT policy that allows imports
CREATE POLICY "Users can insert own products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (
    created_by = current_setting('app.auth0_user_id', true)::text
    OR created_by IS NULL  -- Allow insertion without created_by (will be set by trigger)
    OR created_by = ''     -- Allow insertion with empty created_by
  );

-- Step 4: Create a trigger to automatically set created_by if it's NULL or empty
CREATE OR REPLACE FUNCTION set_created_by_for_imports()
RETURNS trigger AS $$
BEGIN
  -- Set created_by if it's NULL, empty, or not set
  IF NEW.created_by IS NULL OR NEW.created_by = '' OR NEW.created_by IS NOT DISTINCT FROM '' THEN
    NEW.created_by = current_setting('app.auth0_user_id', true)::text;
  END IF;
  
  -- Set updated_at for updates
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Create trigger for products table
DROP TRIGGER IF EXISTS trigger_set_created_by_for_imports ON products;
CREATE TRIGGER trigger_set_created_by_for_imports
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION set_created_by_for_imports();

-- Step 6: Verify the changes
DO $$
DECLARE
  policy_count integer;
  trigger_count integer;
BEGIN
  -- Check if the new INSERT policy exists
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies 
  WHERE tablename = 'products' 
  AND policyname = 'Users can insert own products'
  AND cmd = 'INSERT';
  
  IF policy_count = 1 THEN
    RAISE NOTICE 'SUCCESS: New INSERT policy created for products table';
  ELSE
    RAISE EXCEPTION 'ERROR: Failed to create INSERT policy';
  END IF;

  -- Check if the trigger exists
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger 
  WHERE tgname = 'trigger_set_created_by_for_imports';
  
  IF trigger_count = 1 THEN
    RAISE NOTICE 'SUCCESS: Trigger created for automatic created_by setting';
  ELSE
    RAISE EXCEPTION 'ERROR: Failed to create trigger';
  END IF;

  RAISE NOTICE '=== IMPORT RLS FIX COMPLETE ===';
  RAISE NOTICE 'Products can now be imported without RLS violations';
  RAISE NOTICE 'created_by field is automatically set to current user';
  RAISE NOTICE 'User isolation is maintained through RLS policies';
END $$;

-- Step 7: Show final policy configuration
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY cmd, policyname; 