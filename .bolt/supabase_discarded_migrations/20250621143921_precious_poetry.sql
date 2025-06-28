/*
  # Fix Numeric Field Overflow Issues

  1. Changes
    - Increase precision for price fields to handle larger values
    - Update decimal field definitions to accommodate real-world pricing
    - Ensure all numeric fields can handle typical product pricing scenarios

  2. Field Updates
    - ex_factory_price: decimal(12,2) - up to 999,999,999.99
    - mrp_per_sqft: decimal(12,2) - up to 999,999,999.99  
    - mrp_per_box: decimal(12,2) - up to 999,999,999.99
    - gst_percentage: decimal(6,3) - up to 999.999%
    - insurance_percentage: decimal(6,3) - up to 999.999%
    - actual_sqft_per_box: decimal(10,4) - up to 999,999.9999
    - billed_sqft_per_box: decimal(10,4) - up to 999,999.9999
*/

-- Update products table to handle larger numeric values
ALTER TABLE products 
  ALTER COLUMN ex_factory_price TYPE decimal(12,2),
  ALTER COLUMN mrp_per_sqft TYPE decimal(12,2),
  ALTER COLUMN mrp_per_box TYPE decimal(12,2),
  ALTER COLUMN gst_percentage TYPE decimal(6,3),
  ALTER COLUMN insurance_percentage TYPE decimal(6,3),
  ALTER COLUMN actual_sqft_per_box TYPE decimal(10,4),
  ALTER COLUMN billed_sqft_per_box TYPE decimal(10,4);

-- Update quotations table to handle larger amounts
ALTER TABLE quotations
  ALTER COLUMN total_amount TYPE decimal(15,2),
  ALTER COLUMN total_margin_amount TYPE decimal(15,2),
  ALTER COLUMN total_margin_percentage TYPE decimal(6,3);

-- Update quotation_rooms table
ALTER TABLE quotation_rooms
  ALTER COLUMN room_total TYPE decimal(12,2),
  ALTER COLUMN room_margin_amount TYPE decimal(12,2),
  ALTER COLUMN room_margin_percentage TYPE decimal(6,3);

-- Update quotation_room_items table
ALTER TABLE quotation_room_items
  ALTER COLUMN quantity_boxes TYPE decimal(10,4),
  ALTER COLUMN rate_per_sqft TYPE decimal(12,2),
  ALTER COLUMN mrp_per_box TYPE decimal(12,2),
  ALTER COLUMN amount TYPE decimal(12,2),
  ALTER COLUMN margin_amount TYPE decimal(12,2),
  ALTER COLUMN margin_percentage TYPE decimal(6,3);

-- Add a comment to track this change
COMMENT ON TABLE products IS 'Products table - Updated numeric field precision to handle larger values';

-- Verify the changes
DO $$
DECLARE
  column_info record;
BEGIN
  -- Check products table numeric columns
  FOR column_info IN 
    SELECT column_name, data_type, numeric_precision, numeric_scale
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND data_type = 'numeric'
    ORDER BY column_name
  LOOP
    RAISE NOTICE 'products.%: % (precision: %, scale: %)', 
      column_info.column_name, 
      column_info.data_type, 
      column_info.numeric_precision, 
      column_info.numeric_scale;
  END LOOP;
  
  RAISE NOTICE 'Numeric field precision updated successfully!';
  RAISE NOTICE 'Products table can now handle much larger price values.';
END $$;