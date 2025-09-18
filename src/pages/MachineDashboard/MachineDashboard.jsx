import React from 'react';

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
  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'down':
        return 'bg-red-500';
      case 'noPlan':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-full mx-auto">
        <h1 className="text-lg font-bold text-gray-800 mb-6 text-center">Machine Dashboard</h1>

        {/* Machine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {machines.map((machine, index) => (
            <div key={index} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
                <span className="font-semibold">{machine.cell}</span>
                <span className="font-semibold">{machine.machine}</span>
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-600">Part</p>
                  <p className="font-medium text-gray-800">{machine.part}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Planned</p>
                    <p className="font-medium text-gray-800">{machine.planned}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Target</p>
                    <p className="font-medium text-gray-800">{machine.target}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Actual</p>
                    <p className="font-medium text-gray-800">{machine.actual}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">% Eff.</p>
                    <p className="font-medium text-gray-800">{machine.efficiency}%</p>
                  </div>
                </div>
                <div className={`h-2 rounded-full ${getStatusColor(machine.status)}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">RUNNING</span>
              <span className="text-2xl font-bold text-green-600">{summaryData.running}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">DOWN</span>
              <span className="text-2xl font-bold text-red-600">{summaryData.down}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">NO PLAN</span>
              <span className="text-2xl font-bold text-gray-600">{summaryData.noPlan}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">MOULD CHNG.</span>
              <span className="text-2xl font-bold text-yellow-600">{summaryData.mouldChanges}</span>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center">
          <span className="text-lg font-medium text-gray-800">{summaryData.dateTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MachineDashboard;
