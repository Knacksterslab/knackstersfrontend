'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Clock, Video, User, Filter, Plus } from 'lucide-react'
import { meetingsApi } from '@/lib/api/client'

export default function MeetingsListPage() {
  const [meetings, setMeetings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')

  useEffect(() => {
    fetchMeetings()
  }, [])

  const fetchMeetings = async () => {
    try {
      setLoading(true)
      const response = await meetingsApi.getAll()
      if (response.success && response.data) {
        setMeetings(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch meetings:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.scheduledAt)
    const now = new Date()
    
    if (filter === 'upcoming') {
      return meetingDate >= now
    } else if (filter === 'past') {
      return meetingDate < now
    }
    return true
  })

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
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
      'SCHEDULED': 'bg-blue-50 text-blue-600',
      'COMPLETED': 'bg-green-50 text-green-600',
      'CANCELLED': 'bg-red-50 text-red-600',
      'RESCHEDULED': 'bg-orange-50 text-orange-600'
    }
    return styles[status] || 'bg-gray-50 text-gray-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9634]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage your scheduled meetings</p>
        </div>
        <button className="px-6 py-2.5 bg-[#FF9634] text-white font-semibold rounded-lg hover:bg-[#E88530] transition-colors flex items-center gap-2 self-start sm:self-auto">
          <Plus size={18} />
          Schedule Meeting
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter size={18} className="text-gray-500" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[#FF9634] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'upcoming'
                  ? 'bg-[#FF9634] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'past'
                  ? 'bg-[#FF9634] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Past
            </button>
          </div>
        </div>
      </div>

      {/* Meetings List */}
      {filteredMeetings.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-2">No meetings found</p>
          <p className="text-sm text-gray-500 mb-6">
            {filter === 'upcoming' ? 'You have no upcoming meetings scheduled.' : 
             filter === 'past' ? 'No past meetings to display.' :
             'You have no meetings yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <div key={meeting.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Meeting Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{meeting.title || 'Meeting'}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(meeting.status)}`}>
                      {meeting.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{formatDate(meeting.scheduledAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-gray-400" />
                      <span>{formatTime(meeting.scheduledAt)} ({meeting.durationMinutes} minutes)</span>
                    </div>
                    {meeting.accountManager && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} className="text-gray-400" />
                        <span>with {meeting.accountManager.fullName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {meeting.status === 'SCHEDULED' && new Date(meeting.scheduledAt) >= new Date() && (
                    <>
                      <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {meeting.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">{meeting.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
