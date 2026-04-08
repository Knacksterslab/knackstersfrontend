'use client'

import React, { useState, ReactNode } from 'react'
import RoleGuard from '@/components/auth/RoleGuard'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import DashboardFooter from './DashboardFooter'
import { Menu } from 'lucide-react'

interface ClientPageWrapperProps {
  children: ReactNode
}

/**
 * Shared layout shell for standalone client pages (profile, settings, etc.)
 * Provides the same sidebar + topbar as the main client dashboard.
 */
export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mb-4 p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-gray-600" />
              </button>

              {children}
            </div>

            <DashboardFooter />
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
