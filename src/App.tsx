import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import QuotationList from './pages/QuotationList';
import QuotationDetail from './pages/QuotationDetail';
import QuotationSharedView from './pages/QuotationSharedView';
import ProductList from './pages/ProductList';
import CustomerList from './pages/CustomerList';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import Profile from './pages/Profile';
import QuotationStep3 from './pages/QuotationStep3';
import { ThemeProvider } from './hooks/useTheme';

function parseHashParams() {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return {
      access_token: params.get('access_token'),
      refresh_token: params.get('refresh_token'),
      expires_in: params.get('expires_in'),
      token_type: params.get('token_type'),
    };
  }
  return {};
}

function App() {
  const { user, loading, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const { access_token, refresh_token } = parseHashParams();
      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token })
          .then(() => {
            // Remove the hash from the URL and redirect to localhost if on production
            window.location.hash = '';
            if (window.location.hostname !== 'localhost') {
              window.location.href = 'http://localhost:8888';
            } else {
              window.location.reload();
            }
          })
          .catch((err) => {
            console.error('Auth error:', err);
            setError('Authentication failed. Please try again.');
          });
      }
    }
  }, [loading, isAuthenticated]);

  // Show error if there's an authentication error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={async () => {
              try {
                const { error } = await supabase.auth.signInWithOAuth({ 
                  provider: 'google',
                  options: {
                    redirectTo: 'http://localhost:8888'
                  }
                });
                if (error) {
                  console.error('OAuth error:', error);
                  setError(error.message);
                }
              } catch (err) {
                console.error('Sign in error:', err);
                setError('Failed to sign in. Please check your connection.');
              }
            }}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="quotations" element={<QuotationList />} />
            <Route path="quotations/:id" element={<QuotationDetail />} />
            <Route path="quotations/:id/step3" element={<QuotationStep3 />} />
            <Route path="quotations/shared/:id" element={<QuotationSharedView />} />
            <Route path="products" element={<ProductList />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quotation-step3" element={<QuotationStep3 />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;