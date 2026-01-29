'use client'

import React, { useState } from 'react'
import {
  X,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  TrendingUp,
  FolderOpen,
  Activity,
  Video,
  Plus,
  Loader2,
  FileText,
} from 'lucide-react'
import { useManagerClientDetails, useClientProjects } from '@/hooks/useManagerClients'
import { useClientTimeLogs } from '@/hooks/useManagerTimeLogs'
import { useClientMeetings } from '@/hooks/useManagerMeetings'
import { getInitials, formatMinutes, getStatusColor } from '@/lib/transformers/manager'
import { formatDistanceToNow } from 'date-fns'
import HourLoggingModal from './HourLoggingModal'
import MeetingScheduleModal from './MeetingScheduleModal'
import ApplyTemplateModal from './ApplyTemplateModal'

interface ClientDetailModalProps {
  isOpen: boolean
  onClose: () => void
  clientId: string | null
}

export default function ClientDetailModal({
  isOpen,
  onClose,
  clientId,
}: ClientDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'hours' | 'meetings' | 'activity'>('overview')
  const [showHourLoggingModal, setShowHourLoggingModal] = useState(false)
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedProjectForTemplate, setSelectedProjectForTemplate] = useState<{id: string, name: string} | null>(null)

  const { client, loading: loadingClient } = useManagerClientDetails(clientId)
  const { projects, loading: loadingProjects } = useClientProjects(clientId)
  const { timeLogs, loading: loadingTimeLogs, refresh: refreshTimeLogs } = useClientTimeLogs(clientId)
  const { meetings, loading: loadingMeetings, refresh: refreshMeetings } = useClientMeetings(clientId)

  if (!isOpen || !clientId) return null

  const currentBalance = client?.hoursBalances?.[0]
  const currentSubscription = client?.subscriptions?.[0]

  // Calculate hours stats
  const totalHours = currentBalance
    ? currentBalance.allocatedHours +
      currentBalance.bonusHours +
      currentBalance.extraPurchasedHours +
      Number(currentBalance.rolloverHours)
    : 0
  const usedHours = currentBalance ? Number(currentBalance.hoursUsed) : 0
  const remainingHours = totalHours - usedHours
  const usagePercentage = totalHours > 0 ? (usedHours / totalHours) * 100 : 0

  // Get recent activity from time logs
  const recentActivity = [
    ...timeLogs.slice(0, 5).map(log => ({
      id: log.id,
      type: 'TIME_LOG',
      description: `${log.user.fullName} logged ${Math.floor(Number(log.durationMinutes) / 60)}h ${Number(log.durationMinutes) % 60}m on ${log.task.name}`,
      timestamp: new Date(log.startTime),
    })),
    ...meetings.slice(0, 3).map(meeting => ({
      id: meeting.id,
      type: 'MEETING',
      description: `${meeting.type} meeting ${meeting.status === 'COMPLETED' ? 'completed' : 'scheduled'}`,
      timestamp: new Date(meeting.scheduledAt),
    })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen, count: projects.length },
    { id: 'hours', label: 'Hours', icon: Clock, count: timeLogs.length },
    { id: 'meetings', label: 'Meetings', icon: Video, count: meetings.length },
    { id: 'activity', label: 'Activity', icon: Activity },
  ]

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              {/* Avatar */}
              {client?.avatarUrl ? (
                <img
                  src={client.avatarUrl}
                  alt={client.fullName || 'Client'}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {getInitials(client?.fullName || client?.companyName || 'C')}
                  </span>
                </div>
              )}

              {/* Client Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {client?.fullName || client?.companyName || 'Loading...'}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {client?.companyName && client?.fullName && (
                    <div className="flex items-center gap-1">
                      <Building size={16} />
                      <span>{client.companyName}</span>
                    </div>
                  )}
                  {client?.email && (
                    <div className="flex items-center gap-1">
                      <Mail size={16} />
                      <span>{client.email}</span>
                    </div>
                  )}
                  {client?.phone && (
                    <div className="flex items-center gap-1">
                      <Phone size={16} />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client?.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Client since {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="font-semibold">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loadingClient ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-purple-600" size={40} />
              </div>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <OverviewTab
                    client={client}
                    currentBalance={currentBalance}
                    currentSubscription={currentSubscription}
                    totalHours={totalHours}
                    usedHours={usedHours}
                    remainingHours={remainingHours}
                    usagePercentage={usagePercentage}
                    projectCount={projects.length}
                    onLogHours={() => setShowHourLoggingModal(true)}
                    onScheduleMeeting={() => setShowMeetingModal(true)}
                  />
                )}

                {activeTab === 'projects' && (
                  <ProjectsTab 
                    projects={projects} 
                    loading={loadingProjects}
                    onApplyTemplate={(projectId: string, projectName: string) => {
                      setSelectedProjectForTemplate({ id: projectId, name: projectName })
                      setShowTemplateModal(true)
                    }}
                  />
                )}

                {activeTab === 'hours' && (
                  <HoursTab
                    timeLogs={timeLogs}
                    loading={loadingTimeLogs}
                    onLogHours={() => setShowHourLoggingModal(true)}
                  />
                )}

                {activeTab === 'meetings' && (
                  <MeetingsTab
                    meetings={meetings}
                    loading={loadingMeetings}
                    onScheduleMeeting={() => setShowMeetingModal(true)}
                  />
                )}

                {activeTab === 'activity' && (
                  <ActivityTab activity={recentActivity} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {client && (
        <>
          <HourLoggingModal
            isOpen={showHourLoggingModal}
            onClose={() => setShowHourLoggingModal(false)}
            clientId={client.id}
            onSuccess={() => {
              refreshTimeLogs()
              setShowHourLoggingModal(false)
            }}
          />

          <MeetingScheduleModal
            isOpen={showMeetingModal}
            onClose={() => setShowMeetingModal(false)}
            clientId={client.id}
            onSuccess={() => {
              refreshMeetings()
              setShowMeetingModal(false)
            }}
          />

          <ApplyTemplateModal
            isOpen={showTemplateModal}
            onClose={() => {
              setShowTemplateModal(false)
              setSelectedProjectForTemplate(null)
            }}
            projectId={selectedProjectForTemplate?.id || null}
            projectName={selectedProjectForTemplate?.name}
            onSuccess={() => {
              // Projects list will auto-refresh on tab switch or modal close
              setShowTemplateModal(false)
              setSelectedProjectForTemplate(null)
            }}
          />
        </>
      )}
    </>
  )
}

// Overview Tab Component
function OverviewTab({
  client,
  currentBalance,
  currentSubscription,
  totalHours,
  usedHours,
  remainingHours,
  usagePercentage,
  projectCount,
  onLogHours,
  onScheduleMeeting,
}: any) {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onLogHours}
          className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Clock size={20} className="text-purple-600" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900">Log Hours</div>
            <div className="text-sm text-gray-600">Track talent work</div>
          </div>
        </button>

        <button
          onClick={onScheduleMeeting}
          className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Video size={20} className="text-blue-600" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900">Schedule Meeting</div>
            <div className="text-sm text-gray-600">Book a call</div>
          </div>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-green-600" />
            <span className="text-sm text-gray-600">Total Hours</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalHours.toFixed(1)}h</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={20} className="text-blue-600" />
            <span className="text-sm text-gray-600">Used</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{usedHours.toFixed(1)}h</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen size={20} className="text-purple-600" />
            <span className="text-sm text-gray-600">Projects</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{projectCount}</p>
        </div>
      </div>

      {/* Hours Usage Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Hours Balance</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                {remainingHours.toFixed(1)}h remaining
              </span>
              <span className="text-sm text-gray-600">{usagePercentage.toFixed(0)}% used</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  usagePercentage > 80
                    ? 'bg-red-500'
                    : usagePercentage > 60
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Hours Breakdown */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <div className="text-xs text-gray-600 mb-1">Allocated</div>
              <div className="text-sm font-semibold text-gray-900">
                {currentBalance?.allocatedHours || 0}h
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Bonus</div>
              <div className="text-sm font-semibold text-gray-900">
                {currentBalance?.bonusHours || 0}h
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Extra Purchased</div>
              <div className="text-sm font-semibold text-gray-900">
                {currentBalance?.extraPurchasedHours || 0}h
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Rollover</div>
              <div className="text-sm font-semibold text-gray-900">
                {Number(currentBalance?.rolloverHours || 0).toFixed(1)}h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      {currentSubscription && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Subscription</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Plan</div>
              <div className="text-lg font-semibold text-gray-900">{currentSubscription.plan}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(currentSubscription.status)}`}>
                {currentSubscription.status}
              </span>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Monthly Hours</div>
              <div className="text-lg font-semibold text-gray-900">
                {currentSubscription.monthlyHours || 0}h
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Projects Tab Component
function ProjectsTab({ projects, loading, onApplyTemplate }: any) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
        <p className="text-gray-600">This client hasn't started any projects</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project: any) => (
        <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description || 'No description'}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{project._count?.tasks || 0}</span> tasks
              </div>
              {project.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  Due {formatDistanceToNow(new Date(project.dueDate), { addSuffix: true })}
                </div>
              )}
            </div>
            <button
              onClick={() => onApplyTemplate(project.id, project.title)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FileText size={16} />
              Apply Template
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Hours Tab Component  
function HoursTab({ timeLogs, loading, onLogHours }: any) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Time Logs ({timeLogs.length})</h3>
        <button
          onClick={onLogHours}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Log Hours
        </button>
      </div>

      {timeLogs.length === 0 ? (
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hours Logged</h3>
          <p className="text-gray-600">Start logging hours for talent work</p>
        </div>
      ) : (
        timeLogs.map((log: any) => (
          <div key={log.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{log.user.fullName}</div>
                <div className="text-sm text-gray-600">{log.task.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(log.startTime), { addSuffix: true })}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {formatMinutes(Number(log.durationMinutes))}
              </div>
              {log.isApproved && (
                <span className="text-xs text-green-600 font-semibold">✓ Approved</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// Meetings Tab Component
function MeetingsTab({ meetings, loading, onScheduleMeeting }: any) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Meetings ({meetings.length})</h3>
        <button
          onClick={onScheduleMeeting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Schedule Meeting
        </button>
      </div>

      {meetings.length === 0 ? (
        <div className="text-center py-12">
          <Video size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Meetings</h3>
          <p className="text-gray-600">Schedule your first meeting with this client</p>
        </div>
      ) : (
        meetings.map((meeting: any) => (
          <div key={meeting.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-gray-900">{meeting.title || `${meeting.type} Meeting`}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {new Date(meeting.scheduledAt).toLocaleString()}
                </div>
                {meeting.agenda && (
                  <div className="text-sm text-gray-600 mt-2">{meeting.agenda}</div>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(meeting.status)}`}>
                {meeting.status}
              </span>
            </div>
            {meeting.videoRoomUrl && (
              <a
                href={meeting.videoRoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mt-2"
              >
                <Video size={16} />
                Join Meeting
              </a>
            )}
          </div>
        ))
      )}
    </div>
  )
}

// Activity Tab Component
function ActivityTab({ activity }: any) {
  if (activity.length === 0) {
    return (
      <div className="text-center py-12">
        <Activity size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Activity</h3>
        <p className="text-gray-600">Recent activity will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activity.map((item: any) => (
        <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            {item.type === 'TIME_LOG' ? (
              <Clock size={20} className="text-gray-600" />
            ) : (
              <Video size={20} className="text-gray-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">{item.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {formatDistanceToNow(item.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
