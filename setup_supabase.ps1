# Supabase Setup Script
# This script helps you set up your fresh Supabase project

Write-Host "🚀 Setting up Supabase Project with Edge Functions" -ForegroundColor Green
Write-Host ""

# Check if Supabase CLI is available
try {
    $supabaseVersion = npx supabase --version
    Write-Host "✅ Supabase CLI found: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Supabase CLI not found. Please install it first." -ForegroundColor Red
    Write-Host "Run: npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Apply Database Migration:" -ForegroundColor Yellow
Write-Host "   npx supabase db push" -ForegroundColor White
Write-Host ""

Write-Host "2. Deploy Edge Functions:" -ForegroundColor Yellow
Write-Host "   npx supabase functions deploy phonepe-webhook" -ForegroundColor White
Write-Host "   npx supabase functions deploy business-logic" -ForegroundColor White
Write-Host ""

Write-Host "3. Configure Environment Variables in Supabase Dashboard:" -ForegroundColor Yellow
Write-Host "   - Go to Settings > Edge Functions" -ForegroundColor White
Write-Host "   - Add your environment variables" -ForegroundColor White
Write-Host ""

Write-Host "4. Update your .env file with new project keys:" -ForegroundColor Yellow
Write-Host "   VITE_SUPABASE_URL=your_new_project_url" -ForegroundColor White
Write-Host "   VITE_SUPABASE_ANON_KEY=your_new_anon_key" -ForegroundColor White
Write-Host ""

Write-Host "5. Configure PhonePe Webhook URL:" -ForegroundColor Yellow
Write-Host "   https://your-project-ref.supabase.co/functions/v1/phonepe-webhook" -ForegroundColor White
Write-Host ""

Write-Host "📖 For detailed instructions, see: SUPABASE_SETUP_README.md" -ForegroundColor Cyan
Write-Host ""

Write-Host "🎉 Setup complete! Your fresh Supabase project is ready." -ForegroundColor Green 