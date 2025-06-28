import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { setAuth0UserContext, clearAuth0UserContext } from '../lib/supabase';

export function useAuth() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    loginWithRedirect, 
    logout, 
    getAccessTokenSilently 
  } = useAuth0();

  // Set Auth0 user context for Supabase RLS policies
  useEffect(() => {
    if (isAuthenticated && user) {
      setAuth0UserContext(user);
    } else if (!isAuthenticated) {
      clearAuth0UserContext();
    }
  }, [isAuthenticated, user]);

  const signOut = async () => {
    await logout({
      logoutParams: {
        returnTo: "https://smartquot.net"
      }
    });
    return { error: null };
  };

  return {
    user,
    loading: isLoading,
    isAuthenticated,
    signOut,
    loginWithRedirect,
    getAccessTokenSilently
  };
}