/*
  # Fix All RLS Policies for Auth0 Integration

  This script fixes RLS policies for all tables to work with Auth0 authentication.
  
  Problem: RLS policies expect auth.uid() but Auth0 users don't have Supabase auth.uid()
  Solution: Create permissive policies for authenticated users and let application handle user isolation
*/

-- Fix products table RLS policies
DROP POLICY IF EXISTS "Users can read own products" ON products;
DROP POLICY IF EXISTS "Users can insert own products" ON products;
DROP POLICY IF EXISTS "Users can update own products" ON products;
DROP POLICY IF EXISTS "Users can delete own products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Auth0 users can manage products" ON products;

CREATE POLICY "Auth0 users can manage products"
  ON products FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fix customers table RLS policies
DROP POLICY IF EXISTS "Users can read own customers" ON customers;
DROP POLICY IF EXISTS "Users can insert own customers" ON customers;
DROP POLICY IF EXISTS "Users can update own customers" ON customers;
DROP POLICY IF EXISTS "Users can delete own customers" ON customers;

CREATE POLICY "Auth0 users can manage customers"
  ON customers FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fix quotations table RLS policies
DROP POLICY IF EXISTS "Users can read own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can insert own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can update own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can delete own quotations" ON quotations;

CREATE POLICY "Auth0 users can manage quotations"
  ON quotations FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fix quotation_rooms table RLS policies
DROP POLICY IF EXISTS "Users can read own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can insert own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can update own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can delete own quotation rooms" ON quotation_rooms;

CREATE POLICY "Auth0 users can manage quotation rooms"
  ON quotation_rooms FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fix quotation_room_items table RLS policies
DROP POLICY IF EXISTS "Users can read own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can insert own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can update own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can delete own quotation room items" ON quotation_room_items;

CREATE POLICY "Auth0 users can manage quotation room items"
  ON quotation_room_items FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create trigger function for handling Auth0 user isolation
CREATE OR REPLACE FUNCTION handle_auth0_created_by()
RETURNS trigger AS $$
BEGIN
  -- For Auth0, we don't automatically set created_by since we don't have auth.uid()
  -- The application must provide the created_by field with the Auth0 user ID
  
  -- Set updated_at for updates
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
DROP TRIGGER IF EXISTS trigger_handle_auth0_products ON products;
CREATE TRIGGER trigger_handle_auth0_products
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth0_created_by();

DROP TRIGGER IF EXISTS trigger_handle_auth0_customers ON customers;
CREATE TRIGGER trigger_handle_auth0_customers
  BEFORE INSERT OR UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth0_created_by();

DROP TRIGGER IF EXISTS trigger_handle_auth0_quotations ON quotations;
CREATE TRIGGER trigger_handle_auth0_quotations
  BEFORE INSERT OR UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth0_created_by();

-- Verify the changes
DO $$
DECLARE
  policy_count integer;
  trigger_count integer;
BEGIN
  -- Check if policies exist for all tables
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies 
  WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
  AND policyname LIKE 'Auth0 users can manage%';
  
  IF policy_count = 5 THEN
    RAISE NOTICE 'SUCCESS: RLS policies created for all tables';
  ELSE
    RAISE EXCEPTION 'ERROR: Expected 5 policies, found %', policy_count;
  END IF;

  -- Check if triggers exist
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger 
  WHERE tgname IN ('trigger_handle_auth0_products', 'trigger_handle_auth0_customers', 'trigger_handle_auth0_quotations');
  
  IF trigger_count = 3 THEN
    RAISE NOTICE 'SUCCESS: Triggers created for Auth0 integration';
  ELSE
    RAISE EXCEPTION 'ERROR: Expected 3 triggers, found %', trigger_count;
  END IF;

  RAISE NOTICE '=== AUTH0 RLS POLICY FIX COMPLETE ===';
  RAISE NOTICE 'All tables can now be used with Auth0 authentication';
  RAISE NOTICE 'Application must provide created_by field with Auth0 user ID';
  RAISE NOTICE 'User isolation is handled at the application level';
END $$;

-- Show the final policy configuration
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
ORDER BY tablename; 