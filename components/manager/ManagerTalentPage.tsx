'use client'

import React, { useState, useEffect, useRef } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import {
  UserCheck,
  Mail,
  Clock,
  Briefcase,
  Filter,
  Loader2,
  AlertCircle,
  Users,
  X,
  CheckCircle2,
  Calendar,
  TrendingUp,
  ChevronRight,
  Globe,
  Linkedin,
  Link,
  MapPin,
} from 'lucide-react'
import { useAvailableTalent, useTalentProfile } from '@/hooks/useManagerTasks'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDueDate(date: string | null | undefined): string {
  if (!date) return 'No due date'
  const d = new Date(date)
  const now = new Date()
  const diffDays = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)}d`
  if (diffDays === 0) return 'Due today'
  if (diffDays === 1) return 'Due tomorrow'
  if (diffDays <= 7) return `Due in ${diffDays}d`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatCompletedDate(date: string | null | undefined): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function parseCategoryLabel(taskType: string | null | undefined): string | null {
  if (!taskType) return null
  const map: Record<string, string> = {
    AI_SOLUTIONS: 'AI Solutions',
    CYBERSECURITY: 'Cybersecurity',
    DEVELOPMENT_DEVOPS: 'Dev & DevOps',
    DESIGN_CREATIVE: 'Design & Creative',
    GROWTH_CUSTOMER_SUCCESS: 'Growth',
    HEALTHCARE_LIFE_SCIENCES: 'Healthcare',
    OTHER: 'Other',
  }
  for (const [key, label] of Object.entries(map)) {
    if (taskType.includes(key)) return label
  }
  return null
}

function getStatusPill(status: string) {
  const styles: Record<string, string> = {
    ACTIVE: 'bg-blue-100 text-blue-700',
    IN_REVIEW: 'bg-purple-100 text-purple-700',
    COMPLETED: 'bg-green-100 text-green-700',
  }
  const labels: Record<string, string> = {
    ACTIVE: 'Active',
    IN_REVIEW: 'In Review',
    COMPLETED: 'Completed',
  }
  return { style: styles[status] ?? 'bg-gray-100 text-gray-700', label: labels[status] ?? status }
}

// ─── Slide-out Panel ──────────────────────────────────────────────────────────

interface TalentPanelProps {
  talentId: string | null
  onClose: () => void
}

function TalentPanel({ talentId, onClose }: TalentPanelProps) {
  const { profile, loading, error } = useTalentProfile(talentId)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = talentId ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [talentId])

  const isOpen = !!talentId

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Talent Profile</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="animate-spin text-purple-600" size={32} />
            </div>
          )}

          {error && (
            <div className="p-6 text-center">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {profile && !loading && (
            <div className="p-6 space-y-6">
              {/* Identity */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
                  {profile.profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.profile.avatarUrl} alt={profile.profile.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-xl font-bold text-white">
                      {getInitials(profile.profile.fullName || 'T')}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{profile.profile.fullName}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                    <Mail size={13} />
                    <span>{profile.profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    {profile.profile.timezone && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={11} />
                        {profile.profile.timezone.replace('_', ' ')}
                      </span>
                    )}
                    {profile.profile.weeklyCapacityHours && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} />
                        {profile.profile.weeklyCapacityHours}h/week
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Member since {new Date(profile.profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Bio */}
              {profile.profile.bio && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">{profile.profile.bio}</p>
                </div>
              )}

              {/* Skills */}
              {profile.profile.skills && profile.profile.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.profile.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile links */}
              {(profile.profile.portfolioUrl || profile.profile.linkedinUrl) && (
                <div className="flex flex-wrap gap-3">
                  {profile.profile.portfolioUrl && (
                    <a
                      href={profile.profile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <Link size={13} />
                      Portfolio
                      <Globe size={11} className="text-gray-400" />
                    </a>
                  )}
                  {profile.profile.linkedinUrl && (
                    <a
                      href={profile.profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <Linkedin size={13} />
                      LinkedIn
                      <Globe size={11} className="text-gray-400" />
                    </a>
                  )}
                </div>
              )}

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-700">{profile.stats.activeTasks}</p>
                  <p className="text-xs text-purple-600 mt-0.5 font-medium">Active tasks</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-700">{profile.stats.completedAllTime}</p>
                  <p className="text-xs text-green-600 mt-0.5 font-medium">Completed all-time</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-700">{profile.stats.completedThisMonth}</p>
                  <p className="text-xs text-blue-600 mt-0.5 font-medium">Done this month</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-orange-700">{profile.stats.hoursThisMonth}h</p>
                  <p className="text-xs text-orange-600 mt-0.5 font-medium">Hours this month</p>
                </div>
              </div>

              {/* Current workload */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={16} className="text-gray-500" />
                  <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    Current Workload
                    {profile.activeTasks.length > 0 && (
                      <span className="ml-2 text-xs font-normal text-gray-400 normal-case tracking-normal">
                        ({profile.activeTasks.length} task{profile.activeTasks.length !== 1 ? 's' : ''})
                      </span>
                    )}
                  </h4>
                </div>

                {profile.activeTasks.length === 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle2 size={20} className="text-green-500 mx-auto mb-1" />
                    <p className="text-sm font-medium text-green-700">No active tasks</p>
                    <p className="text-xs text-green-600 mt-0.5">Available for new work</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {profile.activeTasks.map((task: any) => {
                      const { style, label } = getStatusPill(task.status)
                      const category = parseCategoryLabel(task.taskType)
                      const dueLabel = formatDueDate(task.dueDate)
                      const isOverdue = dueLabel.startsWith('Overdue')
                      return (
                        <div key={task.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <p className="text-sm font-medium text-gray-800 leading-snug">{task.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${style}`}>
                              {label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">
                            {task.project?.client?.companyName || task.project?.client?.fullName}
                            {' · '}
                            {task.project?.title}
                          </p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                              <Calendar size={11} />
                              {dueLabel}
                            </span>
                            {category && (
                              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                {category}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Recently completed */}
              {profile.recentlyCompleted.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={16} className="text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                      Recent Completions
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {profile.recentlyCompleted.map((task: any) => (
                      <div key={task.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                        <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-800 font-medium truncate">{task.name}</p>
                          <p className="text-xs text-gray-400">
                            {task.project?.title}
                            {task.completedAt && ` · ${formatCompletedDate(task.completedAt)}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profile.recentlyCompleted.length === 0 && profile.stats.completedAllTime === 0 && (
                <div className="text-center py-4">
                  <Clock size={20} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No completed tasks yet on this platform</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {profile && !loading && (
          <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
            <a
              href="/manager-dashboard/assignments"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
            >
              Assign a Task to {profile.profile.fullName?.split(' ')[0]}
              <ChevronRight size={16} />
            </a>
          </div>
        )}
      </div>
    </>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ManagerTalentPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [activeTalentId, setActiveTalentId] = useState<string | null>(null)
  const { talent, loading, error, refresh } = useAvailableTalent()

  const getStatus = (assignedTasks: number) => (assignedTasks >= 3 ? 'busy' : 'available')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700'
      case 'busy':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const withStatus = talent.map((t) => ({
    ...t,
    status: getStatus(t._count?.assignedTasks ?? 0),
    currentTasks: t._count?.assignedTasks ?? 0,
  }))

  const filteredTalent = withStatus.filter((t) => {
    if (selectedFilter === 'all') return true
    return t.status === selectedFilter
  })

  const totalAvailable = withStatus.filter((t) => t.status === 'available').length
  const totalBusy = withStatus.filter((t) => t.status === 'busy').length
  const totalOnTasks = withStatus.filter((t) => t.currentTasks > 0).length

  if (loading) {
    return (
      <ManagerPageWrapper>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-purple-600" size={40} />
        </div>
      </ManagerPageWrapper>
    )
  }

  if (error) {
    return (
      <ManagerPageWrapper>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </ManagerPageWrapper>
    )
  }

  return (
    <ManagerPageWrapper>
      {/* Slide-out panel */}
      <TalentPanel talentId={activeTalentId} onClose={() => setActiveTalentId(null)} />

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Talent Pool</h1>
          <p className="text-gray-600">Active talent available for task assignment</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck size={20} className="text-purple-600" />
            <span className="text-sm text-gray-600">Total Active</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{talent.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={20} className="text-green-600" />
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalAvailable}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={20} className="text-blue-600" />
            <span className="text-sm text-gray-600">On Active Tasks</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalOnTasks}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter size={20} />
            <span className="font-semibold">Filter:</span>
          </div>
          <div className="flex gap-2">
            {[
              { id: 'all', label: `All (${withStatus.length})`, active: 'bg-purple-100 text-purple-700' },
              { id: 'available', label: `Available (${totalAvailable})`, active: 'bg-green-100 text-green-700' },
              { id: 'busy', label: `Busy (${totalBusy})`, active: 'bg-yellow-100 text-yellow-700' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === f.id ? f.active : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Talent Grid */}
      {filteredTalent.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users size={40} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">No talent found</p>
          <p className="text-sm text-gray-400 mt-1">
            {talent.length === 0 ? 'No active talent in the system yet.' : 'No talent matches this filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTalent.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setActiveTalentId(person.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
                    {person.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={person.avatarUrl} alt={person.fullName || ''} className="w-14 h-14 object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-white">{getInitials(person.fullName || 'T')}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {person.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail size={14} />
                      <span className="truncate max-w-[200px]">{person.email}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getStatusColor(person.status)}`}
                >
                  {person.status === 'available' ? 'Available' : 'Busy'}
                </span>
              </div>

              {/* Workload */}
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Current workload:</strong>{' '}
                  {person.currentTasks === 0
                    ? 'No active tasks'
                    : `${person.currentTasks} active task${person.currentTasks !== 1 ? 's' : ''}`}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveTalentId(person.id)
                  }}
                  className="flex-1 px-4 py-2 border border-purple-200 text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-sm"
                >
                  View Profile
                </button>
                <a
                  href="/manager-dashboard/assignments"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center text-sm"
                >
                  Assign Task
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </ManagerPageWrapper>
  )
}
