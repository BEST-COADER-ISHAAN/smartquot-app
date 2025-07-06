-- Add quotation_rooms table
CREATE TABLE IF NOT EXISTS public.quotation_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add quotation_room_items table
CREATE TABLE IF NOT EXISTS public.quotation_room_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES public.quotation_rooms(id) ON DELETE CASCADE,
    quotation_id UUID REFERENCES public.quotations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.quotation_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_room_items ENABLE ROW LEVEL SECURITY;

-- RLS: Users can only read their own rooms/items
CREATE POLICY "Users can view own quotation rooms" ON public.quotation_rooms
    FOR SELECT USING (user_id IN (
        SELECT id FROM public.users WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
    ));

CREATE POLICY "Users can view own quotation room items" ON public.quotation_room_items
    FOR SELECT USING (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE user_id IN (
            SELECT id FROM public.users WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    ));

-- Indexes
CREATE INDEX idx_quotation_rooms_user_id ON public.quotation_rooms(user_id);
CREATE INDEX idx_quotation_room_items_room_id ON public.quotation_room_items(room_id);
CREATE INDEX idx_quotation_room_items_quotation_id ON public.quotation_room_items(quotation_id);

-- Triggers for updated_at
CREATE TRIGGER update_quotation_rooms_updated_at BEFORE UPDATE ON public.quotation_rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
