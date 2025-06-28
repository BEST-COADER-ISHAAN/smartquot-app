import React, { useState } from 'react';
import { Search, Filter, Edit, Copy, Send, Calendar } from 'lucide-react';
import { Quote } from '../types';

interface QuoteHistoryProps {
  quotes: Quote[];
}

const QuoteHistory: React.FC<QuoteHistoryProps> = ({ quotes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || quote.date.includes(dateFilter);
    const matchesStatus = !statusFilter || quote.status === statusFilter;
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Only show the most recent 5 quotes
  const displayedQuotes = filteredQuotes.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quote History</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedQuotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{quote.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{quote.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.margin}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors duration-150">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors duration-150">
                      {/* Delete icon here */}
                    </button>
                    <button className="text-green-600 hover:text-green-800 transition-colors duration-150">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuoteHistory;