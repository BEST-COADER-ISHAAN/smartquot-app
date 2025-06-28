/*
  # Fix Foreign Key Relationships for Quotations

  This migration ensures that all foreign key relationships are properly established
  and recognized by Supabase's PostgREST service.

  1. Drop and recreate foreign key constraints to ensure they are properly recognized
  2. Refresh schema cache by recreating the relationships
  3. Ensure all tables have proper foreign key constraints
*/

-- Drop existing foreign key constraints if they exist
DO $$
BEGIN
  -- Drop quotation_rooms foreign key
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'quotation_rooms_quotation_id_fkey' 
    AND table_name = 'quotation_rooms'
  ) THEN
    ALTER TABLE quotation_rooms DROP CONSTRAINT quotation_rooms_quotation_id_fkey;
  END IF;

  -- Drop quotation_room_items foreign key to rooms
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'quotation_room_items_room_id_fkey' 
    AND table_name = 'quotation_room_items'
  ) THEN
    ALTER TABLE quotation_room_items DROP CONSTRAINT quotation_room_items_room_id_fkey;
  END IF;

  -- Drop quotation_room_items foreign key to products
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'quotation_room_items_product_id_fkey' 
    AND table_name = 'quotation_room_items'
  ) THEN
    ALTER TABLE quotation_room_items DROP CONSTRAINT quotation_room_items_product_id_fkey;
  END IF;

  -- Drop quotations foreign key to customers
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'quotations_customer_id_fkey' 
    AND table_name = 'quotations'
  ) THEN
    ALTER TABLE quotations DROP CONSTRAINT quotations_customer_id_fkey;
  END IF;
END $$;

-- Recreate foreign key constraints with explicit names
ALTER TABLE quotations 
ADD CONSTRAINT quotations_customer_id_fkey 
FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL;

ALTER TABLE quotation_rooms 
ADD CONSTRAINT quotation_rooms_quotation_id_fkey 
FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE;

ALTER TABLE quotation_room_items 
ADD CONSTRAINT quotation_room_items_room_id_fkey 
FOREIGN KEY (room_id) REFERENCES quotation_rooms(id) ON DELETE CASCADE;

ALTER TABLE quotation_room_items 
ADD CONSTRAINT quotation_room_items_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;

-- Ensure all tables exist and have proper structure
DO $$
BEGIN
  -- Verify quotations table exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'quotations') THEN
    RAISE EXCEPTION 'quotations table does not exist';
  END IF;

  -- Verify quotation_rooms table exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'quotation_rooms') THEN
    RAISE EXCEPTION 'quotation_rooms table does not exist';
  END IF;

  -- Verify quotation_room_items table exists
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'quotation_room_items') THEN
    RAISE EXCEPTION 'quotation_room_items table does not exist';
  END IF;
END $$;

-- Refresh the schema cache by updating table comments
COMMENT ON TABLE quotations IS 'Main quotations table - updated to refresh schema cache';
COMMENT ON TABLE quotation_rooms IS 'Quotation rooms table - updated to refresh schema cache';
COMMENT ON TABLE quotation_room_items IS 'Quotation room items table - updated to refresh schema cache';
COMMENT ON TABLE customers IS 'Customers table - updated to refresh schema cache';
COMMENT ON TABLE products IS 'Products table - updated to refresh schema cache';

-- Verify foreign key relationships are properly established
DO $$
DECLARE
  fk_count integer;
BEGIN
  -- Check quotation_rooms -> quotations relationship
  SELECT COUNT(*) INTO fk_count
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = 'quotation_rooms'
    AND kcu.column_name = 'quotation_id'
    AND ccu.table_name = 'quotations';
    
  IF fk_count = 0 THEN
    RAISE EXCEPTION 'Foreign key relationship between quotation_rooms and quotations not found';
  END IF;

  -- Check quotation_room_items -> quotation_rooms relationship
  SELECT COUNT(*) INTO fk_count
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = 'quotation_room_items'
    AND kcu.column_name = 'room_id'
    AND ccu.table_name = 'quotation_rooms';
    
  IF fk_count = 0 THEN
    RAISE EXCEPTION 'Foreign key relationship between quotation_room_items and quotation_rooms not found';
  END IF;
END $$;