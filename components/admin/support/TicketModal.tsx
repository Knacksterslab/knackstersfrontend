'use client';

import React, { useState } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { useAutoReset } from '@/hooks/useAutoReset';
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
};

const PRIORITY_STYLES: Record<string, string> = {
  URGENT: 'bg-red-50 text-red-700 border-red-200',
  HIGH: 'bg-orange-50 text-orange-700 border-orange-200',
  NORMAL: 'bg-blue-50 text-blue-700 border-blue-200',
  LOW: 'bg-gray-100 text-gray-500 border-gray-200',
};

const STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

interface TicketModalProps {
  ticket: SupportTicket;
  onClose: () => void;
  onUpdated: () => void;
}

export function TicketModal({ ticket, onClose, onUpdated }: TicketModalProps) {
  const [status, setStatus] = useState(ticket.status);
  const [notes, setNotes] = useState(ticket.resolutionNotes || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  useAutoReset(saved, () => setSaved(false), 2000);

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

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {ticket.description}
            </div>
          </div>

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
