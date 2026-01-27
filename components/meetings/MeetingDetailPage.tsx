'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, User, ArrowLeft, Video, Mail } from 'lucide-react'
import { meetingsApi } from '@/lib/api/client'
import CalBookingModal from '../shared/CalBookingModal'
import CancelBookingDialog from '../shared/CancelBookingDialog'

interface MeetingDetailPageProps {
  meetingId: string
}

export default function MeetingDetailPage({ meetingId }: MeetingDetailPageProps) {
  const router = useRouter()
  const [meeting, setMeeting] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  useEffect(() => {
    fetchMeeting()
  }, [meetingId])

  const fetchMeeting = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await meetingsApi.getById(meetingId)
      if (response.success && response.data) {
        setMeeting(response.data)
      } else {
        setError('Meeting not found')
      }
    } catch (error: any) {
      console.error('Failed to fetch meeting:', error)
      setError(error.message || 'Failed to load meeting details')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelMeeting = async () => {
    if (!meeting?.id) return

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${API_URL}/api/client/meetings/${meeting.id}/cancel`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        router.push('/meetings') // Navigate back to list
      } else {
        console.error('Failed to cancel meeting')
        alert('Failed to cancel meeting. Please try again.')
      }
    } catch (error) {
      console.error('Error cancelling meeting:', error)
      alert('An error occurred while cancelling the meeting.')
    }
  }

  const handleBookingComplete = () => {
    setShowRescheduleModal(false)
    fetchMeeting() // Refresh meeting details
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'SCHEDULED': 'bg-blue-50 text-blue-700 border-blue-200',
      'COMPLETED': 'bg-green-50 text-green-700 border-green-200',
      'CANCELLED': 'bg-red-50 text-red-700 border-red-200',
      'RESCHEDULED': 'bg-orange-50 text-orange-700 border-orange-200'
    }
    return styles[status] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9634]"></div>
      </div>
    )
  }

  if (error || !meeting) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} className="text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Meeting Not Found</h1>
          <p className="text-sm text-gray-600 mb-6">{error || 'The meeting you are looking for does not exist or you do not have access to it.'}</p>
          <button
            onClick={() => router.push('/meetings')}
            className="px-6 py-2.5 bg-[#FF9634] text-white font-semibold rounded-lg hover:bg-[#E88530] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Meetings
          </button>
        </div>
      </div>
    )
  }

  const meetingDate = new Date(meeting.scheduledAt)
  const isUpcoming = meetingDate >= new Date()
  const isPast = meetingDate < new Date()
  const isToday = new Date().toDateString() === meetingDate.toDateString()

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/meetings')}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Meetings
        </button>

        {/* Meeting Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 border-b border-orange-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{meeting.title || 'Meeting'}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(meeting.status)}`}>
                    {meeting.status}
                  </span>
                  {isToday && meeting.status === 'SCHEDULED' && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-xs font-semibold text-green-700">Today</span>
                    </span>
                  )}
                </div>
                {meeting.description && (
                  <p className="text-sm text-gray-600">{meeting.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Meeting Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Date & Time */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Date</p>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(meeting.scheduledAt)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Time & Duration</p>
                    <p className="text-sm font-semibold text-gray-900">{formatTime(meeting.scheduledAt)}</p>
                    <p className="text-xs text-gray-600">{meeting.durationMinutes} minutes</p>
                  </div>
                </div>
              </div>

              {/* Account Manager */}
              {meeting.accountManager && (
                <div className="flex items-start gap-3">
                  <img
                    src={meeting.accountManager.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${meeting.accountManager.email || meeting.accountManager.fullName}`}
                    alt={meeting.accountManager.fullName}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0 bg-gray-100"
                  />
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Account Manager</p>
                    <p className="text-sm font-semibold text-gray-900">{meeting.accountManager.fullName}</p>
                    <p className="text-xs text-gray-600">{meeting.accountManager.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Meeting Link Info */}
            {meeting.status === 'SCHEDULED' && isUpcoming && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Meeting Link</p>
                    <p className="text-xs text-gray-600">
                      The video meeting link has been sent to your email. Please check your inbox for meeting details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {meeting.notes && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6">
                <p className="text-xs font-medium text-gray-500 mb-2">Notes</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{meeting.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => router.push('/meetings')}
                className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Back to All Meetings
              </button>

              {meeting.status === 'SCHEDULED' && isUpcoming && (
                <>
                  <button
                    onClick={() => setShowRescheduleModal(true)}
                    className="flex-1 px-6 py-3 bg-white border border-orange-300 rounded-lg text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Reschedule
                  </button>
                  <button
                    onClick={() => setShowCancelDialog(true)}
                    className="flex-1 px-6 py-3 bg-white border border-red-300 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    Cancel Meeting
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      <CalBookingModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        calUrl={process.env.NEXT_PUBLIC_CAL_CLIENT_URL || ''}
        title="Reschedule Your Meeting"
        mode="reschedule"
        existingBookingUid={meeting.bookingId}
        onBookingComplete={handleBookingComplete}
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
