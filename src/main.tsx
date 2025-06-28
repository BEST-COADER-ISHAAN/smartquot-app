import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx';
import './index.css';

// Auth0 configuration
const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'smartquot.us.auth0.com';
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'YOUR_CLIENT_ID_HERE';

// Check if Auth0 is properly configured
if (clientId === 'YOUR_CLIENT_ID_HERE') {
  console.error('⚠️ Auth0 Client ID not configured! Please set VITE_AUTH0_CLIENT_ID in your .env file');
}

console.log('🔧 Auth0 Configuration:', {
  domain,
  clientId: clientId === 'YOUR_CLIENT_ID_HERE' ? 'NOT_CONFIGURED' : 'CONFIGURED',
  redirectUri: window.location.origin
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: "openid profile email"
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
