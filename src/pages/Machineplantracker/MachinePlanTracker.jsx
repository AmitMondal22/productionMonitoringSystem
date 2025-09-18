import React, { useState } from 'react';

// Sample data for the machine plan tracker
const machineData = [
  { srNo: 1, machine: 'IMH001', planInProgress: 'Union Nut [Greenfit] 25mm (1/50000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 2, machine: 'IMH006', planInProgress: 'Female Thr. Adaptor [PN25][Greenfit] 32mm x 1/2" (1/150000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 3, machine: 'IMH008', planInProgress: 'Reducer [PN25][Greenfit] 32mm x 25mm (1/80000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 4, machine: 'IMH009', planInProgress: 'Male Threaded Adaptor [PN25][Greenfit] 40mm x 11/4" (1/60000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 5, machine: 'IMH011', planInProgress: 'Multi Floor Trap [ULTRAFIT] 4" (1/960000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 6, machine: 'IMH012', planInProgress: 'Union Body [Easy Fit] Sch 80 25mm (1/2/150000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 7, machine: 'IMH013', planInProgress: 'Elbow 45 deg [Easy Fit] Sch 80 25mm (1/60000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 8, machine: 'IMH014', planInProgress: 'End Body D/S [Royal-SJ Type] 50mm [WI/P] (1/150000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 9, machine: 'IMH015', planInProgress: 'End Cap [Easy Fit] Sch 80 50mm (2/30000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 10, machine: 'IMH020', planInProgress: 'Outlet for Nahani Trap [ULTRAFIT][ISI] 75mm Cav - 09 to 10/250000', plansInQueue: ['', '', '', '', ''] },
  { srNo: 11, machine: 'IMH022', planInProgress: 'Reducer [ULTRAFIT] [ISI-R Type] 110mm x 75mm (Collapsible) Cav - 03 to 04/150000', plansInQueue: ['', '', '', '', ''] },
  { srNo: 12, machine: 'IMH023', planInProgress: 'MTA [Easyfit] Sch 80 [Insert Type] 32mm 1/4" (4 cavity/60000)', plansInQueue: ['', '', '', '', ''] },
  { srNo: 13, machine: 'IMH024', planInProgress: 'Bend 87.5 deg [ULTRAFIT] [ISI-R Type] 75mm (Collapsible) Cav: 23 to 26/250000', plansInQueue: ['', '', '', '', ''] },
];

const MachinePlanTracker = () => {
  const [dateTime] = useState('May 03, 2020 06:15:36 PM');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Machine Plan Tracker</h3>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">View Plan</label>
            <select
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
              defaultValue="current"
            >
              <option value="current">Current Plan</option>
              <option value="previous">Previous Plan</option>
              <option value="next">Next Plan</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">{dateTime}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr.No.</th>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine</th>
                  <th rowSpan="2" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan In Progress (Part Name/Qty)</th>
                  <th colSpan="5" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Plans In Queue (Part Name/Qty)</th>
                </tr>
                <tr>
                  {Array.from({ length: 5 }, (_, i) => (
                    <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan {i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {machineData.map((machine, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{machine.srNo}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{machine.machine}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{machine.planInProgress}</td>
                    {machine.plansInQueue.map((plan, i) => (
                      <td key={i} className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                        {plan ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachinePlanTracker;
