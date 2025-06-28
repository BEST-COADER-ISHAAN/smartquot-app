import React from 'react';
import { AlertCircle, Settings } from 'lucide-react';

const Auth0NotConfigured: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
          Auth0 Not Configured
        </h1>
        
        <p className="text-gray-600 text-center mb-6">
          Please configure Auth0 settings to use the application.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Setup Instructions:
          </h3>
          <ol className="text-sm text-gray-600 space-y-2">
            <li>1. Create a <code className="bg-gray-200 px-1 rounded">.env</code> file in your project root</li>
            <li>2. Add your Auth0 configuration:</li>
            <li className="ml-4">
              <code className="bg-gray-200 px-1 rounded block">
                VITE_AUTH0_DOMAIN=smartquot.us.auth0.com<br/>
                VITE_AUTH0_CLIENT_ID=your_client_id_here
              </code>
            </li>
            <li>3. Configure URLs in Auth0 dashboard</li>
            <li>4. Restart your development server</li>
          </ol>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth0NotConfigured; 