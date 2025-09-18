import React, { useState, useEffect, useMemo } from 'react';
import { 
  FiAlertCircle, 
  FiClock, 
  FiBarChart2, 
  FiPieChart, 
  FiUsers, 
  FiGrid, 
  FiSettings, 
  FiEye, 
  FiFileText, 
  FiRefreshCw,
  FiPlay,
  FiPause,
  FiAlertTriangle,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, PieChart, Pie } from 'recharts';

// Sample data for OEE, M/C Status, and Alerts
const oeeData = {
  value: 0,
  availability: 88.43,
  performance: 0,
  quality: 0,
};

const mcStatusData = {
  running: 19,
  stopped: 103,
  notPlanned: 26,
};

const alertsData = [
  { time: '03-05-2020;18:20:34', machine: 'IMH173', message: 'down for past 4 hours!' },
  { time: '03-05-2020;18:16:18', machine: 'IMH172', message: 'down for past 4 hours!' },
  { time: '03-05-2020;18:07:03', machine: 'IMH171', message: 'down for past 4 hours!' },
  { time: '03-05-2020;18:00:47', machine: 'IMH170', message: 'down for past 4 hours!' },
  { time: '03-05-2020;18:00:31', machine: 'IMH169', message: 'down for past 4 hours!' },
];

// Sample data for charts
const downtimeWeeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [120, 190, 150, 80, 210, 90, 160],
  categories: ['Electrical', 'Mechanical', 'Maintenance', 'Software', 'Other'],
  categoryValues: [45, 38, 27, 25, 15],
};

const productionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  actual: [65, 59, 80, 81, 56, 55],
  target: [60, 62, 75, 79, 70, 65],
};

const machineEfficiencyData = [
  { name: 'Machine 1', efficiency: 92 },
  { name: 'Machine 2', efficiency: 85 },
  { name: 'Machine 3', efficiency: 78 },
  { name: 'Machine 4', efficiency: 88 },
  { name: 'Machine 5', efficiency: 95 },
];

const qualityMetrics = {
  labels: ['Passed', 'Rework', 'Failed'],
  values: [85, 10, 5],
  colors: ['#10B981', '#F59E0B', '#EF4444'],
};


const MachineStatusDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRange, setTimeRange] = useState('today');
  const [showFilters, setShowFilters] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Production data for the overview chart
  const productionOverviewData = [
    { name: '6:00', production: 65, target: 70 },
    { name: '8:00', production: 120, target: 125 },
    { name: '10:00', production: 185, target: 180 },
    { name: '12:00', production: 225, target: 235 },
    { name: '14:00', production: 290, target: 290 },
    { name: '16:00', production: 345, target: 345 },
    { name: '18:00', production: 390, target: 400 },
  ];

  // Enhanced data with calculations
  const enhancedData = useMemo(() => {
    return {
      ...oeeData,
      totalMachines: mcStatusData.running + mcStatusData.stopped + mcStatusData.notPlanned,
      uptimePercentage: ((mcStatusData.running / (mcStatusData.running + mcStatusData.stopped)) * 100).toFixed(1) || 0,
      formattedTime: currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      formattedDate: currentTime.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
  }, [currentTime]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Machine Status & Analytics</h3>
            <p className="text-sm text-gray-500 mt-1">Real-time monitoring and performance metrics</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button 
              onClick={handleRefresh}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isRefreshing ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200 shadow-sm`}
              disabled={isRefreshing}
            >
              <FiRefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <div className="hidden md:flex items-center space-x-2 bg-white px-3 py-2 rounded-md border border-gray-200 shadow-sm">
              <FiClock className="text-gray-500" />
              <span className="text-sm font-medium">
                {enhancedData.formattedTime}
                <span className="text-gray-500 ml-1">•</span>
                <span className="text-gray-500 ml-1">{enhancedData.formattedDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* OEE Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-700 flex items-center">
                <FiPieChart className="mr-2 text-indigo-600" />
                Overall Equipment Effectiveness
              </h2>
              <span className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
                OEE
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="relative w-32 h-32">
                <div className="w-full md:w-1/2 pl-0 md:pl-4 mt-4 md:mt-0 flex flex-col justify-center">
                  <span className="text-3xl font-bold text-gray-800">
                    {oeeData.value}%
                  </span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="339.292"
                    strokeDashoffset={`calc(339.292 - (339.292 * ${oeeData.value}) / 100)`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">Availability</span>
                    <span className="text-sm font-medium text-green-600">{oeeData.availability}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${oeeData.availability}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">Performance</span>
                    <span className="text-sm font-medium text-blue-600">{oeeData.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${oeeData.performance}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">Quality</span>
                    <span className="text-sm font-medium text-amber-500">{oeeData.quality}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-amber-400 h-1.5 rounded-full"
                      style={{ width: `${oeeData.quality}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Machine Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-700 flex items-center">
                <FiClock className="mr-2 text-indigo-600" />
                Machine Status
              </h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                >
                  <FiFilter className="w-4 h-4" />
                </button>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Running */}
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Running</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {mcStatusData.running} <span className="text-xs font-normal text-gray-500">/ {enhancedData.totalMachines}</span>
                  </span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(mcStatusData.running / enhancedData.totalMachines) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Stopped */}
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Stopped</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {mcStatusData.stopped} <span className="text-xs font-normal text-gray-500">/ {enhancedData.totalMachines}</span>
                  </span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(mcStatusData.stopped / enhancedData.totalMachines) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Not Planned */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Not Planned</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {mcStatusData.notPlanned} <span className="text-xs font-normal text-gray-500">/ {enhancedData.totalMachines}</span>
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-400 h-2 rounded-full"
                    style={{ width: `${(mcStatusData.notPlanned / enhancedData.totalMachines) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Uptime</span>
                <span className="text-sm font-semibold text-gray-800">
                  {enhancedData.uptimePercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${enhancedData.uptimePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiAlertCircle className="text-indigo-600" /> Alerts
            </h2>
            <div className="h-40 overflow-y-auto">
              {alertsData.map((alert, index) => (
                <div key={index} className="p-2 mb-2 bg-red-50 rounded text-sm text-red-700">
                  <p>{alert.time} <span className="font-medium">{alert.machine}</span> {alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Production Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">Production Overview</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
                <span className="text-xs text-gray-600">Actual</span>
              </div>
              <div className="flex items-center ml-2">
                <div className="w-3 h-3 rounded-full bg-indigo-200 mr-1"></div>
                <span className="text-xs text-gray-600">Target</span>
              </div>
              <select 
                className="ml-2 text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                defaultValue="today"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productionOverviewData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.375rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                  formatter={(value, name) => [value, name]}
                />
                <Bar 
                  dataKey="production" 
                  fill="#4F46E5" 
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                  name="Production"
                />
                <Bar 
                  dataKey="target" 
                  fill="#C7D2FE" 
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                  name="Target"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Today's Production</p>
                <p className="text-xl font-semibold text-gray-800">390</p>
                <p className="text-xs text-gray-500">+12% from yesterday</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Efficiency</p>
                <p className="text-xl font-semibold text-green-600">97.5%</p>
                <p className="text-xs text-gray-500">+2.5% from target</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Defect Rate</p>
                <p className="text-xl font-semibold text-red-600">1.2%</p>
                <p className="text-xs text-gray-500">-0.3% from target</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Production Trend */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-indigo-600" /> Production Trend
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData.labels.map((label, i) => ({
                  name: label,
                  Actual: productionData.actual[i],
                  Target: productionData.target[i]
                }))}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Actual" fill="#4F46E5" name="Actual Production" />
                  <Bar dataKey="Target" fill="#A5B4FC" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Machine Efficiency */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-green-600" /> Machine Efficiency (%)
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={machineEfficiencyData}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
                  <Bar dataKey="efficiency" fill="#10B981" name="Efficiency">
                    {machineEfficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${100 + index * 30}, 80%, 60%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Downtime Analysis */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiPieChart className="text-blue-600" /> Downtime by Category
            </h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={downtimeWeeklyData.categories.map((category, index) => ({
                      name: category,
                      value: downtimeWeeklyData.categoryValues[index]
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {downtimeWeeklyData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 60%)`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} minutes`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiPieChart className="text-amber-600" /> Quality Metrics
            </h2>
            <div className="h-64">
              <div className="flex justify-around items-center h-full">
                {qualityMetrics.labels.map((label, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2"
                      style={{ 
                        background: `conic-gradient(${qualityMetrics.colors[index]} 0% ${qualityMetrics.values[index]}%, #E5E7EB ${qualityMetrics.values[index]}% 100%)`
                      }}
                    >
                      {qualityMetrics.values[index]}%
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FiGrid className="text-indigo-600" /> Quick Links
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: 'Users', icon: <FiUsers className="text-indigo-600" /> },
              { name: 'Applications', icon: <FiGrid className="text-indigo-600" /> },
              { name: 'Provision', icon: <FiSettings className="text-indigo-600" /> },
              { name: 'Reports', icon: <FiFileText className="text-indigo-600" /> },
              { name: 'Auditing', icon: <FiEye className="text-indigo-600" /> },
              { name: 'Machine Dashboard', icon: <FiBarChart2 className="text-indigo-600" /> },
            ].map((link, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 cursor-pointer"
              >
                <div className="text-xl mb-1">{link.icon}</div>
                <p className="text-xs text-gray-700">{link.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineStatusDashboard;
