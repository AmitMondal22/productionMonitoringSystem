import React, { useState } from 'react';
import { FiDownload, FiFilter, FiRefreshCw, FiBarChart2 } from 'react-icons/fi';

const PlanActual = () => {
  // Sample data for Plan and Actual
  const planData = [
    { line: 1, total: 23699, avg: 960, daily: [1200, 1620, 1900, 600, 1900, 890, 530, 2400, 0, 1676, 510, 1940, 100, 880, 1128, 800, 1050, 1000, 95, 6] },
    { line: 2, total: 17209, avg: 700, daily: [1498, 1420, 800, 700, 150, 500, 1950, 425, 1095, 400, 400, 800, 740, 420, 1350, 123, 500, 1018, 150, 4] },
    { line: 3, total: 2925, avg: 500, daily: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1150, 675, 0, 450, 150, 0, 0, 0, 0] },
  ];

  const actualData = [
    { line: 1, total: 32240, avg: 583, daily: [1262, 1152, 690, 1410, 1437, 1494, 1195, 633, 559, 1340, 1299, 1104, 1453, 1083, 1225, 784, 1153, 740, 1192] },
    { line: 2, total: 29613, avg: 516, daily: [1034, 992, 923, 1317, 776, 1037, 1251, 508, 871, 825, 1304, 787, 1134, 300, 619, 1385, 1157, 1287, 1172] },
    { line: 3, total: 12729, avg: 459, daily: [495, 761, 435, 457, 103, 456, 267, 344, 549, 396, 310, 437, 402, 396, 278, 87, 569, 529, 997] },
  ];

  const [month, setMonth] = useState('MAY');
  const [year, setYear] = useState('2023');
  const [activeTab, setActiveTab] = useState('plan');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const years = ['2021', '2022', '2023', '2024'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const renderTable = (data) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line</th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total/MTD</th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg</th>
            {Array.from({ length: 20 }, (_, i) => (
              <th key={i} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((line, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-50'}>              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Line {line.line}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{line.total.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{line.avg.toLocaleString()}</td>
              {line.daily.map((value, i) => (
                <td key={i} className="px-3 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                  {value === 0 ? '-' : value}
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-blue-50 font-semibold">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TOTAL</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
              {data.reduce((sum, line) => sum + line.total, 0).toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
              {Math.round(data.reduce((sum, line) => sum + line.avg, 0) / data.length).toLocaleString()}
            </td>
            {Array.from({ length: 20 }).map((_, i) => {
              const total = data.reduce((sum, line) => sum + (line.daily[i] || 0), 0);
              return (
                <td key={i} className="px-3 py-4 whitespace-nowrap text-sm text-center font-medium text-blue-600">
                  {total === 0 ? '-' : total}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <FiBarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Plan vs Actual Report</h3>
                  <p className="text-gray-500 text-sm">Track production performance against targets</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefresh}
                  className={`p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                  disabled={isRefreshing}
                >
                  <FiRefreshCw className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                  <FiDownload className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => console.log('Apply filters')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <FiFilter className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('plan')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'plan'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Plan
              </button>
              <button
                onClick={() => setActiveTab('actual')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'actual'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Actual
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'plan' ? (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Production Plan - {month} {year}</h2>
                {renderTable(planData)}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Actual Production - {month} {year}</h2>
                {renderTable(actualData)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanActual;
