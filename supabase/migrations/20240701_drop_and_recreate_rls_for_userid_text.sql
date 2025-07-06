-- Step 1: Drop existing RLS policies
DROP POLICY IF EXISTS "Allow authenticated users to manage customers" ON public.customers;
DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated users to manage quotations" ON public.quotations;

-- Step 2: Alter columns from uuid to text
ALTER TABLE customers ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE customers ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE products ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE products ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE quotations ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE quotations ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE subscriptions ALTER COLUMN user_id TYPE text USING user_id::text;

-- Step 3: Recreate RLS policies for Auth0 sub compatibility
CREATE POLICY "Allow authenticated users to manage customers"
    ON public.customers FOR ALL TO authenticated
    USING (
        user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    )
    WITH CHECK (
        user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    );

CREATE POLICY "Allow authenticated users to manage products"
    ON public.products FOR ALL TO authenticated
    USING (
        user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    )
    WITH CHECK (
        user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    );

CREATE POLICY "Allow authenticated users to manage quotations"
    ON public.quotations FOR ALL TO authenticated
    USING (
        user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    )
    WITH CHECK (
        user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    ); 