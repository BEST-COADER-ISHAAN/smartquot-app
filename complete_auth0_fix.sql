/*
  # Complete Auth0 Integration Fix

  This script fixes both the created_by field type and RLS policies for Auth0 integration.
  
  Problems:
  1. created_by field is UUID but Auth0 user IDs are strings
  2. RLS policies expect auth.uid() but Auth0 users don't have Supabase auth.uid()
  
  Solutions:
  1. Change created_by field type from UUID to TEXT
  2. Create permissive RLS policies for authenticated users
*/

-- Step 1: Fix created_by field types
-- Drop foreign key constraints first
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_created_by_fkey;
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_created_by_fkey;
ALTER TABLE quotations DROP CONSTRAINT IF EXISTS quotations_created_by_fkey;

-- Change created_by field type from UUID to TEXT for all tables
ALTER TABLE customers ALTER COLUMN created_by TYPE text;
ALTER TABLE products ALTER COLUMN created_by TYPE text;
ALTER TABLE quotations ALTER COLUMN created_by TYPE text;

-- Update column comments
COMMENT ON COLUMN customers.created_by IS 'Auth0 user ID (string format)';
COMMENT ON COLUMN products.created_by IS 'Auth0 user ID (string format)';
COMMENT ON COLUMN quotations.created_by IS 'Auth0 user ID (string format)';

-- Step 2: Fix RLS policies for all tables
-- Drop ALL existing policies
DROP POLICY IF EXISTS "Users can read own products" ON products;
DROP POLICY IF EXISTS "Users can insert own products" ON products;
DROP POLICY IF EXISTS "Users can update own products" ON products;
DROP POLICY IF EXISTS "Users can delete own products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Auth0 users can manage products" ON products;

DROP POLICY IF EXISTS "Users can read own customers" ON customers;
DROP POLICY IF EXISTS "Users can insert own customers" ON customers;
DROP POLICY IF EXISTS "Users can update own customers" ON customers;
DROP POLICY IF EXISTS "Users can delete own customers" ON customers;

DROP POLICY IF EXISTS "Users can read own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can insert own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can update own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can delete own quotations" ON quotations;

DROP POLICY IF EXISTS "Users can read own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can insert own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can update own quotation rooms" ON quotation_rooms;
DROP POLICY IF EXISTS "Users can delete own quotation rooms" ON quotation_rooms;

DROP POLICY IF EXISTS "Users can read own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can insert own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can update own quotation room items" ON quotation_room_items;
DROP POLICY IF EXISTS "Users can delete own quotation room items" ON quotation_room_items;

-- Create new permissive policies for Auth0
CREATE POLICY "Auth0 users can manage products"
  ON products FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Auth0 users can manage customers"
  ON customers FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Auth0 users can manage quotations"
  ON quotations FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Auth0 users can manage quotation rooms"
  ON quotation_rooms FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Auth0 users can manage quotation room items"
  ON quotation_room_items FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Step 3: Create trigger function for Auth0
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

-- Step 4: Create triggers for all tables
DROP TRIGGER IF EXISTS trigger_handle_auth0_products ON products;
DROP TRIGGER IF EXISTS trigger_handle_auth0_customers ON customers;
DROP TRIGGER IF EXISTS trigger_handle_auth0_quotations ON quotations;
DROP TRIGGER IF EXISTS trigger_set_created_by ON products;
DROP TRIGGER IF EXISTS trigger_set_created_by_products ON products;

CREATE TRIGGER trigger_handle_auth0_products
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth0_created_by();

CREATE TRIGGER trigger_handle_auth0_customers
  BEFORE INSERT OR UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth0_created_by();

CREATE TRIGGER trigger_handle_auth0_quotations
  BEFORE INSERT OR UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth0_created_by();

-- Step 5: Verify all changes
DO $$
DECLARE
    table_name text;
    column_type text;
    policy_count integer;
    trigger_count integer;
BEGIN
    -- Check created_by field types
    FOR table_name IN SELECT unnest(ARRAY['customers', 'products', 'quotations']) LOOP
        SELECT data_type INTO column_type
        FROM information_schema.columns 
        WHERE table_name = table_name 
        AND column_name = 'created_by' 
        AND table_schema = 'public';
        
        IF column_type = 'text' THEN
            RAISE NOTICE 'SUCCESS: % table created_by field is now TEXT', table_name;
        ELSE
            RAISE EXCEPTION 'ERROR: % table created_by field is still %', table_name, column_type;
        END IF;
    END LOOP;
    
    -- Check RLS policies
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
    AND policyname LIKE 'Auth0 users can manage%';
    
    IF policy_count = 5 THEN
        RAISE NOTICE 'SUCCESS: RLS policies created for all tables';
    ELSE
        RAISE EXCEPTION 'ERROR: Expected 5 policies, found %', policy_count;
    END IF;

    -- Check triggers
    SELECT COUNT(*) INTO trigger_count
    FROM pg_trigger 
    WHERE tgname IN ('trigger_handle_auth0_products', 'trigger_handle_auth0_customers', 'trigger_handle_auth0_quotations');
    
    IF trigger_count = 3 THEN
        RAISE NOTICE 'SUCCESS: Triggers created for Auth0 integration';
    ELSE
        RAISE EXCEPTION 'ERROR: Expected 3 triggers, found %', trigger_count;
    END IF;

    RAISE NOTICE '=== COMPLETE AUTH0 INTEGRATION FIX ===';
    RAISE NOTICE '✅ created_by fields are now TEXT type';
    RAISE NOTICE '✅ RLS policies work with Auth0 authentication';
    RAISE NOTICE '✅ Auth0 user IDs can be stored properly';
    RAISE NOTICE '✅ Product imports should now work correctly';
END $$;

-- Show final configuration
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns 
WHERE column_name = 'created_by' 
AND table_schema = 'public'
ORDER BY table_name;

SELECT 
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
ORDER BY tablename; 