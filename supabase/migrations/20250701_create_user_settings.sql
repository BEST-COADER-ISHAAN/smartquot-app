-- Migration: Create user_settings table for user-specific app settings (expanded for profile fields)
drop table if exists user_settings;

create table if not exists user_settings (
  user_id text primary key,
  preferred_size_unit text,
  terms_and_conditions text,
  theme text,
  company_name text,
  company_address text,
  company_phone text,
  company_email text,
  gst_no text,
  logo text,
  include_company_name boolean,
  include_address boolean,
  include_phone boolean,
  include_email boolean,
  include_gst boolean,
  include_logo boolean,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Optional: Add a trigger to update updated_at on row update
create or replace function update_user_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_update_user_settings_updated_at on user_settings;
create trigger trg_update_user_settings_updated_at
before update on user_settings
for each row execute procedure update_user_settings_updated_at(); 