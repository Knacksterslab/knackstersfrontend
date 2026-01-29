'use client'

import React, { useState, useEffect } from 'react'
import { X, AlertTriangle, Loader2, CheckCircle } from 'lucide-react'

interface TimeLogRejectionModalProps {
  isOpen: boolean
  onClose: () => void
  timeLog: {
    id: string
    user: { fullName: string }
    task: { name: string }
    durationMinutes: number
  } | null
  onReject: (timeLogId: string, reason: string) => Promise<void>
}

export default function TimeLogRejectionModal({
  isOpen,
  onClose,
  timeLog,
  onReject,
}: TimeLogRejectionModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [customReason, setCustomReason] = useState<string>('')
  const [rejecting, setRejecting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedReason('')
      setCustomReason('')
      setRejecting(false)
      setShowSuccess(false)
    }
  }, [isOpen])

  if (!isOpen || !timeLog) return null

  const predefinedReasons = [
    'Hours exceed allocated time for this task',
    'Missing task details or description',
    'Time log does not match agreed work',
    'Hours need to be split across multiple tasks',
    'Incorrect date or time entries',
    'Other (please specify)',
  ]

  const handleSubmit = async () => {
    const finalReason = selectedReason === 'Other (please specify)' ? customReason : selectedReason

    if (!finalReason.trim()) return

    try {
      setRejecting(true)
      await onReject(timeLog.id, finalReason)
      setShowSuccess(true)
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      setRejecting(false)
    }
  }

  const canSubmit = selectedReason && 
    (selectedReason !== 'Other (please specify)' || customReason.trim().length > 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Request Timesheet Revision</h2>
              <p className="text-sm text-gray-600">
                {timeLog.user.fullName} • {timeLog.task.name} • {Math.floor(Number(timeLog.durationMinutes) / 60)}h {Number(timeLog.durationMinutes) % 60}m
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={rejecting}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Success State */}
        {showSuccess && (
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Revision Requested</h3>
              <p className="text-gray-600">Talent has been notified and can resubmit the timesheet.</p>
            </div>
          </div>
        )}

        {/* Form */}
        {!showSuccess && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-900">
                  <strong>Note:</strong> The talent will be notified with your reason and can resubmit their timesheet with corrections.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Select a reason for revision:
                </label>

                {predefinedReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      selectedReason === reason
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedReason === reason
                          ? 'border-red-600 bg-red-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedReason === reason && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-sm text-gray-900">{reason}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Reason Input */}
              {selectedReason === 'Other (please specify)' && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Please specify the reason:
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Explain what needs to be corrected..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                disabled={rejecting}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || rejecting}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {rejecting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Requesting Revision...</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={20} />
                    <span>Request Revision</span>
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
