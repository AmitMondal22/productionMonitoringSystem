import React from 'react';

const DonutChart = () => {
  const data = [
    { label: 'Desktop', value: 45, color: 'bg-blue-500' },
    { label: 'Mobile', value: 30, color: 'bg-green-500' },
    { label: 'Tablet', value: 25, color: 'bg-yellow-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
      
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          {/* Placeholder for donut chart */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">73%</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
        
        <div className="space-y-3 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
