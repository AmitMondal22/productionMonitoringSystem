import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Filter, 
  Calendar, 
  Clock, 
  Sun, 
  Moon, 
  BarChart2, 
  Activity, 
  Clock3, 
  Clock9, 
  Clock12,
  Search,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';


const sampleData = [
  { sno: 1, from: '8:00AM', to: '9:00AM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: 9, line2day1: '', line3day1: '', line1day2: '', line2day2: '', line3day2: '', line1day3: 8 },
  { sno: 2, from: '9:00AM', to: '10:00AM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 71, line3day1: 28, line1day2: '', line2day2: '', line3day2: '', line1day3: 56 },
  { sno: 3, from: '10:00AM', to: '11:00AM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 47, line3day1: 22, line1day2: '', line2day2: '', line3day2: '', line1day3: 40 },
  { sno: 4, from: '11:00AM', to: '12:00AM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 86, line3day1: 62, line1day2: '', line2day2: '', line3day2: '', line1day3: 43 },
  { sno: 5, from: '12:00AM', to: '1:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 93, line3day1: 53, line1day2: '', line2day2: '', line3day2: '', line1day3: 80 },
  { sno: 6, from: '1:00PM', to: '2:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 34, line3day1: 40, line1day2: '', line2day2: '', line3day2: '', line1day3: 41 },
  { sno: 7, from: '2:00PM', to: '3:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 65, line3day1: 50, line1day2: '', line2day2: '', line3day2: '', line1day3: 8 },
  { sno: 8, from: '3:00PM', to: '4:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 40, line3day1: 9, line1day2: '', line2day2: '', line3day2: '', line1day3: 82 },
  { sno: 9, from: '4:00PM', to: '5:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 78, line3day1: 27, line1day2: 65, line2day2: '', line3day2: '', line1day3: 78 },
  { sno: 10, from: '5:00PM', to: '6:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 51, line3day1: 90, line1day2: 85, line2day2: '', line3day2: '', line1day3: 43 },
  { sno: 11, from: '6:00PM', to: '7:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 50, line3day1: 47, line1day2: 48, line2day2: '', line3day2: '', line1day3: 47 },
  { sno: 12, from: '7:00PM', to: '8:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 88, line3day1: 79, line1day2: 26, line2day2: '', line3day2: '', line1day3: 83 },
  { sno: 13, from: '8:00PM', to: '9:00PM', shift: 'NIGHT', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 37, line3day1: 1, line1day2: 9, line2day2: '', line3day2: '', line1day3: 25 },
  { sno: 14, from: '9:00PM', to: '10:00PM', shift: 'NIGHT', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 50, line3day1: 55, line1day2: '', line2day2: '', line3day2: '', line1day3: 76 },
  { sno: 15, from: '10:00PM', to: '11:00PM', shift: 'NIGHT', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 40, line3day1: 34, line1day2: '', line2day2: '', line3day2: '', line1day3: '' },
  { sno: 16, from: '11:00PM', to: '12:00AM', shift: 'NIGHT', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 64, line3day1: 37, line1day2: '', line2day2: '', line3day2: 70, line1day3: '' }
];

function Hourlyassembly() {
  const [selectedMonth, setSelectedMonth] = useState('MAY');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [activeTab, setActiveTab] = useState('day1');
  const [searchQuery, setSearchQuery] = useState('');

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const years = ['2021', '2022', '2023', '2024'];
  const tabs = [
    { id: 'day1', label: 'Day 1', color: 'blue' },
    { id: 'day2', label: 'Day 2', color: 'green' },
    { id: 'day3', label: 'Day 3', color: 'purple' },
  ];

  // Calculate summary metrics
  const summaryStats = useMemo(() => {
    const day1Data = sampleData.filter(row => row.shift === 'DAY');
    const nightData = sampleData.filter(row => row.shift === 'NIGHT');
    
    const day1Total = day1Data.reduce((sum, row) => {
      return sum + (row.line1day1 || 0) + (row.line2day1 || 0) + (row.line3day1 || 0);
    }, 0);
    
    const nightTotal = nightData.reduce((sum, row) => {
      return sum + (row.line1day1 || 0) + (row.line2day1 || 0) + (row.line3day1 || 0);
    }, 0);
    
    const total = day1Total + nightTotal;
    const avgPerHour = total / sampleData.length;
    
    return {
      day1Total,
      nightTotal,
      total,
      avgPerHour: Math.round(avgPerHour * 100) / 100
    };
  }, []);

  const handleShow = () => {
    console.log('Show clicked with:', { selectedMonth, selectedYear });
  };

  const handleDownload = () => {
    console.log('Download clicked');
  };
  
  const getShiftIcon = (shift) => {
    return shift === 'DAY' ? 
      <Sun className="w-4 h-4 text-amber-500" /> : 
      <Moon className="w-4 h-4 text-indigo-500" />;
  };
  
  const getCellValue = (row, column) => {
    const cellValue = row[column];
    if (cellValue === '' || cellValue === undefined) return '';
    
    // Add color coding based on value
    let bgColor = '';
    if (cellValue >= 80) bgColor = 'bg-green-50 text-green-700';
    else if (cellValue >= 50) bgColor = 'bg-blue-50 text-blue-700';
    else if (cellValue > 0) bgColor = 'bg-amber-50 text-amber-700';
    
    return (
      <div className={`px-2 py-1 rounded-md text-center font-medium ${bgColor}`}>
        {cellValue}
      </div>
    );
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
                  <Clock3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Hourly Assembly</h2>
                  <p className="text-gray-500 text-sm">Track and analyze production performance by hour</p>
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
                <p className="text-sm font-medium text-gray-500">Day Shift Total</p>
                <p className="text-2xl font-bold text-blue-600">{summaryStats.day1Total.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <Sun className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" 
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Night Shift Total</p>
                <p className="text-2xl font-bold text-indigo-600">{summaryStats.nightTotal.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Moon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500" 
                style={{ width: '45%' }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Production</p>
                <p className="text-2xl font-bold text-green-600">{summaryStats.total.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500" 
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Per Hour</p>
                <p className="text-2xl font-bold text-purple-600">{summaryStats.avgPerHour.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-500" 
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-wrap items-end gap-4">
            {/* Day Tabs */}
            <div className="w-full md:w-auto">
              <div className="flex space-x-1 p-1 bg-gray-50 rounded-lg">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
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

            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search hours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
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

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <span>Time</span>
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </button>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <span>Shift</span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      <span>Line 1</span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      <span>Line 2</span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      <span>Line 3</span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      <span>Hourly Avg</span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      <span>Status</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleData.map((row) => {
                  // Calculate hourly average for the row
                  const line1 = row.line1day1 || 0;
                  const line2 = row.line2day1 || 0;
                  const line3 = row.line3day1 || 0;
                  const total = line1 + line2 + line3;
                  const avg = Math.round((total / 3) * 100) / 100;
                  
                  // Determine status
                  let status = 'idle';
                  let statusColor = 'bg-gray-100 text-gray-800';
                  if (total > 150) {
                    status = 'high';
                    statusColor = 'bg-green-100 text-green-800';
                  } else if (total > 50) {
                    status = 'medium';
                    statusColor = 'bg-blue-100 text-blue-800';
                  } else if (total > 0) {
                    status = 'low';
                    statusColor = 'bg-amber-100 text-amber-800';
                  }
                  
                  return (
                    <tr key={row.sno} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <Clock12 className="w-4 h-4" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{row.from} - {row.to}</div>
                            <div className="text-xs text-gray-500">{row.sno} hour{row.sno !== 1 ? 's' : ''} in</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          {getShiftIcon(row.shift)}
                          <span className="ml-2 text-sm font-medium text-gray-900">{row.shift}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        {getCellValue(row, 'line1day1')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        {getCellValue(row, 'line2day1')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        {getCellValue(row, 'line3day1')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {isNaN(avg) ? '-' : avg}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="7" className="px-4 py-3 text-right text-xs text-gray-500">
                    Showing hourly data for {selectedMonth} {selectedYear} • {sampleData.length} hours
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Time Legend */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300 mr-1"></div>
            <span>High Production</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300 mr-1"></div>
            <span>Medium Production</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300 mr-1"></div>
            <span>Low Production</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-300 mr-1"></div>
            <span>Idle</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hourlyassembly;