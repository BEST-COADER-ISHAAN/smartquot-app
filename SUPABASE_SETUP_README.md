# Supabase Project Setup with Edge Functions & PhonePe Integration

## Overview
This project uses a fresh Supabase setup with Edge Functions to handle business logic securely, eliminating RLS permission issues and providing better separation of concerns.

## Database Schema

### Tables Created
1. **users** - User profiles with subscription info
2. **subscriptions** - PhonePe payment tracking
3. **customers** - Customer management
4. **products** - Product catalog
5. **quotations** - Quotation management
6. **quotation_products** - Junction table for quotation items

### Key Features
- ✅ Permissive RLS policies (read-only for users)
- ✅ Edge Functions handle all write operations
- ✅ PhonePe webhook integration
- ✅ Subscription management
- ✅ Proper indexing for performance

## Setup Instructions

### 1. Apply Database Migration
```bash
# Push the migration to your Supabase project
npx supabase db push
```

### 2. Deploy Edge Functions
```bash
# Deploy PhonePe webhook handler
npx supabase functions deploy phonepe-webhook

# Deploy business logic functions
npx supabase functions deploy business-logic
```

### 3. Environment Variables
Add these to your Supabase project's Edge Functions environment:

```bash
# In Supabase Dashboard > Settings > Edge Functions
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
PHONEPE_SALT_KEY=your_phonepe_salt_key
PHONEPE_SALT_INDEX=your_phonepe_salt_index
```

### 4. PhonePe Webhook Configuration
Configure your PhonePe merchant account to send webhooks to:
```
https://your-project-ref.supabase.co/functions/v1/phonepe-webhook
```

## Edge Functions

### PhonePe Webhook Handler (`/functions/phonepe-webhook`)
- Receives payment status updates from PhonePe
- Updates subscription status and user plan
- Handles payment success/failure scenarios

### Business Logic Functions (`/functions/business-logic`)
- Customer CRUD operations
- Product management
- Quotation creation and updates
- Subscription validation

## Frontend Integration

### Update your Supabase client configuration:
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Call Edge Functions instead of direct table operations:
```typescript
// Example: Save customer
const { data, error } = await supabase.functions.invoke('business-logic', {
  body: {
    action: 'save_customer',
    data: customerData
  }
})
```

## Subscription Plans

### Plan Limits
- **Free**: 5 customers, 10 products, 3 quotations/month
- **Pro**: 50 customers, 100 products, unlimited quotations
- **Enterprise**: Unlimited everything

### Plan Validation
Edge Functions validate subscription limits before allowing operations.

## Security Features

1. **Service Role Key**: Edge Functions use service role for database access
2. **JWT Validation**: All requests validate Auth0 JWT tokens
3. **Input Validation**: All data is validated before database operations
4. **Rate Limiting**: Built-in rate limiting for webhook endpoints

## Testing

### Test PhonePe Webhook
```bash
# Use ngrok to test locally
ngrok http 54321

# Update PhonePe webhook URL to your ngrok URL
```

### Test Business Logic
```bash
# Test customer creation
curl -X POST https://your-project.supabase.co/functions/v1/business-logic \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action": "save_customer", "data": {...}}'
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check Edge Function CORS headers
2. **JWT Validation**: Ensure Auth0 tokens are properly formatted
3. **Database Permissions**: Verify service role key has proper permissions
4. **Webhook Failures**: Check PhonePe webhook URL and signature verification

### Logs
View Edge Function logs in Supabase Dashboard:
- Go to Edge Functions > Select Function > Logs

## Migration from Old Schema

If migrating from the old schema:
1. Export existing data
2. Apply new migration
3. Import data with new structure
4. Update frontend to use Edge Functions

## Next Steps

1. ✅ Apply database migration
2. ✅ Deploy Edge Functions
3. ✅ Configure PhonePe webhook
4. ✅ Update frontend components
5. ✅ Test all functionality
6. ✅ Monitor logs and performance

## Support

For issues:
1. Check Edge Function logs
2. Verify environment variables
3. Test with Postman/curl
4. Review RLS policies
5. Check Auth0 configuration 