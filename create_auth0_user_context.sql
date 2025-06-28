/*
  # Create Auth0 User Context RPC Function
  
  This script creates a PostgreSQL function that sets the Auth0 user ID
  in a session variable so RLS policies can access it.
*/

-- Create the function to set Auth0 user context
CREATE OR REPLACE FUNCTION set_auth0_user_context(auth0_user_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Set the Auth0 user ID in a session variable
  PERFORM set_config('app.auth0_user_id', auth0_user_id, false);
  
  -- Log for debugging (optional)
  RAISE NOTICE 'Auth0 user context set: %', auth0_user_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION set_auth0_user_context(text) TO authenticated;

-- Verify the function was created
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'set_auth0_user_context'
  ) THEN
    RAISE NOTICE 'SUCCESS: set_auth0_user_context function created';
  ELSE
    RAISE EXCEPTION 'ERROR: Failed to create set_auth0_user_context function';
  END IF;
END $$; 