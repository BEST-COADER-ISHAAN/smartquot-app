/*
  # Fix created_by Field Type for Auth0 Integration

  Problem: created_by field is defined as UUID but Auth0 user IDs are strings
  Solution: Change created_by field type from UUID to TEXT for all tables
*/

-- First, let's check the current data types
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE column_name = 'created_by' 
AND table_schema = 'public'
ORDER BY table_name;

-- Drop foreign key constraints first
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_created_by_fkey;
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_created_by_fkey;
ALTER TABLE quotations DROP CONSTRAINT IF EXISTS quotations_created_by_fkey;

-- Change created_by field type from UUID to TEXT for all tables
ALTER TABLE customers ALTER COLUMN created_by TYPE text;
ALTER TABLE products ALTER COLUMN created_by TYPE text;
ALTER TABLE quotations ALTER COLUMN created_by TYPE text;

-- Update the column comments to reflect the change
COMMENT ON COLUMN customers.created_by IS 'Auth0 user ID (string format)';
COMMENT ON COLUMN products.created_by IS 'Auth0 user ID (string format)';
COMMENT ON COLUMN quotations.created_by IS 'Auth0 user ID (string format)';

-- Verify the changes
DO $$
DECLARE
    table_name text;
    column_type text;
BEGIN
    -- Check each table's created_by column type
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
    
    RAISE NOTICE '=== CREATED_BY FIELD TYPE FIX COMPLETE ===';
    RAISE NOTICE 'All created_by fields are now TEXT type';
    RAISE NOTICE 'Auth0 user IDs can now be stored properly';
END $$;

-- Show the final column types
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE column_name = 'created_by' 
AND table_schema = 'public'
ORDER BY table_name; 