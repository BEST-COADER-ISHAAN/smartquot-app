import React from 'react';
import { TrendingUp, TrendingDown, IndianRupee, Percent } from 'lucide-react';
import { MarginData } from '../types';

interface MarginOverviewProps {
  marginData: MarginData[];
}

const MarginOverview: React.FC<MarginOverviewProps> = ({ marginData }) => {
  if (!marginData || marginData.length < 2) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center justify-center min-h-[200px]">
        <span className="text-gray-500 text-center">Not enough data to display margin overview.</span>
      </div>
    );
  }

  const currentMonth = marginData[marginData.length - 1];
  const previousMonth = marginData[marginData.length - 2];
  const marginChange = currentMonth.margin - previousMonth.margin;
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Margin Overview</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Current Margin</p>
                <p className="text-2xl font-bold text-blue-800">{currentMonth.margin}%</p>
              </div>
              <div className="bg-blue-600 rounded-full p-3">
                <Percent className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              {marginChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={marginChange > 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(marginChange).toFixed(1)}% from last month
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-800">₹{currentMonth.revenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-600 rounded-full p-3">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              {revenueChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={revenueChange > 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(revenueChange).toFixed(1)}% from last month
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">6-Month Trend</h3>
          <div className="space-y-3">
            {marginData.slice(-6).map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-800">{data.margin}%</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(data.margin / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginOverview;