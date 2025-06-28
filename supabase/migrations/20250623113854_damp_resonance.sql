/*
  # Move column visibility settings from quotation_room_items to quotations table

  1. New Columns in quotations table
    - `sqft_in_box_type` (text) - Store 'actual' or 'billed' selection
    - `show_sqft_in_box` (boolean) - Show SQFT in box column in quotation
    - `show_sqft_needed` (boolean) - Show SQFT needed column in quotation
    - `show_box_needed` (boolean) - Show box needed column in quotation
    - `show_price_per_sqft` (boolean) - Show price per sqft column in quotation
    - `show_price_per_box` (boolean) - Show price per box column in quotation
    - `show_amount` (boolean) - Show amount column in quotation
    - `show_margin` (boolean) - Show margin column in quotation

  2. Remove columns from quotation_room_items table
    - Drop `sqft_in_box_type` column
    - Drop all `show_*` columns

  3. Changes
    - Move column visibility controls to global quotation level
    - All visibility columns default to false for security
    - sqft_in_box_type defaults to 'billed'

  4. Notes
    - This makes column visibility consistent across all items in a quotation
    - Existing quotations will have default values applied
*/

-- Add new columns to quotations table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'sqft_in_box_type'
  ) THEN
    ALTER TABLE quotations ADD COLUMN sqft_in_box_type text DEFAULT 'billed';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'show_sqft_in_box'
  ) THEN
    ALTER TABLE quotations ADD COLUMN show_sqft_in_box boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'show_sqft_needed'
  ) THEN
    ALTER TABLE quotations ADD COLUMN show_sqft_needed boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'show_box_needed'
  ) THEN
    ALTER TABLE quotations ADD COLUMN show_box_needed boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'show_price_per_sqft'
  ) THEN
    ALTER TABLE quotations ADD COLUMN show_price_per_sqft boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'show_price_per_box'
  ) THEN
    ALTER TABLE quotations ADD COLUMN show_price_per_box boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'show_amount'
  ) THEN
    ALTER TABLE quotations ADD COLUMN show_amount boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'show_margin'
  ) THEN
    ALTER TABLE quotations ADD COLUMN show_margin boolean DEFAULT false;
  END IF;
END $$;

-- Remove columns from quotation_room_items table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'sqft_in_box_type'
  ) THEN
    ALTER TABLE quotation_room_items DROP COLUMN sqft_in_box_type;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_sqft_in_box'
  ) THEN
    ALTER TABLE quotation_room_items DROP COLUMN show_sqft_in_box;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_sqft_needed'
  ) THEN
    ALTER TABLE quotation_room_items DROP COLUMN show_sqft_needed;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_box_needed'
  ) THEN
    ALTER TABLE quotation_room_items DROP COLUMN show_box_needed;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_price_per_sqft'
  ) THEN
    ALTER TABLE quotation_room_items DROP COLUMN show_price_per_sqft;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_price_per_box'
  ) THEN
    ALTER TABLE quotation_room_items DROP COLUMN show_price_per_box;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_amount'
  ) THEN
    ALTER TABLE quotation_room_items DROP COLUMN show_amount;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotation_room_items' AND column_name = 'show_margin'
  ) THEN
    ALTER TABLE quotation_room_items DROP COLUMN show_margin;
  END IF;
END $$;

-- Drop related indexes from quotation_room_items table
DROP INDEX IF EXISTS idx_quotation_room_items_sqft_in_box_type;

-- Drop related constraints from quotation_room_items table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'quotation_room_items_sqft_in_box_type_check'
  ) THEN
    ALTER TABLE quotation_room_items DROP CONSTRAINT quotation_room_items_sqft_in_box_type_check;
  END IF;
END $$;

-- Add check constraint for sqft_in_box_type in quotations table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'quotations_sqft_in_box_type_check'
  ) THEN
    ALTER TABLE quotations 
    ADD CONSTRAINT quotations_sqft_in_box_type_check 
    CHECK (sqft_in_box_type IN ('actual', 'billed'));
  END IF;
END $$;

-- Add indexes for better query performance on new quotations columns
CREATE INDEX IF NOT EXISTS idx_quotations_sqft_in_box_type ON quotations USING btree (sqft_in_box_type);
CREATE INDEX IF NOT EXISTS idx_quotations_show_sqft_in_box ON quotations USING btree (show_sqft_in_box);
CREATE INDEX IF NOT EXISTS idx_quotations_show_sqft_needed ON quotations USING btree (show_sqft_needed);
CREATE INDEX IF NOT EXISTS idx_quotations_show_box_needed ON quotations USING btree (show_box_needed);
CREATE INDEX IF NOT EXISTS idx_quotations_show_price_per_sqft ON quotations USING btree (show_price_per_sqft);
CREATE INDEX IF NOT EXISTS idx_quotations_show_price_per_box ON quotations USING btree (show_price_per_box);
CREATE INDEX IF NOT EXISTS idx_quotations_show_amount ON quotations USING btree (show_amount);
CREATE INDEX IF NOT EXISTS idx_quotations_show_margin ON quotations USING btree (show_margin);