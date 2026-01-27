'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, ChevronDown, ChevronRight, FolderOpen } from 'lucide-react'

interface Task {
  id: string
  taskNumber: string
  name: string
  status: string
  priority: string
  assignedTo?: {
    fullName: string
    avatarUrl?: string | null
  } | null
  dueDate?: Date | null
  loggedMinutes: number
  estimatedMinutes?: number | null
}

interface Project {
  id: string
  projectNumber: string
  title: string
  description?: string | null
  status: string
  priority: string
  estimatedHours?: number | null
  dueDate?: Date | null
  createdAt: Date
  tasks: Task[]
}

interface RequestSummaryProps {
  projects: Project[]
  hasActiveSubscription?: boolean
}

export default function RequestSummary({ projects = [], hasActiveSubscription = false }: RequestSummaryProps) {
  const router = useRouter()
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState('all')

  // Categorize projects by status
  const pendingProjects = projects.filter(p => 
    p.tasks.some(t => t.status === 'PENDING') && p.status === 'NOT_STARTED'
  )
  const activeProjects = projects.filter(p => 
    p.status === 'IN_PROGRESS' || p.tasks.some(t => t.status === 'ACTIVE' || t.status === 'IN_REVIEW')
  )

  const tabs = [
    { id: 'all', label: 'All Requests', count: projects.length },
    { id: 'pending', label: 'Pending Review', count: pendingProjects.length },
    { id: 'active', label: 'In Progress', count: activeProjects.length },
  ]

  const displayedProjects = activeTab === 'all' ? projects 
    : activeTab === 'pending' ? pendingProjects
    : activeProjects

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedProjects(newExpanded)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'No due date'
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`
    }
    if (hours > 0) {
      return `${hours} hrs`
    }
    return `${mins} min`
  }

  const getProjectStatus = (project: Project) => {
    const hasPendingTasks = project.tasks.some(t => t.status === 'PENDING')
    const hasActiveTasks = project.tasks.some(t => t.status === 'ACTIVE' || t.status === 'IN_REVIEW')
    
    if (hasPendingTasks && project.status === 'NOT_STARTED') {
      return { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' }
    }
    if (hasActiveTasks || project.status === 'IN_PROGRESS') {
      return { label: 'In Progress', color: 'bg-blue-100 text-blue-800' }
    }
    return { label: project.status.replace('_', ' '), color: 'bg-gray-100 text-gray-800' }
  }

  const getTotalLoggedHours = (project: Project) => {
    const totalMinutes = project.tasks.reduce((sum, task) => sum + task.loggedMinutes, 0)
    return formatMinutes(totalMinutes)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Work Requests</h2>
        <button 
          onClick={() => router.push('/tasks-projects')}
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
        >
          View all
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 sm:gap-6 border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-1 sm:px-2 relative whitespace-nowrap text-sm sm:text-base ${
              activeTab === tab.id
                ? 'text-blue-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} <span className="text-gray-400 text-xs sm:text-sm">{tab.count}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {displayedProjects.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FolderOpen size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">No requests yet</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {activeTab === 'pending' && 'No requests pending review.'}
              {activeTab === 'active' && 'No active requests.'}
              {activeTab === 'all' && (hasActiveSubscription 
                ? "Click 'Request New Task' above to submit your first work request."
                : "After your strategy call and plan selection, you can start requesting work from expert Knacksters.")}
            </p>
          </div>
        ) : (
          displayedProjects.map((project) => {
            const isExpanded = expandedProjects.has(project.id)
            const status = getProjectStatus(project)
            const totalHours = getTotalLoggedHours(project)
            
            return (
              <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all">
                {/* Project Header */}
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleProject(project.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <button className="mt-0.5 text-gray-400 hover:text-gray-600 transition-colors">
                        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-gray-900">
                            {project.title}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">Request #{project.projectNumber}</p>
                        {project.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center gap-6 text-xs text-gray-600 ml-8">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-gray-400" />
                      <span>{totalHours} logged</span>
                    </div>
                    <div>
                      <span className="font-medium">{project.tasks.length}</span> {project.tasks.length === 1 ? 'task' : 'tasks'}
                    </div>
                    {project.dueDate && (
                      <div>Due {formatDate(project.dueDate)}</div>
                    )}
                  </div>
                </div>

                {/* Expanded Tasks */}
                {isExpanded && project.tasks.length > 0 && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-4 space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tasks</p>
                      {project.tasks.map((task) => (
                        <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-semibold text-gray-900">{task.name}</h4>
                                {task.status === 'PENDING' && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                    Pending
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">Task #{task.taskNumber}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Assigned To</p>
                              {task.status === 'PENDING' ? (
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-yellow-600" />
                                  <p className="text-xs font-medium text-yellow-700">Awaiting assignment</p>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-semibold">
                                      {task.assignedTo ? getInitials(task.assignedTo.fullName) : 'NA'}
                                    </span>
                                  </div>
                                  <p className="text-xs font-medium text-gray-900">
                                    {task.assignedTo?.fullName || 'Unassigned'}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Hours Logged</p>
                              <p className="text-xs font-semibold text-gray-900">
                                {formatMinutes(task.loggedMinutes)}
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Due Date</p>
                              <p className="text-xs font-medium text-gray-900">
                                {formatDate(task.dueDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
