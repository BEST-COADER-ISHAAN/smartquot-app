/*
  # Add weight and freight columns to products table

  1. New Columns
    - `weight` (numeric) - Product weight in kg with 2 decimal precision
    - `freight` (numeric) - Freight cost with 2 decimal precision

  2. Changes
    - Add weight column with default value 0
    - Add freight column with default value 0
    - Both columns are nullable to allow gradual data entry

  3. Notes
    - Existing products will have default values of 0 for both fields
    - Users can update these values through the product editor
*/

-- Add weight column (in kg)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'weight'
  ) THEN
    ALTER TABLE products ADD COLUMN weight numeric(10,2) DEFAULT 0;
  END IF;
END $$;

-- Add freight column (cost)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'freight'
  ) THEN
    ALTER TABLE products ADD COLUMN freight numeric(12,2) DEFAULT 0;
  END IF;
END $$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_weight ON products USING btree (weight);
CREATE INDEX IF NOT EXISTS idx_products_freight ON products USING btree (freight);