'use client'

import React, { useState } from 'react'
import { X, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { supportApi } from '@/lib/api/client'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('')
  const [category, setCategory] = useState<'feature' | 'improvement' | 'bug' | 'other'>('feature')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      setError('Please enter your feedback')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const categoryLabels = {
        feature: 'Feature Request',
        improvement: 'Improvement Suggestion',
        bug: 'Bug Report',
        other: 'General Feedback'
      }

      const response = await supportApi.createTicket({
        subject: `Feedback: ${categoryLabels[category]}`,
        description: feedback,
        category: 'feature',
        priority: 'low',
      })

      if (response.success) {
        setShowSuccess(true)
        setFeedback('')
        setCategory('feature')
        
        setTimeout(() => {
          setShowSuccess(false)
          onClose()
        }, 2000)
      } else {
        setError(response.error || 'Failed to submit feedback')
      }
    } catch (err: any) {
      console.error('Submit feedback error:', err)
      setError(err.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFeedback('')
      setCategory('feature')
      setError(null)
      setShowSuccess(false)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Leave Feedback</h2>
              <p className="text-sm text-gray-600">Help us improve Knacksters</p>
            </div>
          </div>
          <button onClick={handleClose} disabled={isSubmitting} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {showSuccess ? (
            <div className="text-center py-8">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
              <p className="text-gray-600">Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Category Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Feedback
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCategory('feature')}
                    disabled={isSubmitting}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      category === 'feature'
                        ? 'bg-[#FF9634] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Feature Request
                  </button>
                  <button
                    onClick={() => setCategory('improvement')}
                    disabled={isSubmitting}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      category === 'improvement'
                        ? 'bg-[#FF9634] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Improvement
                  </button>
                  <button
                    onClick={() => setCategory('bug')}
                    disabled={isSubmitting}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      category === 'bug'
                        ? 'bg-[#FF9634] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Bug Report
                  </button>
                  <button
                    onClick={() => setCategory('other')}
                    disabled={isSubmitting}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      category === 'other'
                        ? 'bg-[#FF9634] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Other
                  </button>
                </div>
              </div>

              {/* Feedback Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value)
                    setError(null)
                  }}
                  placeholder="Tell us what you think..."
                  rows={6}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent resize-none disabled:bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your feedback helps us build a better product for you
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !feedback.trim()}
                  className="flex-1 px-6 py-2.5 bg-[#FF9634] text-white font-semibold rounded-lg hover:bg-[#E88530] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
