/*
  # Create Missing Tables for Quotation Generator

  1. New Tables
    - Ensure all required tables exist with proper structure
    - Fix any missing relationships
    - Add proper indexes and constraints

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for authenticated users

  3. Functions
    - Auto-generate quotation numbers
    - Update timestamps automatically
*/

-- Create enum for quotation status if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quotation_status') THEN
    CREATE TYPE quotation_status AS ENUM ('draft', 'sent', 'approved', 'rejected');
  END IF;
END $$;

-- Create customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  gst_number text,
  site_address text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create products table if it doesn't exist (should already exist)
CREATE TABLE IF NOT EXISTS products (
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
  created_by uuid REFERENCES auth.users(id)
);

-- Create quotations table if it doesn't exist
CREATE TABLE IF NOT EXISTS quotations (
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
  created_by uuid REFERENCES auth.users(id)
);

-- Create quotation_rooms table if it doesn't exist
CREATE TABLE IF NOT EXISTS quotation_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id uuid REFERENCES quotations(id) ON DELETE CASCADE,
  room_name text NOT NULL,
  room_total decimal(10,2) DEFAULT 0,
  room_margin_amount decimal(10,2) DEFAULT 0,
  room_margin_percentage decimal(5,2) DEFAULT 0,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create quotation_room_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS quotation_room_items (
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

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  -- Customers policies
  DROP POLICY IF EXISTS "Users can read own customers" ON customers;
  DROP POLICY IF EXISTS "Users can insert own customers" ON customers;
  DROP POLICY IF EXISTS "Users can update own customers" ON customers;
  DROP POLICY IF EXISTS "Users can delete own customers" ON customers;

  -- Products policies
  DROP POLICY IF EXISTS "Users can read own products" ON products;
  DROP POLICY IF EXISTS "Users can insert own products" ON products;
  DROP POLICY IF EXISTS "Users can update own products" ON products;
  DROP POLICY IF EXISTS "Users can delete own products" ON products;

  -- Quotations policies
  DROP POLICY IF EXISTS "Users can read own quotations" ON quotations;
  DROP POLICY IF EXISTS "Users can insert own quotations" ON quotations;
  DROP POLICY IF EXISTS "Users can update own quotations" ON quotations;
  DROP POLICY IF EXISTS "Users can delete own quotations" ON quotations;

  -- Quotation rooms policies
  DROP POLICY IF EXISTS "Users can read own quotation rooms" ON quotation_rooms;
  DROP POLICY IF EXISTS "Users can insert own quotation rooms" ON quotation_rooms;
  DROP POLICY IF EXISTS "Users can update own quotation rooms" ON quotation_rooms;
  DROP POLICY IF EXISTS "Users can delete own quotation rooms" ON quotation_rooms;

  -- Quotation room items policies
  DROP POLICY IF EXISTS "Users can read own quotation room items" ON quotation_room_items;
  DROP POLICY IF EXISTS "Users can insert own quotation room items" ON quotation_room_items;
  DROP POLICY IF EXISTS "Users can update own quotation room items" ON quotation_room_items;
  DROP POLICY IF EXISTS "Users can delete own quotation room items" ON quotation_room_items;
END $$;

-- Create comprehensive RLS policies

-- Customers policies
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

-- Products policies
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

-- Quotations policies
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

-- Quotation rooms policies
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

-- Quotation room items policies
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
CREATE INDEX IF NOT EXISTS idx_customers_created_by ON customers(created_by);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);

CREATE INDEX IF NOT EXISTS idx_products_created_by ON products(created_by);
CREATE INDEX IF NOT EXISTS idx_products_archived ON products(is_archived);
CREATE INDEX IF NOT EXISTS idx_products_design_name ON products(design_name);
CREATE INDEX IF NOT EXISTS idx_products_collection ON products(collection);

CREATE INDEX IF NOT EXISTS idx_quotations_created_by ON quotations(created_by);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);
CREATE INDEX IF NOT EXISTS idx_quotations_customer_id ON quotations(customer_id);
CREATE INDEX IF NOT EXISTS idx_quotations_number ON quotations(quotation_number);

CREATE INDEX IF NOT EXISTS idx_quotation_rooms_quotation_id ON quotation_rooms(quotation_id);
CREATE INDEX IF NOT EXISTS idx_quotation_rooms_sort_order ON quotation_rooms(sort_order);

CREATE INDEX IF NOT EXISTS idx_quotation_room_items_room_id ON quotation_room_items(room_id);
CREATE INDEX IF NOT EXISTS idx_quotation_room_items_product_id ON quotation_room_items(product_id);
CREATE INDEX IF NOT EXISTS idx_quotation_room_items_sort_order ON quotation_room_items(sort_order);

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

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS trigger_set_quotation_number ON quotations;

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

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS trigger_customers_updated_at ON customers;
DROP TRIGGER IF EXISTS trigger_products_updated_at ON products;
DROP TRIGGER IF EXISTS trigger_quotations_updated_at ON quotations;

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

-- Add some sample customers for testing
INSERT INTO customers (name, email, phone, gst_number, site_address, notes, created_by)
SELECT 
  'Sample Customer 1',
  'customer1@example.com',
  '+91 9876543210',
  '29ABCDE1234F1Z5',
  '123 Business Street, Mumbai, Maharashtra 400001',
  'Sample customer for testing purposes',
  auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE name = 'Sample Customer 1')
AND auth.uid() IS NOT NULL;

INSERT INTO customers (name, email, phone, gst_number, site_address, notes, created_by)
SELECT 
  'Sample Customer 2',
  'customer2@example.com',
  '+91 9876543211',
  '07FGHIJ5678K2L9',
  '456 Corporate Avenue, Delhi, Delhi 110001',
  'Another sample customer for testing',
  auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE name = 'Sample Customer 2')
AND auth.uid() IS NOT NULL;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';