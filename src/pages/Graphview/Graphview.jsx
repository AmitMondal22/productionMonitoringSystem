import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { 
  Search, 
  Download, 
  Filter, 
  Calendar, 
  LineChart as LineChartIcon, 
  ArrowDown, 
  ArrowUp, 
  BarChart2, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Activity 
} from 'lucide-react';

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
  const [selectedYear, setSelectedYear] = useState('2023');
  const [timeRange, setTimeRange] = useState('month');

  const lines = ['1', '2', '3', '4', '5'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const years = ['2020', '2021', '2022', '2023', '2024'];
  const timeRanges = [
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'quarter', label: 'Quarterly' },
    { value: 'year', label: 'Yearly' }
  ];

  // Calculate summary metrics
  const totalActual = sampleData.reduce((sum, item) => sum + item.actual, 0);
  const totalPlan = sampleData.reduce((sum, item) => sum + item.plan, 0);
  const variance = totalActual - totalPlan;
  const variancePercentage = totalPlan > 0 ? (variance / totalPlan) * 100 : 0;

  const handleShow = () => {
    console.log('Show clicked with:', { selectedLine, selectedMonth, selectedYear, timeRange });
  };

  const handleDownload = () => {
    console.log('Download clicked');
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-700">Date: {label}</p>
          <p className="text-blue-600">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Actual: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-amber-500">
            <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Plan: <span className="font-semibold">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <LineChartIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Plan vs Actual Report</h3>
                  <p className="text-gray-500 text-sm">Track and analyze production performance against targets</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Actual</p>
                <p className="text-2xl font-bold text-blue-600">{totalActual.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <BarChart2 className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Plan</p>
                <p className="text-2xl font-bold text-amber-500">{totalPlan.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Target className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Variance</p>
                <div className="flex items-center">
                  <p className={`text-2xl font-bold ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {variance >= 0 ? '+' : ''}{variance.toLocaleString()}
                  </p>
                  <span className={`ml-2 text-sm ${variance >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {variance >= 0 ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(variancePercentage).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-lg ${variance >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {variance >= 0 ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Line {selectedLine} Performance</p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalPlan > 0 ? Math.min(100, Math.round((totalActual / totalPlan) * 100)) : 0}%
                </p>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                style={{ width: `${Math.min(100, (totalActual / (totalPlan || 1)) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-wrap items-end gap-4">
            {/* Time Range Selector */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
              <div className="grid grid-cols-5 gap-1 p-1 bg-gray-50 rounded-lg">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      timeRange === range.value
                        ? 'bg-white shadow-sm text-blue-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Selector */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Line</label>
              <div className="relative">
                <select
                  value={selectedLine}
                  onChange={(e) => setSelectedLine(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all appearance-none"
                >
                  {lines.map((line) => (
                    <option key={line} value={line}>
                      Line {line}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ArrowDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Month Selector */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all appearance-none"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ArrowDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Year Selector */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all appearance-none"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ArrowDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleShow}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>


        {/* Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Production Trend</h3>
              <p className="text-sm text-gray-500">Line {selectedLine} • {selectedMonth} {selectedYear}</p>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <div className="flex items-center">
                <div className="w-3 h-0.5 bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-600 mr-4">Actual</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-0.5 bg-amber-500 mr-2"></div>
                <span className="text-sm text-gray-600">Plan</span>
              </div>
            </div>
          </div>
          
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sampleData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={true}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  tickMargin={10}
                  label={{ 
                    value: 'DATE', 
                    position: 'insideBottom', 
                    offset: -10, 
                    style: { 
                      textAnchor: 'middle', 
                      fontSize: '12px', 
                      fill: '#666',
                      fontWeight: 500 
                    } 
                  }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  tickMargin={10}
                  domain={[0, 'dataMax + 200']}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ stroke: '#e0e0e0', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual"
                  stroke="#3B82F6" 
                  strokeWidth={2.5}
                  dot={{
                    fill: '#fff',
                    stroke: '#3B82F6',
                    strokeWidth: 2,
                    r: 4,
                    strokeDasharray: ''
                  }}
                  activeDot={{ 
                    r: 6, 
                    stroke: '#fff', 
                    strokeWidth: 2, 
                    fill: '#3B82F6',
                    style: { filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' }
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="plan" 
                  name="Plan"
                  stroke="#F59E0B" 
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{
                    fill: '#fff',
                    stroke: '#F59E0B',
                    strokeWidth: 2,
                    r: 4,
                    strokeDasharray: ''
                  }}
                  activeDot={{ 
                    r: 6, 
                    stroke: '#fff', 
                    strokeWidth: 2, 
                    fill: '#F59E0B',
                    style: { filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.5))' }
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Avg. Daily Actual</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {Math.round(sampleData.reduce((sum, item) => sum + item.actual, 0) / sampleData.length).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Target Achievement</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {totalPlan > 0 ? Math.min(100, Math.round((totalActual / totalPlan) * 100)) : 0}%
                    </p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <Target className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${Math.min(100, (totalActual / (totalPlan || 1)) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Variance</p>
                    <div className="flex items-center">
                      <p className={`text-xl font-semibold ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {variance >= 0 ? '+' : ''}{variance.toLocaleString()}
                      </p>
                      <span className={`ml-2 text-sm ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ({variance >= 0 ? '+' : ''}{variancePercentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${variance >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {variance >= 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${variance >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${Math.min(100, Math.abs(variancePercentage))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphview;