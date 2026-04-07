'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ChevronDown,
  ChevronRight,
  Clock,
  MoreVertical,
  Folder,
  CheckSquare,
  User,
  Calendar,
  Eye,
  Pencil,
  XCircle,
  AlertTriangle,
  X,
  Save,
  Loader2,
} from 'lucide-react'
import { useProjects } from '@/hooks/useProjects'
import { projectsApi } from '@/lib/api/client'

// ─── helpers ────────────────────────────────────────────────────────────────

const canEdit = (status: string) => status === 'NOT_STARTED'
const canCancel = (status: string) => status === 'NOT_STARTED' || status === 'IN_PROGRESS'

function getStatusColor(status: string) {
  switch (status) {
    case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700'
    case 'COMPLETED': return 'bg-green-100 text-green-700'
    case 'ON_HOLD': return 'bg-yellow-100 text-yellow-700'
    case 'CANCELLED': return 'bg-red-100 text-red-700'
    case 'NOT_STARTED': return 'bg-orange-100 text-orange-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'IN_PROGRESS': return 'In Progress'
    case 'COMPLETED': return 'Completed'
    case 'ON_HOLD': return 'On Hold'
    case 'CANCELLED': return 'Cancelled'
    case 'NOT_STARTED': return 'Pending Review'
    default: return status.replace(/_/g, ' ')
  }
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

// ─── Three-dot menu ──────────────────────────────────────────────────────────

interface MenuProps {
  projectId: string
  status: string
  onView: () => void
  onEdit: () => void
  onCancel: () => void
}

function ProjectMenu({ projectId, status, onView, onEdit, onCancel }: MenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
        aria-label="Project actions"
      >
        <MoreVertical size={18} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-gray-200 shadow-lg z-20 py-1">
          <button
            onClick={() => { setOpen(false); onView() }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye size={15} className="text-gray-400" />
            View details
          </button>
          {canEdit(status) && (
            <button
              onClick={() => { setOpen(false); onEdit() }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Pencil size={15} className="text-gray-400" />
              Edit request
            </button>
          )}
          {canCancel(status) && (
            <button
              onClick={() => { setOpen(false); onCancel() }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1 pt-2"
            >
              <XCircle size={15} />
              Cancel request
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Edit Modal ──────────────────────────────────────────────────────────────

interface EditModalProps {
  project: any
  onClose: () => void
  onSaved: (updated: any) => void
}

function EditModal({ project, onClose, onSaved }: EditModalProps) {
  const [title, setTitle] = useState(project.title ?? '')
  const [description, setDescription] = useState(project.description ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!title.trim()) { setError('Title is required.'); return }
    if (title.trim().length < 5) { setError('Title must be at least 5 characters.'); return }
    setSaving(true)
    setError(null)
    try {
      const res = await projectsApi.update(project.id, {
        title: title.trim(),
        description: description.trim() || null,
      })
      if (res.success) {
        onSaved(res.data)
      } else {
        setError(res.error || 'Failed to save changes.')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Edit Request</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={80}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{title.length}/80</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe what you need done…"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Cancel Confirm Dialog ───────────────────────────────────────────────────

interface CancelDialogProps {
  project: any
  onClose: () => void
  onCancelled: () => void
}

function CancelDialog({ project, onClose, onCancelled }: CancelDialogProps) {
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isInProgress = project.status === 'IN_PROGRESS'

  const handleConfirm = async () => {
    setCancelling(true)
    setError(null)
    try {
      const res = await projectsApi.update(project.id, { status: 'CANCELLED' })
      if (res.success) {
        onCancelled()
      } else {
        setError(res.error || 'Failed to cancel request.')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to cancel request.')
    } finally {
      setCancelling(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-1">Cancel this request?</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isInProgress
                  ? 'Work is currently in progress on this request. Cancelling will stop any ongoing work. This cannot be undone.'
                  : 'This will cancel your work request. This cannot be undone.'}
              </p>
              <p className="text-sm font-medium text-gray-800 mt-2">"{project.title}"</p>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={cancelling}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Keep request
          </button>
          <button
            onClick={handleConfirm}
            disabled={cancelling}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {cancelling ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
            {cancelling ? 'Cancelling…' : 'Yes, cancel it'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProjectsList() {
  const router = useRouter()
  const { projects, loading, error, refresh } = useProjects()
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('projects')

  const [editingProject, setEditingProject] = useState<any>(null)
  const [cancellingProject, setCancellingProject] = useState<any>(null)

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading requests…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4 text-sm">{error}</p>
          <button
            onClick={refresh}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Edit Modal */}
      {editingProject && (
        <EditModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSaved={() => { setEditingProject(null); refresh() }}
        />
      )}

      {/* Cancel Confirm Dialog */}
      {cancellingProject && (
        <CancelDialog
          project={cancellingProject}
          onClose={() => setCancellingProject(null)}
          onCancelled={() => { setCancellingProject(null); refresh() }}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Projects & Tasks</h1>
          <p className="text-sm text-gray-500">
            Use "Request New Task" from your dashboard to submit new work requests
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-6">
            {[
              { id: 'projects', label: 'All Projects' },
              { id: 'tasks', label: 'All Tasks' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-2 font-semibold text-sm transition-colors relative ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Projects Tab ───────────────────────────────────────────────── */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Folder size={32} className="text-gray-400" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">No work requests yet</p>
                <p className="text-sm text-gray-500 mb-6">
                  Start by requesting a new task from your dashboard.
                </p>
                <button
                  onClick={() => router.push('/client-dashboard')}
                  className="px-6 py-2.5 bg-[#FF9634] text-white rounded-lg hover:bg-[#E88530] text-sm font-medium transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              projects.map((project: any) => {
                const isExpanded = expandedProject === project.id
                const completedTasks = project.tasks?.filter((t: any) => t.status === 'COMPLETED').length ?? 0
                const totalTasks = project.tasks?.length ?? 0
                const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

                // Collect unique assigned talent from tasks
                const assignedTalent: any[] = []
                const seen = new Set<string>()
                project.tasks?.forEach((t: any) => {
                  if (t.assignedTo && !seen.has(t.assignedTo.id)) {
                    seen.add(t.assignedTo.id)
                    assignedTalent.push(t.assignedTo)
                  }
                })

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    {/* Project Header */}
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        {/* Expand toggle */}
                        <button
                          className="mt-1 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => toggleProject(project.id)}
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        </button>

                        {/* Project info — clickable to detail */}
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => router.push(`/tasks-projects/${project.id}`)}
                        >
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors">
                              {project.title}
                            </h3>
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                              {getStatusText(project.status)}
                            </span>
                          </div>

                          <p className="text-xs text-gray-400 mb-2">#{project.projectNumber}</p>

                          {project.description && (
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{project.description}</p>
                          )}

                          {/* Meta row */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            {/* Assigned talent */}
                            {assignedTalent.length > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  {assignedTalent.slice(0, 3).map((t: any) => (
                                    <div
                                      key={t.id}
                                      className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                                      title={t.fullName}
                                    >
                                      {t.avatarUrl
                                        ? <img src={t.avatarUrl} alt="" className="w-7 h-7 rounded-full object-cover" />
                                        : getInitials(t.fullName)
                                      }
                                    </div>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {assignedTalent.slice(0, 3).map((t: any) => t.fullName).join(', ')}
                                </span>
                              </div>
                            )}

                            <span className="text-xs">
                              <span className="font-semibold text-gray-700">{completedTasks}</span>
                              <span className="text-gray-400">/{totalTasks} tasks</span>
                            </span>
                          </div>

                          {/* Progress bar */}
                          {totalTasks > 0 && (
                            <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Three-dot menu */}
                        <ProjectMenu
                          projectId={project.id}
                          status={project.status}
                          onView={() => router.push(`/tasks-projects/${project.id}`)}
                          onEdit={() => setEditingProject(project)}
                          onCancel={() => setCancellingProject(project)}
                        />
                      </div>
                    </div>

                    {/* Expanded Tasks */}
                    {isExpanded && (
                      <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tasks</p>
                        {totalTasks === 0 ? (
                          <p className="text-sm text-gray-400 py-2 text-center">No tasks yet</p>
                        ) : (
                          <div className="space-y-2">
                            {project.tasks?.map((task: any) => (
                              <div
                                key={task.id}
                                className="bg-white rounded-lg border border-gray-200 px-4 py-3"
                              >
                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                  <h5 className="text-sm font-semibold text-gray-900">{task.name}</h5>
                                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                    {getStatusText(task.status)}
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                  {task.assignedTo && (
                                    <span className="flex items-center gap-1.5">
                                      <User size={13} />
                                      {task.assignedTo.fullName}
                                    </span>
                                  )}
                                  {task.loggedMinutes > 0 && (
                                    <span className="flex items-center gap-1.5">
                                      <Clock size={13} />
                                      {Math.floor(task.loggedMinutes / 60)}h {task.loggedMinutes % 60}m logged
                                    </span>
                                  )}
                                  {task.dueDate && (
                                    <span className="flex items-center gap-1.5">
                                      <Calendar size={13} />
                                      {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* ── Tasks Tab ──────────────────────────────────────────────────── */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
            {(() => {
              const allTasks = projects.flatMap((p: any) =>
                (p.tasks ?? []).map((t: any) => ({ ...t, projectTitle: p.title, projectId: p.id }))
              )

              if (allTasks.length === 0) {
                return (
                  <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckSquare size={32} className="text-gray-400" />
                    </div>
                    <p className="text-base font-semibold text-gray-900 mb-2">No tasks yet</p>
                    <p className="text-sm text-gray-500">
                      Tasks will appear here once your CSM assigns work on your requests.
                    </p>
                  </div>
                )
              }

              return allTasks.map((task: any) => (
                <div
                  key={task.id}
                  onClick={() => router.push(`/tasks-projects/${task.projectId}`)}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm font-semibold text-gray-900">{task.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="font-mono">{task.taskNumber}</span>
                        <span>·</span>
                        <span>{task.projectTitle}</span>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                      task.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                      task.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                      task.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    {task.assignedTo && (
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        {task.assignedTo.fullName}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    {task.loggedMinutes > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {Math.floor(task.loggedMinutes / 60)}h {task.loggedMinutes % 60}m logged
                      </span>
                    )}
                  </div>
                </div>
              ))
            })()}
          </div>
        )}
      </div>
    </>
  )
}
