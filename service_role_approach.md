# Alternative: Service Role Key Approach

If RLS policies continue to cause issues with Auth0, here's an alternative approach using a service role key:

## Step 1: Get Service Role Key
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "service_role" key (not the anon key)

## Step 2: Create Service Role Client
Create a new file `src/lib/supabaseAdmin.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase service role key');
}

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey);
```

## Step 3: Update Environment Variables
Add to your `.env` file:
```
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 4: Update ExcelImporter
Use the admin client for imports:

```typescript
import { supabaseAdmin } from '../lib/supabaseAdmin';

// In the import function:
const { data, error } = await supabaseAdmin
  .from('products')
  .insert(productsToInsert)
  .select();
```

## Security Note
The service role key bypasses RLS entirely, so user isolation must be handled at the application level through the `created_by` field. 