'use client';

import React, { useState } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MinutesOverview from './MinutesOverview';
import TaskSummary from './TaskSummary';
import AccountManager from './AccountManager';
import BillingSummary from './BillingSummary';
import PlanSelection from './PlanSelection';
import UpcomingMeeting from './UpcomingMeeting';
import NotificationCenter from './NotificationCenter';
import DashboardFooter from './DashboardFooter';
import NewUserTip, { NewUserTipCompact } from './NewUserTip';
import CalBookingModal, { BookingDetails } from '../shared/CalBookingModal';
import CancelBookingDialog from '../shared/CancelBookingDialog';
import { Menu } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { data, loading, error, refresh } = useDashboard();

  const handleBookingComplete = (details: BookingDetails) => {
    setShowModal(false);
    refresh();
  };

  const handleCancelMeeting = async () => {
    if (!data?.upcomingMeeting?.bookingId) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/client/meetings/${data.upcomingMeeting.bookingId}/cancel`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        refresh();
      } else {
        console.error('Failed to cancel meeting');
        alert('Failed to cancel meeting. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling meeting:', error);
      alert('An error occurred while cancelling the meeting.');
    }
  };

  const getTipMessage = () => {
    if (data?.subscription?.status === 'ACTIVE') {
      return 'Click here to request work from expert Knacksters matched to your needs.';
    }
    if (data?.upcomingMeeting) {
      return "Your strategy call is scheduled. We'll help you choose the right plan and get started.";
    }
    return 'Schedule a call with your account manager to choose a plan and activate your subscription.';
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
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
    );
  }

  return (
    <RoleGuard allowedRoles={['client']}>
      <>
        <div className="flex h-screen bg-gray-50">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            
            <main className="flex-1 overflow-y-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden mb-4 p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
                  aria-label="Open menu"
                >
                  <Menu size={24} className="text-gray-600" />
                </button>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      Welcome{data.user.fullName ? `, ${data.user.firstName || data.user.fullName}` : ''}
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
                    {data.subscription?.status === 'ACTIVE' ? (
                      <button 
                        data-action="request-task"
                        className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                          <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-sm sm:text-base">Request New Task</span>
                      </button>
                    ) : data.upcomingMeeting ? (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">
                              Strategy Call: {new Date(data.upcomingMeeting.scheduledAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-gray-600">
                              {new Date(data.upcomingMeeting.scheduledAt).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowModal(true)}
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                            >
                              Reschedule
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => setShowCancelDialog(true)}
                              className="text-sm text-red-600 hover:text-red-700 font-medium whitespace-nowrap"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowModal(true)}
                        className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FC8838] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                          <path d="M6 2h8M6 18h8M10 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-sm sm:text-base">Schedule Strategy Call</span>
                      </button>
                    )}
                    <div className="sm:min-w-[300px]">
                      <NewUserTipCompact tipId="request-task" variant="tip">
                        {getTipMessage()}
                      </NewUserTipCompact>
                    </div>
                  </div>
                </div>

                <MinutesOverview hoursBalance={data.hoursBalance} />

                {data.hoursBalance && (
                  <NewUserTip tipId="hours-overview" title="Track Your Hours" variant="info">
                    Monitor your monthly hour usage here. Hours reset each billing cycle, and you can purchase additional hours anytime.
                  </NewUserTip>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                  <div className="lg:col-span-2 space-y-6">
                    <NewUserTip tipId="task-summary" title="Your Active Tasks" variant="info">
                      Active tasks show real-time progress. Click any task to view details, communicate with your Knackster, and track time logs.
                    </NewUserTip>
                    
                    <TaskSummary 
                      tasks={data.recentTasks} 
                      hasActiveSubscription={data.subscription?.status === 'ACTIVE'}
                      upcomingMeeting={data.upcomingMeeting}
                    />
                    
                    {!data.subscription ? (
                      <PlanSelection onSubscriptionComplete={refresh} />
                    ) : (
                      <BillingSummary subscription={data.subscription} />
                    )}
                  </div>

                  <div className="space-y-6">
                    {!data.upcomingMeeting ? (
                      <UpcomingMeeting 
                        meeting={data.upcomingMeeting || null} 
                        accountManager={data.accountManager || null}
                      />
                    ) : (
                      <>
                        <AccountManager accountManager={data.accountManager} />
                        {data.accountManager && (
                          <NewUserTip tipId="account-manager" title="Your Dedicated Support" variant="success">
                            Your account manager coordinates all experts, ensures quality delivery, and keeps your projects on track. Reach out anytime!
                          </NewUserTip>
                        )}
                      </>
                    )}
                    
                    <NewUserTip tipId="notifications" title="Stay Updated" variant="info">
                      We'll notify you about task progress, meetings, billing changes, and important account activities.
                    </NewUserTip>
                    
                    <NotificationCenter notifications={data.notifications} onRefresh={refresh} />
                  </div>
                </div>
              </div>
            </main>
            
            <DashboardFooter />
          </div>
        </div>

        <CalBookingModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          calUrl={process.env.NEXT_PUBLIC_CAL_CLIENT_URL || ''}
          title={data.upcomingMeeting ? "Reschedule Your Strategy Call" : "Schedule Your Strategy Call"}
          mode={data.upcomingMeeting ? 'reschedule' : 'book'}
          existingBookingUid={data.upcomingMeeting?.bookingId}
          onBookingComplete={handleBookingComplete}
        />

        <CancelBookingDialog
          isOpen={showCancelDialog}
          onClose={() => setShowCancelDialog(false)}
          bookingDetails={data.upcomingMeeting && data.upcomingMeeting.bookingId ? {
            startTime: new Date(data.upcomingMeeting.scheduledAt).toISOString(),
            bookingId: data.upcomingMeeting.bookingId
          } : null}
          onConfirmCancel={handleCancelMeeting}
        />
      </>
    </RoleGuard>
  );
}


