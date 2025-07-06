-- Give unlimited access to bestcoaderishaan@gmail.com
-- Run this in your Supabase SQL Editor

-- Insert or update user with enterprise plan
INSERT INTO users (email, subscription_plan, subscription_expires_at, created_at, updated_at)
VALUES ('bestcoaderishaan@gmail.com', 'enterprise', NULL, NOW(), NOW())
ON CONFLICT (email) 
DO UPDATE SET 
    subscription_plan = 'enterprise',
    subscription_expires_at = NULL,
    updated_at = NOW();

-- Create subscription record
INSERT INTO subscriptions (user_id, plan, status, amount, currency, started_at, expires_at, created_at, updated_at)
SELECT 
    id,
    'enterprise',
    'active',
    0.00,
    'INR',
    NOW(),
    NULL,
    NOW(),
    NOW()
FROM users 
WHERE email = 'bestcoaderishaan@gmail.com'
ON CONFLICT (user_id, plan) 
DO UPDATE SET 
    status = 'active',
    expires_at = NULL,
    updated_at = NOW();

-- Verify the result
SELECT 
    u.id,
    u.email,
    u.subscription_plan,
    u.subscription_expires_at,
    s.status as subscription_status,
    s.started_at as subscription_started
FROM users u
LEFT JOIN subscriptions s ON u.id = s.user_id AND s.status = 'active'
WHERE u.email = 'bestcoaderishaan@gmail.com';
