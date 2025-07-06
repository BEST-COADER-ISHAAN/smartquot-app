-- 20240712_fix_uuid_to_text_and_policies.sql
-- 1. Drop all policies referencing user_id, created_by, id, or room_id
DROP POLICY IF EXISTS "Allow authenticated users to manage customers" ON public.customers;
DROP POLICY IF EXISTS "Allow all authenticated users" ON public.customers;
DROP POLICY IF EXISTS "Users can read own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can insert own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can update own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can delete own customers" ON public.customers;

DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON public.products;
DROP POLICY IF EXISTS "Allow all authenticated users" ON public.products;
DROP POLICY IF EXISTS "Users can read own products" ON public.products;
DROP POLICY IF EXISTS "Users can insert own products" ON public.products;
DROP POLICY IF EXISTS "Users can update own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete own products" ON public.products;

DROP POLICY IF EXISTS "Allow authenticated users to manage quotations" ON public.quotations;
DROP POLICY IF EXISTS "Allow all authenticated users" ON public.quotations;
DROP POLICY IF EXISTS "Users can read own quotations" ON public.quotations;
DROP POLICY IF EXISTS "Users can insert own quotations" ON public.quotations;
DROP POLICY IF EXISTS "Users can update own quotations" ON public.quotations;
DROP POLICY IF EXISTS "Users can delete own quotations" ON public.quotations;

DROP POLICY IF EXISTS "Users can view own quotation rooms" ON public.quotation_rooms;
DROP POLICY IF EXISTS "Users can insert own quotation rooms" ON public.quotation_rooms;
DROP POLICY IF EXISTS "Users can update own quotation rooms" ON public.quotation_rooms;
DROP POLICY IF EXISTS "Users can delete own quotation rooms" ON public.quotation_rooms;

DROP POLICY IF EXISTS "Users can view own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can insert own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can update own quotation room items" ON public.quotation_room_items;
DROP POLICY IF EXISTS "Users can delete own quotation room items" ON public.quotation_room_items;

DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;

-- 2. Fix invalid data (set empty string to NULL for uuid columns)
UPDATE public.customers SET user_id = NULL WHERE user_id = '';
UPDATE public.customers SET created_by = NULL WHERE created_by = '';
UPDATE public.products SET user_id = NULL WHERE user_id = '';
UPDATE public.products SET created_by = NULL WHERE created_by = '';
UPDATE public.quotations SET user_id = NULL WHERE user_id = '';
UPDATE public.quotations SET created_by = NULL WHERE created_by = '';
UPDATE public.subscriptions SET user_id = NULL WHERE user_id = '';
UPDATE public.quotation_rooms SET user_id = NULL WHERE user_id = '';
UPDATE public.quotation_room_items SET user_id = NULL WHERE user_id = '';
UPDATE public.quotation_room_items SET room_id = NULL WHERE room_id = '';

-- 3. Alter columns from uuid to text
ALTER TABLE public.customers ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.customers ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.products ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.products ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.quotations ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.quotations ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.subscriptions ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.users ALTER COLUMN id TYPE text USING id::text;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotation_rooms' AND column_name = 'user_id' AND table_schema = 'public'
  ) THEN
    EXECUTE 'ALTER TABLE public.quotation_rooms ALTER COLUMN user_id TYPE text USING user_id::text;';
  END IF;
END $$;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotation_room_items' AND column_name = 'user_id' AND table_schema = 'public'
  ) THEN
    EXECUTE 'ALTER TABLE public.quotation_room_items ALTER COLUMN user_id TYPE text USING user_id::text;';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotation_room_items' AND column_name = 'room_id' AND table_schema = 'public'
  ) THEN
    EXECUTE 'ALTER TABLE public.quotation_room_items ALTER COLUMN room_id TYPE text USING room_id::text;';
  END IF;
END $$;

-- 4. Recreate policies using auth.uid()::text
CREATE POLICY "Allow authenticated users to manage customers"
    ON public.customers FOR ALL TO authenticated
    USING (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    )
    WITH CHECK (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    );

CREATE POLICY "Allow authenticated users to manage products"
    ON public.products FOR ALL TO authenticated
    USING (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    )
    WITH CHECK (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    );

CREATE POLICY "Allow authenticated users to manage quotations"
    ON public.quotations FOR ALL TO authenticated
    USING (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    )
    WITH CHECK (
        user_id = auth.uid()::text OR created_by = auth.uid()::text
    );

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

CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
    FOR SELECT USING (
        user_id = auth.uid()::text
    ); 