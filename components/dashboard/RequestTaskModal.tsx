'use client'

import React, { useState } from 'react'
import { X, Loader2, CheckCircle } from 'lucide-react'

interface RequestTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const CATEGORIES = [
  { value: 'AI_SOLUTIONS', label: 'AI Solutions' },
  { value: 'CYBERSECURITY', label: 'Cybersecurity' },
  { value: 'DEVELOPMENT_DEVOPS', label: 'Development & DevOps' },
  { value: 'DESIGN_CREATIVE', label: 'Design & Creative' },
  { value: 'GROWTH_CUSTOMER_SUCCESS', label: 'Growth & Customer Success' },
  { value: 'HEALTHCARE_LIFE_SCIENCES', label: 'Healthcare & Life Sciences' },
  { value: 'OTHER', label: 'Other' },
]

const COMPLEXITY_OPTIONS = [
  { value: 'QUICK', label: 'Small fix', subLabel: 'A few hours', hours: 3 },
  { value: 'MEDIUM', label: 'Feature or update', subLabel: 'A few days', hours: 10 },
  { value: 'LARGE', label: 'Bigger project', subLabel: '1+ week', hours: 30 },
]

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
]

export default function RequestTaskModal({ isOpen, onClose, onSuccess }: RequestTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as '' | 'DEVELOPMENT' | 'DESIGN' | 'MARKETING' | 'OPERATIONS' | 'OTHER',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
    dueDate: '',
    estimatedComplexity: '' as '' | 'QUICK' | 'MEDIUM' | 'LARGE',
    referenceLinks: '',
    isTrialToHire: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.title.trim().length < 5) {
      setError('Please enter a task title (at least 5 characters)')
      return
    }
    if (formData.description.trim().length < 20) {
      setError('Please describe what you need done (at least 20 characters)')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

      const complexity = COMPLEXITY_OPTIONS.find(o => o.value === formData.estimatedComplexity)
      const estimatedHours = complexity?.hours

      // Append reference links to description if provided
      const fullDescription = formData.referenceLinks.trim()
        ? `${formData.description}\n\nReference links:\n${formData.referenceLinks}`
        : formData.description

      const response = await fetch(`${API_URL}/api/client/projects`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: fullDescription,
          priority: formData.priority,
          estimatedHours,
          dueDate: formData.dueDate || undefined,
          taskType: formData.category || undefined,
          isTrialToHire: formData.isTrialToHire,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request')
      }

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          title: '',
          description: '',
          category: '',
          priority: 'MEDIUM',
          dueDate: '',
          estimatedComplexity: '',
          referenceLinks: '',
          isTrialToHire: false,
        })
        onSuccess()
        onClose()
      }, 2800)
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'MEDIUM',
        dueDate: '',
        estimatedComplexity: '',
        referenceLinks: '',
        isTrialToHire: false,
      })
      setError(null)
      setShowSuccess(false)
      onClose()
    }
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted</h3>
          <p className="text-sm text-gray-600 mb-6">
            Your Customer Success Manager will review your request and match you with the right expert within 24 hours.
          </p>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200 text-left">
            <p className="font-semibold text-gray-900 mb-2">What happens next:</p>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-[#FF9634] mt-0.5 font-bold">1.</span>
                <span>Your CSM reviews the scope and confirms the details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9634] mt-0.5 font-bold">2.</span>
                <span>The right Knackster is matched and assigned</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF9634] mt-0.5 font-bold">3.</span>
                <span>Work begins and you receive updates</span>
              </li>
              {formData.isTrialToHire && (
                <li className="flex items-start gap-2 mt-2 pt-2 border-t border-gray-200">
                  <span className="text-blue-500 mt-0.5">ℹ</span>
                  <span className="text-blue-700">
                    Your CSM will follow up about next steps for a longer-term engagement after this task.
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const canSubmit = formData.title.trim().length >= 5 && formData.description.trim().length >= 20

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Request New Task</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Describe what you need and we'll match you with the right expert
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Fix checkout flow bug, Design landing page mockups"
              maxLength={80}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent text-sm disabled:bg-gray-50"
            />
            <p className="text-xs text-gray-400 mt-1">{formData.title.length}/80</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Type of Work <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: formData.category === cat.value ? '' : cat.value as any })}
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors disabled:opacity-50 ${
                    formData.category === cat.value
                      ? 'border-[#FF9634] bg-orange-50 text-[#FF9634]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              What do you need done? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the task in detail — the more context you provide, the better we can match the right expert.&#10;&#10;Examples:&#10;• The checkout button stops working when a discount code is applied. Happens on mobile only.&#10;• Redesign our pricing page to better convert SaaS visitors — need 3 layout variations.&#10;• Write 4 SEO blog posts on AI automation trends for our target audience."
              rows={6}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent resize-none text-sm disabled:bg-gray-50"
            />
            {formData.description.length < 20 && formData.description.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {formData.description.length} / 20 characters minimum
              </p>
            )}
          </div>

          {/* Complexity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              How big is this task? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="space-y-2">
              {COMPLEXITY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, estimatedComplexity: formData.estimatedComplexity === option.value ? '' : option.value as any })}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors disabled:opacity-50 ${
                    formData.estimatedComplexity === option.value
                      ? 'border-[#FF9634] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-semibold ${formData.estimatedComplexity === option.value ? 'text-[#FF9634]' : 'text-gray-900'}`}>
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">— {option.subLabel}</span>
                    </div>
                    {formData.estimatedComplexity === option.value && (
                      <CheckCircle className="w-4 h-4 text-[#FF9634] flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Priority <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRIORITY_OPTIONS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: p.value as any })}
                  disabled={isSubmitting}
                  className={`px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors disabled:opacity-50 ${
                    formData.priority === p.value
                      ? 'border-[#FF9634] bg-orange-50 text-[#FF9634]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Target Completion Date <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent text-sm disabled:bg-gray-50"
            />
          </div>

          {/* Reference Links */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Reference Links <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={formData.referenceLinks}
              onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
              placeholder="Paste any relevant URLs — Figma files, Google Docs, Notion pages, example sites, etc."
              rows={2}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent resize-none text-sm disabled:bg-gray-50"
            />
          </div>

          {/* Trial to Hire */}
          <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.isTrialToHire
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => !isSubmitting && setFormData({ ...formData, isTrialToHire: !formData.isTrialToHire })}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                formData.isTrialToHire ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}>
                {formData.isTrialToHire && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div>
                <p className={`text-sm font-semibold ${formData.isTrialToHire ? 'text-blue-800' : 'text-gray-900'}`}>
                  This task can lead to a permanent hire
                </p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-gray-200">
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
              disabled={isSubmitting || !canSubmit}
              className="flex-1 px-6 py-3 bg-[#FF9634] text-white rounded-lg font-semibold hover:bg-[#E88530] transition-colors disabled:opacity-50 disabled:hover:bg-[#FF9634] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
