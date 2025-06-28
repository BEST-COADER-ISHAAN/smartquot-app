/*
  # Force Clean ALL RLS Policies
  
  This script will find and drop ALL policies on the tables regardless of their names.
  This is a more aggressive approach to ensure a clean slate.
*/

-- Step 1: Show current RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
AND schemaname = 'public'
ORDER BY tablename;

-- Step 2: Show ALL existing policies before cleanup
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
AND schemaname = 'public'
ORDER BY tablename, policyname;

-- Step 3: Dynamically drop ALL policies on products table
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'products' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON products', policy_record.policyname);
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
END $$;

-- Step 4: Dynamically drop ALL policies on customers table
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'customers' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON customers', policy_record.policyname);
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
END $$;

-- Step 5: Dynamically drop ALL policies on quotations table
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'quotations' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON quotations', policy_record.policyname);
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
END $$;

-- Step 6: Dynamically drop ALL policies on quotation_rooms table
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'quotation_rooms' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON quotation_rooms', policy_record.policyname);
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
END $$;

-- Step 7: Dynamically drop ALL policies on quotation_room_items table
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'quotation_room_items' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON quotation_room_items', policy_record.policyname);
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
END $$;

-- Step 8: Verify all policies are dropped
DO $$
DECLARE
    policy_count integer;
    table_name text;
BEGIN
    FOR table_name IN SELECT unnest(ARRAY['products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items'])
    LOOP
        SELECT COUNT(*) INTO policy_count
        FROM pg_policies 
        WHERE tablename = table_name 
        AND schemaname = 'public';
        
        IF policy_count = 0 THEN
            RAISE NOTICE 'SUCCESS: All policies dropped from % table', table_name;
        ELSE
            RAISE NOTICE 'WARNING: % policies still exist on % table', policy_count, table_name;
        END IF;
    END LOOP;
    
    RAISE NOTICE '=== FORCE POLICY CLEANUP COMPLETE ===';
    RAISE NOTICE 'All existing policies have been forcefully dropped';
    RAISE NOTICE 'You can now run the enable_rls_fixed.sql script';
END $$;

-- Step 9: Show final policy count
SELECT 
    tablename,
    COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
AND schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- Step 10: Show any remaining policies (should be empty)
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE tablename IN ('products', 'customers', 'quotations', 'quotation_rooms', 'quotation_room_items')
AND schemaname = 'public'
ORDER BY tablename, policyname; 