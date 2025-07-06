-- 20240711_drop_policies_alter_userid_to_text_and_recreate.sql
-- 1. Drop policies that reference user_id/created_by
DROP POLICY IF EXISTS "Allow authenticated users to manage customers" ON public.customers;
DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated users to manage quotations" ON public.quotations;
-- Add more DROP POLICY statements here if you have more policies referencing user_id/created_by

-- 2. Alter column types from uuid to text
ALTER TABLE public.users ALTER COLUMN id TYPE text USING id::text;
ALTER TABLE public.customers ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.customers ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.products ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.products ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.quotations ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.quotations ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.subscriptions ALTER COLUMN user_id TYPE text USING user_id::text;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotation_rooms' AND column_name = 'user_id' AND table_schema = 'public'
  ) THEN
    EXECUTE 'ALTER TABLE public.quotation_rooms ALTER COLUMN user_id TYPE text USING user_id::text;';
  END IF;
END $$;

-- 3. Recreate policies using auth.uid()::text
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
-- Add more CREATE POLICY statements here if you dropped more above 