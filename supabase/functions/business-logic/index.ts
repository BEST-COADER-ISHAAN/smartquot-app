import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BusinessLogicRequest {
  action: 'save_customer' | 'get_customers' | 'delete_customer' | 
          'save_product' | 'get_products' | 'delete_product' |
          'save_quotation' | 'get_quotations' | 'delete_quotation' |
          'get_user_profile' | 'update_user_profile'
  data?: any
  id?: string
}

// Check subscription limits
async function checkSubscriptionLimits(supabase: any, userId: string, action: string) {
  const { data: user } = await supabase
    .from('users')
    .select('subscription_plan, subscription_expires_at')
    .eq('id', userId)
    .single()

  if (!user) {
    throw new Error('User not found')
  }

  // Check if subscription is expired
  if (user.subscription_expires_at && new Date(user.subscription_expires_at) < new Date()) {
    // Downgrade to free plan
    await supabase
      .from('users')
      .update({ 
        subscription_plan: 'free',
        subscription_expires_at: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
    user.subscription_plan = 'free'
  }

  // Define limits based on plan
  const limits = {
    free: { customers: 5, products: 10, quotations: 3 },
    pro: { customers: 50, products: 100, quotations: -1 }, // -1 = unlimited
    enterprise: { customers: -1, products: -1, quotations: -1 }
  }

  const planLimits = limits[user.subscription_plan as keyof typeof limits] || limits.free

  // Check limits for the specific action
  if (action === 'save_customer' && planLimits.customers !== -1) {
    const { count } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
    
    if (count && count >= planLimits.customers) {
      throw new Error(`Free plan limit reached: ${planLimits.customers} customers. Upgrade to Pro for more.`)
    }
  }

  if (action === 'save_product' && planLimits.products !== -1) {
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
    
    if (count && count >= planLimits.products) {
      throw new Error(`Free plan limit reached: ${planLimits.products} products. Upgrade to Pro for more.`)
    }
  }

  if (action === 'save_quotation' && planLimits.quotations !== -1) {
    const { count } = await supabase
      .from('quotations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()) // This month
    
    if (count && count >= planLimits.quotations) {
      throw new Error(`Free plan limit reached: ${planLimits.quotations} quotations per month. Upgrade to Pro for unlimited.`)
    }
  }

  return user
}

// Utility: Convert empty string UUID fields to null
function cleanUUIDFields(obj: any, uuidFields: string[]) {
  const cleaned = { ...obj };
  for (const field of uuidFields) {
    if (field in cleaned && cleaned[field] === '') {
      cleaned[field] = null;
    }
  }
  return cleaned;
}

serve(async (req) => {
  // Debug: log the Authorization header
  console.log('Authorization header:', req.headers.get('authorization'));

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Extract Supabase user from JWT
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing Authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }
    const supabaseUrl = Deno.env.get('PROJECT_URL')!
    const supabaseServiceKey = Deno.env.get('SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Use Supabase's getUser to validate JWT and get user
    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid or missing token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Parse request body
    const body: BusinessLogicRequest = await req.json()
    const { action, data, id } = body

    console.log(`Processing action: ${action} for user: ${user.id}`)

    // Check subscription limits before processing
    await checkSubscriptionLimits(supabase, user.id, action)

    let result: any

    switch (action) {
      case 'save_customer':
        if (id) {
          // Update existing customer
          const cleanedData = cleanUUIDFields(data, ['customer_id']);
          const { data: updatedCustomer, error } = await supabase
            .from('customers')
            .update({
              ...cleanedData,
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single()

          if (error) throw error
          result = updatedCustomer
        } else {
          // Generate next customer_code starting from 0101
          let nextCode = '0101';
          let lastNum = 100; // 0100, so first increment is 0101
          try {
            const { data: lastCustomer } = await supabase
              .from('customers')
              .select('customer_code')
              .order('customer_code', { ascending: false })
              .limit(1)
              .single();
            if (lastCustomer && lastCustomer.customer_code) {
              lastNum = parseInt(lastCustomer.customer_code, 10);
              if (!isNaN(lastNum)) {
                nextCode = (lastNum + 1).toString().padStart(4, '0');
              }
            }
          } catch (e) {
            console.log('Error fetching last customer_code:', e);
          }
          const customerData = cleanUUIDFields({
            ...data,
            user_id: user.id,
            created_by: data.created_by || user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            customer_code: nextCode,
          }, ['customer_id']);
          const { data: newCustomer, error } = await supabase
            .from('customers')
            .insert(customerData)
            .select()
            .single();
          if (error) throw error;
          result = newCustomer;
        }
        break

      case 'get_customers':
        const { data: customers, error: customersError } = await supabase
          .from('customers')
          .select('*')
          .or(`user_id.eq.${user.id},created_by.eq.${user.id}`)
          .order('created_at', { ascending: false })

        if (customersError) throw customersError
        result = customers
        break

      case 'delete_customer':
        const { error: deleteCustomerError } = await supabase
          .from('customers')
          .delete()
          .eq('id', id)
          .or(`user_id.eq.${user.id},created_by.eq.${user.id}`)

        if (deleteCustomerError) throw deleteCustomerError
        result = { success: true }
        break

      case 'save_product':
        if (Array.isArray(data)) {
          for (const product of data) {
            if (!product.name) {
              throw new Error('Product name is required');
            }
            const safeProductData = {
              ...product,
              name: product.name,
              user_id: user.id,
              created_by: product.created_by || user.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            const { error } = await supabase
              .from('products')
              .insert(safeProductData);
            if (error) throw error;
          }
          result = { success: true, count: data.length };
        } else {
          if (!data?.name) {
            throw new Error('Product name is required');
          }
          const safeProductData = {
            ...data,
            name: data.name,
            user_id: user.id,
            created_by: data.created_by || user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          const { data: newProduct, error } = await supabase
            .from('products')
            .insert(safeProductData)
            .select()
            .single();
          if (error) throw error;
          result = newProduct;
        }
        break

      case 'get_products':
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*')
          .or(`user_id.eq.${user.id},created_by.eq.${user.id}`)
          .order('created_at', { ascending: false })

        if (productsError) throw productsError
        result = products
        break

      case 'delete_product':
        const { error: deleteProductError } = await supabase
          .from('products')
          .delete()
          .eq('id', id)
          .or(`user_id.eq.${user.id},created_by.eq.${user.id}`)

        if (deleteProductError) throw deleteProductError
        result = { success: true }
        break

      case 'save_quotation':
        if (id) {
          // Update existing quotation
          const { data: updatedQuotation, error } = await supabase
            .from('quotations')
            .update({
              ...data,
              updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single()

          if (error) throw error
          result = updatedQuotation
        } else {
          // Get customer_code or generate one if missing
          const customerId = data.customer_id;
          let { data: customer } = await supabase
            .from('customers')
            .select('customer_code')
            .eq('id', customerId)
            .single();
          
          // If customer_code is null, generate one and update the customer
          if (!customer || !customer.customer_code) {
            // Generate next customer_code starting from 0101
            let nextCode = '0101';
            let lastNum = 100; // 0100, so first increment is 0101
            try {
              const { data: lastCustomer } = await supabase
                .from('customers')
                .select('customer_code')
                .order('customer_code', { ascending: false })
                .limit(1)
                .single();
              if (lastCustomer && lastCustomer.customer_code) {
                lastNum = parseInt(lastCustomer.customer_code, 10);
                if (!isNaN(lastNum)) {
                  nextCode = (lastNum + 1).toString().padStart(4, '0');
                }
              }
            } catch (e) {
              console.log('Error fetching last customer_code:', e);
            }
            
            // Update the customer with the generated code
            const { data: updatedCustomer, error: updateError } = await supabase
              .from('customers')
              .update({ customer_code: nextCode })
              .eq('id', customerId)
              .select('customer_code')
              .single();
            
            if (updateError) {
              console.error('Error updating customer with code:', updateError);
              throw new Error('Failed to generate customer code');
            }
            
            customer = updatedCustomer;
          }
          
          // Count existing quotations for this customer
          const { count } = await supabase
            .from('quotations')
            .select('*', { count: 'exact', head: true })
            .eq('customer_id', customerId);
          // Convert count to letter (A=1, B=2, ...)
          const letter = String.fromCharCode(65 + (count || 0));
          const quotation_number = `#QT${customer.customer_code}${letter}`;
          
          // Extract rooms data before creating quotation
          const rooms = data.rooms || [];
          delete data.rooms; // Remove rooms from quotation data
          
          const quotationData = {
            ...data,
            user_id: user.id,
            created_by: data.created_by || user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            quotation_number,
          };
          
          // Create the quotation first
          const { data: newQuotation, error } = await supabase
            .from('quotations')
            .insert(quotationData)
            .select()
            .single();
          if (error) throw error;
          
          // Now save rooms and items
          if (rooms.length > 0) {
            for (const room of rooms) {
              // Create room
              const roomData = {
                quotation_id: newQuotation.id,
                room_name: room.room_name,
                room_total: room.room_total || 0,
                room_margin_amount: room.room_margin_amount || 0,
                room_margin_percentage: room.room_margin_percentage || 0,
                sort_order: room.sort_order || 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              
              const { data: newRoom, error: roomError } = await supabase
                .from('quotation_rooms')
                .insert(roomData)
                .select()
                .single();
              
              if (roomError) {
                console.error('Error creating room:', roomError);
                throw new Error('Failed to create room');
              }
              
              // Create items for this room
              if (room.items && room.items.length > 0) {
                for (const item of room.items) {
                  const itemData = {
                    room_id: newRoom.id,
                    product_id: item.product_id,
                    name: item.product?.name || '',
                    product_description: item.product?.description || '',
                    quantity: item.quantity_boxes || 0,
                    unit_price: item.rate_per_sqft || 0,
                    total_price: item.amount || 0,
                    margin_amount: item.margin_amount || 0,
                    margin_percentage: item.margin_percentage || 0,
                    sqft_in_box: item.product?.actual_sqft_per_box || 0,
                    sqft_needed: item.sqft_needed || 0,
                    box_needed: item.box_needed || 0,
                    price_per_sqft: item.rate_per_sqft || 0,
                    price_per_box: item.mrp_per_box || 0,
                    sort_order: item.sort_order || 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  };
                  
                  const { error: itemError } = await supabase
                    .from('quotation_room_items')
                    .insert(itemData);
                  
                  if (itemError) {
                    console.error('Error creating item:', itemError);
                    throw new Error('Failed to create item');
                  }
                }
              }
            }
          }
          
          // Fetch and return the full quotation with rooms and items
          const { data: fullQuotation, error: fetchError } = await supabase
            .from('quotations')
            .select(`
              *,
              quotation_rooms(
                *,
                quotation_room_items(*)
              )
            `)
            .eq('id', newQuotation.id)
            .single();
          if (fetchError) throw fetchError;
          result = fullQuotation;
        }
        break

      case 'get_quotations':
        const { data: quotations, error: quotationsError } = await supabase
          .from('quotations')
          .select(`
            *,
            customers(name, email, company),
            quotation_rooms(
              *,
              quotation_room_items(
                *,
                products(*)
              )
            )
          `)
          .or(`user_id.eq.${user.id},created_by.eq.${user.id}`)
          .order('created_at', { ascending: false })

        if (quotationsError) throw quotationsError
        result = quotations
        break

      case 'delete_quotation':
        const { error: deleteQuotationError } = await supabase
          .from('quotations')
          .delete()
          .eq('id', id)
          .or(`user_id.eq.${user.id},created_by.eq.${user.id}`)

        if (deleteQuotationError) throw deleteQuotationError
        result = { success: true }
        break

      case 'get_user_profile':
        result = user
        break

      case 'update_user_profile':
        const { data: updatedUser, error: updateUserError } = await supabase
          .from('users')
          .update({
            ...data,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id)
          .select()
          .single()

        if (updateUserError) throw updateUserError
        result = updatedUser
        break

      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Business logic error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
