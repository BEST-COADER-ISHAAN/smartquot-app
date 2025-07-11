-- User-specific Size Format Mapping
create table if not exists size_format_mappings (
  user_id text not null,
  size text not null,
  mm_format text,
  inch_format text,
  feet_format text,
  custom_format text,
  primary key (user_id, size)
);

-- User-specific Billing Type
create table if not exists billing_types (
  user_id text not null,
  size text not null,
  billing_type text, -- 'sqft' or 'piece'
  primary key (user_id, size)
);

-- User-specific Discounts
create table if not exists discounts (
  user_id text not null,
  size text not null,
  company_discount numeric,
  customer_discount numeric,
  primary key (user_id, size)
);

-- User-specific Freight Settings
create table if not exists freight_settings (
  user_id text not null,
  size text not null,
  freight numeric,
  primary key (user_id, size)
);

-- User-specific Billed SQFT Settings
create table if not exists billed_sqft_settings (
  user_id text not null,
  size text not null,
  actual_sqft_per_box numeric,
  billed_sqft_per_box numeric,
  primary key (user_id, size)
); 