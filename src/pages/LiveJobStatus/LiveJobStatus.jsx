import React, { useState } from 'react';

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

  const filteredData = machineData.filter(
    (item) =>
      item.inspectionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ccMachine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-blue-100 text-blue-800';
      case 'IDLE':
        return 'bg-yellow-100 text-yellow-800';
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-black mb-6">CCM Machine Status</h3>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Inspection No, Machine, or Status..."
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-80"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden border border-indigo-50">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Route Card No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Inspection No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">STL Part No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Pack Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Lot Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Packed Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Defective Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Start Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">End Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">CC Machine</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-indigo-50' : 'bg-white'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.routeCardNo}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.inspectionNo}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.stlPartNo}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.packSize}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.lotQty}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.packedQty}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.defectiveQty}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.startTime}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.endTime}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-indigo-700 font-medium">{item.ccMachine}</td>
                      <td className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="px-4 py-6 text-center text-sm text-gray-500">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveJobStatus;
