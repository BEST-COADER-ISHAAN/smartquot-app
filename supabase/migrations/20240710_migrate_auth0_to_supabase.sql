-- Migration: Remove Auth0 references and migrate to Supabase Auth

-- 1. Drop all policies that reference auth0_id
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can view own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can view own products" ON public.products;
DROP POLICY IF EXISTS "Users can view own quotations" ON public.quotations;
DROP POLICY IF EXISTS "Users can view own quotation products" ON public.quotation_products;
DROP POLICY IF EXISTS "Allow authenticated users to manage customers" ON public.customers;
DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated users to manage quotations" ON public.quotations;
DROP POLICY IF EXISTS "Users can view own quotation rooms" ON public.quotation_rooms;
DROP POLICY IF EXISTS "Users can insert own quotation rooms" ON public.quotation_rooms;
DROP POLICY IF EXISTS "Users can update own quotation rooms" ON public.quotation_rooms;
DROP POLICY IF EXISTS "Users can delete own quotation rooms" ON public.quotation_rooms;
DROP POLICY IF EXISTS "Users can view own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can insert own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can update own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can delete own quotation room items" ON public.quotation_room_items;

-- 2. Drop auth0_id columns and related indexes
ALTER TABLE public.users DROP COLUMN IF EXISTS auth0_id;
DROP INDEX IF EXISTS idx_users_auth0_id;

-- 3. Remove Auth0-based triggers and functions
DROP FUNCTION IF EXISTS handle_auth0_created_by() CASCADE;
DROP TRIGGER IF EXISTS trigger_handle_auth0_customers ON public.customers;
DROP TRIGGER IF EXISTS trigger_handle_auth0_products ON public.products;
DROP TRIGGER IF EXISTS trigger_handle_auth0_quotations ON public.quotations;

-- 4. Recreate RLS policies to use Supabase Auth (auth.uid()::text)
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
    FOR SELECT USING (quotation_id IN (
        SELECT id FROM public.quotations WHERE user_id = auth.uid()::text OR created_by = auth.uid()::text
    ));
CREATE POLICY "Users can insert own quotation rooms" ON public.quotation_rooms
    FOR INSERT WITH CHECK (quotation_id IN (
        SELECT id FROM public.quotations WHERE user_id = auth.uid()::text OR created_by = auth.uid()::text
    ));
CREATE POLICY "Users can update own quotation rooms" ON public.quotation_rooms
    FOR UPDATE USING (quotation_id IN (
        SELECT id FROM public.quotations WHERE user_id = auth.uid()::text OR created_by = auth.uid()::text
    ));
CREATE POLICY "Users can delete own quotation rooms" ON public.quotation_rooms
    FOR DELETE USING (quotation_id IN (
        SELECT id FROM public.quotations WHERE user_id = auth.uid()::text OR created_by = auth.uid()::text
    ));

-- Quotation Room Items
CREATE POLICY "Users can view own quotation room items" ON public.quotation_room_items
    FOR SELECT USING (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE quotation_id IN (
            SELECT id FROM public.quotations WHERE user_id = auth.uid()::text OR created_by = auth.uid()::text
        )
    ));
CREATE POLICY "Users can insert own quotation room items" ON public.quotation_room_items
    FOR INSERT WITH CHECK (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE quotation_id IN (
            SELECT id FROM public.quotations WHERE user_id = auth.uid()::text OR created_by = auth.uid()::text
        )
    ));
CREATE POLICY "Users can update own quotation room items" ON public.quotation_room_items
    FOR UPDATE USING (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE quotation_id IN (
            SELECT id FROM public.quotations WHERE user_id = auth.uid()::text OR created_by = auth.uid()::text
        )
    ));
CREATE POLICY "Users can delete own quotation room items" ON public.quotation_room_items
    FOR DELETE USING (room_id IN (
        SELECT id FROM public.quotation_rooms WHERE quotation_id IN (
            SELECT id FROM public.quotations WHERE user_id = auth.uid()::text OR created_by = auth.uid()::text
        )
    ));

-- 5. Update comments
COMMENT ON COLUMN public.customers.created_by IS 'Supabase user ID who created this record';
COMMENT ON COLUMN public.products.created_by IS 'Supabase user ID who created this record';
COMMENT ON COLUMN public.quotations.created_by IS 'Supabase user ID who created this record'; 