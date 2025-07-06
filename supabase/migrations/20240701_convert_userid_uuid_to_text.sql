-- Migration: Convert user_id and created_by columns from uuid to text for Auth0 compatibility

-- CUSTOMERS TABLE
ALTER TABLE customers ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE customers ALTER COLUMN created_by TYPE text USING created_by::text;

-- PRODUCTS TABLE
ALTER TABLE products ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE products ALTER COLUMN created_by TYPE text USING created_by::text;

-- QUOTATIONS TABLE
ALTER TABLE quotations ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE quotations ALTER COLUMN created_by TYPE text USING created_by::text;

-- SUBSCRIPTIONS TABLE
ALTER TABLE subscriptions ALTER COLUMN user_id TYPE text USING user_id::text;

-- USERS TABLE (if needed)
-- ALTER TABLE users ALTER COLUMN auth0_id TYPE text USING auth0_id::text;

-- QUOTATION ROOMS TABLE (if user_id or created_by exists)
-- ALTER TABLE quotation_rooms ALTER COLUMN user_id TYPE text USING user_id::text;
-- ALTER TABLE quotation_rooms ALTER COLUMN created_by TYPE text USING created_by::text;

-- QUOTATION ROOM ITEMS TABLE (if user_id or created_by exists)
-- ALTER TABLE quotation_room_items ALTER COLUMN user_id TYPE text USING user_id::text;
-- ALTER TABLE quotation_room_items ALTER COLUMN created_by TYPE text USING created_by::text;

-- Add more tables as needed if you have other user_id/created_by columns 