-- 20240712_set_id_defaults.sql
-- Set default values for id columns in all main tables (as text)

ALTER TABLE public.quotations
  ALTER COLUMN id SET DEFAULT (gen_random_uuid()::text);

ALTER TABLE public.customers
  ALTER COLUMN id SET DEFAULT (gen_random_uuid()::text);

ALTER TABLE public.products
  ALTER COLUMN id SET DEFAULT (gen_random_uuid()::text);

ALTER TABLE public.quotation_rooms
  ALTER COLUMN id SET DEFAULT (gen_random_uuid()::text);

ALTER TABLE public.quotation_room_items
  ALTER COLUMN id SET DEFAULT (gen_random_uuid()::text);

ALTER TABLE public.quotation_products
  ALTER COLUMN id SET DEFAULT (gen_random_uuid()::text);

ALTER TABLE public.subscriptions
  ALTER COLUMN id SET DEFAULT (gen_random_uuid()::text);

ALTER TABLE public.users
  ALTER COLUMN id SET DEFAULT (gen_random_uuid()::text); 