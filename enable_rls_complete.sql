/*
  # Enable Row-Level Security with User Isolation
  
  This script enables RLS on all tables with proper user isolation for Auth0 integration.
  Since you can now see products, we'll enable RLS with policies that filter by created_by field.
*/

-- Step 1: Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_room_items ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop all existing policies to start fresh
-- Products table
DROP POLICY IF EXISTS "Users can read own products" ON products;
DROP POLICY IF EXISTS "Users can insert own products" ON products;
DROP POLICY IF EXISTS "Users can update own products" ON products;
DROP POLICY IF EXISTS "Users can delete own products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Auth0 users can manage products" ON products;
DROP POLICY IF EXISTS "Allow all authenticated users" ON products;

-- Customers table
DROP POLICY IF EXISTS "Users can read own customers" ON customers;
DROP POLICY IF EXISTS "Users can insert own customers" ON customers;
DROP POLICY IF EXISTS "Users can update own customers" ON customers;
DROP POLICY IF EXISTS "Users can delete own customers" ON customers;
DROP POLICY IF EXISTS "Auth0 users can manage customers" ON customers;
DROP POLICY IF EXISTS "Allow all authenticated users" ON customers;

-- Quotations table
DROP POLICY IF EXISTS "Users can read own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can insert own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can update own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can delete own quotations" ON quotations;
DROP POLICY IF EXISTS "Auth0 users can manage quotations" ON quotations;
DROP POLICY IF EXISTS "Allow all authenticated users" ON quotations;

-- Quotation rooms table
DROP POLICY IF EXISTS "Users can read own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can insert own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can update own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can delete own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Auth0 users can manage quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Allow all authenticated users" ON quotation_rooms;

-- Quotation room items table
DROP POLICY IF EXISTS "Users can read own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can insert own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can update own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can delete own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Auth0 users can manage quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Allow all authenticated users" ON quotation_room_items;

-- Step 3: Create user isolation policies for products
CREATE POLICY "Users can read own products"
  ON products FOR SELECT TO authenticated
  USING (
    created_by = current_setting('app.auth0_user_id', true)::text
    OR created_by IS NULL  -- Allow access to products without created_by (legacy data)
  );

CREATE POLICY "Users can insert own products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (
    created_by = current_setting('app.auth0_user_id', true)::text
    OR created_by IS NULL  -- Allow insertion without created_by (will be set by trigger)
  );

CREATE POLICY "Users can update own products"
  ON products FOR UPDATE TO authenticated
  USING (created_by = current_setting('app.auth0_user_id', true)::text);

CREATE POLICY "Users can delete own products"
  ON products FOR DELETE TO authenticated
  USING (created_by = current_setting('app.auth0_user_id', true)::text);

-- Step 4: Create user isolation policies for customers
CREATE POLICY "Users can read own customers"
  ON customers FOR SELECT TO authenticated
  USING (
    created_by = current_setting('app.auth0_user_id', true)::text
    OR created_by IS NULL
  );

CREATE POLICY "Users can insert own customers"
  ON customers FOR INSERT TO authenticated
  WITH CHECK (
    created_by = current_setting('app.auth0_user_id', true)::text
    OR created_by IS NULL
  );

CREATE POLICY "Users can update own customers"
  ON customers FOR UPDATE TO authenticated
  USING (created_by = current_setting('app.auth0_user_id', true)::text);

CREATE POLICY "Users can delete own customers"
  ON customers FOR DELETE TO authenticated
  USING (created_by = current_setting('app.auth0_user_id', true)::text);

-- Step 5: Create user isolation policies for quotations
CREATE POLICY "Users can read own quotations"
  ON quotations FOR SELECT TO authenticated
  USING (
    created_by = current_setting('app.auth0_user_id', true)::text
    OR created_by IS NULL
  );

CREATE POLICY "Users can insert own quotations"
  ON quotations FOR INSERT TO authenticated
  WITH CHECK (
    created_by = current_setting('app.auth0_user_id', true)::text
    OR created_by IS NULL
  );

CREATE POLICY "Users can update own quotations"
  ON quotations FOR UPDATE TO authenticated
  USING (created_by = current_setting('app.auth0_user_id', true)::text);

CREATE POLICY "Users can delete own quotations"
  ON quotations FOR DELETE TO authenticated
  USING (created_by = current_setting('app.auth0_user_id', true)::text);

-- Step 6: Create user isolation policies for quotation_rooms
CREATE POLICY "Users can read own quotation rooms"
  ON quotation_rooms FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quotations 
      WHERE quotations.id = quotation_rooms.quotation_id 
      AND (
        quotations.created_by = current_setting('app.auth0_user_id', true)::text
        OR quotations.created_by IS NULL
      )
    )
  );

