-- Fix schema issues for Auth0 integration and missing fields
-- This migration addresses:
-- 1. UUID vs TEXT issue for user identification
-- 2. Missing notes column in customers table
-- 3. Missing site_address column in customers table
-- 4. Field name mismatches between schema and frontend

-- Step 1: Add missing columns to customers table
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS site_address TEXT;

-- Step 2: Add created_by columns for Auth0 integration (TEXT type for Auth0 user IDs)
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS created_by TEXT;

-- Step 3: Create function to handle Auth0 user ID conversion
CREATE OR REPLACE FUNCTION handle_auth0_created_by()
RETURNS TRIGGER AS $$
BEGIN
    -- Set created_by from Auth0 user ID if not already set
    IF NEW.created_by IS NULL THEN
        NEW.created_by := current_setting('request.jwt.claims', true)::json->>'sub';
    END IF;
    
    -- Also set user_id from users table if not set
    IF NEW.user_id IS NULL THEN
        NEW.user_id := (
            SELECT id FROM public.users 
            WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create triggers for Auth0 integration
DROP TRIGGER IF EXISTS trigger_handle_auth0_customers ON public.customers;
CREATE TRIGGER trigger_handle_auth0_customers
    BEFORE INSERT OR UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION handle_auth0_created_by();

DROP TRIGGER IF EXISTS trigger_handle_auth0_products ON public.products;
CREATE TRIGGER trigger_handle_auth0_products
    BEFORE INSERT OR UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION handle_auth0_created_by();

DROP TRIGGER IF EXISTS trigger_handle_auth0_quotations ON public.quotations;
CREATE TRIGGER trigger_handle_auth0_quotations
    BEFORE INSERT OR UPDATE ON public.quotations
    FOR EACH ROW
    EXECUTE FUNCTION handle_auth0_created_by();

-- Step 5: Update RLS policies to work with both user_id and created_by
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can view own products" ON public.products;
DROP POLICY IF EXISTS "Users can view own quotations" ON public.quotations;

-- Create permissive policies that work with Auth0
CREATE POLICY "Allow authenticated users to manage customers"
    ON public.customers FOR ALL TO authenticated
    USING (
        user_id IN (
            SELECT id FROM public.users 
            WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    )
    WITH CHECK (
        user_id IN (
            SELECT id FROM public.users 
            WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    );

CREATE POLICY "Allow authenticated users to manage products"
    ON public.products FOR ALL TO authenticated
    USING (
        user_id IN (
            SELECT id FROM public.users 
            WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    )
    WITH CHECK (
        user_id IN (
            SELECT id FROM public.users 
            WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    );

CREATE POLICY "Allow authenticated users to manage quotations"
    ON public.quotations FOR ALL TO authenticated
    USING (
        user_id IN (
            SELECT id FROM public.users 
            WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    )
    WITH CHECK (
        user_id IN (
            SELECT id FROM public.users 
            WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
        OR created_by = current_setting('request.jwt.claims', true)::json->>'sub'
    );

-- Step 6: Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_created_by ON public.customers(created_by);
CREATE INDEX IF NOT EXISTS idx_products_created_by ON public.products(created_by);
CREATE INDEX IF NOT EXISTS idx_quotations_created_by ON public.quotations(created_by);

-- Step 7: Add comments for documentation
COMMENT ON COLUMN public.customers.notes IS 'Additional notes about the customer';
COMMENT ON COLUMN public.customers.site_address IS 'Site address for the customer';
COMMENT ON COLUMN public.customers.created_by IS 'Auth0 user ID who created this record';
COMMENT ON COLUMN public.products.created_by IS 'Auth0 user ID who created this record';
COMMENT ON COLUMN public.quotations.created_by IS 'Auth0 user ID who created this record';

-- Step 8: Verify the changes
DO $$
DECLARE
    customer_columns text[];
    product_columns text[];
    quotation_columns text[];
BEGIN
    -- Check customers table
    SELECT array_agg(column_name) INTO customer_columns
    FROM information_schema.columns 
    WHERE table_name = 'customers' 
    AND table_schema = 'public';
    
    IF 'notes' = ANY(customer_columns) AND 'site_address' = ANY(customer_columns) AND 'created_by' = ANY(customer_columns) THEN
        RAISE NOTICE 'SUCCESS: customers table has all required columns';
    ELSE
        RAISE EXCEPTION 'ERROR: customers table missing required columns';
    END IF;
    
    -- Check products table
    SELECT array_agg(column_name) INTO product_columns
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND table_schema = 'public';
    
    IF 'created_by' = ANY(product_columns) THEN
        RAISE NOTICE 'SUCCESS: products table has created_by column';
    ELSE
        RAISE EXCEPTION 'ERROR: products table missing created_by column';
    END IF;
    
    -- Check quotations table
    SELECT array_agg(column_name) INTO quotation_columns
    FROM information_schema.columns 
    WHERE table_name = 'quotations' 
    AND table_schema = 'public';
    
    IF 'created_by' = ANY(quotation_columns) THEN
        RAISE NOTICE 'SUCCESS: quotations table has created_by column';
    ELSE
        RAISE EXCEPTION 'ERROR: quotations table missing created_by column';
    END IF;
    
    RAISE NOTICE '=== SCHEMA FIXES COMPLETE ===';
    RAISE NOTICE '✅ Added notes column to customers table';
    RAISE NOTICE '✅ Added site_address column to customers table';
    RAISE NOTICE '✅ Added created_by columns for Auth0 integration';
    RAISE NOTICE '✅ Created Auth0 integration triggers';
    RAISE NOTICE '✅ Updated RLS policies for Auth0 compatibility';
    RAISE NOTICE '✅ Added performance indexes';
END $$;
