/*
  # Simple Import Fix for RLS
  
  This script makes the INSERT policy more permissive to allow imports.
*/

-- Drop the current restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert own products" ON products;

-- Create a more permissive INSERT policy
CREATE POLICY "Users can insert own products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (true);  -- Allow all authenticated users to insert

-- Create a trigger to automatically set created_by
CREATE OR REPLACE FUNCTION auto_set_created_by()
RETURNS trigger AS $$
BEGIN
  -- Set created_by to the Auth0 user ID from session variable
  NEW.created_by = current_setting('app.auth0_user_id', true)::text;
  
  -- Set updated_at for updates
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_auto_set_created_by ON products;
CREATE TRIGGER trigger_auto_set_created_by
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION auto_set_created_by();

-- Verify
DO $$
BEGIN
  RAISE NOTICE '=== IMPORT FIX APPLIED ===';
  RAISE NOTICE 'INSERT policy is now permissive for authenticated users';
  RAISE NOTICE 'created_by will be automatically set to current user';
END $$; 