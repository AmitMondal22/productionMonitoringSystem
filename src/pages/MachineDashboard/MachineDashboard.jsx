import React, { useState } from 'react';
import { Search, Filter, Clock, BarChart2, Activity, AlertCircle, Sliders } from 'lucide-react';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'bg-green-500 border-green-100';
      case 'down':
        return 'bg-red-500 border-red-100';
      case 'noPlan':
        return 'bg-gray-400 border-gray-100';
      default:
        return 'bg-gray-400 border-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'down':
        return 'Down';
      case 'noPlan':
        return 'No Plan';
      default:
        return 'Unknown';
    }
  };

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.part.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || machine.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Machine Dashboard</h3>
                  <p className="text-gray-500 text-sm">Real-time monitoring of production machines</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{summaryData.dateTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-4 md:p-6 bg-white/80 backdrop-blur-sm border-t border-gray-100">
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
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(machine.status)} text-white`}>
                      {getStatusText(machine.status)}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{machine.machine}</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-800 truncate" title={machine.part}>
                  {machine.part}
                </h4>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Planned</p>
                    <p className="text-sm font-medium text-gray-800">{machine.planned.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="text-sm font-medium text-gray-800">{machine.target.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Actual</p>
                    <p className={`text-sm font-medium ${
                      machine.actual < machine.planned ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {machine.actual.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Efficiency</p>
                    <p className={`text-sm font-medium ${
                      machine.efficiency < 80 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {machine.efficiency}%
                    </p>
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
