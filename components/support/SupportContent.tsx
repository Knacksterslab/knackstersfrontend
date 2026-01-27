'use client'

import React, { useState } from 'react'
import { 
  Send, 
  BookOpen, 
  FileText, 
  Video, 
  Activity,
  Paperclip,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import KnackstersButton from '@/components/svg/knacksters-button'
import AccountManager from '@/components/dashboard/AccountManager'
import { supportApi } from '@/lib/api/client'

export default function SupportContent() {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    attachment: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [ticketNumber, setTicketNumber] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTicketForm({
      ...ticketForm,
      [e.target.name]: e.target.value
    })
    setError(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTicketForm({
        ...ticketForm,
        attachment: e.target.files[0]
      })
    }
  }

  const handleSubmit = async () => {
    // Validation
    if (!ticketForm.subject.trim()) {
      setError('Please enter a subject')
      return
    }
    if (!ticketForm.category) {
      setError('Please select a category')
      return
    }
    if (!ticketForm.priority) {
      setError('Please select a priority')
      return
    }
    if (!ticketForm.description.trim()) {
      setError('Please enter a description')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const response = await supportApi.createTicket({
        subject: ticketForm.subject,
        description: ticketForm.description,
        category: ticketForm.category,
        priority: ticketForm.priority,
      })

      if (response.success && response.data) {
        setTicketNumber(response.data.ticketNumber)
        setShowSuccess(true)
        
        // Reset form
        setTicketForm({
          subject: '',
          category: '',
          priority: '',
          description: '',
          attachment: null
        })

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false)
          setTicketNumber(null)
        }, 5000)
      } else {
        setError(response.error || 'Failed to submit ticket')
      }
    } catch (err: any) {
      console.error('Submit ticket error:', err)
      setError(err.message || 'An error occurred while submitting your ticket')
    } finally {
      setIsSubmitting(false)
    }
  }

  const quickLinks = [
    {
      icon: BookOpen,
      title: 'FAQ',
      description: 'Find answers to common questions',
      color: 'blue',
      url: '/faq'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Detailed guides and tutorials',
      color: 'green',
      url: 'https://docs.knacksters.co' // External docs (placeholder)
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Learn through video content',
      color: 'purple',
      url: 'https://www.youtube.com/@knacksters' // YouTube channel (placeholder)
    },
    {
      icon: Activity,
      title: 'System Status',
      description: 'Check platform health',
      color: 'orange',
      url: 'https://status.knacksters.co' // Status page (placeholder)
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support / Help</h1>
        <p className="text-gray-600">We're here to help! Submit a ticket or explore our resources.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Support Ticket Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Send size={20} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Submit a Support Ticket</h2>
                <p className="text-sm text-gray-600">We'll get back to you within 24 hours</p>
              </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Ticket Submitted Successfully!</h4>
                    <p className="text-sm text-green-700">
                      Your support ticket <span className="font-mono font-semibold">{ticketNumber}</span> has been created. 
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject*
                </label>
                <input
                  type="text"
                  name="subject"
                  value={ticketForm.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your issue"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category*
                  </label>
                  <select
                    name="category"
                    value={ticketForm.category}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">Select category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="general">General Inquiry</option>
                    <option value="account">Account Issue</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority*
                  </label>
                  <select
                    name="priority"
                    value={ticketForm.priority}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={ticketForm.description}
                  onChange={handleChange}
                  placeholder="Please provide detailed information about your issue or question..."
                  rows={6}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* File Attachment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Paperclip size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      {ticketForm.attachment ? ticketForm.attachment.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <KnackstersButton 
                text={isSubmitting ? "Submitting..." : "Submit Ticket"} 
                onClick={handleSubmit}
                fullWidth={true}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon
                const isExternal = link.url.startsWith('http')
                return (
                  <a
                    key={index}
                    href={link.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(link.color)}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{link.title}</p>
                      <p className="text-xs text-gray-600">{link.description}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Account Manager - Using shared component */}
          <AccountManager accountManager={null} />

          {/* Response Time Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 text-sm mb-1">Average Response Time</h4>
                <p className="text-xs text-blue-700">Our support team typically responds within 2-4 hours during business hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

