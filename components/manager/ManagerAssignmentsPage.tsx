'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import TaskAssignmentModal from './TaskAssignmentModal'
import ApplyTemplateModal from './ApplyTemplateModal'
import { 
  ClipboardList, 
  Calendar,
  Clock,
  User,
  Users,
  CheckCircle,
  Loader2,
  FileText,
  X,
  Save,
  AlertCircle
} from 'lucide-react'
import { useManagerTasks } from '@/hooks/useManagerTasks'
import { useManagerDashboard } from '@/hooks/useManagerDashboard'
import { getStatusColor, getPriorityColor } from '@/lib/transformers/manager'
import { formatDistanceToNow } from 'date-fns'
import { managerApi } from '@/lib/api/client'

function parseTaskType(taskType?: string | null): { isTrialToHire: boolean; categoryLabel: string | null } {
  if (!taskType) return { isTrialToHire: false, categoryLabel: null }
  const isTrialToHire = taskType.startsWith('TRIAL')
  const raw = isTrialToHire ? taskType.replace(/^TRIAL_?/, '') : taskType
  const categoryLabel = raw && raw !== 'HIRE' ? raw.charAt(0) + raw.slice(1).toLowerCase() : null
  return { isTrialToHire, categoryLabel }
}

// ---------- Edit Task Modal ----------
interface EditTaskModalProps {
  task: any
  onClose: () => void
  onSuccess: () => void
}

