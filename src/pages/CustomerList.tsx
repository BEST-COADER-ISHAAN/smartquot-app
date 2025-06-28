import React from 'react';
import CustomerListComponent from '../components/Customers/CustomerList';

const CustomerList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage your customers efficiently</p>
      </div>
      
      <CustomerListComponent />
    </div>
  );
};

export default CustomerList;