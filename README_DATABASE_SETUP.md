# Database Setup Instructions

## Apply the Migration

You have a comprehensive migration file that creates all the required tables for your quotation generator application. To apply it, you have two options:

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** tab
3. Copy the contents of `supabase/migrations/20250621141629_emerald_art.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the migration

### Option 2: Using Supabase CLI (if available)

If you have the Supabase CLI installed locally:

```bash
supabase db push
```

## What the Migration Creates

The migration will create the following tables:

### Core Tables
- **customers** - Store customer information
- **products** - Store product catalog (should already exist)
- **quotations** - Main quotations table
- **quotation_rooms** - Rooms within each quotation
- **quotation_room_items** - Individual items within each room

### Security Features
- Row Level Security (RLS) enabled on all tables
- Comprehensive policies ensuring users can only access their own data
- Proper authentication checks

### Automation Features
- Auto-generation of quotation numbers (QT001, QT002, etc.)
- Automatic timestamp updates
- Sample customers for testing

### Performance Optimizations
- Indexes on frequently queried columns
- Proper data types and constraints

## After Migration

Once the migration is applied:

1. **Sample Data**: The migration includes sample customers that will be created for authenticated users
2. **Test the Application**: You can start creating quotations immediately
3. **Add Products**: Use the Products tab to add your product catalog

## Verification

To verify the migration was successful, you can run this query in the SQL Editor:

```sql
-- Check if all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('customers', 'products', 'quotations', 'quotation_rooms', 'quotation_room_items');

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('customers', 'products', 'quotations', 'quotation_rooms', 'quotation_room_items');
```

You should see all 5 tables listed with `rowsecurity` set to `true`.

## Troubleshooting

If you encounter any issues:

1. **Permission Errors**: Make sure you're signed in to the application first
2. **Foreign Key Errors**: The migration handles existing constraints automatically
3. **Duplicate Errors**: The migration uses `IF NOT EXISTS` clauses to prevent conflicts

## Next Steps

After the migration is complete:

1. Sign in to your application
2. Navigate to the Products tab to add your product catalog
3. Go to Customers tab to manage customer information
4. Start creating quotations in the Quotations tab

The application is now fully functional with a complete database backend!