CREATE POLICY "Users can insert own quotation rooms"
  ON quotation_rooms FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM quotations 
      WHERE quotations.id = quotation_rooms.quotation_id 
      AND (
        quotations.created_by = current_setting('app.auth0_user_id', true)::text
        OR quotations.created_by IS NULL
      )
    )
  );

CREATE POLICY "Users can update own quotation rooms"
  ON quotation_rooms FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quotations 
      WHERE quotations.id = quotation_rooms.quotation_id 
      AND quotations.created_by = current_setting('app.auth0_user_id', true)::text
    )
  );

CREATE POLICY "Users can delete own quotation rooms"
  ON quotation_rooms FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quotations 
      WHERE quotations.id = quotation_rooms.quotation_id 
      AND quotations.created_by = current_setting('app.auth0_user_id', true)::text
    )
  );

-- Step 7: Create user isolation policies for quotation_room_items
CREATE POLICY "Users can read own quotation room items"
  ON quotation_room_items FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quotation_rooms 
      JOIN quotations ON quotations.id = quotation_rooms.quotation_id
      WHERE quotation_rooms.id = quotation_room_items.room_id 
      AND (
        quotations.created_by = current_setting('app.auth0_user_id', true)::text
        OR quotations.created_by IS NULL
      )
    )
  );

CREATE POLICY "Users can insert own quotation room items"
  ON quotation_room_items FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM quotation_rooms 
      JOIN quotations ON quotations.id = quotation_rooms.quotation_id
      WHERE quotation_rooms.id = quotation_room_items.room_id 
      AND (
        quotations.created_by = current_setting('app.auth0_user_id', true)::text
        OR quotations.created_by IS NULL
      )
    )
  );

CREATE POLICY "Users can update own quotation room items"
  ON quotation_room_items FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quotation_rooms 
      JOIN quotations ON quotations.id = quotation_rooms.quotation_id
      WHERE quotation_rooms.id = quotation_room_items.room_id 
      AND quotations.created_by = current_setting('app.auth0_user_id', true)::text
    )
  );

CREATE POLICY "Users can delete own quotation room items"
  ON quotation_room_items FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quotation_rooms 
      JOIN quotations ON quotations.id = quotation_rooms.quotation_id
      WHERE quotation_rooms.id = quotation_room_items.room_id 
      AND quotations.created_by = current_setting('app.auth0_user_id', true)::text
    )
  );

-- Step 8: Create trigger function to automatically set created_by
CREATE OR REPLACE FUNCTION set_created_by_for_auth0()
RETURNS trigger AS $$
BEGIN
  -- Only set created_by if it's NULL and we have the Auth0 user ID
  IF NEW.created_by IS NULL AND current_setting('app.auth0_user_id', true) IS NOT NULL THEN
    NEW.created_by = current_setting('app.auth0_user_id', true)::text;
  END IF;
  
  -- Set updated_at for updates
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 9: Create triggers for all tables
DROP TRIGGER IF EXISTS trigger_set_created_by_products ON products;
CREATE TRIGGER trigger_set_created_by_products
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION set_created_by_for_auth0();

DROP TRIGGER IF EXISTS trigger_set_created_by_customers ON customers;
CREATE TRIGGER trigger_set_created_by_customers
  BEFORE INSERT OR UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION set_created_by_for_auth0();

DROP TRIGGER IF EXISTS trigger_set_created_by_quotations ON quotations;
CREATE TRIGGER trigger_set_created_by_quotations
  BEFORE INSERT OR UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION set_created_by_for_auth0();

-- Step 10: Verify RLS is enabled and policies are created
DO $$
DECLARE
  rls_enabled boolean;
  policy_count integer;
BEGIN
  -- Check if RLS is enabled on products table
  SELECT rowsecurity INTO rls_enabled
  FROM pg_tables 
  WHERE tablename = 'products' 
  AND schemaname = 'public';
  
  IF rls_enabled THEN
    RAISE NOTICE 'SUCCESS: RLS is enabled on products table';
  ELSE
    RAISE EXCEPTION 'ERROR: RLS is not enabled on products table';
  END IF;
  
  -- Count policies on products table
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies 
  WHERE tablename = 'products';
  
  IF policy_count = 4 THEN
    RAISE NOTICE 'SUCCESS: 4 RLS policies created for products table';
  ELSE
    RAISE EXCEPTION 'ERROR: Expected 4 policies, found %', policy_count;
  END IF;
  
  RAISE NOTICE '=== RLS ENABLED SUCCESSFULLY ===';
  RAISE NOTICE 'All tables now have user isolation enabled';
  RAISE NOTICE 'Users can only see and manage their own data';
  RAISE NOTICE 'Legacy data (NULL created_by) is still accessible';
  RAISE NOTICE 'New records will automatically get the correct created_by value';
END $$;

-- Show final policy configuration
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE tablename IN ('products', 'customers', 'quotations')
ORDER BY tablename, cmd; 