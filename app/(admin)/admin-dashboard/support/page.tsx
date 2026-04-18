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
} from 'lucide-react';
import { adminSupportApi } from '@/lib/api/client';
import { TicketModal } from '@/components/admin/support/TicketModal';

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
    } catch {
      // silent - tickets table shows empty state
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
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
                  <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900 text-sm">{ticket.subject}</p>
                      <p className="text-xs font-mono text-gray-400 mt-0.5">{ticket.ticketNumber}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">{ticket.user.fullName}</p>
                      <p className="text-xs text-gray-500">{ticket.user.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${PRIORITY_STYLES[ticket.priority] || ''}`}>{ticket.priority}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[ticket.status] || ''}`}>{ticket.status.replace('_', ' ')}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{formatDate(ticket.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            {tickets.map(ticket => (
              <div key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900 text-sm flex-1 mr-2">{ticket.subject}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border flex-shrink-0 ${STATUS_STYLES[ticket.status] || ''}`}>{ticket.status.replace('_', ' ')}</span>
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
