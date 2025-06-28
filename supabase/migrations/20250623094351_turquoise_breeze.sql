/*
  # Enhanced Quotation Room Items Schema

  1. New Columns for Enhanced Product Item Fields
    - `sqft_in_box_type` (text) - Store 'actual' or 'billed' selection
    - `sqft_needed` (numeric) - SQFT needed input by user
    - `box_needed` (numeric) - Calculated box needed based on formula
    - `discount_percentage` (numeric) - Discount percentage applied
    - `price_per_sqft_override` (numeric, nullable) - User override for price per sqft
    - `price_per_box_override` (numeric, nullable) - User override for price per box

  2. Column Visibility Controls
    - `show_sqft_in_box` (boolean) - Show SQFT in box column in quotation
    - `show_sqft_needed` (boolean) - Show SQFT needed column in quotation
    - `show_box_needed` (boolean) - Show box needed column in quotation
    - `show_price_per_sqft` (boolean) - Show price per sqft column in quotation
    - `show_price_per_box` (boolean) - Show price per box column in quotation
    - `show_amount` (boolean) - Show amount column in quotation
    - `show_margin` (boolean) - Show margin column in quotation

  3. Changes
    - Add all new columns with appropriate defaults
    - Update existing quantity_boxes to be non-nullable with default
    - Update existing rate_per_sqft to be non-nullable with default
    - Update existing mrp_per_box to be non-nullable with default

  4. Notes
    - Name, Size, Surface columns are always shown (no checkbox needed)
    - Discount column is never shown in quotation (no checkbox needed)
    - All visibility columns default to true except margin (defaults to false for security)
*/

-- Add enhanced calculation fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'sqft_in_box_type'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN sqft_in_box_type text DEFAULT 'billed';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'sqft_needed'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN sqft_needed numeric(12,2) DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'box_needed'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN box_needed numeric(12,2) DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'discount_percentage'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN discount_percentage numeric(6,3) DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'price_per_sqft_override'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN price_per_sqft_override numeric(12,2);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'price_per_box_override'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN price_per_box_override numeric(12,2);
  END IF;
END $$;

-- Add column visibility control fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_sqft_in_box'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN show_sqft_in_box boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_sqft_needed'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN show_sqft_needed boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_box_needed'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN show_box_needed boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_price_per_sqft'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN show_price_per_sqft boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_price_per_box'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN show_price_per_box boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_amount'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN show_amount boolean DEFAULT true;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_margin'
  ) THEN
    ALTER TABLE quotation_room_items ADD COLUMN show_margin boolean DEFAULT false;
  END IF;
END $$;

-- Update existing columns to be non-nullable with proper defaults
DO $$
BEGIN
  -- Update quantity_boxes to be non-nullable
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' 
    AND column_name = 'quantity_boxes' 
    AND is_nullable = 'YES'
  ) THEN
    UPDATE quotation_room_items SET quantity_boxes = 1 WHERE quantity_boxes IS NULL;
    ALTER TABLE quotation_room_items ALTER COLUMN quantity_boxes SET NOT NULL;
    ALTER TABLE quotation_room_items ALTER COLUMN quantity_boxes SET DEFAULT 1;
  END IF;
END $$;

DO $$
BEGIN
  -- Update rate_per_sqft to be non-nullable
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' 
    AND column_name = 'rate_per_sqft' 
    AND is_nullable = 'YES'
  ) THEN
    UPDATE quotation_room_items SET rate_per_sqft = 0 WHERE rate_per_sqft IS NULL;
    ALTER TABLE quotation_room_items ALTER COLUMN rate_per_sqft SET NOT NULL;
    ALTER TABLE quotation_room_items ALTER COLUMN rate_per_sqft SET DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  -- Update mrp_per_box to be non-nullable
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' 
    AND column_name = 'mrp_per_box' 
    AND is_nullable = 'YES'
  ) THEN
    UPDATE quotation_room_items SET mrp_per_box = 0 WHERE mrp_per_box IS NULL;
    ALTER TABLE quotation_room_items ALTER COLUMN mrp_per_box SET NOT NULL;
    ALTER TABLE quotation_room_items ALTER COLUMN mrp_per_box SET DEFAULT 0;
  END IF;
END $$;

-- Add indexes for better query performance on new fields
CREATE INDEX IF NOT EXISTS idx_quotation_room_items_sqft_in_box_type ON quotation_room_items USING btree (sqft_in_box_type);
CREATE INDEX IF NOT EXISTS idx_quotation_room_items_discount_percentage ON quotation_room_items USING btree (discount_percentage);
CREATE INDEX IF NOT EXISTS idx_quotation_room_items_box_needed ON quotation_room_items USING btree (box_needed);

-- Add check constraints for data validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'quotation_room_items_sqft_in_box_type_check'
  ) THEN
    ALTER TABLE quotation_room_items 
    ADD CONSTRAINT quotation_room_items_sqft_in_box_type_check 
    CHECK (sqft_in_box_type IN ('actual', 'billed'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'quotation_room_items_discount_percentage_check'
  ) THEN
    ALTER TABLE quotation_room_items 
    ADD CONSTRAINT quotation_room_items_discount_percentage_check 
    CHECK (discount_percentage >= 0 AND discount_percentage <= 100);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'quotation_room_items_sqft_needed_check'
  ) THEN
    ALTER TABLE quotation_room_items 
    ADD CONSTRAINT quotation_room_items_sqft_needed_check 
    CHECK (sqft_needed >= 0);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'quotation_room_items_box_needed_check'
  ) THEN
    ALTER TABLE quotation_room_items 
    ADD CONSTRAINT quotation_room_items_box_needed_check 
    CHECK (box_needed >= 0);
  END IF;
END $$;