'use client'

import React, { useState, useEffect } from 'react'
import { X, Video, Calendar, Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useMeetingActions } from '@/hooks/useManagerMeetings'

interface MeetingScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  clientId: string
  onSuccess: () => void
}

export default function MeetingScheduleModal({
  isOpen,
  onClose,
  clientId,
  onSuccess,
}: MeetingScheduleModalProps) {
  const [type, setType] = useState<string>('ONBOARDING')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('10:00')
  const [duration, setDuration] = useState<string>('30')
  const [title, setTitle] = useState<string>('')
  const [agenda, setAgenda] = useState<string>('')
  const [meetingLink, setMeetingLink] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState(false)

  const { scheduleMeeting, loading, error } = useMeetingActions()

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setType('ONBOARDING')
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setDate(tomorrow.toISOString().split('T')[0])
      setTime('10:00')
      setDuration('30')
      setTitle('')
      setAgenda('')
      setMeetingLink('')
      setShowSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const meetingTypes = [
    { value: 'ONBOARDING', label: 'Onboarding', description: 'Welcome and setup meeting' },
    { value: 'CHECKIN', label: 'Check-in', description: 'Regular progress update' },
    { value: 'PLANNING', label: 'Planning', description: 'Project planning session' },
    { value: 'REVIEW', label: 'Review', description: 'Work review meeting' },
    { value: 'OTHER', label: 'Other', description: 'General meeting' },
  ]

  const handleSubmit = async () => {
    if (!type || !date || !time || !duration) {
      return
    }

    const scheduledAt = new Date(`${date}T${time}:00`)

    try {
      await scheduleMeeting({
        clientId,
        type,
        scheduledAt: scheduledAt.toISOString(),
        durationMinutes: parseInt(duration),
        title: title || undefined,
        agenda: agenda || undefined,
        meetingLink: meetingLink || undefined,
      })

      setShowSuccess(true)
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (err) {
      console.error('Failed to schedule meeting:', err)
    }
  }

  const canSubmit = type && date && time && duration && !loading

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Schedule Meeting</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Success State */}
        {showSuccess && (
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Meeting Scheduled!</h3>
              <p className="text-gray-600">Client has been notified and will receive a calendar invite.</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !showSuccess && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Failed to Schedule Meeting</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        {!showSuccess && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Meeting Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Meeting Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {meetingTypes.map((mt) => (
                    <button
                      key={mt.value}
                      onClick={() => setType(mt.value)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        type === mt.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900 mb-1">{mt.label}</div>
                      <div className="text-xs text-gray-600">{mt.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Date *
                  </label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Time *
                  </label>
                  <div className="relative">
                    <Clock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Duration *
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Meeting Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Q1 Planning Session"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Agenda */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Agenda (Optional)
                </label>
                <textarea
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  placeholder="What will be discussed in this meeting..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Meeting Link */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Video Meeting Link (Optional)
                </label>
                <div className="relative">
                  <Video size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Zoom, Google Meet, or any video conferencing link
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Scheduling...</span>
                  </>
                ) : (
                  <>
                    <Calendar size={20} />
                    <span>Schedule Meeting</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
