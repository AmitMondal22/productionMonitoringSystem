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
        return 'bg-green-200 text-green-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Pending':
        return 'bg-orange-200 text-orange-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-200 text-red-800';
      case 'Medium':
        return 'bg-yellow-200 text-yellow-800';
      case 'Low':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
       <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
  {/* Header */}
  <div className=" p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Phone className="text-white w-8 h-8" />
        <h3 className="text-2xl font-bold  text-gray-700">Machine Call Log</h3>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-blue-400 rounded px-4 py-2">
          <Calendar className="text-white w-5 h-5" />
          <span className="text-white font-medium">
            May 3, 2020 - May 3, 2020
          </span>
        </div>
        <Filter className="text-white w-6 h-6 hover:text-blue-100 cursor-pointer transition-colors" />
      </div>
    </div>
  </div>

  {/* Controls */}
  <div className="p-6 bg-gray-50 border-b">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Entries per page */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-600">Show</label>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <label className="text-sm font-medium text-gray-600">entries</label>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center space-x-4 ml-8">
          <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {callLogData.filter(item => item.status === 'Resolved').length} Resolved
            </span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {callLogData.filter(item => item.status === 'Pending').length} Pending
            </span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {callLogData.filter(item => item.status === 'In Progress').length} In Progress
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search machines or issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded bg-white text-sm 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-72"
        />
      </div>
    </div>
  </div>
</div>


        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Sr. No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Machine</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Call Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Response Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Issue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((row, index) => (
                  <tr 
                    key={row.srNo} 
                    className={`hover:bg-gray-100 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.srNo}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{row.machine}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {row.callTime}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">{row.responseTime}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">{row.duration}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${getStatusBadge(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${getPriorityBadge(row.priority)}`}>
                        {row.priority === 'High' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate" title={row.issue}>
                      {row.issue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing {filteredData.length} of {callLogData.length} entries</span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <span className="px-3 py-1 rounded bg-blue-600 text-white">1</span>
                <button className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
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