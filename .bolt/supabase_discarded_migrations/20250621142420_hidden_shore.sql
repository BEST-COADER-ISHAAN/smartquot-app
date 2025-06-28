/*
  # Complete Fresh Database Setup - Quotation Generator

  1. New Tables
    - `customers` - Customer information and contact details
    - `products` - Product catalog with pricing and specifications
    - `quotations` - Main quotations with totals and status
    - `quotation_rooms` - Rooms within quotations
    - `quotation_room_items` - Individual line items within rooms

  2. Security
    - Enable RLS on all tables
    - Comprehensive policies for authenticated users
    - User isolation for all data

  3. Features
    - Auto-generated quotation numbers
    - Automatic timestamp updates
    - Sample data for testing
    - Performance indexes
*/

-- Drop all existing tables if they exist (clean slate)
DROP TABLE IF EXISTS quotation_room_items CASCADE;
DROP TABLE IF EXISTS quotation_rooms CASCADE;
DROP TABLE IF EXISTS quotations CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS quotation_status CASCADE;

-- Create enum for quotation status
CREATE TYPE quotation_status AS ENUM ('draft', 'sent', 'approved', 'rejected');

-- Create customers table
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  gst_number text,
  site_address text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  design_name text NOT NULL,
  size text NOT NULL,
  collection text,
  surface text,
  ex_factory_price decimal(10,2) NOT NULL DEFAULT 0,
  mrp_per_sqft decimal(10,2) NOT NULL DEFAULT 0,
  mrp_per_box decimal(10,2) NOT NULL DEFAULT 0,
  gst_percentage decimal(5,2) DEFAULT 18,
  insurance_percentage decimal(5,2) DEFAULT 0,
  actual_sqft_per_box decimal(8,2) NOT NULL DEFAULT 1,
  billed_sqft_per_box decimal(8,2) NOT NULL DEFAULT 1,
  is_archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create quotations table
CREATE TABLE quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  status quotation_status DEFAULT 'draft',
  total_amount decimal(12,2) DEFAULT 0,
  total_margin_amount decimal(12,2) DEFAULT 0,
  total_margin_percentage decimal(5,2) DEFAULT 0,
  terms_conditions text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create quotation_rooms table
CREATE TABLE quotation_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id uuid REFERENCES quotations(id) ON DELETE CASCADE,
  room_name text NOT NULL,
  room_total decimal(10,2) DEFAULT 0,
  room_margin_amount decimal(10,2) DEFAULT 0,
  room_margin_percentage decimal(5,2) DEFAULT 0,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create quotation_room_items table
CREATE TABLE quotation_room_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES quotation_rooms(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity_boxes decimal(8,2) NOT NULL DEFAULT 1,
  rate_per_sqft decimal(10,2) NOT NULL DEFAULT 0,
  mrp_per_box decimal(10,2) NOT NULL DEFAULT 0,
  amount decimal(10,2) DEFAULT 0,
  margin_amount decimal(10,2) DEFAULT 0,
  margin_percentage decimal(5,2) DEFAULT 0,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_room_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for customers
CREATE POLICY "Users can read own customers"
  ON customers FOR SELECT TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can insert own customers"
  ON customers FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own customers"
  ON customers FOR UPDATE TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete own customers"
  ON customers FOR DELETE TO authenticated
  USING (created_by = auth.uid());

-- Create RLS policies for products
CREATE POLICY "Users can read own products"
  ON products FOR SELECT TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can insert own products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own products"
  ON products FOR UPDATE TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete own products"
  ON products FOR DELETE TO authenticated
  USING (created_by = auth.uid());

-- Create RLS policies for quotations
CREATE POLICY "Users can read own quotations"
  ON quotations FOR SELECT TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can insert own quotations"
  ON quotations FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own quotations"
  ON quotations FOR UPDATE TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete own quotations"
  ON quotations FOR DELETE TO authenticated
  USING (created_by = auth.uid());

-- Create RLS policies for quotation_rooms
CREATE POLICY "Users can read own quotation rooms"
  ON quotation_rooms FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM quotations 
    WHERE quotations.id = quotation_rooms.quotation_id 
    AND quotations.created_by = auth.uid()
  ));

CREATE POLICY "Users can insert own quotation rooms"
  ON quotation_rooms FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM quotations 
    WHERE quotations.id = quotation_rooms.quotation_id 
    AND quotations.created_by = auth.uid()
  ));

CREATE POLICY "Users can update own quotation rooms"
  ON quotation_rooms FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM quotations 
    WHERE quotations.id = quotation_rooms.quotation_id 
    AND quotations.created_by = auth.uid()
  ));

CREATE POLICY "Users can delete own quotation rooms"
  ON quotation_rooms FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM quotations 
    WHERE quotations.id = quotation_rooms.quotation_id 
    AND quotations.created_by = auth.uid()
  ));

-- Create RLS policies for quotation_room_items
CREATE POLICY "Users can read own quotation room items"
  ON quotation_room_items FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM quotation_rooms 
    JOIN quotations ON quotations.id = quotation_rooms.quotation_id
    WHERE quotation_rooms.id = quotation_room_items.room_id 
    AND quotations.created_by = auth.uid()
  ));

