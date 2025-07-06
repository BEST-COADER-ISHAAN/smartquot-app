import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PhonePeWebhookPayload {
  merchantId: string
  merchantTransactionId: string
  instrumentResponse: {
    type: string
    redirectInfo?: {
      redirectUrl: string
    }
  }
  amount: number
  currency: string
  redirectUrl: string
  redirectMode: string
  callbackUrl: string
  merchantUserId: string
  mobileNumber: string
  paymentInstrument: {
    type: string
    utr?: string
    pgTransactionId?: string
    pgServiceTransactionId?: string
    bankTransactionId?: string
    bankId?: string
  }
  state: string
  responseCode: string
  paymentId: string
  transactionId: string
  merchantOrderId: string
  status: 'PAYMENT_SUCCESS' | 'PAYMENT_ERROR' | 'PAYMENT_DECLINED'
  responseCodeDescription: string
  checksum: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify the request is from PhonePe (you should implement proper signature verification)
    const payload: PhonePeWebhookPayload = await req.json()
    
    console.log('PhonePe webhook received:', JSON.stringify(payload, null, 2))

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Extract user ID from merchantOrderId (assuming format: "user_<uuid>_<plan>")
    const orderIdParts = payload.merchantOrderId.split('_')
    if (orderIdParts.length < 3) {
      throw new Error('Invalid merchant order ID format')
    }
    
    const userId = orderIdParts[1]
    const plan = orderIdParts[2]

    // Update subscription based on payment status
    if (payload.status === 'PAYMENT_SUCCESS') {
      // Calculate subscription expiry (e.g., 30 days from now)
      const now = new Date()
      const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days

      // Update the subscription record
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          phonepe_payment_id: payload.paymentId,
          started_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          updated_at: now.toISOString()
        })
        .eq('phonepe_order_id', payload.merchantTransactionId)

      if (subscriptionError) {
        console.error('Error updating subscription:', subscriptionError)
        throw subscriptionError
      }

      // Update user's subscription plan
      const { error: userError } = await supabase
        .from('users')
        .update({
          subscription_plan: plan,
          subscription_expires_at: expiresAt.toISOString(),
          updated_at: now.toISOString()
        })
        .eq('id', userId)

      if (userError) {
        console.error('Error updating user:', userError)
        throw userError
      }

      console.log(`Successfully updated subscription for user ${userId} to plan ${plan}`)
    } else {
      // Payment failed or declined
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('phonepe_order_id', payload.merchantTransactionId)

      if (subscriptionError) {
        console.error('Error updating failed subscription:', subscriptionError)
        throw subscriptionError
      }

      console.log(`Payment failed for user ${userId}, subscription status updated to failed`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Webhook processed successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error processing PhonePe webhook:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
