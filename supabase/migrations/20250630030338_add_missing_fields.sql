-- Add missing fields to customers
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS gst_number TEXT;

-- Add missing fields to quotations
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS export_type TEXT;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS terms_conditions TEXT;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS pdf_template TEXT;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS link_template TEXT;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS is_area_wise BOOLEAN;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS include_images BOOLEAN;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS total_margin_amount DECIMAL(10,2);
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS total_margin_percentage DECIMAL(10,2);
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS sqft_in_box_type TEXT;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS show_sqft_in_box BOOLEAN;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS show_sqft_needed BOOLEAN;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS show_box_needed BOOLEAN;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS show_price_per_sqft BOOLEAN;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS show_price_per_box BOOLEAN;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS show_amount BOOLEAN;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS show_margin BOOLEAN;

-- Add missing fields to products (if not already present)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS collection TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS surface TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ex_factory_price DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS mrp_per_sqft DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS mrp_per_box DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS gst_percentage DECIMAL(5,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS insurance_percentage DECIMAL(5,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS actual_sqft_per_box DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS billed_sqft_per_box DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS weight DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS freight DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_archived BOOLEAN;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add missing fields to quotation_rooms (if needed)
ALTER TABLE public.quotation_rooms ADD COLUMN IF NOT EXISTS room_name TEXT;
ALTER TABLE public.quotation_rooms ADD COLUMN IF NOT EXISTS room_total DECIMAL(10,2);
ALTER TABLE public.quotation_rooms ADD COLUMN IF NOT EXISTS room_margin_amount DECIMAL(10,2);
ALTER TABLE public.quotation_rooms ADD COLUMN IF NOT EXISTS room_margin_percentage DECIMAL(10,2);
ALTER TABLE public.quotation_rooms ADD COLUMN IF NOT EXISTS sort_order INTEGER;

-- Add missing fields to quotation_room_items (if needed)
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS product_id UUID;
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS quantity_boxes INTEGER;
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS rate_per_sqft DECIMAL(10,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS mrp_per_box DECIMAL(10,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS amount DECIMAL(10,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS margin_amount DECIMAL(10,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS margin_percentage DECIMAL(10,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS sort_order INTEGER;
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS sqft_needed DECIMAL(10,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS box_needed DECIMAL(10,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS discount_percentage DECIMAL(5,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS price_per_sqft_override DECIMAL(10,2);
ALTER TABLE public.quotation_room_items ADD COLUMN IF NOT EXISTS price_per_box_override DECIMAL(10,2);
