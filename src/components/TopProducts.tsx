import React from 'react';
import { Package, TrendingUp, BarChart3 } from 'lucide-react';
import { Product } from '../types';

interface TopProductsProps {
  products: Product[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const sortedProducts = products.sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  const maxRevenue = Math.max(...sortedProducts.map(p => p.revenue));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Top Selling Products</h2>
        <div className="bg-purple-100 rounded-full p-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
        </div>
      </div>

      <div className="space-y-4">
        {sortedProducts.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{product.unitsSold} units sold</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Performance Insight</span>
          </div>
        </div>
        <p className="text-sm text-blue-700 mt-2">
          Your top 5 products generated ${sortedProducts.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()} 
          in revenue this period, representing significant growth in key categories.
        </p>
      </div>
    </div>
  );
};

export default TopProducts;