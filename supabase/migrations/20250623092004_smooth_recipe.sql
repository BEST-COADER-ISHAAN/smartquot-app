/*
  # Add export and formatting fields to quotations table

  1. New Columns
    - `include_images` (boolean) - Whether to include images in quotation export
    - `export_type` (text) - Preferred export type: 'pdf', 'link', or 'both'
    - `pdf_template` (text) - PDF template/format preference
    - `link_template` (text) - Link template/format preference
    - `is_area_wise` (boolean) - Whether quotation is organized by areas/rooms

  2. Changes
    - Add new columns with appropriate defaults
    - All new columns are nullable to maintain compatibility

  3. Notes
    - Existing quotations will have default values
    - Users can update these through the new quotation wizard
*/

-- Add include_images column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'include_images'
  ) THEN
    ALTER TABLE quotations ADD COLUMN include_images boolean DEFAULT false;
  END IF;
END $$;

-- Add export_type column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'export_type'
  ) THEN
    ALTER TABLE quotations ADD COLUMN export_type text DEFAULT 'pdf';
  END IF;
END $$;

-- Add pdf_template column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'pdf_template'
  ) THEN
    ALTER TABLE quotations ADD COLUMN pdf_template text;
  END IF;
END $$;

-- Add link_template column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'link_template'
  ) THEN
    ALTER TABLE quotations ADD COLUMN link_template text;
  END IF;
END $$;

-- Add is_area_wise column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'is_area_wise'
  ) THEN
    ALTER TABLE quotations ADD COLUMN is_area_wise boolean DEFAULT true;
  END IF;
END $$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quotations_export_type ON quotations USING btree (export_type);
CREATE INDEX IF NOT EXISTS idx_quotations_include_images ON quotations USING btree (include_images);
CREATE INDEX IF NOT EXISTS idx_quotations_is_area_wise ON quotations USING btree (is_area_wise);