-- Migration: Add company_slug to user_settings for unique company-based links
alter table user_settings add column if not exists company_slug text;

-- Add a unique constraint to ensure no two users have the same slug
create unique index if not exists user_settings_company_slug_unique on user_settings(company_slug) where company_slug is not null; 