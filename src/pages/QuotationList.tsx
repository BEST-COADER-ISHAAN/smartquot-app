import React from 'react';
import QuotationListComponent from '../components/Quotations/QuotationList';

const QuotationList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quotations</h1>
        <p className="text-gray-600 mt-1">Manage your quotations efficiently</p>
      </div>
      
      <QuotationListComponent />
    </div>
  );
};

export default QuotationList;