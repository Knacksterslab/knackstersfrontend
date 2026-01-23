'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, MessageCircle, Clock } from 'lucide-react'
import CalBookingModal, { BookingDetails } from '../shared/CalBookingModal'
import CancelBookingDialog from '../shared/CancelBookingDialog'

interface UpcomingMeetingProps {
  meeting: {
    id: string
    scheduledAt: Date
    durationMinutes: number
    videoRoomUrl?: string | null
    title?: string
    description?: string | null
    bookingId?: string
  } | null
  accountManager?: {
    fullName: string
    email: string
    avatarUrl?: string | null
  } | null
}

export default function UpcomingMeeting({ meeting, accountManager }: UpcomingMeetingProps) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const handleBookingComplete = (details: BookingDetails) => {
    setShowModal(false)
    // Refresh dashboard data to show new meeting
    router.refresh()
  }

  const handleCancelMeeting = async () => {
    if (!meeting?.bookingId) return

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/client/meetings/${meeting.bookingId}/cancel`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        router.refresh() // Refresh to remove meeting from UI
      } else {
        console.error('Failed to cancel meeting')
        alert('Failed to cancel meeting. Please try again.')
      }
    } catch (error) {
      console.error('Error cancelling meeting:', error)
      alert('An error occurred while cancelling the meeting.')
    }
  }

  if (!meeting) {
    // No meeting scheduled - prompt to schedule
    return (
      <>
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Strategy Call</h2>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          </div>

          <div className="p-4">
            {accountManager && (
              <div className="flex gap-3 mb-4">
                <img
                  src={accountManager.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${accountManager.email || accountManager.fullName}`}
                  alt={accountManager.fullName}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 bg-gray-100"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{accountManager.fullName}</h3>
                  <p className="text-xs text-gray-500 mb-1">Account Manager</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-gray-600">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} local time</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-600 font-medium">Available now</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Schedule a 15-minute strategy call to discuss your needs, choose the right plan, and activate your subscription. Your account manager will help match you with the perfect experts.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                <span>Schedule Call</span>
              </button>
              <button
                onClick={() => {
                  window.location.href = '/support'
                }}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <CalBookingModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          calUrl={process.env.NEXT_PUBLIC_CAL_CLIENT_URL || ''}
          title="Schedule Your Strategy Call"
          mode="book"
          onBookingComplete={handleBookingComplete}
        />
      </>
    )
  }

  const meetingDate = new Date(meeting.scheduledAt)
  const isToday = new Date().toDateString() === meetingDate.toDateString()
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Strategy Call</h2>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>

        <div className="p-4">
          {accountManager && (
            <div className="flex gap-3 mb-4">
              <img
                src={accountManager.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${accountManager.email || accountManager.fullName}`}
                alt={accountManager.fullName}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0 bg-gray-100"
              />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{accountManager.fullName}</h3>
                <p className="text-xs text-gray-500 mb-1">Account Manager</p>
                <div className="flex items-center gap-2 text-xs">
                  <Clock size={12} className="text-gray-400" />
                  <span className="text-gray-600">{formatTime(meetingDate)}</span>
                  {isToday && (
                    <span className="flex items-center gap-1 ml-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-600 font-medium">Today</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Strategy Call: {formatDate(meetingDate)}
                </p>
                <p className="text-xs text-gray-600">
                  {formatTime(meetingDate)} • {meeting.durationMinutes} min
                </p>
                {meeting.videoRoomUrl && (
                  <a
                    href={meeting.videoRoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 underline mt-2 inline-block"
                  >
                    Join Meeting
                  </a>
                )}
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

          {meeting.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {meeting.description}
            </p>
          )}
        </div>
      </div>

      {/* Booking/Reschedule Modal */}
      <CalBookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        calUrl={process.env.NEXT_PUBLIC_CAL_CLIENT_URL || ''}
        title="Reschedule Your Strategy Call"
        mode="reschedule"
        existingBookingUid={meeting.bookingId}
        onBookingComplete={handleBookingComplete}
      />

      {/* Cancel Dialog */}
      <CancelBookingDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        bookingDetails={meeting.bookingId ? {
          startTime: meeting.scheduledAt.toISOString(),
          bookingId: meeting.bookingId
        } : null}
        onConfirmCancel={handleCancelMeeting}
      />
    </>
  )
}
