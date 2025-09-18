import React, { useState } from 'react';
import { 
  HomeIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartPieIcon,
  BellIcon,
  PlayIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', count: null },
    { icon: PlayIcon, label: 'Production Plan', count: 5 },
    { icon: CpuChipIcon, label: 'Machines', count: 12 },
    { icon: ChartBarIcon, label: 'OEE Analytics', count: null },
    { icon: ClockIcon, label: 'Downtime', count: 3 },
    { icon: ExclamationTriangleIcon, label: 'Alerts', count: 7 },
    { icon: ChartPieIcon, label: 'Reports', count: null },
    { icon: WrenchScrewdriverIcon, label: 'Master Data', count: null },
    { icon: BellIcon, label: 'Notifications', count: 4 },
    { icon: CogIcon, label: 'Settings', count: null },
  ];

  return (
    <div className="bg-blue-50 h-screen w-52 shadow-sm border-r border-blue-200 transition-all duration-300">
      {/* Logo */}
      <div className="p-4 border-b border-blue-200 bg-white">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded shadow-sm"></div>
          <span className="text-lg font-semibold text-blue-800">ProdMonitor</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-3 px-3 space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveItem(item.label)}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeItem === item.label
                ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 border border-gray-400'
                : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className={`h-4 w-4 ${
                activeItem === item.label 
                  ? 'text-blue-700' 
                  : 'text-blue-500 group-hover:text-blue-600'
              }`} />
              <span className="truncate text-xs font-medium">{item.label}</span>
            </div>

            {item.count && (
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                activeItem === item.label
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'bg-blue-200 text-blue-700'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
