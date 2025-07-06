-- 20240711_fix_foreign_keys_and_types.sql
-- 1. Drop foreign key constraints
ALTER TABLE public.quotation_room_items DROP CONSTRAINT IF EXISTS quotation_room_items_room_id_fkey;
ALTER TABLE public.quotation_rooms DROP CONSTRAINT IF EXISTS quotation_rooms_user_id_fkey;
ALTER TABLE public.quotation_rooms DROP CONSTRAINT IF EXISTS quotation_rooms_id_fkey;
ALTER TABLE public.quotation_room_items DROP CONSTRAINT IF EXISTS quotation_room_items_quotation_id_fkey;
ALTER TABLE public.quotations DROP CONSTRAINT IF EXISTS quotations_user_id_fkey;
ALTER TABLE public.quotations DROP CONSTRAINT IF EXISTS quotations_created_by_fkey;
ALTER TABLE public.customers DROP CONSTRAINT IF EXISTS customers_user_id_fkey;
ALTER TABLE public.customers DROP CONSTRAINT IF EXISTS customers_created_by_fkey;
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_user_id_fkey;
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_created_by_fkey;
ALTER TABLE public.subscriptions DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;

-- 2. Alter both sides of the foreign key relationships to text
ALTER TABLE public.quotation_rooms ALTER COLUMN id TYPE text USING id::text;
ALTER TABLE public.quotation_room_items ALTER COLUMN room_id TYPE text USING room_id::text;
ALTER TABLE public.quotation_room_items ALTER COLUMN quotation_id TYPE text USING quotation_id::text;
ALTER TABLE public.quotations ALTER COLUMN id TYPE text USING id::text;
ALTER TABLE public.quotation_rooms ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.quotations ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.quotations ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.customers ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.customers ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.products ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.products ALTER COLUMN created_by TYPE text USING created_by::text;
ALTER TABLE public.subscriptions ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.users ALTER COLUMN id TYPE text USING id::text;

-- 3. Recreate foreign key constraints
ALTER TABLE public.quotation_room_items
  ADD CONSTRAINT quotation_room_items_room_id_fkey
  FOREIGN KEY (room_id) REFERENCES public.quotation_rooms(id) ON DELETE CASCADE;
ALTER TABLE public.quotation_room_items
  ADD CONSTRAINT quotation_room_items_quotation_id_fkey
  FOREIGN KEY (quotation_id) REFERENCES public.quotations(id) ON DELETE CASCADE;
ALTER TABLE public.quotation_rooms
  ADD CONSTRAINT quotation_rooms_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.quotations
  ADD CONSTRAINT quotations_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.quotations
  ADD CONSTRAINT quotations_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.customers
  ADD CONSTRAINT customers_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.customers
  ADD CONSTRAINT customers_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.products
  ADD CONSTRAINT products_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.products
  ADD CONSTRAINT products_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscriptions_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE; 