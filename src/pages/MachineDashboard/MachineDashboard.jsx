import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  BarChart2, 
  Activity, 
  AlertCircle, 
  Sliders, 
  HardDrive, 
  Play, 
  AlertTriangle, 
  Pause, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Download,
  BarChart3,
  Zap
} from 'lucide-react';

// Sample data for machines
const machines = [
  {
    cell: 'Cell1',
    machine: 'IMH008',
    part: 'Reducer [PN25][C]',
    planned: 12136,
    target: 80000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH009',
    part: 'Male Threaded Adaptor [PN25][C]',
    planned: 996,
    target: 50000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH012',
    part: 'Union Body [Easy]',
    planned: 1560,
    target: 150000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH013',
    part: 'Elbow 45 Deg [Ex]',
    planned: 8376,
    target: 60000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH121',
    part: 'RFT Tee [SmartFit]',
    planned: 82134,
    target: 150000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH122',
    part: 'RFT Tee [SmartFit]',
    planned: 75389,
    target: 500000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH123',
    part: 'RFT Elbow [Smart]',
    planned: 9500,
    target: 500000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH149',
    part: 'Body For P-Trap',
    planned: 37289,
    target: 600000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH152',
    part: 'Female Threaded Adaptor [PN25][C]',
    planned: 15912,
    target: 150000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'IMH156',
    part: 'Male Threaded Adaptor [PN25][C]',
    planned: 1184,
    target: 150000,
    actual: 0,
    efficiency: 0,
    status: 'down',
  },
  {
    cell: 'Cell1',
    machine: 'SKT004',
    part: 'No Plan Shots',
    planned: 0,
    target: 0,
    actual: 0,
    efficiency: 0,
    status: 'noPlan',
  },
  {
    cell: 'Cell1',
    machine: 'SKT022',
    part: 'No Plan Shots',
    planned: 0,
    target: 0,
    actual: 0,
    efficiency: 0,
    status: 'noPlan',
  },
];

// Summary data
const summaryData = {
  running: 19,
  down: 103,
  noPlan: 26,
  mouldChanges: 0,
  dateTime: '03 May 2020 05:50 PM',
};

const MachineDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

    const _getStatusConfig = (status) => {
    const config = {
      running: {
        bg: 'bg-green-50',
        text: 'text-green-800',
        border: 'border-green-200',
        icon: Play,
        iconColor: 'text-green-500',
        label: 'Running'
      },
      down: {
        bg: 'bg-red-50',
        text: 'text-red-800',
        border: 'border-red-200',
        icon: AlertTriangle,
        iconColor: 'text-red-500',
        label: 'Down'
      },
      noPlan: {
        bg: 'bg-gray-50',
        text: 'text-gray-800',
        border: 'border-gray-200',
        icon: Pause,
        iconColor: 'text-gray-500',
        label: 'No Plan'
      }
    };
    return config[status] || config.down;
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const _calculateProgress = (actual, target) => {
    if (!target) return 0;
    return Math.min(100, Math.round((actual / target) * 100));
  };

  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '0';
  };

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.part.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || machine.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Calculate summary metrics
  const summaryMetrics = {
    total: machines.length,
    running: machines.filter(m => m.status === 'running').length,
    down: machines.filter(m => m.status === 'down').length,
    noPlan: machines.filter(m => m.status === 'noPlan').length,
    efficiency: machines.reduce((sum, m) => sum + m.efficiency, 0) / machines.length || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Machine List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-medium text-gray-800">Machine Status</h2>
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Search machines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Machine Dashboard</h2>
                  <p className="text-gray-500 text-sm">Real-time monitoring and analytics of production machines</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleRefresh}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isRefreshing ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'
                  } border border-gray-200 shadow-sm`}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
                  <Clock className="w-4 h-4" />
                  <span>{currentTime.toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-6 border-t border-gray-100">
            {/* Total Machines */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Machines</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryMetrics.total}</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <BarChart2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Running */}
            <div className="bg-white border border-green-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Running</p>
                  <p className="text-2xl font-bold text-green-600">{summaryMetrics.running}</p>
                </div>
                <div className="p-2 rounded-lg bg-green-50 text-green-600">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Down */}
            <div className="bg-white border border-red-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Down</p>
                  <p className="text-2xl font-bold text-red-600">{summaryMetrics.down}</p>
                </div>
                <div className="p-2 rounded-lg bg-red-50 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* No Plan */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">No Plan</p>
                  <p className="text-2xl font-bold text-gray-600">{summaryMetrics.noPlan}</p>
                </div>
                <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                  <Pause className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Average Efficiency */}
            <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. Efficiency</p>
                  <p className={`text-2xl font-bold ${getEfficiencyColor(summaryMetrics.efficiency)}`}>
                    {summaryMetrics.efficiency.toFixed(1)}%
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-4 md:px-6 md:pb-6 bg-white/80 backdrop-blur-sm border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Machines
                </button>
                <button 
                  onClick={() => setActiveFilter('running')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    activeFilter === 'running' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Running ({summaryData.running})</span>
                </button>
                <button 
                  onClick={() => setActiveFilter('down')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    activeFilter === 'down' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Down ({summaryData.down})</span>
                </button>
                <button 
                  onClick={() => setActiveFilter('noPlan')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    activeFilter === 'noPlan' 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span>No Plan ({summaryData.noPlan})</span>
                </button>
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search machines or parts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Machines</p>
                <p className="text-2xl font-bold text-gray-800">{machines.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <BarChart2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Running</p>
                <p className="text-2xl font-bold text-green-600">{summaryData.running}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${(summaryData.running / machines.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Down</p>
                <p className="text-2xl font-bold text-red-600">{summaryData.down}</p>
              </div>
              <div className="p-2 rounded-lg bg-red-50 text-red-600">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full" 
                style={{ width: `${(summaryData.down / machines.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Mould Changes</p>
                <p className="text-2xl font-bold text-gray-800">{summaryData.mouldChanges}</p>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                <Sliders className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-500 rounded-full" 
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Machine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMachines.map((machine, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">{machine.cell}</span>
                  <div className="flex items-center">
                    {(() => {
                      const statusConfig = _getStatusConfig(machine.status);
                      const Icon = statusConfig.icon;
                      return (
                        <>
                          <div className={`h-2.5 w-2.5 rounded-full mr-2 ${statusConfig.iconColor.replace('text-', 'bg-')}`}></div>
                          <span className={statusConfig.text}>{statusConfig.label}</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-800 truncate" title={machine.part}>
                  {machine.part}
                </h4>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900 font-medium">{formatNumber(machine.planned)}</div>
                    <p className="text-sm font-medium text-gray-800">{machine.planned.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900 font-medium">{formatNumber(machine.target)}</div>
                    <p className="text-sm font-medium text-gray-800">{machine.target.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Actual</p>
                    <div className="w-full">
                      <div className="text-sm text-gray-500 mb-1">
                        {formatNumber(machine.actual)} / {formatNumber(machine.target)}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            machine.actual / machine.target >= 0.9 ? 'bg-green-500' : 
                            machine.actual / machine.target >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${_calculateProgress(machine.actual, machine.target)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Efficiency</p>
                    <div className="flex items-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${machine.efficiency >= 90 ? 'bg-green-100 text-green-800' : machine.efficiency >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {machine.efficiency}%
                      </span>
                      {machine.efficiency > 0 && (
                        <span className="ml-1.5 text-xs text-gray-500">
                          {machine.efficiency >= 90 ? '✓ On Target' : '⚠ Needs Attention'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{Math.min(100, Math.round((machine.actual / machine.target) * 100))}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600" 
                      style={{ width: `${Math.min(100, (machine.actual / machine.target) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMachines.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No machines found matching your criteria</p>
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Last updated: {summaryData.dateTime}
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
          <span className="text-lg font-medium text-gray-800">{summaryData.dateTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MachineDashboard;
