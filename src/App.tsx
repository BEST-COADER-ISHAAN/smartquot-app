import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
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
import Auth0NotConfigured from './components/ui/Auth0NotConfigured';

function App() {
  const { user, loading, isAuthenticated, loginWithRedirect } = useAuth();

  // Check if Auth0 is properly configured
  const isAuth0Configured = import.meta.env.VITE_AUTH0_CLIENT_ID && 
                           import.meta.env.VITE_AUTH0_CLIENT_ID !== 'YOUR_CLIENT_ID_HERE';

  // Handle Auth0 errors in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    if (error) {
      console.error('Auth0 Error:', error, errorDescription);
      // Clear the error from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Show error message
      alert(`Authentication Error: ${error}\n${errorDescription || ''}`);
    }
  }, []);

  // Show configuration error if Auth0 is not set up
  if (!isAuth0Configured) {
    return <Auth0NotConfigured />;
  }

  // Handle redirect to Auth0 login when not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
    }
  }, [loading, isAuthenticated, loginWithRedirect]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show loading while redirecting to Auth0
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Root Route - Redirect to dashboard when authenticated */}
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        
        {/* Public Shared Quotation Route - Now uses quotation_number */}
        <Route path="/quotations/shared/:id" element={<QuotationSharedView />} />
        
        {/* Protected Routes - Only accessible when authenticated */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/quotations" element={<QuotationList />} />
              <Route path="/quotations/:id" element={<QuotationDetail />} />
              <Route path="/quotations/:id/step3" element={<QuotationStep3 />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        } />
        
        {/* Catch all for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;