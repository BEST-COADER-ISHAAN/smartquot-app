-- 20240712_recreate_policies_and_fks.sql
-- 1. Recreate foreign key constraints
ALTER TABLE public.quotations
  ADD CONSTRAINT quotations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);
ALTER TABLE public.quotation_rooms
  ADD CONSTRAINT quotation_rooms_quotation_id_fkey FOREIGN KEY (quotation_id) REFERENCES public.quotations(id);
ALTER TABLE public.quotation_room_items
  ADD CONSTRAINT quotation_room_items_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.quotation_rooms(id);
ALTER TABLE public.quotation_room_items
  ADD CONSTRAINT quotation_room_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE public.customers
  ADD CONSTRAINT customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE public.products
  ADD CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE public.quotations
  ADD CONSTRAINT quotations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE public.quotation_products
  ADD CONSTRAINT quotation_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
ALTER TABLE public.quotation_products
  ADD CONSTRAINT quotation_products_quotation_id_fkey FOREIGN KEY (quotation_id) REFERENCES public.quotations(id);

-- 2. Recreate RLS policies
-- Customers
CREATE POLICY "Allow authenticated users to manage customers"
    ON public.customers FOR ALL TO authenticated
    USING (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    )
    WITH CHECK (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    );
-- Products
CREATE POLICY "Allow authenticated users to manage products"
    ON public.products FOR ALL TO authenticated
    USING (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    )
    WITH CHECK (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    );
-- Quotations
CREATE POLICY "Allow authenticated users to manage quotations"
    ON public.quotations FOR ALL TO authenticated
    USING (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    )
    WITH CHECK (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    );
-- Quotation Rooms
CREATE POLICY "Users can view own quotation rooms" ON public.quotation_rooms
    FOR SELECT USING (
        user_id = auth.uid()::text
    );
CREATE POLICY "Users can insert own quotation rooms" ON public.quotation_rooms
    FOR INSERT WITH CHECK (
        user_id = auth.uid()::text
    );
CREATE POLICY "Users can update own quotation rooms" ON public.quotation_rooms
    FOR UPDATE USING (
        user_id = auth.uid()::text
    );
CREATE POLICY "Users can delete own quotation rooms" ON public.quotation_rooms
    FOR DELETE USING (
        user_id = auth.uid()::text
    );
-- Quotation Room Items
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
-- Subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
    FOR SELECT USING (
        user_id = auth.uid()::text
    ); 