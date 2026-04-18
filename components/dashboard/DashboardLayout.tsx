'use client';

import React, { useState } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MinutesOverview from './MinutesOverview';
import RequestSummary from './RequestSummary';
import AccountManager from './AccountManager';
import BillingSummary from './BillingSummary';
import PlanSelection from './PlanSelection';
import UpcomingMeeting from './UpcomingMeeting';
import NotificationCenter from './NotificationCenter';
import DashboardFooter from './DashboardFooter';
import NewUserTip, { NewUserTipCompact } from './NewUserTip';
import RequestTaskModal from './RequestTaskModal';
import { Menu, Calendar, X } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { useRouter } from 'next/navigation';
import CalBookingModal from '@/components/shared/CalBookingModal';

export default function DashboardLayout() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRequestTaskModal, setShowRequestTaskModal] = useState(false);
  const [bookingBannerDismissed, setBookingBannerDismissed] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { data, loading, error, refresh } = useDashboard();

  const isFirstBooking = (data?.totalMeetingCount ?? 0) === 0;

  const getTipMessage = () => {
    if (data?.subscription?.status === 'ACTIVE') {
      return 'Click here to request work from expert Knacksters matched to your needs.';
    }
    if (data?.upcomingMeeting) {
      return "Your strategy call is scheduled. We'll help you choose the right plan and get started.";
    }
    return 'Schedule a call with your Customer Success Manager to choose a plan and activate your subscription.';
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

                {/* Booking CTA banner — shown when client has no meeting booked yet */}
                {!data.upcomingMeeting && !bookingBannerDismissed && (
                  <div className="mb-6 flex items-start gap-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl px-5 py-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {isFirstBooking ? 'Book your free onboarding call' : 'Book a strategy call'}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isFirstBooking
                          ? 'Schedule a 15-min call with your Customer Success Manager to get started.'
                          : 'Schedule a call with your Customer Success Manager to discuss your projects.'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setShowBookingModal(true)}
                        className="px-4 py-1.5 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                      >
                        Book now
                      </button>
                      <button
                        onClick={() => setBookingBannerDismissed(true)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Dismiss"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

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
                  {data.subscription?.status === 'ACTIVE' && (
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <button 
                        data-action="request-task"
                        onClick={() => setShowRequestTaskModal(true)}
                        className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                          <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-sm sm:text-base">Request New Task</span>
                      </button>
                      <div className="sm:min-w-[300px]">
                        <NewUserTipCompact tipId="request-task" variant="tip">
                          {getTipMessage()}
                        </NewUserTipCompact>
                      </div>
                    </div>
                  )}
                </div>

                {data.subscription?.status === 'ACTIVE' && (
                  <>
                    <MinutesOverview hoursBalance={data.hoursBalance} />
                    {data.hoursBalance && (
                      <NewUserTip tipId="hours-overview" title="Track Your Hours" variant="info">
                        Monitor your monthly hour usage here. Hours reset each billing cycle, and you can purchase additional hours anytime.
                      </NewUserTip>
                    )}
                  </>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                  <div className="lg:col-span-2 space-y-6">
                    <NewUserTip tipId="task-summary" title="Your Active Tasks" variant="info">
                      Active tasks show real-time progress. Click any task to view details, communicate with your Knackster, and track time logs.
                    </NewUserTip>
                    
                    <RequestSummary 
                      projects={data.recentProjects} 
                      hasActiveSubscription={data.subscription?.status === 'ACTIVE'}
                    />
                    
                    {!data.subscription ? (
                      <PlanSelection 
                        onSubscriptionComplete={refresh} 
                        hasUpcomingMeeting={!!data.upcomingMeeting}
                        onScheduleCall={() => setShowBookingModal(true)}
                      />
                    ) : (
                      <BillingSummary subscription={data.subscription} />
                    )}
                  </div>

                  <div className="space-y-6">
                    <UpcomingMeeting 
                      meeting={data.upcomingMeeting || null}
                      onRefresh={refresh}
                    />
                    
                    {data.accountManager && (
                      <>
                        <AccountManager accountManager={data.accountManager} />
                        <NewUserTip tipId="account-manager" title="Your Dedicated Support" variant="success">
                          Your Customer Success Manager coordinates all experts, ensures quality delivery, and keeps your projects on track. Reach out anytime!
                        </NewUserTip>
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

        <RequestTaskModal
          isOpen={showRequestTaskModal}
          onClose={() => setShowRequestTaskModal(false)}
          onSuccess={refresh}
        />

        <CalBookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          calUrl={process.env.NEXT_PUBLIC_CAL_CLIENT_URL || ''}
          title={isFirstBooking ? 'Book Your Onboarding Call' : 'Book a Strategy Call'}
          mode="book"
          prefillName={data?.user?.fullName || ''}
          prefillEmail={data?.user?.email || ''}
          onBookingComplete={() => {
            setShowBookingModal(false);
            setBookingBannerDismissed(true);
            refresh();
          }}
        />
      </>
    </RoleGuard>
  );
}


