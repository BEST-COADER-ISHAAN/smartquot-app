import { supabase } from './supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/business-logic`;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Utility function to make authenticated API calls to Edge Functions
export const callEdgeFunction = async <T = any>(
  action: string,
  data?: any,
  id?: string,
  token?: string
): Promise<ApiResponse<T>> => {
  try {
    if (!token) {
      throw new Error('Authentication token is required');
    }
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ action, data, id })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'API call failed');
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Specific API functions for common operations
export const api = {
  // Customer operations
  saveCustomer: (data: any, id?: string, token?: string) => 
    callEdgeFunction('save_customer', data, id, token),
  
  getCustomers: (token?: string) => 
    callEdgeFunction('get_customers', undefined, undefined, token),
  
  deleteCustomer: (id: string, token?: string) => 
    callEdgeFunction('delete_customer', undefined, id, token),

  // Product operations
  saveProduct: (data: any, id?: string, token?: string) => 
    callEdgeFunction('save_product', data, id, token),
  
  getProducts: (token?: string) => 
    callEdgeFunction('get_products', undefined, undefined, token),
  
  deleteProduct: (id: string, token?: string) => 
    callEdgeFunction('delete_product', undefined, id, token),

  // Quotation operations
  saveQuotation: (data: any, id?: string, token?: string) => 
    callEdgeFunction('save_quotation', data, id, token),
  
  getQuotations: (token?: string) => 
    callEdgeFunction('get_quotations', undefined, undefined, token),
  
  deleteQuotation: (id: string, token?: string) => 
    callEdgeFunction('delete_quotation', undefined, id, token),

  // User operations
  getUserProfile: (token?: string) => 
    callEdgeFunction('get_user_profile', undefined, undefined, token),
  
  updateUserProfile: (data: any, token?: string) => 
    callEdgeFunction('update_user_profile', data, undefined, token)
};

export const getUserSettings = async (userId: string) => {
  const { data, error, status } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();
  // Handle 406 (no row found) gracefully
  if ((error && error.code === 'PGRST116') || status === 406) {
    return null;
  }
  if (error) throw error;
  return data;
};

// Helper to generate a slug from company name
export function generateCompanySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '') // Remove non-alphanumeric
    .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens
}

// Helper to get a unique slug (appends a letter if needed)
export async function getUniqueCompanySlug(baseSlug: string, userId?: string): Promise<string> {
  let slug = baseSlug;
  let suffix = '';
  let charCode = 97; // 'a'
  while (true) {
    const { data, error } = await supabase
      .from('user_settings')
      .select('user_id')
      .eq('company_slug', slug)
      .maybeSingle();
    if (!data || (userId && data.user_id === userId)) {
      return slug;
    }
    suffix = String.fromCharCode(charCode++);
    slug = baseSlug + suffix;
  }
}

export const upsertUserSettings = async (userId: string, settings: Partial<{
  preferred_size_unit: string;
  terms_and_conditions: string;
  theme: string;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  gst_no: string;
  logo: string;
  include_company_name: boolean;
  include_address: boolean;
  include_phone: boolean;
  include_email: boolean;
  include_gst: boolean;
  include_logo: boolean;
}>) => {
  let company_slug = settings.company_name
    ? await getUniqueCompanySlug(generateCompanySlug(settings.company_name), userId)
    : undefined;
  const { error } = await supabase
    .from('user_settings')
    .upsert({ user_id: userId, ...settings, ...(company_slug ? { company_slug } : {}) }, { onConflict: 'user_id' });
  if (error) throw error;
};

// --- User-specific settings helpers ---

// Size Format Mappings
export const getSizeFormatMappings = async (userId: string) => {
  const { data, error } = await supabase
    .from('size_format_mappings')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
export const upsertSizeFormatMapping = async (
  userId: string,
  size: string,
  mm_format: string,
  inch_format: string,
  feet_format: string,
  custom_format: string
) => {
  const { error } = await supabase
    .from('size_format_mappings')
    .upsert({ user_id: userId, size, mm_format, inch_format, feet_format, custom_format });
  if (error) throw error;
};

// Billing Types
export const getBillingTypes = async (userId: string) => {
  const { data, error } = await supabase
    .from('billing_types')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
export const upsertBillingType = async (userId: string, size: string, billing_type: string) => {
  const { error } = await supabase
    .from('billing_types')
    .upsert({ user_id: userId, size, billing_type });
  if (error) throw error;
};

// Discounts
export const getDiscounts = async (userId: string) => {
  const { data, error } = await supabase
    .from('discounts')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
export const upsertDiscount = async (userId: string, size: string, company_discount: number, customer_discount: number) => {
  const { error } = await supabase
    .from('discounts')
    .upsert({ user_id: userId, size, company_discount, customer_discount });
  if (error) throw error;
};

// Freight Settings
export const getFreightSettings = async (userId: string) => {
  const { data, error } = await supabase
    .from('freight_settings')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
export const upsertFreightSetting = async (userId: string, size: string, freight: number) => {
  const { error } = await supabase
    .from('freight_settings')
    .upsert({ user_id: userId, size, freight });
  if (error) throw error;
};

// Billed SQFT Settings
export const getBilledSqftSettings = async (userId: string) => {
  const { data, error } = await supabase
    .from('billed_sqft_settings')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
export const upsertBilledSqftSetting = async (userId: string, size: string, actual_sqft_per_box: number, billed_sqft_per_box: number) => {
  const { error } = await supabase
    .from('billed_sqft_settings')
    .upsert({ user_id: userId, size, actual_sqft_per_box, billed_sqft_per_box });
  if (error) throw error;
}; 