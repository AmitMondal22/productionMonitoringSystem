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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6">

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="text-white w-8 h-8" />
                <h1 className="text-2xl font-bold text-white">Equipment Efficiency Report</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Calendar className="text-white w-5 h-5" />
                  <span className="text-white font-medium">May 3, 2020 - May 3, 2020</span>
                </div>
                <Filter className="text-white w-6 h-6 hover:text-blue-200 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-600">Show</label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <label className="text-sm font-medium text-gray-600">entries</label>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search machines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                />
              </div>
            </div>
          </div>
        </div> */}



        <div className="bg-white rounded-lg shadow mb-6 border">
  {/* Top Bar */}
  <div className="bg-blue-50 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <BarChart3 className="text-blue-600 w-6 h-6" />
      <h3 className="text-xl font-semibold text-gray-700">
        Equipment Efficiency Report
      </h3>
    </div>

    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 text-blue-700">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">May 3, 2020 – May 3, 2020</span>
      </div>
      <Filter className="w-5 h-5 text-blue-600 hover:text-blue-700 cursor-pointer" />
    </div>
  </div>

  {/* Controls */}
  <div className="px-6 py-4 border-t flex items-center justify-between bg-blue-50/30">
    <div className="flex items-center space-x-2">
      <label className="text-sm text-blue-700">Show</label>
      <select
        value={entriesPerPage}
        onChange={(e) => setEntriesPerPage(Number(e.target.value))}
        className="px-2 py-1 border border-blue-200 rounded text-sm text-blue-800 focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <span className="text-sm text-blue-700">entries</span>
    </div>

    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search machines..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8 pr-3 py-1.5 border border-blue-200 rounded text-sm text-blue-800 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 w-56 placeholder-blue-300"
      />
    </div>
  </div>
</div>



        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Sr. No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Machine</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Run Time (hh:mm:ss)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Down Time (hh:mm:ss)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Avl Time Eff %</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Prod Eff %</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Quality Eff %</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">OEE %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((row, index) => (
                  <tr 
                    key={row.srNo} 
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.srNo}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{row.machine}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">{row.runTime}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">{row.downTime}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {row.avlTimeEff}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {row.prodEff}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {row.qualityEff}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {row.oee}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing {filteredData.length} of {equipmentData.length} entries</span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white">1</span>
                <button className="px-3 py-1 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
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