import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Function to set Auth0 user context for Supabase RLS policies
export const setAuth0UserContext = async (auth0User: any) => {
  if (auth0User && auth0User.sub) {
    try {
      // Temporarily commented out to avoid errors
      // The database function doesn't exist yet
      /*
      const { error } = await supabase.rpc('set_auth0_user_context', {
        user_id: auth0User.sub
      });
      
      if (error) {
        console.error('Error setting Auth0 user context:', error);
      } else {
        console.log('Auth0 user context set successfully');
      }
      */
      console.log('Auth0 user context would be set for:', auth0User.sub);
    } catch (error) {
      console.error('Failed to set Auth0 user context:', error);
    }
  }
};

// Function to clear user context
export const clearAuth0UserContext = () => {
  // Clear any session data
  supabase.auth.signOut();
};