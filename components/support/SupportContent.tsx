'use client'

import React, { useState, useEffect } from 'react'
import {
  Send,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import KnackstersButton from '@/components/svg/knacksters-button'
import { supportApi } from '@/lib/api/client'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Ticket {
  id: string
  ticketNumber: string
  subject: string
  description: string
  status: string
  priority: string
  createdAt: string
  lastReply?: string | null
  repliedAt?: string | null
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  OPEN: 'bg-blue-50 text-blue-600',
  IN_PROGRESS: 'bg-orange-50 text-orange-600',
  RESOLVED: 'bg-green-50 text-green-600',
  CLOSED: 'bg-gray-100 text-gray-600',
}

const PRIORITY_STYLES: Record<string, string> = {
  URGENT: 'bg-red-50 text-red-600',
  HIGH: 'bg-orange-50 text-orange-600',
  NORMAL: 'bg-blue-50 text-blue-600',
  LOW: 'bg-gray-100 text-gray-500',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SupportContent() {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [ticketNumber, setTicketNumber] = useState<string | null>(null)

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [ticketsLoading, setTicketsLoading] = useState(true)
  const [showTickets, setShowTickets] = useState(false)
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null)

  // Fetch past tickets on mount
  useEffect(() => {
    supportApi.getTickets().then((res: any) => {
      if (res.success && res.data) setTickets(res.data)
    }).catch(() => {}).finally(() => setTicketsLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTicketForm({ ...ticketForm, [e.target.name]: e.target.value })
    setError(null)
  }

  const handleSubmit = async () => {
    if (!ticketForm.subject.trim()) return setError('Please enter a subject')
    if (!ticketForm.category) return setError('Please select a category')
    if (!ticketForm.priority) return setError('Please select a priority')
    if (!ticketForm.description.trim()) return setError('Please enter a description')

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
        setTicketForm({ subject: '', category: '', priority: '', description: '' })

        // Refresh ticket list
        supportApi.getTickets().then((res: any) => {
          if (res.success && res.data) setTickets(res.data)
        }).catch(() => {})

        setTimeout(() => {
          setShowSuccess(false)
          setTicketNumber(null)
        }, 6000)
      } else {
        setError(response.error || 'Failed to submit ticket')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your ticket')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support / Help</h1>
        <p className="text-gray-600">Describe your issue and we'll get back to you within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — Ticket Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Send size={20} className="text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">New Ticket</h2>
            </div>

            {/* Success */}
            {showSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 text-sm mb-1">Ticket Submitted Successfully!</h4>
                  <p className="text-sm text-green-700">
                    Your ticket <span className="font-mono font-semibold">{ticketNumber}</span> has been created. We'll respond within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={ticketForm.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your issue"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={ticketForm.category}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white disabled:bg-gray-50"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                  <select
                    name="priority"
                    value={ticketForm.priority}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white disabled:bg-gray-50"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={ticketForm.description}
                  onChange={handleChange}
                  placeholder="Please provide detailed information about your issue or question..."
                  rows={6}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none disabled:bg-gray-50"
                />
              </div>

              <KnackstersButton
                text={isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                onClick={handleSubmit}
                fullWidth={true}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* My Tickets */}
          <div className="bg-white rounded-xl border border-gray-200">
            <button
              onClick={() => setShowTickets(v => !v)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-gray-400" />
                <span className="font-semibold text-gray-900">My Tickets</span>
                {tickets.length > 0 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tickets.length}</span>
                )}
              </div>
              {showTickets ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>

            {showTickets && (
              <div className="border-t border-gray-100">
                {ticketsLoading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF9634] mx-auto" />
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-500">No tickets submitted yet.</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {tickets.map(ticket => {
                      const isExpanded = expandedTicketId === ticket.id
                      const hasReply = !!ticket.lastReply
                      return (
                        <div key={ticket.id}>
                          {/* Row header — clickable */}
                          <button
                            onClick={() => setExpandedTicketId(isExpanded ? null : ticket.id)}
                            className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-sm font-semibold text-gray-900 truncate">{ticket.subject}</p>
                                {hasReply && (
                                  <span className="flex-shrink-0 px-1.5 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded">
                                    Reply received
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 font-mono">{ticket.ticketNumber} · {formatDate(ticket.createdAt)}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PRIORITY_STYLES[ticket.priority] || 'bg-gray-100 text-gray-500'}`}>
                                {ticket.priority}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[ticket.status] || 'bg-gray-100 text-gray-500'}`}>
                                {ticket.status.replace('_', ' ')}
                              </span>
                              {isExpanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                            </div>
                          </button>

                          {/* Expanded detail */}
                          {isExpanded && (
                            <div className="px-5 pb-5 space-y-3 bg-gray-50 border-t border-gray-100">
                              <div className="pt-4">
                                <p className="text-xs font-medium text-gray-500 mb-1.5">Your message</p>
                                <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                  {ticket.description}
                                </div>
                              </div>

                              {hasReply ? (
                                <div>
                                  <p className="text-xs font-medium text-gray-500 mb-1.5">
                                    Support reply
                                    {ticket.repliedAt && <span className="ml-1 text-gray-400">· {formatDate(ticket.repliedAt)}</span>}
                                  </p>
                                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {ticket.lastReply}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                                  <Clock size={12} />
                                  <span>No reply yet — we typically respond within 2–4 hours during business hours.</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a
                href="/faq"
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">FAQ</p>
                  <p className="text-xs text-gray-600">Answers to common questions</p>
                </div>
              </a>

            </div>
          </div>

          {/* Response Time */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 text-sm mb-1">Average Response Time</h4>
                <p className="text-xs text-blue-700">Our support team typically responds within 2–4 hours during business hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
