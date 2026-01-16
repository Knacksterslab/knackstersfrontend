'use client'

import React, { useState } from 'react'
import { 
  Send, 
  BookOpen, 
  FileText, 
  Video, 
  Activity,
  Paperclip,
  AlertCircle
} from 'lucide-react'
import KnackstersButton from '@/components/svg/knacksters-button'
import AccountManager from '@/components/dashboard/AccountManager'

export default function SupportContent() {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    attachment: null as File | null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTicketForm({
      ...ticketForm,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTicketForm({
        ...ticketForm,
        attachment: e.target.files[0]
      })
    }
  }

  const handleSubmit = () => {
    console.log('Support ticket submitted:', ticketForm)
    // Reset form
    setTicketForm({
      subject: '',
      category: '',
      priority: '',
      description: '',
      attachment: null
    })
  }

  const quickLinks = [
    {
      icon: BookOpen,
      title: 'FAQ',
      description: 'Find answers to common questions',
      color: 'blue'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Detailed guides and tutorials',
      color: 'green'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Learn through video content',
      color: 'purple'
    },
    {
      icon: Activity,
      title: 'System Status',
      description: 'Check platform health',
      color: 'orange'
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
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
                text="Submit Ticket" 
                onClick={handleSubmit}
                fullWidth={true}
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
                return (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(link.color)}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{link.title}</p>
                      <p className="text-xs text-gray-600">{link.description}</p>
                    </div>
                  </button>
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

