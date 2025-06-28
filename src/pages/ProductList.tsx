import React from 'react';
import ProductListComponent from '../components/Products/ProductList';

const ProductList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600 mt-1">Manage your products efficiently</p>
      </div>
      
      <ProductListComponent />
    </div>
  );
};

export default ProductList;