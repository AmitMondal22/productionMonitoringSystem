import React, { useState } from 'react';
import { Search, Calendar, Phone, Filter, Clock, AlertTriangle } from 'lucide-react';

function MachineCallLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(100);

  // Sample machine call log data
  const callLogData = [
    { srNo: 1, machine: 'IMH001', callTime: '08:15:30', responseTime: '08:18:45', duration: '00:03:15', status: 'Resolved', priority: 'High', issue: 'Motor malfunction' },
    { srNo: 2, machine: 'IMH006', callTime: '09:22:15', responseTime: '09:25:30', duration: '00:03:15', status: 'In Progress', priority: 'Medium', issue: 'Temperature alert' },
    { srNo: 3, machine: 'IMH008', callTime: '10:45:20', responseTime: '10:47:55', duration: '00:02:35', status: 'Resolved', priority: 'Low', issue: 'Routine maintenance' },
    { srNo: 4, machine: 'IMH009', callTime: '11:30:45', responseTime: '11:35:20', duration: '00:04:35', status: 'Pending', priority: 'High', issue: 'System failure' },
    { srNo: 5, machine: 'IMH011', callTime: '12:15:10', responseTime: '12:18:25', duration: '00:03:15', status: 'Resolved', priority: 'Medium', issue: 'Calibration needed' },
    { srNo: 6, machine: 'IMH012', callTime: '13:45:30', responseTime: '13:50:15', duration: '00:04:45', status: 'In Progress', priority: 'High', issue: 'Emergency stop' },
    { srNo: 7, machine: 'IMH013', callTime: '14:20:55', responseTime: '14:23:10', duration: '00:02:15', status: 'Resolved', priority: 'Low', issue: 'Filter replacement' },
    { srNo: 8, machine: 'IMH014', callTime: '15:10:40', responseTime: '15:15:25', duration: '00:04:45', status: 'Pending', priority: 'Medium', issue: 'Belt adjustment' },
    { srNo: 9, machine: 'IMH015', callTime: '16:05:15', responseTime: '16:08:30', duration: '00:03:15', status: 'Resolved', priority: 'High', issue: 'Pressure drop' },
    { srNo: 10, machine: 'IMH020', callTime: '17:30:25', responseTime: '17:33:40', duration: '00:03:15', status: 'In Progress', priority: 'Medium', issue: 'Lubrication check' },
  ];

  const filteredData = callLogData.filter(item =>
    item.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Machine Call Log</h3>
                  <p className="text-gray-500 text-sm">Track and manage machine maintenance calls</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg px-3 py-1.5 cursor-pointer border border-gray-200">
                  <Calendar className="text-gray-600 w-4 h-4" />
                  <span className="text-gray-700 text-sm font-medium">
                    May 3, 2020 - May 3, 2020
                  </span>
                </div>
                <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 md:p-6 bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                {/* Entries per page */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-600">Show</label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <label className="text-sm font-medium text-gray-600">entries</label>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">
                      {callLogData.filter(item => item.status === 'Resolved').length} Resolved
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">
                      {callLogData.filter(item => item.status === 'Pending').length} Pending
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">
                      {callLogData.filter(item => item.status === 'In Progress').length} In Progress
                    </span>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search machines or issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-sm 
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                />
              </div>
            </div>
          </div>
</div>


        {/* Table */}
        <div className="bg-white rounded-b-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr. No</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Machine</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Call Time</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Response Time</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Issue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((row) => (
                      <tr 
                        key={row.srNo}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-md bg-blue-50 text-blue-600 font-medium">
                              {row.srNo}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-blue-600">{row.machine}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-700 font-mono">{row.callTime}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                          {row.responseTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-mono rounded-full bg-gray-100 text-gray-800">
                            {row.duration}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(row.status)}`}>
                            {row.status === 'In Progress' && <div className="w-2 h-2 rounded-full bg-blue-600 mr-1.5 animate-pulse"></div>}
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityBadge(row.priority)}`}>
                            {row.priority === 'High' && <AlertTriangle className="w-3 h-3 mr-1 flex-shrink-0" />}
                            {row.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 max-w-xs truncate" title={row.issue}>
                            {row.issue}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredData.length}</span> of{' '}
                <span className="font-medium">{callLogData.length}</span> entries
                {searchTerm && (
                  <span className="ml-2 text-gray-500">
                    (filtered from {callLogData.length} total entries)
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="px-3.5 py-1.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  disabled={true}
                >
                  Previous
                </button>
                <span className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium">
                  1
                </span>
                <button 
                  className="px-3.5 py-1.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  disabled={true}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MachineCallLog;