'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import { 
  Calendar,
  Clock,
  Video,
  CheckCircle,
  Plus,
  AlertCircle,
  Loader2,
  Users,
  XCircle
} from 'lucide-react'
import { useManagerMeetings } from '@/hooks/useManagerMeetings'
import { format, formatDistanceToNow, isToday, isTomorrow } from 'date-fns'

function formatMeetingDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isToday(d)) return `Today at ${format(d, 'h:mm a')}`
  if (isTomorrow(d)) return `Tomorrow at ${format(d, 'h:mm a')}`
  return format(d, 'MMM d, yyyy · h:mm a')
}

function getMeetingTypeLabel(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default function ManagerMeetGreetPage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming')
  const { meetings, loading, error, refresh } = useManagerMeetings()

  const upcomingMeetings = meetings.filter(m => m.status === 'SCHEDULED')
  const completedMeetings = meetings.filter(m => m.status === 'COMPLETED')
  const cancelledMeetings = meetings.filter(m => m.status === 'CANCELLED')

  const todayMeetings = upcomingMeetings.filter(m => isToday(new Date(m.scheduledAt)))

  const displayedMeetings =
    selectedTab === 'upcoming' ? upcomingMeetings
    : selectedTab === 'completed' ? completedMeetings
    : meetings

  if (loading) {
    return (
      <ManagerPageWrapper>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-purple-600" size={40} />
        </div>
      </ManagerPageWrapper>
    )
  }

  if (error) {
    return (
      <ManagerPageWrapper>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={refresh} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Retry
          </button>
        </div>
      </ManagerPageWrapper>
    )
  }

  return (
    <ManagerPageWrapper>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Client Meetings</h1>
          <p className="text-sm sm:text-base text-gray-600">Strategy calls and check-ins with your clients</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Calendar size={18} className="text-purple-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600">Upcoming</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{upcomingMeetings.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600">Completed</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{completedMeetings.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Clock size={18} className="text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600">Today</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{todayMeetings.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <XCircle size={18} className="text-red-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600">Cancelled</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{cancelledMeetings.length}</p>
        </div>
      </div>

      {/* Tabs + List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'upcoming', label: `Upcoming (${upcomingMeetings.length})` },
            { id: 'completed', label: `Completed (${completedMeetings.length})` },
            { id: 'all', label: `All (${meetings.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {displayedMeetings.length === 0 ? (
            <div className="text-center py-12">
              <Users size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No meetings here</p>
              <p className="text-sm text-gray-400 mt-1">
                {selectedTab === 'upcoming'
                  ? 'No upcoming meetings scheduled with your clients.'
                  : selectedTab === 'completed'
                  ? 'No completed meetings yet.'
                  : 'No meetings recorded yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedMeetings.map((meeting) => {
                const isUpcoming = meeting.status === 'SCHEDULED'
                const isCompleted = meeting.status === 'COMPLETED'
                const clientName = meeting.client?.fullName || meeting.client?.companyName || 'Client'

                return (
                  <div
                    key={meeting.id}
                    className={`border rounded-lg p-4 sm:p-5 ${
                      isUpcoming ? 'border-purple-200 bg-purple-50'
                      : isCompleted ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-gray-900">
                            {meeting.title || getMeetingTypeLabel(meeting.type)} — {clientName}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            isUpcoming ? 'bg-purple-100 text-purple-700'
                            : isCompleted ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                          }`}>
                            {meeting.status.charAt(0) + meeting.status.slice(1).toLowerCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {formatMeetingDate(meeting.scheduledAt)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {meeting.durationMinutes} min
                          </span>
                        </div>
                      </div>

                      {isUpcoming && meeting.videoRoomUrl && (
                        <a
                          href={meeting.videoRoomUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Video size={16} />
                          Join Call
                        </a>
                      )}
                    </div>

                    {meeting.agenda && (
                      <div className="bg-white rounded-lg p-3 text-sm text-gray-700 border border-gray-100">
                        <span className="font-semibold text-gray-900">Agenda: </span>
                        {meeting.agenda}
                      </div>
                    )}

                    {isCompleted && meeting.notes && (
                      <div className="mt-3 bg-white rounded-lg p-3 text-sm text-gray-700 border border-gray-100">
                        <span className="font-semibold text-gray-900">Notes: </span>
                        {meeting.notes}
                      </div>
                    )}

                    {isCompleted && (
                      <p className="mt-2 text-xs text-gray-400">
                        Completed {formatDistanceToNow(new Date(meeting.scheduledAt), { addSuffix: true })}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Scheduling meetings</h3>
            <p className="text-sm text-blue-800">
              Schedule meetings with clients directly from their detail view — open a client's profile from the Clients page and use the "Schedule Meeting" action.
            </p>
          </div>
        </div>
      </div>
    </ManagerPageWrapper>
  )
}
