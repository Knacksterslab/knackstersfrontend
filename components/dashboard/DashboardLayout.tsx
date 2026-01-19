'use client'

import React, { useState } from 'react'
import RoleGuard from '@/components/auth/RoleGuard'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MinutesOverview from './MinutesOverview'
import TaskSummary from './TaskSummary'
import AccountManager from './AccountManager'
import BillingSummary from './BillingSummary'
import PlanSelection from './PlanSelection'
import UpcomingMeeting from './UpcomingMeeting'
import NotificationCenter from './NotificationCenter'
import DashboardFooter from './DashboardFooter'
import NewUserTip, { NewUserTipCompact } from './NewUserTip'
import { Menu } from 'lucide-react'
import { useDashboard } from '@/hooks/useDashboard'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data, loading, error, refresh } = useDashboard()

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error || 'Failed to load dashboard'}</p>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <RoleGuard allowedRoles={['client']}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
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

            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  Welcome back{data.user.fullName ? `, ${data.user.firstName || data.user.fullName}` : ''}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button 
                  data-action="request-task"
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                    <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm sm:text-base">Request New Task</span>
                </button>
                {/* Tip for Request Task button */}
                <div className="sm:min-w-[300px]">
                  <NewUserTipCompact tipId="request-task" variant="tip">
                    Click here to request work from expert Knacksters matched to your needs.
                  </NewUserTipCompact>
                </div>
              </div>
            </div>

            {/* Minutes Overview */}
            <MinutesOverview hoursBalance={data.hoursBalance} />

            {/* Tip for Hours Overview */}
            {data.hoursBalance && (
              <NewUserTip tipId="hours-overview" title="Track Your Hours" variant="info">
                Monitor your monthly hour usage here. Hours reset each billing cycle, and you can purchase additional hours anytime.
              </NewUserTip>
            )}

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Left Column - Tasks and Billing/Plans */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tip for Tasks */}
                <NewUserTip tipId="task-summary" title="Your Active Tasks" variant="info">
                  Active tasks show real-time progress. Click any task to view details, communicate with your Knackster, and track time logs.
                </NewUserTip>
                
                <TaskSummary tasks={data.recentTasks} />
                {/* Show PlanSelection if no subscription, otherwise show BillingSummary */}
                {!data.subscription ? (
                  <PlanSelection />
                ) : (
                  <BillingSummary subscription={data.subscription} />
                )}
              </div>

              {/* Right Column - Meeting, Account Manager and Notifications */}
              <div className="space-y-6">
                {/* Show upcoming meeting if exists */}
                <UpcomingMeeting 
                  meeting={data.upcomingMeeting || null} 
                  accountManager={data.accountManager || null} 
                />
                
                {/* Tip for Account Manager */}
                {data.accountManager && (
                  <NewUserTip tipId="account-manager" title="Your Dedicated Support" variant="success">
                    Your account manager coordinates all experts, ensures quality delivery, and keeps your projects on track. Reach out anytime!
                  </NewUserTip>
                )}
                
                <AccountManager accountManager={data.accountManager} />
                
                {/* Tip for Notifications */}
                <NewUserTip tipId="notifications" title="Stay Updated" variant="info">
                  We'll notify you about task progress, meetings, billing changes, and important account activities.
                </NewUserTip>
                
                <NotificationCenter notifications={data.notifications} onRefresh={refresh} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <DashboardFooter />
        </main>
      </div>
    </div>
    </RoleGuard>
  )
}

