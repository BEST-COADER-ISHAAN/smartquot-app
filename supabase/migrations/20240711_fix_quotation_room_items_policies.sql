-- 20240711_fix_quotation_room_items_policies.sql
-- 1. Drop all policies for quotation_room_items
DROP POLICY IF EXISTS "Users can view own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can insert own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can update own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can delete own quotation room items" ON public.quotation_room_items;

-- 2. Recreate policies referencing user_id only via quotation_rooms
CREATE POLICY "Users can view own quotation room items" ON public.quotation_room_items
    FOR SELECT USING (
        room_id IN (
            SELECT id FROM public.quotation_rooms WHERE user_id = auth.uid()::text
        )
    );
CREATE POLICY "Users can insert own quotation room items" ON public.quotation_room_items
    FOR INSERT WITH CHECK (
        room_id IN (
            SELECT id FROM public.quotation_rooms WHERE user_id = auth.uid()::text
        )
    );
CREATE POLICY "Users can update own quotation room items" ON public.quotation_room_items
    FOR UPDATE USING (
        room_id IN (
            SELECT id FROM public.quotation_rooms WHERE user_id = auth.uid()::text
        )
    );
CREATE POLICY "Users can delete own quotation room items" ON public.quotation_room_items
    FOR DELETE USING (
        room_id IN (
            SELECT id FROM public.quotation_rooms WHERE user_id = auth.uid()::text
        )
    ); 