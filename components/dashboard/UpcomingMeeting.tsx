'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, MessageCircle } from 'lucide-react'
import { API_URL } from '@/lib/config/env'
import CalBookingModal, { BookingDetails } from '../shared/CalBookingModal'
import CancelBookingDialog from '../shared/CancelBookingDialog'
import { useUser } from '@/contexts/UserContext'

interface UpcomingMeetingProps {
  meeting: {
    id: string
    scheduledAt: Date | string
    durationMinutes: number
    videoRoomUrl?: string | null
    title?: string
    description?: string | null
    bookingId?: string
  } | null
  onRefresh?: () => void
}

export default function UpcomingMeeting({ meeting, onRefresh }: UpcomingMeetingProps) {
  const router = useRouter()
  const { user } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const handleBookingComplete = (_details: BookingDetails) => {
    setShowModal(false)
    if (onRefresh) onRefresh();
    else router.refresh();
  }

  const handleCancelMeeting = async () => {
    if (!meeting?.bookingId) return

    try {
      const response = await fetch(`${API_URL}/api/client/meetings/${meeting.bookingId}/cancel`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        if (onRefresh) onRefresh(); else router.refresh();
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
            <h2 className="text-base font-semibold text-gray-900">Customer Success Manager Call</h2>
            <button 
              onClick={() => router.push('/meetings')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
            </button>
          </div>

          <div className="p-4">
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Schedule a call with your Customer Success Manager to discuss projects, match with experts, or get support with your subscription.
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
          prefillName={user?.fullName || ''}
          prefillEmail={user?.email || ''}
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
          <h2 className="text-base font-semibold text-gray-900">Upcoming Call</h2>
          <button 
            onClick={() => router.push('/meetings')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            View all
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {meeting.title || 'Upcoming Call'}: {formatDate(meetingDate)}
                </p>
                <p className="text-xs text-gray-600">
                  {formatTime(meetingDate)} • {meeting.durationMinutes} min
                </p>
                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Meeting link sent to your email
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
        meetingId={meeting.id}
        onBookingComplete={handleBookingComplete}
        prefillName={user?.fullName || ''}
        prefillEmail={user?.email || ''}
      />

      {/* Cancel Dialog */}
      <CancelBookingDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        bookingDetails={meeting.bookingId ? {
          startTime: typeof meeting.scheduledAt === 'string' 
            ? meeting.scheduledAt 
            : meeting.scheduledAt.toISOString(),
          bookingId: meeting.bookingId
        } : null}
        onConfirmCancel={handleCancelMeeting}
      />
    </>
  )
}
