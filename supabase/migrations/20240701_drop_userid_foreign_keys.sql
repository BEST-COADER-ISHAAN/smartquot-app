-- Drop foreign key constraints referencing users(id) due to user_id now being text (Auth0 sub)
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_user_id_fkey;
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_user_id_fkey;
ALTER TABLE quotations DROP CONSTRAINT IF EXISTS quotations_user_id_fkey;
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;
-- Add more tables if needed 