import React, { useState } from 'react';
import { 
  HomeIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChartPieIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', count: null },
    { icon: ChartBarIcon, label: 'Analytics', count: null },
    { icon: ShoppingCartIcon, label: 'Sales', count: 12 },
    { icon: UserGroupIcon, label: 'Users', count: 245 },
    { icon: CurrencyDollarIcon, label: 'Revenue', count: null },
    { icon: ChartPieIcon, label: 'Reports', count: 8 },
    { icon: BellIcon, label: 'Notifications', count: 3 },
    { icon: CogIcon, label: 'Settings', count: null },
  ];

  return (
    <div className={`bg-blue-50 h-screen shadow-sm border-r border-blue-200 transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-52'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-blue-200 bg-white">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded shadow-sm"></div>
              <span className="text-lg font-semibold text-blue-800">Analytics</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-blue-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-4 w-4 text-blue-500" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4 text-blue-500" />
            )}
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-3 px-3">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
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
                  {!isCollapsed && (
                    <span className="truncate text-xs font-medium">{item.label}</span>
                  )}
                </div>
                

                {!isCollapsed && item.count && (
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    activeItem === item.label
                      ? 'bg-white text-blue-800 shadow-sm'
                      : 'bg-blue-200 text-blue-700'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="invisible group-hover:visible absolute left-12 top-0 bg-blue-700 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Quick Actions Section */}
      {!isCollapsed && (
        <div className="mt-6 px-3">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider px-3 mb-2">
            Quick Actions
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center px-3 py-2 text-xs text-blue-600 bg-transparent rounded-lg hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm transition-all duration-200">
              <span>+ New Report</span>
            </button>
            <button className="w-full flex items-center px-3 py-2 text-xs text-blue-600 bg-transparent rounded-lg hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm transition-all duration-200">
              <span>Export Data</span>
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default Sidebar;
