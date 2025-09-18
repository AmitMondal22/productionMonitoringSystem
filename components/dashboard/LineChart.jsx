import React from 'react';

const LineChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg border border-blue-200">7d</button>
          <button className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 border border-gray-200">30d</button>
          <button className="px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 border border-gray-200">90d</button>
        </div>
      </div>
      
      <div className="h-80 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
        {/* Placeholder for chart library like Chart.js or Recharts */}
        <div className="text-gray-500 text-center">
          <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">Line Chart Component</p>
          <p className="text-sm">Integrate with Chart.js or Recharts</p>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
