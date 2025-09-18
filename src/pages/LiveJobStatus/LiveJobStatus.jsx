import React, { useState, useMemo } from 'react';
import { Search, Clock, AlertCircle, CheckCircle, PauseCircle, Sliders, Download, RefreshCw } from 'lucide-react';
import moment from 'moment';

// Sample data for CCM Machine Status
const machineData = [
  {
    routeCardNo: 1144,
    inspectionNo: 'V202C031020',
    stlPartNo: '94108B6003',
    custPartNo: '957010801200',
    packSize: 1000,
    lotQty: 81500,
    packedQty: 37000,
    defectiveQty: 0,
    startTime: '03/10/2020 11:51:13',
    endTime: '',
    ccMachine: 'CC-931',
    status: 'RUNNING',
  },
  {
    routeCardNo: 890,
    inspectionNo: 'V503C031020',
    stlPartNo: '960010603500',
    custPartNo: '',
    packSize: 1000,
    lotQty: 45000,
    packedQty: 0,
    defectiveQty: 0,
    startTime: '03/10/2020 16:18:46',
    endTime: '',
    ccMachine: 'CC-936',
    status: 'RUNNING',
  },
  {
    routeCardNo: 1135,
    inspectionNo: 'V303C031020',
    stlPartNo: '9411043534',
    custPartNo: '958011009008',
    packSize: 200,
    lotQty: 100000,
    packedQty: 3000,
    defectiveQty: 0,
    startTime: '03/10/2020 16:31:25',
    endTime: '03/10/2020 17:31:00',
    ccMachine: 'CC-935',
    status: 'CLOSED',
  },
  {
    routeCardNo: 1162,
    inspectionNo: 'V402C031020',
    stlPartNo: '94106B6014',
    custPartNo: '901111620005',
    packSize: 1200,
    lotQty: 200000,
    packedQty: 6000,
    defectiveQty: 257,
    startTime: '03/10/2020 09:42:41',
    endTime: '03/10/2020 16:59:34',
    ccMachine: 'CC-935',
    status: 'CLOSED',
  },
  {
    routeCardNo: 1132,
    inspectionNo: 'V401C031020',
    stlPartNo: '94106B6014',
    custPartNo: '901111620005',
    packSize: 1200,
    lotQty: 100000,
    packedQty: 39600,
    defectiveQty: 0,
    startTime: '03/10/2020 09:24:38',
    endTime: '03/10/2020 16:59:34',
    ccMachine: 'CC-935',
    status: 'CLOSED',
  },
  {
    routeCardNo: 1102,
    inspectionNo: 'V202C031020',
    stlPartNo: '9411043534',
    custPartNo: '958011009008',
    packSize: 200,
    lotQty: 65000,
    packedQty: 8000,
    defectiveQty: 0,
    startTime: '03/10/2020 14:41:40',
    endTime: '03/10/2020 16:01:04',
    ccMachine: 'CC-936',
    status: 'CLOSED',
  },
];

const LiveJobStatus = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const statusOptions = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'RUNNING', label: 'Running' },
    { value: 'CLOSED', label: 'Completed' },
    { value: 'IDLE', label: 'Idle' },
    { value: 'ERROR', label: 'Error' },
  ];

  const filteredData = useMemo(() => {
    return machineData.filter((item) => {
      const matchesSearch = 
        item.inspectionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ccMachine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [machineData, searchTerm, selectedStatus]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    return {
      total: machineData.length,
      running: machineData.filter(item => item.status === 'RUNNING').length,
      completed: machineData.filter(item => item.status === 'CLOSED').length,
      idle: machineData.filter(item => item.status === 'IDLE').length,
    };
  }, [machineData]);

  // Function to determine status color and icon
  const getStatusConfig = (status) => {
    switch (status) {
      case 'RUNNING':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          icon: <Clock className="w-4 h-4" />,
          border: 'border-green-200',
        };
      case 'CLOSED':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          icon: <CheckCircle className="w-4 h-4" />,
          border: 'border-blue-200',
        };
      case 'IDLE':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          icon: <PauseCircle className="w-4 h-4" />,
          border: 'border-yellow-200',
        };
      case 'ERROR':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          icon: <AlertCircle className="w-4 h-4" />,
          border: 'border-red-200',
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          icon: null,
          border: 'border-gray-200',
        };
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '-';
    return moment(dateTime).format('DD/MM/YYYY hh:mm A');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Live Job Status</h2>
              <p className="mt-1 text-sm text-gray-500">
                Real-time monitoring of all production jobs and machine status
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isRefreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {/* Total Jobs */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Running */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.running}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.completed}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Idle */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-400 rounded-md p-3">
                  <PauseCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Idle</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.idle}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-64">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md h-10"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Numbers</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantities</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timings</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine & Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => {
                    const statusConfig = getStatusConfig(item.status);
                    const progress = Math.min(Math.round((item.packedQty / item.lotQty) * 100), 100);
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                              <span className="font-medium">#{item.routeCardNo}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.inspectionNo}</div>
                              <div className="text-xs text-gray-500">Inspection</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">{item.stlPartNo}</div>
                          {item.custPartNo && (
                            <div className="text-xs text-gray-500">{item.custPartNo}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            <span className="text-indigo-600">{item.packedQty.toLocaleString()}</span>
                            <span className="text-gray-400"> / {item.lotQty.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Packed: {progress}% • Pack Size: {item.packSize}
                          </div>
                          {item.defectiveQty > 0 && (
                            <div className="text-xs text-red-600 mt-1">
                              Defective: {item.defectiveQty}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 text-gray-400 mr-1" />
                              {formatDateTime(item.startTime)}
                            </div>
                            {item.endTime && (
                              <div className="flex items-center mt-1">
                                <CheckCircle className="h-3.5 w-3.5 text-gray-400 mr-1" />
                                {formatDateTime(item.endTime)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {item.ccMachine}
                              </span>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                              {statusConfig.icon && <span className="mr-1">{statusConfig.icon}</span>}
                              {item.status}
                            </span>
                          </div>
                          {item.status === 'RUNNING' && (
                            <div className="mt-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                                <span>In progress</span>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-12 w-12 text-gray-300 mb-2" />
                        <h3 className="text-lg font-medium text-gray-500">No jobs found</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Try adjusting your search or filter to find what you're looking for.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </a>
                <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </a>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredData.length}</span> of{' '}
                    <span className="font-medium">{filteredData.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      1
                    </a>
                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      2
                    </a>
                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      3
                    </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add this CSS for smooth transitions
const styles = `
  .status-badge {
    transition: all 0.2s ease-in-out;
  }
  .status-badge:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .progress-bar {
    transition: width 0.6s ease;
  }
`;

// Add the styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default LiveJobStatus;
