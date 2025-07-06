-- Add missing fields to customers table
ALTER TABLE public.customers 
ADD COLUMN IF NOT EXISTS gst_number TEXT,
ADD COLUMN IF NOT EXISTS site_address TEXT,
ADD COLUMN IF NOT EXISTS created_by TEXT;

-- Add missing fields to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS created_by TEXT;

-- Add missing fields to quotations table
ALTER TABLE public.quotations 
ADD COLUMN IF NOT EXISTS created_by TEXT,
ADD COLUMN IF NOT EXISTS total_margin_amount DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_margin_percentage DECIMAL(5,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS terms_conditions TEXT,
ADD COLUMN IF NOT EXISTS include_images BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS export_type TEXT DEFAULT 'pdf' CHECK (export_type IN ('pdf', 'link', 'both')),
ADD COLUMN IF NOT EXISTS pdf_template TEXT DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS link_template TEXT DEFAULT 'modern',
ADD COLUMN IF NOT EXISTS is_area_wise BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS sqft_in_box_type TEXT DEFAULT 'actual' CHECK (sqft_in_box_type IN ('actual', 'billed')),
ADD COLUMN IF NOT EXISTS show_sqft_in_box BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_sqft_needed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_box_needed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_price_per_sqft BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_price_per_box BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_amount BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_margin BOOLEAN DEFAULT false;

-- Update quotation_rooms table to match frontend expectations
DROP TABLE IF EXISTS public.quotation_room_items;
DROP TABLE IF EXISTS public.quotation_rooms;

-- Create quotation_rooms table with proper structure
CREATE TABLE IF NOT EXISTS public.quotation_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quotation_id UUID REFERENCES public.quotations(id) ON DELETE CASCADE,
    room_name TEXT NOT NULL,
    room_total DECIMAL(10,2) DEFAULT 0,
    room_margin_amount DECIMAL(10,2) DEFAULT 0,
    room_margin_percentage DECIMAL(5,2) DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quotation_room_items table with proper structure
CREATE TABLE IF NOT EXISTS public.quotation_room_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES public.quotation_rooms(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    name TEXT,
    product_description TEXT,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit_price DECIMAL(10,2) DEFAULT 0,
    total_price DECIMAL(10,2) DEFAULT 0,
    margin_amount DECIMAL(10,2) DEFAULT 0,
    margin_percentage DECIMAL(5,2) DEFAULT 0,
    sqft_in_box DECIMAL(10,2),
    sqft_needed DECIMAL(10,2),
    box_needed DECIMAL(10,2),
    price_per_sqft DECIMAL(10,2),
    price_per_box DECIMAL(10,2),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE public.quotation_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_room_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for quotation_rooms
CREATE POLICY "Users can view own quotation rooms" ON public.quotation_rooms
    FOR SELECT USING (quotation_id IN (
        SELECT id FROM public.quotations WHERE created_by = auth.uid()::text
    ));

CREATE POLICY "Users can insert own quotation rooms" ON public.quotation_rooms
    FOR INSERT WITH CHECK (quotation_id IN (
        SELECT id FROM public.quotations WHERE created_by = auth.uid()::text
    ));

CREATE POLICY "Users can update own quotation rooms" ON public.quotation_rooms
    FOR UPDATE USING (quotation_id IN (
        SELECT id FROM public.quotations WHERE created_by = auth.uid()::text
    ));

CREATE POLICY "Users can delete own quotation rooms" ON public.quotation_rooms
    FOR DELETE USING (quotation_id IN (
        SELECT id FROM public.quotations WHERE created_by = auth.uid()::text
    ));

-- RLS policies for quotation_room_items
CREATE POLICY "Users can view own quotation room items" ON public.quotation_room_items
    FOR SELECT USING (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE quotation_id IN (
            SELECT id FROM public.quotations WHERE created_by = auth.uid()::text
        )
    ));

CREATE POLICY "Users can insert own quotation room items" ON public.quotation_room_items
    FOR INSERT WITH CHECK (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE quotation_id IN (
            SELECT id FROM public.quotations WHERE created_by = auth.uid()::text
        )
    ));

CREATE POLICY "Users can update own quotation room items" ON public.quotation_room_items
    FOR UPDATE USING (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE quotation_id IN (
            SELECT id FROM public.quotations WHERE created_by = auth.uid()::text
        )
    ));

CREATE POLICY "Users can delete own quotation room items" ON public.quotation_room_items
    FOR DELETE USING (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE quotation_id IN (
            SELECT id FROM public.quotations WHERE created_by = auth.uid()::text
        )
    ));

-- Create indexes
CREATE INDEX idx_quotation_rooms_quotation_id ON public.quotation_rooms(quotation_id);
CREATE INDEX idx_quotation_room_items_room_id ON public.quotation_room_items(room_id);
CREATE INDEX idx_quotation_room_items_product_id ON public.quotation_room_items(product_id);

-- Create triggers for updated_at
CREATE TRIGGER update_quotation_rooms_updated_at BEFORE UPDATE ON public.quotation_rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotation_room_items_updated_at BEFORE UPDATE ON public.quotation_room_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 