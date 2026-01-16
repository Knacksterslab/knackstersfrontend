'use client'

import React from 'react'
import { Search, Bell, Settings } from 'lucide-react'
import ProfileDropdown from './ProfileDropdown'

export default function TopBar() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left - Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative hidden sm:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          {/* Mobile Search Button */}
          <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Search size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Right - Actions and Profile */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Notification Bell with Badge */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-semibold">
              4
            </span>
          </button>

          {/* Settings - Hidden on mobile */}
          <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg">
            <Settings size={20} className="text-gray-700" />
          </button>

          {/* User Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

