'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import { 
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  AlertCircle,
  MessageSquare
} from 'lucide-react'

export default function ManagerTimesheetsPage() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved' | 'rejected'>('pending')

  const pendingTimesheets = [
    {
      id: 'ts1',
      talent: 'Alex Anderson',
      period: 'Dec 16-22, 2025',
      totalHours: 28.5,
      tasks: [
        { name: 'Design Homepage Mockup', hours: 12.5, project: 'Website Redesign', client: 'TechCorp Inc.' },
        { name: 'User Research', hours: 8, project: 'Mobile App', client: 'TechCorp Inc.' },
        { name: 'Wireframing', hours: 8, project: 'Website Redesign', client: 'TechCorp Inc.' }
      ],
      submittedDate: 'Dec 22, 2025',
      notes: 'All tasks completed ahead of schedule. Additional time spent on client revisions.'
    },
    {
      id: 'ts2',
      talent: 'Jessica Martinez',
      period: 'Dec 16-22, 2025',
      totalHours: 20,
      tasks: [
        { name: 'Create Marketing Banner', hours: 12, project: 'Q1 Campaign', client: 'DesignStudio Pro' },
        { name: 'Brand Guidelines', hours: 8, project: 'Brand Identity', client: 'DesignStudio Pro' }
      ],
      submittedDate: 'Dec 22, 2025',
      notes: ''
    },
    {
      id: 'ts3',
      talent: 'Michael Chen',
      period: 'Dec 16-22, 2025',
      totalHours: 32,
      tasks: [
        { name: 'API Development', hours: 16, project: 'Backend Infrastructure', client: 'TechCorp Inc.' },
        { name: 'Database Optimization', hours: 10, project: 'MVP Development', client: 'StartupXYZ' },
        { name: 'Code Review', hours: 6, project: 'Mobile App', client: 'TechCorp Inc.' }
      ],
      submittedDate: 'Dec 22, 2025',
      notes: 'Extended hours for critical bug fixes on API endpoints.'
    }
  ]

  const approvedTimesheets = [
    {
      id: 'ts4',
      talent: 'Sarah Williams',
      period: 'Dec 9-15, 2025',
      totalHours: 35,
      approvedDate: 'Dec 16, 2025',
      approvedBy: 'You'
    },
    {
      id: 'ts5',
      talent: 'David Kim',
      period: 'Dec 9-15, 2025',
      totalHours: 28,
      approvedDate: 'Dec 16, 2025',
      approvedBy: 'You'
    }
  ]

  const rejectedTimesheets = [
    {
      id: 'ts6',
      talent: 'Mark Johnson',
      period: 'Dec 9-15, 2025',
      totalHours: 45,
      rejectedDate: 'Dec 16, 2025',
      rejectedBy: 'You',
      reason: 'Hours exceed allocated time for tasks. Please revise and resubmit.'
    }
  ]

  const handleApprove = (timesheetId: string) => {
    console.log('Approved timesheet:', timesheetId)
  }

  const handleReject = (timesheetId: string) => {
    console.log('Rejected timesheet:', timesheetId)
  }

  return (
    <ManagerPageWrapper>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Timesheet Approvals</h1>
              <p className="text-gray-600">Review and approve talent timesheets</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={20} className="text-orange-600" />
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{pendingTimesheets.length}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">Approved (This Week)</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{approvedTimesheets.length}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <XCircle size={20} className="text-red-600" />
                  <span className="text-sm text-gray-600">Rejected</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{rejectedTimesheets.length}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <User size={20} className="text-purple-600" />
                  <span className="text-sm text-gray-600">Total Hours</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">80.5</p>
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
                  Pending ({pendingTimesheets.length})
                </button>
                <button
                  onClick={() => setSelectedTab('approved')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'approved'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Approved ({approvedTimesheets.length})
                </button>
                <button
                  onClick={() => setSelectedTab('rejected')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'rejected'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Rejected ({rejectedTimesheets.length})
                </button>
              </div>

              {/* Pending Timesheets */}
              {selectedTab === 'pending' && (
                <div className="p-6">
                  {pendingTimesheets.length === 0 ? (
                    <div className="text-center py-12">
                      <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No pending timesheets</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {pendingTimesheets.map((timesheet) => (
                        <div key={timesheet.id} className="border-2 border-orange-200 bg-orange-50 rounded-lg p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{timesheet.talent}</h3>
                                <span className="px-3 py-1 bg-orange-200 text-orange-700 text-xs font-semibold rounded-full">
                                  Pending Review
                                </span>
                              </div>
                              <div className="flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar size={16} />
                                  <span>{timesheet.period}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock size={16} />
                                  <span className="font-semibold text-gray-900">{timesheet.totalHours} hours</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Task Breakdown */}
                          <div className="bg-white rounded-lg p-4 mb-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Time Breakdown</h4>
                            <div className="space-y-3">
                              {timesheet.tasks.map((task, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-900 text-sm mb-1">{task.name}</p>
                                    <p className="text-xs text-gray-600">{task.project} • {task.client}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-gray-900">{task.hours}h</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Notes */}
                          {timesheet.notes && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                              <div className="flex items-start gap-2">
                                <MessageSquare size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-blue-900 mb-1">Notes from Talent</p>
                                  <p className="text-sm text-blue-800">{timesheet.notes}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Submission Info */}
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                            <AlertCircle size={14} />
                            <span>Submitted on {timesheet.submittedDate}</span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleApprove(timesheet.id)}
                              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                              <CheckCircle size={20} />
                              Approve Timesheet
                            </button>
                            <button 
                              onClick={() => handleReject(timesheet.id)}
                              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            >
                              <XCircle size={20} />
                              Reject & Request Revision
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
                  <div className="space-y-4">
                    {approvedTimesheets.map((timesheet) => (
                      <div key={timesheet.id} className="border border-green-200 bg-green-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <CheckCircle size={32} className="text-green-600" />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{timesheet.talent}</h3>
                              <p className="text-sm text-gray-600">{timesheet.period} • {timesheet.totalHours} hours</p>
                              <p className="text-xs text-gray-500 mt-1">Approved by {timesheet.approvedBy} on {timesheet.approvedDate}</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-100 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rejected Timesheets */}
              {selectedTab === 'rejected' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {rejectedTimesheets.map((timesheet) => (
                      <div key={timesheet.id} className="border border-red-200 bg-red-50 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <XCircle size={32} className="text-red-600 flex-shrink-0" />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{timesheet.talent}</h3>
                              <p className="text-sm text-gray-600 mb-2">{timesheet.period} • {timesheet.totalHours} hours</p>
                              <p className="text-xs text-gray-500">Rejected by {timesheet.rejectedBy} on {timesheet.rejectedDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-red-200 rounded-lg p-4">
                          <p className="text-sm font-semibold text-red-900 mb-1">Rejection Reason:</p>
                          <p className="text-sm text-red-800">{timesheet.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
      </div>
    </ManagerPageWrapper>
  )
}

