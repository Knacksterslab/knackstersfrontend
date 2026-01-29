'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import TaskAssignmentModal from './TaskAssignmentModal'
import ApplyTemplateModal from './ApplyTemplateModal'
import { 
  ClipboardList, 
  Plus,
  Calendar,
  Clock,
  User,
  Users,
  ArrowRight,
  CheckCircle,
  Loader2,
  FileText
} from 'lucide-react'
import { useManagerTasks } from '@/hooks/useManagerTasks'
import { useManagerDashboard } from '@/hooks/useManagerDashboard'
import { getStatusColor, getPriorityColor } from '@/lib/transformers/manager'
import { formatDistanceToNow } from 'date-fns'

export default function ManagerAssignmentsPage() {
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [selectedProjectForTemplate, setSelectedProjectForTemplate] = useState<{id: string, name: string} | null>(null)
  const [selectedTab, setSelectedTab] = useState<'unassigned' | 'assigned' | 'completed'>('unassigned')
  const { categorizedTasks, loading, error, refresh } = useManagerTasks()
  const { data: dashboardData } = useManagerDashboard()

  const handleAssignClick = (task: any) => {
    setSelectedTask(task)
    setShowAssignModal(true)
  }

  const handleAssignSuccess = () => {
    refresh() // Refresh the task list
    setShowAssignModal(false)
    setSelectedTask(null)
  }

  const handleApplyTemplateClick = () => {
    // Get first project from dashboard data
    // TODO: Add projects to dashboard data or fetch from clients
    const firstClient = dashboardData?.clients?.[0]
    const firstProject = firstClient?.clientProjects?.[0]
    if (firstProject) {
      setSelectedProjectForTemplate({ id: firstProject.id, name: firstProject.name || 'Project' })
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
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`
    }
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
                <button 
                  onClick={() => setShowAssignModal(true)}
                  className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Create Task
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
                <p className="text-3xl font-bold text-gray-900">
                  {categorizedTasks.all.length}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center border-b border-gray-200">
                <button
                  onClick={() => setSelectedTab('unassigned')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'unassigned'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Unassigned Tasks ({unassignedTasks.length})
                </button>
                <button
                  onClick={() => setSelectedTab('assigned')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'assigned'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Assigned Tasks ({assignedTasks.length})
                </button>
                <button
                  onClick={() => setSelectedTab('completed')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'completed'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Completed ({completedTasks.length})
                </button>
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
                      <p className="text-gray-600">
                        All tasks have been assigned to talent. Great work!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {unassignedTasks.map((task) => (
                        <div key={task.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                                  {task.priority} priority
                                </span>
                              </div>
                              {task.description && (
                                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
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
                            <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                              Edit Task
                            </button>
                          </div>
                        </div>
                      ))}
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
                      <p className="text-gray-600">
                        There are no tasks currently in progress.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {assignedTasks.map((task) => {
                        // Calculate progress based on estimated vs logged minutes
                        const progress = task.estimatedMinutes && task.estimatedMinutes > 0
                          ? Math.min(Math.round((Number(task.loggedMinutes) / task.estimatedMinutes) * 100), 100)
                          : 0
                        
                        return (
                          <div key={task.id} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                                    {task.status.replace('_', ' ')}
                                  </span>
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
                              <button className="flex-1 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                                View Details
                              </button>
                              <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
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
                      <p className="text-gray-600">
                        Completed tasks will appear here.
                      </p>
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

                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
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

            {/* Quick Actions */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-between p-4 bg-white border border-purple-200 rounded-lg hover:shadow-md transition-all">
                  <span className="font-semibold text-gray-900">Match by Skills</span>
                  <ArrowRight size={20} className="text-purple-600" />
                </button>
                <button className="flex items-center justify-between p-4 bg-white border border-purple-200 rounded-lg hover:shadow-md transition-all">
                  <span className="font-semibold text-gray-900">View Talent Availability</span>
                  <ArrowRight size={20} className="text-purple-600" />
                </button>
                <button className="flex items-center justify-between p-4 bg-white border border-purple-200 rounded-lg hover:shadow-md transition-all">
                  <span className="font-semibold text-gray-900">Task Reports</span>
                  <ArrowRight size={20} className="text-purple-600" />
                </button>
              </div>
      </div>

      {/* Task Assignment Modal */}
      <TaskAssignmentModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false)
          setSelectedTask(null)
        }}
        task={selectedTask}
        onSuccess={handleAssignSuccess}
      />

      {/* Apply Template Modal */}
      <ApplyTemplateModal
        isOpen={showTemplateModal}
        onClose={() => {
          setShowTemplateModal(false)
          setSelectedProjectForTemplate(null)
        }}
        projectId={selectedProjectForTemplate?.id || null}
        projectName={selectedProjectForTemplate?.name}
        onSuccess={handleTemplateSuccess}
      />
    </ManagerPageWrapper>
  )
}

