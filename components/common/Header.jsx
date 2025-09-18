import React, { useState } from 'react';
import { 
  BellIcon, 
  UserCircleIcon, 
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-300 px-4 py-2 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Left Side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
            <h1 className="text-lg font-bold text-black">Analytics Pro</h1>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-blue-700 font-medium border-b-2 border-blue-600 pb-1 text-sm">
              Dashboard
            </a>
            <a href="#" className="text-black hover:text-blue-700 transition-colors text-sm">
              Analytics
            </a>
            <a href="#" className="text-black hover:text-blue-700 transition-colors text-sm">
              Reports
            </a>
            <a href="#" className="text-black hover:text-blue-700 transition-colors text-sm">
              Users
            </a>
          </nav>
        </div>

        {/* Center - Search */}
        <div className="hidden lg:flex flex-1 max-w-xs mx-6">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>
        
        {/* Right Side - Actions and Profile */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-1.5 text-black hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
            <BellIcon className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="p-1.5 text-black hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
            <Cog6ToothIcon className="h-4 w-4" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1.5 rounded hover:bg-blue-50 transition-colors"
            >
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">JD</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-medium text-black">John Doe</p>
                <p className="text-xs text-gray-600">Admin</p>
              </div>
              <ChevronDownIcon className="h-3 w-3 text-gray-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded shadow-lg border border-gray-300 py-1 z-50">
                <a href="#" className="block px-3 py-1.5 text-xs text-black hover:bg-blue-50">Profile</a>
                <a href="#" className="block px-3 py-1.5 text-xs text-black hover:bg-blue-50">Settings</a>
                <a href="#" className="block px-3 py-1.5 text-xs text-black hover:bg-blue-50">Help</a>
                <hr className="my-1 border-gray-200" />
                <a href="#" className="block px-3 py-1.5 text-xs text-black hover:bg-blue-50">Sign out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header
