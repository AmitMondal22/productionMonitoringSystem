import React from 'react';
import { FiAlertCircle, FiClock, FiBarChart2, FiPieChart, FiUsers, FiGrid, FiSettings, FiEye, FiFileText } from 'react-icons/fi';

// Sample data for OEE, M/C Status, and Alerts
const oeeData = {
  value: 0,
  availability: 88.43,
  performance: 0,
  quality: 0,
};

const mcStatusData = {
  running: 19,
  stopped: 103,
  notPlanned: 26,
};

const alertsData = [
  { time: '03-05-2020;18:20:34', machine: 'IMH173', message: 'down for past 4 hours!' },
  { time: '03-05-2020;18:16:18', machine: 'IMH172', message: 'down for past 4 hours!' },
  { time: '03-05-2020;18:07:03', machine: 'IMH171', message: 'down for past 4 hours!' },
  { time: '03-05-2020;18:00:47', machine: 'IMH170', message: 'down for past 4 hours!' },
  { time: '03-05-2020;18:00:31', machine: 'IMH169', message: 'down for past 4 hours!' },
];

// Sample data for charts (Downtime and Rejection Analysis)
const downtimeWeeklyData = {
  labels: ['0M', '400M', '800M'],
  values: [100, 150, 80],
};

const rejectionWeeklyData = {
  labels: ['IMH001', 'IMH002', 'IMH003', 'IMH004', 'IMH005'],
  values: [10, 20, 15, 25, 30],
};

const MachineStatusDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Machine Status & Analytics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* OEE Gauge */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiPieChart className="text-indigo-600" /> OEE
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-24">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  {/* Gauge background */}
                  <path d="M10,45 A40,40 0 0,1 90,45" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  {/* Gauge fill */}
                  <path
                    d="M10,45 A40,40 0 0,1 90,45"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                    style={{ strokeDashoffset: `calc(1000 - (1000 * ${oeeData.value}) / 100)` }}
                  />
                  {/* Gauge center */}
                  <circle cx="50" cy="45" r="4" fill="#10b981" />
                </svg>
              </div>
            </div>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{oeeData.availability}%</p>
                <p className="text-xs text-gray-500">A</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{oeeData.performance}%</p>
                <p className="text-xs text-gray-500">P</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{oeeData.quality}%</p>
                <p className="text-xs text-gray-500">Q</p>
              </div>
            </div>
          </div>

          {/* M/C Status */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiClock className="text-indigo-600" /> M/C Status
            </h2>
            <div className="flex justify-around mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{mcStatusData.running}</p>
                <p className="text-xs text-gray-500">Running</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{mcStatusData.stopped}</p>
                <p className="text-xs text-gray-500">Stopped</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">{mcStatusData.notPlanned}</p>
                <p className="text-xs text-gray-500">Not Planned</p>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiAlertCircle className="text-indigo-600" /> Alerts
            </h2>
            <div className="h-40 overflow-y-auto">
              {alertsData.map((alert, index) => (
                <div key={index} className="p-2 mb-2 bg-red-50 rounded text-sm text-red-700">
                  <p>{alert.time} <span className="font-medium">{alert.machine}</span> {alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Downtime Weekly Analysis */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-indigo-600" /> Downtime Weekly Analysis
            </h2>
            <div className="h-40 flex items-end gap-2">
              {downtimeWeeklyData.values.map((value, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${value}px` }}
                  ></div>
                  <p className="text-xs text-gray-600 mt-1">{downtimeWeeklyData.labels[index]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rejection Weekly Analysis */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-indigo-600" /> Rejection Weekly Analysis
            </h2>
            <div className="h-40 flex items-end gap-2">
              {rejectionWeeklyData.values.map((value, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${value * 4}px` }}
                  ></div>
                  <p className="text-xs text-gray-600 mt-1">{rejectionWeeklyData.labels[index]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FiGrid className="text-indigo-600" /> Quick Links
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: 'Users', icon: <FiUsers className="text-indigo-600" /> },
              { name: 'Applications', icon: <FiGrid className="text-indigo-600" /> },
              { name: 'Provision', icon: <FiSettings className="text-indigo-600" /> },
              { name: 'Reports', icon: <FiFileText className="text-indigo-600" /> },
              { name: 'Auditing', icon: <FiEye className="text-indigo-600" /> },
              { name: 'Machine Dashboard', icon: <FiBarChart2 className="text-indigo-600" /> },
            ].map((link, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 cursor-pointer"
              >
                <div className="text-xl mb-1">{link.icon}</div>
                <p className="text-xs text-gray-700">{link.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineStatusDashboard;
