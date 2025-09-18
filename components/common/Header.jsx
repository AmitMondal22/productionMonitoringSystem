import React, { useState } from 'react';
import { 
  UserCircleIcon, 
  Cog6ToothIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-3 py-2 sticky top-0 z-40">
      <div className="flex items-center justify-between h-11">
        
        {/* Left Side - Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {sidebarOpen ? (
            <Bars3Icon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>

        {/* Right Side - Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-semibold">JS</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-gray-900 leading-tight">John Smith</p>
              <p className="text-[10px] text-gray-500 leading-tight">Production Manager</p>
            </div>
            <ChevronDownIcon 
              className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {isProfileOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsProfileOpen(false)}
              ></div>
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">John Smith</p>
                  <p className="text-xs text-gray-500">john.smith@company.com</p>
                  <p className="text-xs text-blue-600 font-medium">Production Manager</p>
                </div>
                <div className="py-1">
                  <a href="#" className="flex items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    <UserCircleIcon className="h-4 w-4 mr-2" />
                    View Profile
                  </a>
                  <a href="#" className="flex items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    <Cog6ToothIcon className="h-4 w-4 mr-2" />
                    Account Settings
                  </a>
                  <a href="#" className="flex items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    Help & Support
                  </a>
                </div>
                <div className="border-t border-gray-100 pt-1">
                  <a href="#" className="block px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    Sign Out
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
