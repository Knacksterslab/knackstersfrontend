'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import TimeLogRejectionModal from './TimeLogRejectionModal'
import { 
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  AlertCircle,
  MessageSquare,
  Loader2
} from 'lucide-react'
import { useManagerTimeLogs, useApprovedTimeLogs, useTimeLogActions } from '@/hooks/useManagerTimeLogs'
import { formatDistanceToNow } from 'date-fns'

export default function ManagerTimesheetsPage() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved'>('pending')
  const [selectedTimeLog, setSelectedTimeLog] = useState<any>(null)
  const [showRejectionModal, setShowRejectionModal] = useState(false)

  const { pendingLogs, loading: loadingPending, refresh: refreshPending } = useManagerTimeLogs()
  const { approvedLogs, loading: loadingApproved, refresh: refreshApproved } = useApprovedTimeLogs()
  const { approveTimeLog, rejectTimeLog, loading: actionLoading } = useTimeLogActions()

  const handleApprove = async (timeLogId: string) => {
    try {
      await approveTimeLog(timeLogId)
      refreshPending()
      refreshApproved()
    } catch (error) {
      console.error('Approval failed:', error)
    }
  }

  const handleReject = async (timeLogId: string, reason: string) => {
    try {
      await rejectTimeLog(timeLogId, reason)
      refreshPending()
    } catch (error) {
      console.error('Rejection failed:', error)
      throw error
    }
  }

  const openRejectionModal = (timeLog: any) => {
    setSelectedTimeLog(timeLog)
    setShowRejectionModal(true)
  }

  const totalPendingHours = pendingLogs.reduce((sum, log) => sum + Number(log.durationMinutes) / 60, 0)
  const loading = loadingPending || loadingApproved

  return (
    <ManagerPageWrapper>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Timesheet Approvals</h1>
              <p className="text-gray-600">Review and approve talent timesheets</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={20} className="text-orange-600" />
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{loading ? '-' : pendingLogs.length}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">Approved (Recent)</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{loading ? '-' : approvedLogs.length}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <User size={20} className="text-purple-600" />
                  <span className="text-sm text-gray-600">Pending Hours</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{loading ? '-' : totalPendingHours.toFixed(1)}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center border-b border-gray-200">
                <button
                  onClick={() => setSelectedTab('pending')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'pending'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pending ({loading ? '-' : pendingLogs.length})
                </button>
                <button
                  onClick={() => setSelectedTab('approved')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'approved'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Approved ({loading ? '-' : approvedLogs.length})
                </button>
              </div>

              {/* Pending Timesheets */}
              {selectedTab === 'pending' && (
                <div className="p-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="animate-spin text-purple-600" size={40} />
                    </div>
                  ) : pendingLogs.length === 0 ? (
                    <div className="text-center py-12">
                      <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No pending timesheets</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {pendingLogs.map((timeLog) => (
                        <div key={timeLog.id} className="border-2 border-orange-200 bg-orange-50 rounded-lg p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{timeLog.user.fullName}</h3>
                                <span className="px-3 py-1 bg-orange-200 text-orange-700 text-xs font-semibold rounded-full">
                                  Pending Review
                                </span>
                              </div>
                              <div className="flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar size={16} />
                                  <span>{new Date(timeLog.startTime).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock size={16} />
                                  <span className="font-semibold text-gray-900">
                                    {Math.floor(Number(timeLog.durationMinutes) / 60)}h {Number(timeLog.durationMinutes) % 60}m
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Task Details */}
                          <div className="bg-white rounded-lg p-4 mb-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Time Log Details</h4>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm mb-1">{timeLog.task.name}</p>
                                <p className="text-xs text-gray-600">
                                  {timeLog.project.title} • {timeLog.client.fullName || timeLog.client.companyName}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          {timeLog.description && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                              <div className="flex items-start gap-2">
                                <MessageSquare size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-blue-900 mb-1">Work Description</p>
                                  <p className="text-sm text-blue-800">{timeLog.description}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Submission Info */}
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                            <AlertCircle size={14} />
                            <span>Logged {formatDistanceToNow(new Date(timeLog.createdAt), { addSuffix: true })}</span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleApprove(timeLog.id)}
                              disabled={actionLoading}
                              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                              <CheckCircle size={20} />
                              Approve
                            </button>
                            <button 
                              onClick={() => openRejectionModal(timeLog)}
                              disabled={actionLoading}
                              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                              <XCircle size={20} />
                              Request Revision
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Approved Timesheets */}
              {selectedTab === 'approved' && (
                <div className="p-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="animate-spin text-purple-600" size={40} />
                    </div>
                  ) : approvedLogs.length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No approved timesheets yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {approvedLogs.map((timeLog) => (
                        <div key={timeLog.id} className="border border-green-200 bg-green-50 rounded-lg p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <CheckCircle size={32} className="text-green-600" />
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{timeLog.user.fullName}</h3>
                                <p className="text-sm text-gray-600">
                                  {timeLog.task.name} • {Math.floor(Number(timeLog.durationMinutes) / 60)}h {Number(timeLog.durationMinutes) % 60}m
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Approved {formatDistanceToNow(new Date(timeLog.approvedAt), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500 mb-1">Project</p>
                              <p className="text-sm font-semibold text-gray-900">{timeLog.project.title}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {timeLog.client.fullName || timeLog.client.companyName}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
      </div>

      {/* Rejection Modal */}
      <TimeLogRejectionModal
        isOpen={showRejectionModal}
        onClose={() => {
          setShowRejectionModal(false)
          setSelectedTimeLog(null)
        }}
        timeLog={selectedTimeLog}
        onReject={handleReject}
      />
    </ManagerPageWrapper>
  )
}

