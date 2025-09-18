import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample data that matches the pattern in the image
const sampleData = [
  { date: 1, actual: 0, plan: 583 },
  { date: 2, actual: 583, plan: 950 },
  { date: 3, actual: 950, plan: 1268 },
  { date: 4, actual: 1268, plan: 1152 },
  { date: 5, actual: 1800, plan: 1410 },
  { date: 6, actual: 690, plan: 600 },
  { date: 7, actual: 1900, plan: 1494 },
  { date: 8, actual: 0, plan: 1155 },
  { date: 9, actual: 890, plan: 1175 },
  { date: 10, actual: 633, plan: 520 },
  { date: 11, actual: 2400, plan: 659 },
  { date: 12, actual: 0, plan: 0 },
  { date: 13, actual: 0, plan: 1340 },
  { date: 14, actual: 1629, plan: 1299 },
  { date: 15, actual: 1104, plan: 1453 },
  { date: 16, actual: 510, plan: 1340 },
  { date: 17, actual: 1940, plan: 1225 },
  { date: 18, actual: 0, plan: 378 },
  { date: 19, actual: 0, plan: 0 },
  { date: 20, actual: 0, plan: 784 },
  { date: 21, actual: 1153, plan: 886 },
  { date: 22, actual: 1193, plan: 1060 },
  { date: 23, actual: 886, plan: 948 },
  { date: 24, actual: 1192, plan: 740 },
  { date: 25, actual: 1000, plan: 1020 }
];

function Graphview() {
  const [selectedLine, setSelectedLine] = useState('1');
  const [selectedMonth, setSelectedMonth] = useState('MAY');
  const [selectedYear, setSelectedYear] = useState('2019');

  const lines = ['1', '2', '3', '4', '5'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const years = ['2018', '2019', '2020', '2021', '2022'];

  const handleShow = () => {
    console.log('Show clicked with:', { selectedLine, selectedMonth, selectedYear });
  };

  const handleDownload = () => {
    console.log('Download clicked');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h3 className="text-xl font-semibold text-gray-800 mb-6">PLAN VS ACTUAL REPORT</h3>
        
      
       
        {/* Controls */}
<div className="flex flex-wrap items-center gap-4 mb-6">
  {/* LINE */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 mb-1">LINE</label>
    <select
      value={selectedLine}
      onChange={(e) => setSelectedLine(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {lines.map((line) => (
        <option key={line} value={line}>
          {line}
        </option>
      ))}
    </select>
  </div>

  {/* MONTH */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 mb-1">MONTH</label>
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  </div>

  {/* YEAR */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 mb-1">YEAR</label>
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>

  {/* Buttons */}
  <div className="flex gap-2 ml-auto mt-2">
    <button
      onClick={handleShow}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
    >
      SHOW
    </button>
    <button
      onClick={handleDownload}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
    >
      DOWNLOAD
    </button>
  </div>
</div>


        {/* Chart */}
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sampleData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="date" 
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fill: '#666' }}
                label={{ value: 'DATE', position: 'insideBottom', offset: -20, style: { textAnchor: 'middle', fontSize: '12px', fill: '#666' } }}
              />
              <YAxis 
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fill: '#666' }}
                domain={[-500, 2500]}
                ticks={[-500, -300, -100, 100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500]}
              />
              <Line 
                type="linear" 
                dataKey="actual" 
                stroke="#1e40af" 
                strokeWidth={3}
                dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2, fill: '#fff' }}
              />
              <Line 
                type="linear" 
                dataKey="plan" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-700"></div>
            <span className="text-sm text-gray-600">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-yellow-500"></div>
            <span className="text-sm text-gray-600">Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphview;