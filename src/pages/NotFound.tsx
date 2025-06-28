import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
            <Search className="w-12 h-12 text-blue-600 mx-auto" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              <span>Go to Dashboard</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/quotations" className="text-blue-600 hover:text-blue-800 text-sm">
                Quotations
              </Link>
              <Link to="/products" className="text-blue-600 hover:text-blue-800 text-sm">
                Products
              </Link>
              <Link to="/customers" className="text-blue-600 hover:text-blue-800 text-sm">
                Customers
              </Link>
              <Link to="/settings" className="text-blue-600 hover:text-blue-800 text-sm">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;