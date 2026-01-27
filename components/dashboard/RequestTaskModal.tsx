'use client'

import React, { useState } from 'react'
import { X, Loader2, CheckCircle } from 'lucide-react'

interface RequestTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function RequestTaskModal({ isOpen, onClose, onSuccess }: RequestTaskModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
    dueDate: '',
    estimatedComplexity: '' as '' | 'QUICK' | 'MEDIUM' | 'LARGE'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.description.trim().length < 20) {
      setError('Please provide at least 20 characters describing your task')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      
      // Map complexity to estimated hours
      const estimatedHours = formData.estimatedComplexity === 'QUICK' ? 5 
        : formData.estimatedComplexity === 'MEDIUM' ? 15
        : formData.estimatedComplexity === 'LARGE' ? 40
        : undefined

      const response = await fetch(`${API_URL}/api/client/projects`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.description.substring(0, 100) + (formData.description.length > 100 ? '...' : ''),
          description: formData.description,
          priority: formData.priority,
          estimatedHours,
          dueDate: formData.dueDate || undefined
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request')
      }

      // Show success state
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({ description: '', priority: 'MEDIUM', dueDate: '', estimatedComplexity: '' })
        onSuccess()
        onClose()
      }, 2500)

    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ description: '', priority: 'MEDIUM', dueDate: '', estimatedComplexity: '' })
      setError(null)
      setShowSuccess(false)
      onClose()
    }
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-4 sm:p-6 md:p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted</h3>
          <p className="text-sm text-gray-600 mb-6">
            Your account manager will review your request and match you with the right expert within 24 hours.
          </p>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200 text-left">
            <p className="font-semibold text-gray-900 mb-2">Next steps:</p>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9634] mt-0.5">•</span>
                <span>Account manager reviews scope</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9634] mt-0.5">•</span>
                <span>Expert is assigned to your task</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9634] mt-0.5">•</span>
                <span>Work begins and you receive updates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Request New Task</h2>
            <p className="text-sm text-gray-600 mt-1">
              Describe what you need and we'll match you with the right expert
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Task Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your task or project in detail...&#10;&#10;Examples:&#10;• Build a landing page for our new product launch&#10;• Fix bug in checkout flow where payment fails&#10;• Design mobile app mockups for iOS and Android"
              rows={6}
              required
              minLength={20}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent resize-none text-sm disabled:bg-gray-50 disabled:text-gray-500"
            />
            {formData.description.length < 20 && (
              <p className="text-xs text-gray-500 mt-2">
                {formData.description.length} / 20 characters minimum
              </p>
            )}
          </div>

          {/* Priority */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Priority <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { value: 'LOW', label: 'Low', color: 'border-gray-200 hover:border-gray-300' },
                { value: 'MEDIUM', label: 'Medium', color: 'border-gray-200 hover:border-gray-300' },
                { value: 'HIGH', label: 'High', color: 'border-gray-200 hover:border-gray-300' },
                { value: 'URGENT', label: 'Urgent', color: 'border-gray-200 hover:border-gray-300' }
              ].map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: priority.value as any })}
                  disabled={isSubmitting}
                  className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors disabled:opacity-50 ${
                    formData.priority === priority.value
                      ? 'border-[#FF9634] bg-orange-50 text-[#FF9634]'
                      : `${priority.color} bg-white text-gray-700`
                  }`}
                >
                  {priority.label}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Complexity */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Estimated Complexity <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'QUICK', label: 'Quick (2-5 hours)', description: 'Small fixes, minor updates' },
                { value: 'MEDIUM', label: 'Medium (5-20 hours)', description: 'Feature additions, integrations' },
                { value: 'LARGE', label: 'Large (20+ hours)', description: 'Major features, redesigns' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, estimatedComplexity: option.value as any })}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors disabled:opacity-50 ${
                    formData.estimatedComplexity === option.value
                      ? 'border-[#FF9634] bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-semibold ${formData.estimatedComplexity === option.value ? 'text-[#FF9634]' : 'text-gray-900'}`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                    </div>
                    {formData.estimatedComplexity === option.value && (
                      <CheckCircle className="w-5 h-5 text-[#FF9634] flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
              {formData.estimatedComplexity && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, estimatedComplexity: '' })}
                  disabled={isSubmitting}
                  className="text-xs text-gray-500 hover:text-gray-700 underline mt-2"
                >
                  Clear selection
                </button>
              )}
            </div>
          </div>

          {/* Due Date */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Target Completion Date <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent text-sm disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Help Text */}
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">What happens next:</span> Your account manager will review your request, refine the scope, provide an accurate estimate, and match you with the best expert for your needs.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.description.trim().length < 20}
              className="flex-1 px-6 py-3 bg-[#FF9634] text-white rounded-lg font-semibold hover:bg-[#E88530] transition-colors disabled:opacity-50 disabled:hover:bg-[#FF9634] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Request</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
