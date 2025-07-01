/*
  # Test Customer Save Functionality

  This script tests the customer saving functionality to ensure it works correctly
  after applying the Auth0 integration fixes.
*/

-- Test 1: Check if customers table exists and has correct structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'customers' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Test 2: Check RLS policies on customers table
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'customers'
ORDER BY policyname;

-- Test 3: Check if RLS is enabled
SELECT 
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'customers' 
AND schemaname = 'public';

-- Test 4: Check triggers on customers table
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'customers'
AND trigger_schema = 'public';

-- Test 5: Try to insert a test customer (this will fail if RLS is too restrictive)
-- Note: This requires authentication, so it's just for reference
/*
INSERT INTO customers (
    name, 
    email, 
    phone, 
    gst_number, 
    site_address, 
    notes, 
    created_by
) VALUES (
    'Test Customer',
    'test@example.com',
    '+91 1234567890',
    '29TEST123456789',
    'Test Address, Test City, Test State 123456',
    'Test customer for debugging',
    'auth0|test-user-id'
);
*/

-- Test 6: Check existing customers (if any)
SELECT 
    id,
    name,
    email,
    created_by,
    created_at
FROM customers 
ORDER BY created_at DESC 
LIMIT 5;

-- Test 7: Verify created_by field type
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE column_name = 'created_by' 
AND table_schema = 'public'
ORDER BY table_name;

-- Test 8: Check all RLS policies in the database
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('customers', 'products', 'quotations', 'quotation_rooms', 'quotation_room_items')
ORDER BY tablename, policyname; 