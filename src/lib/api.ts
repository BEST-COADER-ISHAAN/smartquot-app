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
    console.error('Edge Function call failed:', error);
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