CREATE POLICY "Users can insert own quotation room items"
  ON quotation_room_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM quotation_rooms 
    JOIN quotations ON quotations.id = quotation_rooms.quotation_id
    WHERE quotation_rooms.id = quotation_room_items.room_id 
    AND quotations.created_by = auth.uid()
  ));

CREATE POLICY "Users can update own quotation room items"
  ON quotation_room_items FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM quotation_rooms 
    JOIN quotations ON quotations.id = quotation_rooms.quotation_id
    WHERE quotation_rooms.id = quotation_room_items.room_id 
    AND quotations.created_by = auth.uid()
  ));

CREATE POLICY "Users can delete own quotation room items"
  ON quotation_room_items FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM quotation_rooms 
    JOIN quotations ON quotations.id = quotation_rooms.quotation_id
    WHERE quotation_rooms.id = quotation_room_items.room_id 
    AND quotations.created_by = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX idx_customers_created_by ON customers(created_by);
CREATE INDEX idx_customers_name ON customers(name);

CREATE INDEX idx_products_created_by ON products(created_by);
CREATE INDEX idx_products_archived ON products(is_archived);
CREATE INDEX idx_products_design_name ON products(design_name);
CREATE INDEX idx_products_collection ON products(collection);

CREATE INDEX idx_quotations_created_by ON quotations(created_by);
CREATE INDEX idx_quotations_status ON quotations(status);
CREATE INDEX idx_quotations_customer_id ON quotations(customer_id);
CREATE INDEX idx_quotations_number ON quotations(quotation_number);

CREATE INDEX idx_quotation_rooms_quotation_id ON quotation_rooms(quotation_id);
CREATE INDEX idx_quotation_rooms_sort_order ON quotation_rooms(sort_order);

CREATE INDEX idx_quotation_room_items_room_id ON quotation_room_items(room_id);
CREATE INDEX idx_quotation_room_items_product_id ON quotation_room_items(product_id);
CREATE INDEX idx_quotation_room_items_sort_order ON quotation_room_items(sort_order);

-- Function to generate quotation number
CREATE OR REPLACE FUNCTION generate_quotation_number()
RETURNS text AS $$
DECLARE
  next_number integer;
  formatted_number text;
BEGIN
  -- Get the next sequence number
  SELECT COALESCE(MAX(CAST(SUBSTRING(quotation_number FROM 'QT(\d+)') AS integer)), 0) + 1
  INTO next_number
  FROM quotations
  WHERE quotation_number ~ '^QT\d+$';
  
  -- Format as QT001, QT002, etc.
  formatted_number := 'QT' || LPAD(next_number::text, 3, '0');
  
  RETURN formatted_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to auto-generate quotation number
CREATE OR REPLACE FUNCTION set_quotation_number()
RETURNS trigger AS $$
BEGIN
  IF NEW.quotation_number IS NULL OR NEW.quotation_number = '' THEN
    NEW.quotation_number := generate_quotation_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate quotation number
CREATE TRIGGER trigger_set_quotation_number
  BEFORE INSERT ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION set_quotation_number();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER trigger_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_quotations_updated_at
  BEFORE UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Final verification in a proper DO block
DO $$
DECLARE
  table_count integer;
  rls_count integer;
  fk_count integer;
BEGIN
  -- Verify all tables were created successfully
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name IN ('customers', 'products', 'quotations', 'quotation_rooms', 'quotation_room_items');
  
  IF table_count = 5 THEN
    RAISE NOTICE 'SUCCESS: All 5 tables created successfully!';
    RAISE NOTICE 'Tables: customers, products, quotations, quotation_rooms, quotation_room_items';
  ELSE
    RAISE EXCEPTION 'ERROR: Expected 5 tables, but found %', table_count;
  END IF;

  -- Verify RLS is enabled on all tables
  SELECT COUNT(*) INTO rls_count
  FROM pg_tables 
  WHERE schemaname = 'public' 
  AND tablename IN ('customers', 'products', 'quotations', 'quotation_rooms', 'quotation_room_items')
  AND rowsecurity = true;
  
  IF rls_count = 5 THEN
    RAISE NOTICE 'SUCCESS: RLS enabled on all tables!';
  ELSE
    RAISE EXCEPTION 'ERROR: RLS not enabled on all tables. Found % out of 5', rls_count;
  END IF;

  -- Verify foreign key constraints
  SELECT COUNT(*) INTO fk_count
  FROM information_schema.table_constraints 
  WHERE constraint_type = 'FOREIGN KEY'
  AND table_name IN ('quotations', 'quotation_rooms', 'quotation_room_items');
  
  IF fk_count >= 4 THEN
    RAISE NOTICE 'SUCCESS: Foreign key constraints created!';
  ELSE
    RAISE EXCEPTION 'ERROR: Expected at least 4 foreign keys, found %', fk_count;
  END IF;

  RAISE NOTICE '=== DATABASE SETUP COMPLETE ===';
  RAISE NOTICE 'Your quotation generator database is ready!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Sign in to your application';
  RAISE NOTICE '2. Add some products in the Products tab';
  RAISE NOTICE '3. Add customers in the Customers tab';
  RAISE NOTICE '4. Start creating quotations!';
END $$;