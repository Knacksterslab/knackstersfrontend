'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Clock, MoreVertical, Folder, CheckSquare, User, Calendar } from 'lucide-react'
import { useProjects } from '@/hooks/useProjects'

export default function ProjectsList() {
  const { projects, loading, error, refresh } = useProjects()
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('projects')

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700'
      case 'COMPLETED':
        return 'bg-green-100 text-green-700'
      case 'ON_HOLD':
        return 'bg-yellow-100 text-yellow-700'
      case 'CANCELLED':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'In Progress'
      case 'COMPLETED':
        return 'Completed'
      case 'ON_HOLD':
        return 'On Hold'
      case 'CANCELLED':
        return 'Cancelled'
      case 'PENDING':
        return 'Not Started'
      default:
        return status
    }
  }

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Projects & Tasks
            </h1>
            <p className="text-sm text-gray-500">Manage your projects and tasks - use "Request New Task" from your dashboard to create new work requests</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-6">
            <button
              className={`pb-3 px-2 font-semibold transition-colors relative ${
                activeTab === 'projects'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              All Projects
              {activeTab === 'projects' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              className={`pb-3 px-2 font-semibold transition-colors relative ${
                activeTab === 'tasks'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              All Tasks
              {activeTab === 'tasks' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Projects List */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Folder size={32} className="text-gray-400" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">No work requests yet</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Start by requesting a new task from your dashboard. Your account manager will review and create a project for you.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/client-dashboard'}
                    className="px-6 py-3 bg-[#FF9634] text-white rounded-lg hover:bg-[#E88530] transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              projects.map((project: any) => {
                const isExpanded = expandedProject === project.id
                const completedTasks = project.tasks?.filter(
                  (t: any) => t.status === 'COMPLETED'
                ).length || 0
                const totalTasks = project.tasks?.length || 0
                const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

                return (
                  <div key={project.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Project Header */}
                    <div
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleProject(project.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          {/* Expand Icon */}
                          <button className="flex-shrink-0">
                            {isExpanded ? (
                              <ChevronDown size={20} className="text-gray-600" />
                            ) : (
                              <ChevronRight size={20} className="text-gray-600" />
                            )}
                          </button>

                          {/* Project Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">
                                {project.title}
                              </h3>
                              <span className="text-sm text-gray-500">#{project.projectNumber}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              {/* Assignees */}
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">Team:</span>
                                <div className="flex -space-x-2">
                                  {project.assignees?.slice(0, 3).map((assignee: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                                      title={assignee.user?.fullName}
                                    >
                                      {getInitials(assignee.user?.fullName || 'U')}
                                    </div>
                                  ))}
                                  {project.assignees?.length > 3 && (
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold border-2 border-white">
                                      +{project.assignees.length - 3}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Status */}
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  project.status
                                )}`}
                              >
                                {getStatusText(project.status)}
                              </span>

                              {/* Progress */}
                              <span className="text-gray-600">
                                {completedTasks} / {totalTasks} tasks
                              </span>
                            </div>

                            {/* Progress Bar */}
                            {totalTasks > 0 && (
                              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* More Options */}
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <MoreVertical size={20} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Tasks */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <h4 className="font-semibold text-gray-900 mb-3">Tasks</h4>
                        {project.tasks?.length === 0 ? (
                          <p className="text-gray-500 text-sm py-4 text-center">
                            No tasks in this project yet
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {project.tasks?.map((task: any) => (
                              <div
                                key={task.id}
                                className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900 mb-1">
                                      {task.name}
                                    </h5>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                      <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {Math.round(task.loggedMinutes / 60)}h logged
                                      </span>
                                      {task.assignedTo && (
                                        <span>
                                          Assigned to: {task.assignedTo.fullName}
                                        </span>
                                      )}
                                      <span
                                        className={`px-2 py-1 rounded ${getStatusColor(
                                          task.status
                                        )}`}
                                      >
                                        {getStatusText(task.status)}
                                      </span>
                                    </div>
                                  </div>
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

        {/* All Tasks View */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {(() => {
              // Flatten all tasks from all projects
              const allTasks = projects.flatMap(project => 
                project.tasks.map((task: any) => ({
                  ...task,
                  projectTitle: project.title,
                  projectNumber: project.projectNumber,
                  projectId: project.id
                }))
              )

              if (allTasks.length === 0) {
                return (
                  <div className="bg-white rounded-lg p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckSquare size={32} className="text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</p>
                    <p className="text-sm text-gray-500">
                      Tasks will appear here when your account manager assigns work to you
                    </p>
                  </div>
                )
              }

              return allTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-900">{task.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          task.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                          task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                          task.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                          task.status === 'ON_HOLD' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span className="font-mono">{task.taskNumber}</span>
                        <span>•</span>
                        <span className="text-gray-500">{task.projectTitle}</span>
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{task.description}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                      task.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                      task.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {task.assignedTo && (
                      <div className="flex items-center gap-1.5">
                        <User size={14} />
                        <span>{task.assignedTo.fullName}</span>
                      </div>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{task.loggedMinutes ? `${Math.floor(task.loggedMinutes / 60)}h ${task.loggedMinutes % 60}m logged` : 'No time logged'}</span>
                    </div>
                  </div>
                </div>
              ))
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
