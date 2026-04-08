'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Ticket,
  Search,
  RefreshCw,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
} from 'lucide-react';
import { adminSupportApi } from '@/lib/api/client';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  resolutionNotes?: string | null;
  user: { id: string; fullName: string; email: string; avatarUrl?: string | null };
  assignedTo?: { id: string; fullName: string; email: string } | null;
}

const STATUS_STYLES: Record<string, string> = {
  OPEN: 'bg-blue-50 text-blue-700 border-blue-200',
  IN_PROGRESS: 'bg-orange-50 text-orange-700 border-orange-200',
  RESOLVED: 'bg-green-50 text-green-700 border-green-200',
  CLOSED: 'bg-gray-100 text-gray-600 border-gray-200',
}

const PRIORITY_STYLES: Record<string, string> = {
  URGENT: 'bg-red-50 text-red-700 border-red-200',
  HIGH: 'bg-orange-50 text-orange-700 border-orange-200',
  NORMAL: 'bg-blue-50 text-blue-700 border-blue-200',
  LOW: 'bg-gray-100 text-gray-500 border-gray-200',
}

const STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Ticket Detail Modal ─────────────────────────────────────────────────────

function TicketModal({ ticket, onClose, onUpdated }: { ticket: SupportTicket; onClose: () => void; onUpdated: () => void }) {
  const [status, setStatus] = useState(ticket.status);
  const [notes, setNotes] = useState(ticket.resolutionNotes || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replySent, setReplySent] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await adminSupportApi.updateTicket(ticket.id, {
        status,
        resolutionNotes: notes || undefined,
      });
      if ((res as any).success) {
        setSaved(true);
        onUpdated();
        setTimeout(() => setSaved(false), 2000);
      } else {
        setSaveError((res as any).error || 'Failed to update ticket');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return setReplyError('Please enter a reply message');
    setSendingReply(true);
    setReplyError(null);
    try {
      const res = await adminSupportApi.replyToTicket(ticket.id, {
        replyMessage: replyMessage.trim(),
        status,
      });
      if ((res as any).success) {
        setReplySent(true);
        setReplyMessage('');
        onUpdated();
        setTimeout(() => setReplySent(false), 3000);
      } else {
        setReplyError((res as any).error || 'Failed to send reply');
      }
    } catch (err: any) {
      setReplyError(err.message || 'Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm font-bold text-gray-500">{ticket.ticketNumber}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${PRIORITY_STYLES[ticket.priority] || ''}`}>{ticket.priority}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[ticket.status] || ''}`}>{ticket.status.replace('_', ' ')}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{ticket.subject}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded text-gray-400">✕</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Client info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {getInitials(ticket.user.fullName || ticket.user.email)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{ticket.user.fullName || 'Unknown'}</p>
              <p className="text-xs text-gray-500">{ticket.user.email}</p>
            </div>
            <span className="ml-auto text-xs text-gray-400">{formatDate(ticket.createdAt)}</span>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {ticket.description}
            </div>
          </div>

          {/* Previous reply if exists */}
          {(ticket as any).lastReply && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Previous Reply Sent</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {(ticket as any).lastReply}
              </div>
              {(ticket as any).repliedAt && (
                <p className="text-xs text-gray-400 mt-1">Sent {formatDate((ticket as any).repliedAt)}</p>
              )}
            </div>
          )}

          {/* ── Reply to Client ─────────────────────────────────────────── */}
          <div className="border border-blue-200 rounded-xl p-4 bg-blue-50">
            <p className="text-sm font-semibold text-blue-900 mb-1">Reply to Client</p>
            <p className="text-xs text-blue-600 mb-3">This message will be emailed to the client and visible in their ticket history.</p>

            {replySent && (
              <div className="mb-3 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <CheckCircle size={14} />
                Reply sent to client successfully.
              </div>
            )}
            {replyError && <p className="text-xs text-red-600 mb-2">{replyError}</p>}

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Update Status (optional)</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <textarea
              value={replyMessage}
              onChange={e => { setReplyMessage(e.target.value); setReplyError(null); }}
              rows={4}
              placeholder="Type your reply to the client here..."
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white mb-3"
            />
            <button
              onClick={handleSendReply}
              disabled={sendingReply || !replyMessage.trim()}
              className="w-full px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm transition-colors"
            >
              {sendingReply ? 'Sending...' : 'Send Reply to Client'}
            </button>
          </div>

          {/* ── Internal Notes ──────────────────────────────────────────── */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
            <p className="text-xs text-gray-400 mb-2">Private notes — not visible to the client.</p>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Add internal notes for your team..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {saveError && <p className="text-sm text-red-600">{saveError}</p>}

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm">
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 text-sm"
            >
              {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Notes & Status'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [stats, setStats] = useState<any>(null);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const [ticketsRes, statsRes] = await Promise.all([
        adminSupportApi.getTickets({ status: statusFilter || undefined, priority: priorityFilter || undefined, search: search || undefined }),
        adminSupportApi.getStats(),
      ]);
      if ((ticketsRes as any).success) setTickets((ticketsRes as any).data.tickets);
      if ((statsRes as any).success) setStats((statsRes as any).data);
    } catch (err) {
      console.error('Failed to fetch support tickets', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <Ticket size={20} className="text-[#FF9634]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-sm text-gray-500">Manage and respond to client support requests</p>
          </div>
        </div>
        <button onClick={fetchTickets} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Open', value: stats.open, icon: AlertCircle, color: 'text-blue-600 bg-blue-50' },
            { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-orange-600 bg-orange-50' },
            { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
            { label: 'Urgent', value: stats.urgent, icon: XCircle, color: 'text-red-600 bg-red-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by subject, ticket #, or client…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All priorities</option>
          {['URGENT', 'HIGH', 'NORMAL', 'LOW'].map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FF9634]" />
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm bg-white rounded-xl border border-gray-200">
          No tickets found.
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Ticket</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Priority</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tickets.map(ticket => (
                  <tr
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900 text-sm">{ticket.subject}</p>
                      <p className="text-xs font-mono text-gray-400 mt-0.5">{ticket.ticketNumber}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">{ticket.user.fullName}</p>
                      <p className="text-xs text-gray-500">{ticket.user.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${PRIORITY_STYLES[ticket.priority] || ''}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[ticket.status] || ''}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{formatDate(ticket.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {tickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900 text-sm flex-1 mr-2">{ticket.subject}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border flex-shrink-0 ${STATUS_STYLES[ticket.status] || ''}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{ticket.user.fullName} · {ticket.user.email}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${PRIORITY_STYLES[ticket.priority] || ''}`}>{ticket.priority}</span>
                  <span className="text-xs text-gray-400">{formatDate(ticket.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Ticket Modal */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdated={fetchTickets}
        />
      )}
    </div>
  );
}
