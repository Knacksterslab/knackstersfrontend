'use client'

import React from 'react'
import { Calendar, MessageCircle, Clock } from 'lucide-react'

interface UpcomingMeetingProps {
  meeting: {
    id: string
    scheduledAt: Date
    durationMinutes: number
    videoRoomUrl?: string | null
    title?: string
    description?: string | null
  } | null
  accountManager?: {
    fullName: string
    email: string
    avatarUrl?: string | null
  } | null
}

export default function UpcomingMeeting({ meeting, accountManager }: UpcomingMeetingProps) {
  if (!meeting) {
    // No meeting scheduled - prompt to schedule
    return (
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
              {accountManager.avatarUrl ? (
                <img
                  src={accountManager.avatarUrl}
                  alt={accountManager.fullName}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-bold text-xl">
                    {accountManager.fullName.charAt(0)}
                  </span>
                </div>
              )}
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
              onClick={() => {
                const calUrl = process.env.NEXT_PUBLIC_CAL_CLIENT_URL
                if (calUrl) {
                  window.open(calUrl, '_blank', 'noopener,noreferrer')
                }
              }}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              <span>Schedule Call</span>
            </button>
            <button
              onClick={() => {
                // Open chat or support
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
            {accountManager.avatarUrl ? (
              <img
                src={accountManager.avatarUrl}
                alt={accountManager.fullName}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-bold text-xl">
                  {accountManager.fullName.charAt(0)}
                </span>
              </div>
            )}
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

        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 mb-2">
            <strong>Scheduled:</strong> {formatDate(meetingDate)} at {formatTime(meetingDate)}
          </p>
          <p className="text-xs text-green-700">
            Duration: {meeting.durationMinutes} minutes
          </p>
        </div>

        {meeting.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {meeting.description}
          </p>
        )}

        <div className="flex gap-2">
          {meeting.videoRoomUrl ? (
            <button
              onClick={() => window.open(meeting.videoRoomUrl!, '_blank', 'noopener,noreferrer')}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              <span>Join Call</span>
            </button>
          ) : (
            <button
              onClick={() => {
                const calUrl = process.env.NEXT_PUBLIC_CAL_CLIENT_URL
                if (calUrl) {
                  window.open(calUrl, '_blank', 'noopener,noreferrer')
                }
              }}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              <span>Reschedule</span>
            </button>
          )}
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
  )
}
