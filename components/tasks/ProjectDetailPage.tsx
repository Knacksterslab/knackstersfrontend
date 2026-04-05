'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import DashboardFooter from '@/components/dashboard/DashboardFooter'
import { projectsApi } from '@/lib/api/client'
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Menu,
  Tag,
  FileText,
  Hash,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'

interface TimeLog {
  durationMinutes: number
}

interface Task {
  id: string
  taskNumber: string
  name: string
  description?: string | null
  status: string
  priority: string
  assignedTo?: { id: string; fullName: string; avatarUrl?: string | null } | null
  dueDate?: string | null
  loggedMinutes: number
  estimatedMinutes?: number | null
  timeLogs?: TimeLog[]
  createdAt: string
}

interface Project {
  id: string
  projectNumber: string
  title: string
  description?: string | null
  status: string
  priority: string
  estimatedHours?: number | null
  dueDate?: string | null
  createdAt: string
  tasks: Task[]
  timeLogs?: TimeLog[]
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  NOT_STARTED: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <Clock size={14} /> },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <Loader2 size={14} className="animate-spin" /> },
  COMPLETED: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200', icon: <CheckCircle2 size={14} /> },
  ON_HOLD: { label: 'On Hold', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: <AlertCircle size={14} /> },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200', icon: <AlertCircle size={14} /> },
}

const TASK_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Awaiting Assignment', color: 'bg-yellow-100 text-yellow-700' },
  ACTIVE: { label: 'Active', color: 'bg-blue-100 text-blue-700' },
  IN_REVIEW: { label: 'In Review', color: 'bg-purple-100 text-purple-700' },
  COMPLETED: { label: 'Completed', color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
}

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  LOW: { label: 'Low', color: 'text-gray-500' },
  MEDIUM: { label: 'Medium', color: 'text-blue-600' },
  HIGH: { label: 'High', color: 'text-orange-600' },
  URGENT: { label: 'Urgent', color: 'text-red-600' },
}

function formatMinutes(minutes: number): string {
  if (!minutes) return '0m'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

interface ProjectDetailPageProps {
  projectId: string
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await projectsApi.getById(projectId)
        if (res.success && res.data) {
          setProject(res.data)
        } else {
          setError('Request not found.')
        }
      } catch {
        setError('Failed to load request details.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [projectId])

  const totalLoggedMinutes = project?.timeLogs?.reduce((s, l) => s + l.durationMinutes, 0) ?? 0

  const projectStatus = project ? (STATUS_CONFIG[project.status] ?? { label: project.status, color: 'bg-gray-100 text-gray-700 border-gray-200', icon: null }) : null

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mb-4 p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-gray-600" />
            </button>

            {/* Back nav */}
            <button
              onClick={() => router.push('/tasks-projects')}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Work Requests
            </button>

            {loading && (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="animate-spin text-gray-400" size={32} />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <AlertCircle className="mx-auto mb-3 text-red-400" size={32} />
                <p className="text-red-700 font-medium">{error}</p>
                <button
                  onClick={() => router.push('/tasks-projects')}
                  className="mt-4 text-sm text-red-600 underline"
                >
                  Go back
                </button>
              </div>
            )}

            {project && projectStatus && (
              <div className="space-y-6">
                {/* Header card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${projectStatus.color}`}>
                          {projectStatus.icon}
                          {projectStatus.label}
                        </span>
                        <span className={`text-xs font-semibold ${PRIORITY_CONFIG[project.priority]?.color ?? 'text-gray-500'}`}>
                          {PRIORITY_CONFIG[project.priority]?.label ?? project.priority} priority
                        </span>
                      </div>
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                        {project.title}
                      </h1>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Hash size={14} />
                      <span className="font-mono">{project.projectNumber}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>Submitted {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span>
                    </div>
                    {project.dueDate && (
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>Due {format(new Date(project.dueDate), 'MMM d, yyyy')}</span>
                      </div>
                    )}
                    {project.estimatedHours && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{project.estimatedHours}h estimated</span>
                      </div>
                    )}
                    {totalLoggedMinutes > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-blue-500" />
                        <span className="text-blue-600 font-medium">{formatMinutes(totalLoggedMinutes)} logged</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                {project.description && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText size={16} className="text-gray-400" />
                      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Description</h2>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{project.description}</p>
                  </div>
                )}

                {/* Tasks */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-gray-400" />
                      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Tasks</h2>
                    </div>
                    <span className="text-xs text-gray-400">{project.tasks.length} {project.tasks.length === 1 ? 'task' : 'tasks'}</span>
                  </div>

                  {project.tasks.length === 0 ? (
                    <div className="px-6 py-10 text-center text-gray-400 text-sm">
                      No tasks yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {project.tasks.map((task) => {
                        const taskStatus = TASK_STATUS_CONFIG[task.status] ?? { label: task.status, color: 'bg-gray-100 text-gray-700' }
                        const taskLoggedMinutes = task.timeLogs?.reduce((s, l) => s + l.durationMinutes, 0) ?? task.loggedMinutes ?? 0

                        return (
                          <div key={task.id} className="px-6 py-5">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <h3 className="text-sm font-semibold text-gray-900">{task.name}</h3>
                                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${taskStatus.color}`}>
                                    {taskStatus.label}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 font-mono">{task.taskNumber}</p>
                              </div>
                            </div>

                            {task.description && (
                              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{task.description}</p>
                            )}

                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
                              {/* Assigned To */}
                              <div className="flex items-center gap-1.5">
                                <User size={13} />
                                {task.status === 'PENDING' || !task.assignedTo ? (
                                  <span className="text-yellow-600 font-medium">Awaiting assignment</span>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                                      {task.assignedTo.avatarUrl ? (
                                        <img src={task.assignedTo.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                                      ) : (
                                        <span className="text-white text-[9px] font-bold">{getInitials(task.assignedTo.fullName)}</span>
                                      )}
                                    </div>
                                    <span className="font-medium text-gray-700">{task.assignedTo.fullName}</span>
                                  </div>
                                )}
                              </div>

                              {/* Hours */}
                              {taskLoggedMinutes > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <Clock size={13} />
                                  <span>{formatMinutes(taskLoggedMinutes)} logged</span>
                                  {task.estimatedMinutes && (
                                    <span className="text-gray-400">/ {formatMinutes(task.estimatedMinutes)} est.</span>
                                  )}
                                </div>
                              )}

                              {/* Due date */}
                              {task.dueDate && (
                                <div className="flex items-center gap-1.5">
                                  <Calendar size={13} />
                                  <span>Due {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Status explanation for pending */}
                {project.status === 'NOT_STARTED' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 flex gap-4">
                    <Clock className="text-orange-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-orange-900 mb-1">Pending Review</p>
                      <p className="text-sm text-orange-700 leading-relaxed">
                        Your Customer Success Manager is reviewing the scope of this request. You'll be notified once an expert is assigned and work begins.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DashboardFooter />
        </main>
      </div>
    </div>
  )
}
