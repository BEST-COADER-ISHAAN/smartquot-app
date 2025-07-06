-- 20240711_convert_userid_uuid_to_text.sql
-- Convert all user ID columns from uuid to text for compatibility

-- Users table
ALTER TABLE public.users ALTER COLUMN id TYPE text USING id::text;

-- Customers table
ALTER TABLE public.customers ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.customers ALTER COLUMN created_by TYPE text USING created_by::text;

-- Products table
ALTER TABLE public.products ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.products ALTER COLUMN created_by TYPE text USING created_by::text;

-- Quotations table
ALTER TABLE public.quotations ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.quotations ALTER COLUMN created_by TYPE text USING created_by::text;

-- Subscriptions table
ALTER TABLE public.subscriptions ALTER COLUMN user_id TYPE text USING user_id::text;

-- Quotation Rooms table (if user_id exists)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotation_rooms' AND column_name = 'user_id' AND table_schema = 'public'
  ) THEN
    EXECUTE 'ALTER TABLE public.quotation_rooms ALTER COLUMN user_id TYPE text USING user_id::text;';
  END IF;
END $$;

-- Add similar blocks for any other tables referencing user IDs as needed. 