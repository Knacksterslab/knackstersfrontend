'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import BillingContent from './BillingContent'
import DashboardFooter from '@/components/dashboard/DashboardFooter'
import { Menu } from 'lucide-react'

export default function BillingSubscriptionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Reuse TopBar */}
        <TopBar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mb-4 p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-gray-600" />
            </button>

            <BillingContent />
          </div>

          {/* Reuse Footer */}
          <DashboardFooter />
        </main>
      </div>
    </div>
  )
}

