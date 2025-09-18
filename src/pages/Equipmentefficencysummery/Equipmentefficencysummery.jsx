import React, { useState } from 'react';
import { Search, Calendar, BarChart3, Filter } from 'lucide-react';

function EquipmentEfficiencySummary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(100);

  // Sample data based on the screenshot
  const equipmentData = [
    { srNo: 1, machine: 'IMH001', runTime: '06:15:59', downTime: '11:59:59', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 2, machine: 'IMH006', runTime: '06:15:59', downTime: '11:59:59', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 3, machine: 'IMH008', runTime: '06:15:59', downTime: '11:59:59', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 4, machine: 'IMH009', runTime: '06:15:55', downTime: '11:59:59', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 5, machine: 'IMH011', runTime: '06:15:59', downTime: '11:59:59', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 6, machine: 'IMH012', runTime: '06:15:59', downTime: '11:59:59', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 7, machine: 'IMH013', runTime: '06:15:59', downTime: '11:59:59', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 8, machine: 'IMH014', runTime: '06:15:58', downTime: '12:00:00', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 9, machine: 'IMH015', runTime: '06:15:58', downTime: '12:00:00', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
    { srNo: 10, machine: 'IMH020', runTime: '06:15:59', downTime: '11:59:59', avlTimeEff: 34.31, prodEff: 0, qualityEff: 0, oee: '-' },
  ];

  const filteredData = equipmentData.filter(item =>
    item.machine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Equipment Efficiency Report</h3>
                  <p className="text-gray-500 text-sm">Track and analyze equipment performance metrics</p>
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
          <div className="p-4 md:p-6 bg-white/80 backdrop-blur-sm border-t border-gray-100">
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
              </div>

              {/* Search */}
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search machines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
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
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Run Time</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Down Time</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Avl Time Eff %</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Prod Eff %</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Quality Eff %</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">OEE %</th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                          {row.runTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                          {row.downTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                            {row.avlTimeEff}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            {row.prodEff}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            {row.qualityEff}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            {row.oee}
                          </span>
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
                <span className="font-medium">{equipmentData.length}</span> entries
                {searchTerm && (
                  <span className="ml-2 text-gray-500">
                    (filtered from {equipmentData.length} total entries)
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

export default EquipmentEfficiencySummary;