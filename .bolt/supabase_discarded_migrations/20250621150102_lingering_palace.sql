/*
  # Add Image URL Support to Products

  1. Changes
    - Add image_url column to products table
    - This will store the full Supabase Storage URL for product images

  2. Notes
    - Images will be stored in Supabase Storage bucket 'product-images'
    - URLs will be constructed automatically based on filename input
*/

-- Add image_url column to products table
ALTER TABLE products
ADD COLUMN image_url text;

-- Add index for image_url for better performance when filtering by images
CREATE INDEX IF NOT EXISTS idx_products_image_url ON products(image_url);

-- Add comment to track this change
COMMENT ON COLUMN products.image_url IS 'Full URL to product image stored in Supabase Storage';

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';

-- Verify the column was added
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'image_url'
  ) THEN
    RAISE NOTICE 'SUCCESS: image_url column added to products table';
  ELSE
    RAISE EXCEPTION 'ERROR: Failed to add image_url column';
  END IF;
END $$;