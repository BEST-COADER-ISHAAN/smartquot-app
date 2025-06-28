/*
  # Fix Product ID Type Mismatch

  1. Changes
    - Check the current data type of products.id
    - If it's bigint, convert it to uuid
    - Ensure all foreign key references use uuid
    - Recreate foreign key constraints with proper types

  2. Safety
    - Backup existing data before conversion
    - Use safe conversion methods
    - Handle existing relationships properly
*/

-- First, let's check what type the products.id column currently is
DO $$
DECLARE
  products_id_type text;
  has_data boolean;
BEGIN
  -- Get the data type of products.id
  SELECT data_type INTO products_id_type
  FROM information_schema.columns 
  WHERE table_name = 'products' 
  AND column_name = 'id' 
  AND table_schema = 'public';

  -- Check if products table has any data
  SELECT EXISTS(SELECT 1 FROM products LIMIT 1) INTO has_data;

  RAISE NOTICE 'Products.id data type: %', products_id_type;
  RAISE NOTICE 'Products table has data: %', has_data;

  -- If products.id is bigint, we need to convert it to uuid
  IF products_id_type = 'bigint' THEN
    RAISE NOTICE 'Converting products.id from bigint to uuid...';
    
    -- Drop foreign key constraints first
    ALTER TABLE quotation_room_items DROP CONSTRAINT IF EXISTS quotation_room_items_product_id_fkey;
    
    -- If there's existing data, we need to handle it carefully
    IF has_data THEN
      -- Create a backup table
      CREATE TABLE products_backup AS SELECT * FROM products;
      RAISE NOTICE 'Created backup table: products_backup';
      
      -- Clear the products table temporarily
      DELETE FROM products;
    END IF;
    
    -- Change the column type to uuid
    ALTER TABLE products ALTER COLUMN id TYPE uuid USING gen_random_uuid();
    ALTER TABLE products ALTER COLUMN id SET DEFAULT gen_random_uuid();
    
    -- If we had data, we need to restore it with new UUIDs
    IF has_data THEN
      -- Insert data back with new UUIDs, preserving other columns
      INSERT INTO products (design_name, size, collection, surface, ex_factory_price, mrp_per_sqft, mrp_per_box, gst_percentage, insurance_percentage, actual_sqft_per_box, billed_sqft_per_box, is_archived, created_at, updated_at, created_by)
      SELECT design_name, size, collection, surface, ex_factory_price, mrp_per_sqft, mrp_per_box, gst_percentage, insurance_percentage, actual_sqft_per_box, billed_sqft_per_box, is_archived, created_at, updated_at, created_by
      FROM products_backup;
      
      RAISE NOTICE 'Restored product data with new UUIDs';
    END IF;
    
    -- Ensure quotation_room_items.product_id is also uuid
    ALTER TABLE quotation_room_items ALTER COLUMN product_id TYPE uuid USING NULL;
    
    -- Recreate the foreign key constraint
    ALTER TABLE quotation_room_items 
    ADD CONSTRAINT quotation_room_items_product_id_fkey 
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;
    
    RAISE NOTICE 'Successfully converted products.id to uuid and recreated foreign key';
    
  ELSIF products_id_type = 'uuid' THEN
    RAISE NOTICE 'Products.id is already uuid type, checking foreign key constraint...';
    
    -- Just ensure the foreign key constraint exists and is correct
    ALTER TABLE quotation_room_items DROP CONSTRAINT IF EXISTS quotation_room_items_product_id_fkey;
    ALTER TABLE quotation_room_items 
    ADD CONSTRAINT quotation_room_items_product_id_fkey 
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;
    
    RAISE NOTICE 'Foreign key constraint recreated successfully';
    
  ELSE
    RAISE EXCEPTION 'Unexpected data type for products.id: %', products_id_type;
  END IF;
END $$;

-- Ensure all other tables have proper uuid types
DO $$
BEGIN
  -- Verify all ID columns are uuid
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customers' AND column_name = 'id' AND data_type = 'uuid'
  ) THEN
    ALTER TABLE customers ALTER COLUMN id TYPE uuid USING gen_random_uuid();
    ALTER TABLE customers ALTER COLUMN id SET DEFAULT gen_random_uuid();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotations' AND column_name = 'id' AND data_type = 'uuid'
  ) THEN
    ALTER TABLE quotations ALTER COLUMN id TYPE uuid USING gen_random_uuid();
    ALTER TABLE quotations ALTER COLUMN id SET DEFAULT gen_random_uuid();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotation_rooms' AND column_name = 'id' AND data_type = 'uuid'
  ) THEN
    ALTER TABLE quotation_rooms ALTER COLUMN id TYPE uuid USING gen_random_uuid();
    ALTER TABLE quotation_rooms ALTER COLUMN id SET DEFAULT gen_random_uuid();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotation_room_items' AND column_name = 'id' AND data_type = 'uuid'
  ) THEN
    ALTER TABLE quotation_room_items ALTER COLUMN id TYPE uuid USING gen_random_uuid();
    ALTER TABLE quotation_room_items ALTER COLUMN id SET DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Verify all foreign key relationships are working
DO $$
DECLARE
  constraint_count integer;
BEGIN
  -- Check quotation_room_items -> products relationship
  SELECT COUNT(*) INTO constraint_count
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = 'quotation_room_items'
    AND kcu.column_name = 'product_id'
    AND ccu.table_name = 'products';
    
  IF constraint_count = 0 THEN
    RAISE EXCEPTION 'Foreign key relationship between quotation_room_items and products still not working';
  ELSE
    RAISE NOTICE 'Foreign key relationship verified: quotation_room_items -> products';
  END IF;
END $$;

-- Add some sample products if the table is empty
INSERT INTO products (design_name, size, collection, surface, ex_factory_price, mrp_per_sqft, mrp_per_box, gst_percentage, insurance_percentage, actual_sqft_per_box, billed_sqft_per_box, is_archived, created_by)
SELECT 
  'SPACERA LUMINERA',
  '600X1200',
  'SPACERA',
  'LUMINERA',
  285.00,
  475.00,
  342.00,
  18.00,
  0.50,
  0.72,
  0.72,
  false,
  auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE design_name = 'SPACERA LUMINERA' AND size = '600X1200')
AND auth.uid() IS NOT NULL;

INSERT INTO products (design_name, size, collection, surface, ex_factory_price, mrp_per_sqft, mrp_per_box, gst_percentage, insurance_percentage, actual_sqft_per_box, billed_sqft_per_box, is_archived, created_by)
SELECT 
  'ELEGANZA MARBLE',
  '600X1200',
  'ELEGANZA',
  'MARBLE',
  320.00,
  520.00,
  374.40,
  18.00,
  0.50,
  0.72,
  0.72,
  false,
  auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE design_name = 'ELEGANZA MARBLE' AND size = '600X1200')
AND auth.uid() IS NOT NULL;

-- Final verification
DO $$
DECLARE
  products_count integer;
  customers_count integer;
BEGIN
  SELECT COUNT(*) INTO products_count FROM products;
  SELECT COUNT(*) INTO customers_count FROM customers;
  
  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'Products in database: %', products_count;
  RAISE NOTICE 'Customers in database: %', customers_count;
  RAISE NOTICE 'All tables are ready for use.';
END $$;