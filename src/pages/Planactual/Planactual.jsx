import React, { useState } from 'react';

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
  const [year, setYear] = useState('2019');

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const years = ['2018', '2019', '2020', '2021', '2022'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Plan vs Actual Report</h3>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

         <div className="flex items-end gap-2">
  <button
    onClick={() => console.log('Show clicked')}
    className="bg-gradient-to-r from-indigo-400 to-indigo-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
  >
    Show
  </button>
  <button
    onClick={() => console.log('Download clicked')}
    className="bg-gradient-to-r from-indigo-400 to-indigo-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
  >
    Download
  </button>
</div>

        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Plan</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line</th>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total/MTD</th>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg</th>
                  {Array.from({ length: 26 }, (_, i) => (
                    <th key={i} colSpan={1} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {planData.map((line, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{line.line}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{line.total}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{line.avg}</td>
                    {line.daily.map((value, i) => (
                      <td key={i} className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{value}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-yellow-50 font-semibold">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">TOTAL</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {planData.reduce((sum, line) => sum + line.total, 0)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"></td>
                  {Array.from({ length: 26 }, (_, i) => (
                    <td key={i} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {planData.reduce((sum, line) => sum + (line.daily[i] || 0), 0)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Actual</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line</th>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total/MTD</th>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg</th>
                  {Array.from({ length: 24 }, (_, i) => (
                    <th key={i} colSpan={1} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {actualData.map((line, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{line.line}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{line.total}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{line.avg}</td>
                    {line.daily.map((value, i) => (
                      <td key={i} className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{value}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-yellow-50 font-semibold">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">TOTAL</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {actualData.reduce((sum, line) => sum + line.total, 0)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"></td>
                  {Array.from({ length: 24 }, (_, i) => (
                    <td key={i} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {actualData.reduce((sum, line) => sum + (line.daily[i] || 0), 0)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanActual;
