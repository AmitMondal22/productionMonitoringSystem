import React, { useState, useMemo } from 'react';
import { FiSearch, FiFilter, FiClock, FiAlertCircle, FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

// Sample data for the machine plan tracker
const machineData = [
  { 
    srNo: 1, 
    machine: 'IMH001', 
    status: 'running',
    planInProgress: { 
      name: 'Union Nut [Greenfit] 25mm',
      qty: '1/50000',
      progress: 65,
      startTime: '08:00 AM',
      endTime: '04:00 PM'
    }, 
    plansInQueue: [
      { name: 'Elbow 90° [Greenfit] 25mm', qty: '1/45000' },
      { name: 'Tee [Greenfit] 25mm', qty: '1/60000' },
      { name: '', qty: '' },
      { name: '', qty: '' },
      { name: '', qty: '' }
    ] 
  },
  { 
    srNo: 2, 
    machine: 'IMH006', 
    status: 'idle',
    planInProgress: { 
      name: 'Female Thr. Adaptor [PN25][Greenfit] 32mm x 1/2"',
      qty: '1/150000',
      progress: 0,
      startTime: '09:00 AM',
      endTime: '05:00 PM'
    }, 
    plansInQueue: Array(5).fill({ name: '', qty: '' })
  },
  // ... (other machine data with similar structure)
];

const statusStyles = {
  running: 'bg-green-100 text-green-800',
  idle: 'bg-yellow-100 text-yellow-800',
  maintenance: 'bg-blue-100 text-blue-800',
  error: 'bg-red-100 text-red-800'
};

const MachinePlanTracker = () => {
  const [dateTime] = useState(new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredMachines = useMemo(() => {
    return machineData.filter(machine => {
      const matchesSearch = machine.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.planInProgress.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || machine.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const getStatusBadge = (status) => {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusText}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Machine Plan Tracker</h3>
              <p className="text-gray-500 mt-1">Monitor and manage machine production plans in real-time</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-600">
              <FiClock className="text-blue-500" />
              <span>Last updated: {dateTime}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by machine or part..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="running">Running</option>
                <option value="idle">Idle</option>
                <option value="maintenance">Maintenance</option>
                <option value="error">Error</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="current"
              >
                <option value="current">Current Plan</option>
                <option value="previous">Previous Plans</option>
                <option value="upcoming">Upcoming Plans</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Total Machines', value: machineData.length, icon: '🔄', trend: 'up', change: '2%' },
            { title: 'In Production', value: '8', icon: '⚙️', trend: 'down', change: '5%' },
            { title: 'Idle', value: '3', icon: '⏸️', trend: 'up', change: '2%' },
            { title: 'Under Maintenance', value: '2', icon: '🔧', trend: 'stable', change: '0%' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600 text-xl">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <span className={`font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 
                  stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {stat.change} from last week
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan in Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Queue</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMachines.map((machine, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500 text-white font-bold">
                          {machine.machine.slice(-2)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{machine.machine}</div>
                          <div className="text-xs text-gray-500">Line {Math.ceil(machine.srNo/5)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(machine.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{machine.planInProgress.name}</div>
                      <div className="text-xs text-gray-500">Qty: {machine.planInProgress.qty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            machine.planInProgress.progress > 75 ? 'bg-green-500' : 
                            machine.planInProgress.progress > 40 ? 'bg-blue-500' : 'bg-yellow-500'
                          }`} 
                          style={{ width: `${machine.planInProgress.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{machine.planInProgress.progress}% Complete</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <FiClock className="mr-1 text-blue-500" size={14} />
                          <span>{machine.planInProgress.startTime} - {machine.planInProgress.endTime}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">8h shift</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {machine.plansInQueue.map((plan, i) => (
                          <div 
                            key={i} 
                            className={`h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium ${
                              plan.name ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                            }`}
                            title={plan.name ? `${plan.name} (${plan.qty})` : 'Empty slot'}
                          >
                            {plan.name ? 'P' + (i + 1) : ''}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <FiInfo size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FiCheckCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">20</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    &larr;
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        page === 1 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      } text-sm font-medium`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <div className="text-sm text-gray-600 mb-2 sm:mb-0">
            <FiAlertCircle className="inline mr-1 text-yellow-500" />
            <span>2 machines require attention</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Generate Report
            </button>
            <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachinePlanTracker;