function EditTaskModal({ task, onClose, onSuccess }: EditTaskModalProps) {
  const [form, setForm] = useState({
    name: task.name || '',
    description: task.description || '',
    priority: task.priority || 'NORMAL',
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
    estimatedMinutes: task.estimatedMinutes != null ? String(task.estimatedMinutes) : '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!form.name.trim()) return setError('Task name is required')
    setSaving(true)
    setError('')
    try {
      const res = await managerApi.updateTask(task.id, {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        priority: form.priority,
        dueDate: form.dueDate || null,
        estimatedMinutes: form.estimatedMinutes ? Number(form.estimatedMinutes) : null,
      })
      if (!res.success) throw new Error((res as any).error || 'Failed to save')
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to save task')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Edit Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Task Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm bg-white"
              >
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated Minutes</label>
            <input
              type="number"
              min="0"
              value={form.estimatedMinutes}
              onChange={e => setForm(p => ({ ...p, estimatedMinutes: e.target.value }))}
              placeholder="e.g. 120"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- Task Detail Modal ----------
interface TaskDetailModalProps {
  task: any
  onClose: () => void
  onReassign?: (task: any) => void
}

function TaskDetailModal({ task, onClose, onReassign }: TaskDetailModalProps) {
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) return `${hours}h ${mins > 0 ? `${mins}m` : ''}`
    return `${mins}m`
  }

  const { isTrialToHire, categoryLabel } = parseTaskType(task.taskType)
  const progress = task.estimatedMinutes && task.estimatedMinutes > 0
    ? Math.min(Math.round((Number(task.loggedMinutes) / task.estimatedMinutes) * 100), 100)
    : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-900">Task Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {/* Title + badges */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                {task.priority} priority
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
              {isTrialToHire && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">⭐ Trial to Hire</span>
              )}
              {categoryLabel && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">{categoryLabel}</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{task.name}</h3>
            <p className="text-sm text-blue-600 font-medium">Task #{task.taskNumber}</p>
          </div>

          {task.description && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">{task.description}</p>
            </div>
          )}

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Client</p>
              <p className="text-sm text-gray-900">{task.project?.client?.fullName || task.project?.client?.companyName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Project</p>
              <p className="text-sm text-gray-900">{task.project?.title || 'N/A'}</p>
            </div>
            {task.assignedTo && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Assigned To</p>
                <p className="text-sm text-gray-900">{task.assignedTo.fullName}</p>
              </div>
            )}
            {task.dueDate && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Due Date</p>
                <p className="text-sm text-gray-900">{formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}</p>
              </div>
            )}
          </div>

          {/* Time progress */}
          {task.estimatedMinutes && task.estimatedMinutes > 0 && (
            <div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Time Logged</span>
                <span className="font-semibold">
                  {formatMinutes(Number(task.loggedMinutes))} / {formatMinutes(task.estimatedMinutes)}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    progress >= 100 ? 'bg-green-500' : progress >= 75 ? 'bg-blue-500' : 'bg-purple-500'
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
            </div>
          )}

          {task.completedAt && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Completed</p>
              <p className="text-sm text-gray-900">{formatDistanceToNow(new Date(task.completedAt), { addSuffix: true })}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
          {onReassign && task.status !== 'COMPLETED' && (
            <button
              onClick={() => { onClose(); onReassign(task) }}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
            >
              Reassign
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- Main Page ----------
export default function ManagerAssignmentsPage() {
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [selectedProjectForTemplate, setSelectedProjectForTemplate] = useState<{id: string, name: string} | null>(null)
  const [selectedTab, setSelectedTab] = useState<'unassigned' | 'assigned' | 'completed'>('unassigned')
  const { categorizedTasks, loading, error, refresh } = useManagerTasks()
  const { data: dashboardData } = useManagerDashboard()

  const handleAssignClick = (task: any) => {
    setSelectedTask(task)
    setShowAssignModal(true)
  }

  const handleEditClick = (task: any) => {
    setSelectedTask(task)
    setShowEditModal(true)
  }

  const handleViewDetailsClick = (task: any) => {
    setSelectedTask(task)
    setShowDetailModal(true)
  }

  const handleReassignClick = (task: any) => {
    setSelectedTask(task)
    setShowAssignModal(true)
  }

  const handleAssignSuccess = () => {
    refresh()
    setShowAssignModal(false)
    setSelectedTask(null)
  }

  const handleEditSuccess = () => {
    refresh()
    setShowEditModal(false)
    setSelectedTask(null)
  }

  // Build a flat list of all projects from all managed clients for template use
  const handleApplyTemplateClick = () => {
    const allProjects: Array<{ id: string; name: string }> = []
    if (dashboardData?.clients) {
      for (const client of dashboardData.clients) {
        if (client.clientProjects) {
          for (const p of client.clientProjects) {
            allProjects.push({ id: p.id, name: p.name || p.title || 'Project' })
          }
        }
      }
    }
    if (allProjects.length > 0) {
      setSelectedProjectForTemplate(allProjects[0])
      setShowTemplateModal(true)
    } else {
      // Still open modal — it will handle the missing project gracefully
      setShowTemplateModal(true)
    }
  }

  const handleTemplateSuccess = () => {
    refresh()
    setShowTemplateModal(false)
    setSelectedProjectForTemplate(null)
  }

  const unassignedTasks = categorizedTasks.unassigned || []
  const assignedTasks = categorizedTasks.assigned || []
  const completedTasks = categorizedTasks.completed || []

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'No due date'
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  }

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) return `${hours}h ${mins > 0 ? `${mins}m` : ''}`
    return `${mins}m`
  }

  if (loading) {
    return (
      <ManagerPageWrapper>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-purple-600" size={40} />
        </div>
      </ManagerPageWrapper>
    )
  }

  return (
    <ManagerPageWrapper>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Assignments</h1>
          <p className="text-gray-600">Match client tasks with available talent</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleApplyTemplateClick}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FileText size={20} />
            Apply Template
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList size={20} className="text-orange-600" />
            <span className="text-sm text-gray-600">Unassigned</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{unassignedTasks.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={20} className="text-blue-600" />
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{assignedTasks.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{completedTasks.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-purple-600" />
            <span className="text-sm text-gray-600">Total Tasks</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{categorizedTasks.all.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="flex items-center border-b border-gray-200">
          {([
            { id: 'unassigned', label: `Unassigned Tasks (${unassignedTasks.length})` },
            { id: 'assigned',   label: `Assigned Tasks (${assignedTasks.length})` },
            { id: 'completed',  label: `Completed (${completedTasks.length})` },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-6 py-4 text-sm font-semibold transition-colors ${
                selectedTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Unassigned Tasks */}
        {selectedTab === 'unassigned' && (
          <div className="p-6">
            {unassignedTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardList size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Unassigned Tasks</h3>
                <p className="text-gray-600">All tasks have been assigned to talent. Great work!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {unassignedTasks.map((task) => {
                  const { isTrialToHire, categoryLabel } = parseTaskType(task.taskType)
                  return (
                    <div key={task.id} className={`border rounded-lg p-6 ${isTrialToHire ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                      {isTrialToHire && (
                        <div className="flex items-center gap-2 mb-4 p-3 bg-blue-100 border border-blue-200 rounded-lg">
                          <span className="text-base">⭐</span>
                          <div>
                            <p className="text-sm font-semibold text-blue-800">Trial to Hire</p>
                            <p className="text-xs text-blue-600">Client is evaluating for a longer-term engagement — assign someone available for ongoing subscription work.</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                              {task.priority} priority
                            </span>
                            {categoryLabel && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
                                {categoryLabel}
                              </span>
                            )}
                          </div>
                          {task.description && (
                            <p className="text-sm text-gray-600 mb-3 whitespace-pre-line">{task.description}</p>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users size={16} />
                              <span><strong>Client:</strong> {task.project?.client?.fullName || task.project?.client?.companyName || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <ClipboardList size={16} />
                              <span><strong>Project:</strong> {task.project?.title || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar size={16} />
                              <span><strong>Due:</strong> {formatDate(task.dueDate)}</span>
                            </div>
                          </div>
                          {task.estimatedMinutes && (
                            <div className="flex items-center gap-2 mb-4">
                              <Clock size={16} className="text-gray-400" />
                              <span className="text-sm font-semibold text-gray-700">
                                Estimated: {formatMinutes(task.estimatedMinutes)}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                              Task #{task.taskNumber}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleAssignClick(task)}
                          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <User size={18} />
                          Assign to Talent
                        </button>
                        <button
                          onClick={() => handleEditClick(task)}
                          className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Edit Task
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Assigned Tasks */}
        {selectedTab === 'assigned' && (
          <div className="p-6">
            {assignedTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Tasks</h3>
                <p className="text-gray-600">There are no tasks currently in progress.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assignedTasks.map((task) => {
                  const progress = task.estimatedMinutes && task.estimatedMinutes > 0
                    ? Math.min(Math.round((Number(task.loggedMinutes) / task.estimatedMinutes) * 100), 100)
                    : 0
                  const { isTrialToHire, categoryLabel } = parseTaskType(task.taskType)
                  return (
                    <div key={task.id} className={`border rounded-lg p-6 ${isTrialToHire ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ')}
                            </span>
                            {isTrialToHire && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">⭐ Trial to Hire</span>
                            )}
                            {categoryLabel && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">{categoryLabel}</span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users size={16} />
                              <span><strong>Client:</strong> {task.project?.client?.fullName || task.project?.client?.companyName || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <User size={16} />
                              <span><strong>Assigned to:</strong> {task.assignedTo?.fullName || 'Unassigned'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar size={16} />
                              <span><strong>Due:</strong> {formatDate(task.dueDate)}</span>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                              <span>Time Logged</span>
                              <span className="font-semibold">
                                {formatMinutes(Number(task.loggedMinutes))}
                                {task.estimatedMinutes && ` / ${formatMinutes(task.estimatedMinutes)}`}
                              </span>
                            </div>
                            {task.estimatedMinutes && task.estimatedMinutes > 0 && (
                              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all ${
                                    progress >= 100 ? 'bg-green-500' : progress >= 75 ? 'bg-blue-500' : 'bg-purple-500'
                                  }`}
                                  style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleViewDetailsClick(task)}
                          className="flex-1 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleReassignClick(task)}
                          className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Reassign
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Completed Tasks */}
        {selectedTab === 'completed' && (
          <div className="p-6">
            {completedTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Completed Tasks</h3>
                <p className="text-gray-600">Completed tasks will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <div key={task.id} className="border border-green-200 bg-green-50 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle size={24} className="text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users size={16} />
                            <span><strong>Client:</strong> {task.project?.client?.fullName || task.project?.client?.companyName || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User size={16} />
                            <span><strong>By:</strong> {task.assignedTo?.fullName || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={16} />
                            <span><strong>Completed:</strong> {formatDate(task.completedAt)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={16} />
                            <span><strong>Hours:</strong> {formatMinutes(Number(task.loggedMinutes))}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDetailsClick(task)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle size={18} />
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Task Assignment / Reassign Modal */}
      <TaskAssignmentModal
        isOpen={showAssignModal}
        onClose={() => { setShowAssignModal(false); setSelectedTask(null) }}
        task={selectedTask}
        onSuccess={handleAssignSuccess}
      />

      {/* Apply Template Modal */}
      <ApplyTemplateModal
        isOpen={showTemplateModal}
        onClose={() => { setShowTemplateModal(false); setSelectedProjectForTemplate(null) }}
        projectId={selectedProjectForTemplate?.id || null}
        projectName={selectedProjectForTemplate?.name}
        onSuccess={handleTemplateSuccess}
      />

      {/* Edit Task Modal */}
      {showEditModal && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => { setShowEditModal(false); setSelectedTask(null) }}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Task Detail Modal */}
      {showDetailModal && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => { setShowDetailModal(false); setSelectedTask(null) }}
          onReassign={(t) => { setSelectedTask(t); setShowAssignModal(true) }}
        />
      )}
    </ManagerPageWrapper>
  )
}
