-- 20240712_add_customer_code.sql
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS customer_code text UNIQUE; 