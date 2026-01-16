'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Filter, MoreVertical, Clock } from 'lucide-react'
import TasksKanban from './TasksKanban'

interface Task {
  id: string
  name: string
  assignee: { name: string; avatar: string; color: string }
  startDate: string
  dueDate: string
  estimated: string
  logged: string
}

interface Project {
  id: string
  title: string
  assignees: Array<{ name: string; color: string; initials: string }>
  status: 'In progress' | 'Not Started' | 'Completed' | 'Archived'
  progress: { current: number; total: number }
  tasks: {
    active: Task[]
    pending: Task[]
    completed: Task[]
  }
}

export default function ProjectsList() {
  const [activeTab, setActiveTab] = useState('projects')
  const [expandedProject, setExpandedProject] = useState<string | null>('01')
  const [activeSubTab, setActiveSubTab] = useState('active')

  const projects: Project[] = [
    {
      id: '01',
      title: 'Project Task Title Long Name',
      assignees: [
        { name: 'User 1', color: 'bg-orange-500', initials: 'U1' },
        { name: 'User 2', color: 'bg-red-500', initials: 'U2' },
        { name: 'User 3', color: 'bg-green-500', initials: 'U3' }
      ],
      status: 'In progress',
      progress: { current: 2, total: 5 },
      tasks: {
        active: [
          {
            id: '347U6',
            name: 'Task Name - Lorem Ipsum',
            assignee: { name: 'Ashy Handgun', avatar: 'AH', color: 'bg-orange-500' },
            startDate: 'Oct 11, 14:00',
            dueDate: 'Oct 12, 14:00',
            estimated: '60 m',
            logged: '48 m'
          },
          {
            id: 'U871R',
            name: 'Task Name - Lorem Ipsum Dolores',
            assignee: { name: 'Olivia Thompson', avatar: 'OT', color: 'bg-purple-500' },
            startDate: 'Oct 8, 10:00',
            dueDate: 'Oct 16, 12:00',
            estimated: '140 m',
            logged: '120 m'
          }
        ],
        pending: [],
        completed: []
      }
    },
    {
      id: '02',
      title: 'Project Task Title Long Name',
      assignees: [{ name: 'Ashy Handgun', color: 'bg-orange-500', initials: 'AH' }],
      status: 'Not Started',
      progress: { current: 0, total: 1 },
      tasks: { active: [], pending: [], completed: [] }
    },
    {
      id: '03',
      title: 'Project Task Title Long Name',
      assignees: [{ name: 'Adeline Ballard', color: 'bg-blue-500', initials: 'AB' }],
      status: 'In progress',
      progress: { current: 1, total: 6 },
      tasks: { active: [], pending: [], completed: [] }
    },
    {
      id: '04',
      title: 'Project Task Title Long Name',
      assignees: [
        { name: 'User 1', color: 'bg-orange-500', initials: 'U1' },
        { name: 'User 2', color: 'bg-red-500', initials: 'U2' },
        { name: 'User 3', color: 'bg-pink-500', initials: 'U3' }
      ],
      status: 'Completed',
      progress: { current: 5, total: 5 },
      tasks: { active: [], pending: [], completed: [] }
    },
    {
      id: '05',
      title: 'Project Task Title Long Name',
      assignees: [{ name: 'Carson Darrin', color: 'bg-green-500', initials: 'CD' }],
      status: 'Completed',
      progress: { current: 8, total: 8 },
      tasks: { active: [], pending: [], completed: [] }
    },
    {
      id: '06',
      title: 'Project Task Title Long Name',
      assignees: [{ name: 'Adeline Ballard', color: 'bg-blue-500', initials: 'AB' }],
      status: 'Completed',
      progress: { current: 1, total: 1 },
      tasks: { active: [], pending: [], completed: [] }
    },
    {
      id: '07',
      title: 'Project Task Title Long Name',
      assignees: [
        { name: 'User 1', color: 'bg-orange-500', initials: 'U1' },
        { name: 'User 2', color: 'bg-red-500', initials: 'U2' }
      ],
      status: 'Archived',
      progress: { current: 2, total: 2 },
      tasks: { active: [], pending: [], completed: [] }
    },
    {
      id: '08',
      title: 'Project Task Title Long Name',
      assignees: [{ name: 'Ashy Handgun', color: 'bg-orange-500', initials: 'AH' }],
      status: 'Archived',
      progress: { current: 3, total: 3 },
      tasks: { active: [], pending: [], completed: [] }
    }
  ]

  const getStatusBadge = (status: Project['status']) => {
    const styles = {
      'In progress': 'text-blue-600 bg-blue-50',
      'Not Started': 'text-orange-600 bg-orange-50',
      'Completed': 'text-green-600 bg-green-50',
      'Archived': 'text-gray-600 bg-gray-100'
    }
    return styles[status]
  }

  const getProgressBarColor = (status: Project['status']) => {
    const colors = {
      'In progress': 'bg-blue-500',
      'Not Started': 'bg-orange-500',
      'Completed': 'bg-green-500',
      'Archived': 'bg-gray-500'
    }
    return colors[status]
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Projects</h1>
          <p className="text-xs sm:text-sm text-gray-500">{projects.length} projects total</p>
        </div>
        <button className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
            <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-sm sm:text-base">Create New Task / Project</span>
        </button>
      </div>

      {/* Tabs and Filter */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between bg-white rounded-t-xl border border-gray-200 px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-3 sm:py-4 px-2 relative whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'projects'
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Projects
              {activeTab === 'projects' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-3 sm:py-4 px-2 relative whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'tasks'
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Tasks
              {activeTab === 'tasks' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
            <Filter size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'tasks' ? (
        <TasksKanban />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200">

        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-600">
          <div className="col-span-5">Project Title</div>
          <div className="col-span-3">Assignees</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Progress</div>
        </div>

        {/* Project Rows */}
        <div>
          {projects.map((project) => (
            <div key={project.id} className="border-b border-gray-100 last:border-b-0">
              {/* Project Row - Responsive */}
              <div className="md:grid md:grid-cols-12 gap-4 px-4 sm:px-6 py-4 hover:bg-gray-50 md:items-center">
                {/* Mobile Card Layout */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                        className="p-1 hover:bg-gray-200 rounded flex-shrink-0 mt-0.5"
                      >
                        {expandedProject === project.id ? (
                          <ChevronDown size={18} className="text-gray-600" />
                        ) : (
                          <ChevronRight size={18} className="text-gray-600" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 block">
                          {project.id} - {project.title}
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded flex-shrink-0">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4 pl-7">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {project.assignees.slice(0, 3).map((assignee, idx) => (
                          <div
                            key={idx}
                            className={`w-7 h-7 ${assignee.color} rounded-full flex items-center justify-center border-2 border-white`}
                          >
                            <span className="text-white text-xs font-semibold">{assignee.initials}</span>
                          </div>
                        ))}
                        {project.assignees.length > 3 && (
                          <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white">
                            <span className="text-gray-700 text-xs font-semibold">
                              +{project.assignees.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                      {project.progress.current}/{project.progress.total}
                    </span>
                  </div>
                  
                  <div className="pl-7">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressBarColor(project.status)} rounded-full`}
                        style={{ width: `${(project.progress.current / project.progress.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden md:contents">
                  <div className="col-span-5 flex items-center gap-3">
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      {expandedProject === project.id ? (
                        <ChevronDown size={20} className="text-gray-600" />
                      ) : (
                        <ChevronRight size={20} className="text-gray-600" />
                      )}
                    </button>
                    <span className="text-sm font-medium text-gray-900">
                      {project.id} - {project.title}
                    </span>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <div className="flex -space-x-2">
                      {project.assignees.slice(0, 3).map((assignee, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 ${assignee.color} rounded-full flex items-center justify-center border-2 border-white`}
                        >
                          <span className="text-white text-xs font-semibold">{assignee.initials}</span>
                        </div>
                      ))}
                      {project.assignees.length > 3 && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white">
                          <span className="text-gray-700 text-xs font-semibold">
                            +{project.assignees.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getProgressBarColor(project.status)} rounded-full`}
                          style={{ width: `${(project.progress.current / project.progress.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {project.progress.current}/{project.progress.total}
                    </span>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Task Table */}
              {expandedProject === project.id && project.tasks.active.length > 0 && (
                <div className="bg-gray-50 px-4 sm:px-6 py-4">
                  {/* Sub Tabs */}
                  <div className="flex gap-3 sm:gap-6 mb-4 overflow-x-auto">
                    <button
                      onClick={() => setActiveSubTab('active')}
                      className={`pb-2 px-2 relative whitespace-nowrap text-sm ${
                        activeSubTab === 'active'
                          ? 'text-blue-600 font-semibold'
                          : 'text-gray-600'
                      }`}
                    >
                      Active <span className="text-gray-400 text-xs sm:text-sm">2</span>
                      {activeSubTab === 'active' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                      )}
                    </button>
                    <button className="pb-2 px-2 text-gray-600 whitespace-nowrap text-sm">
                      Pending <span className="text-gray-400 text-xs sm:text-sm">1</span>
                    </button>
                    <button className="pb-2 px-2 text-gray-600 whitespace-nowrap text-sm">
                      Completed <span className="text-gray-400 text-xs sm:text-sm">2</span>
                    </button>
                    <button className="ml-auto p-1 hover:bg-gray-200 rounded flex-shrink-0">
                      <Filter size={16} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Task Table - Horizontally Scrollable on Mobile */}
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                      <div className="overflow-hidden">
                        {/* Task Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-white rounded-t-lg border border-gray-200 text-xs font-semibold text-gray-600 min-w-[800px]">
                          <div className="col-span-1">Task ID</div>
                          <div className="col-span-3">Task Name</div>
                          <div className="col-span-2">Assignees</div>
                          <div className="col-span-2">Start Date</div>
                          <div className="col-span-2">Due Date</div>
                          <div className="col-span-1">Estimated</div>
                          <div className="col-span-1">Minutes Logged</div>
                        </div>

                        {/* Task Rows */}
                        {project.tasks.active.map((task, idx) => (
                          <div
                            key={task.id}
                            className={`grid grid-cols-12 gap-4 px-4 py-3 bg-white border-x border-b border-gray-200 hover:bg-gray-50 min-w-[800px] ${
                              idx === project.tasks.active.length - 1 ? 'rounded-b-lg' : ''
                            }`}
                          >
                            <div className="col-span-1 text-sm font-medium text-gray-900">{task.id}</div>
                            <div className="col-span-3 text-sm text-gray-900">{task.name}</div>
                            <div className="col-span-2 flex items-center gap-2">
                              <div className={`w-7 h-7 ${task.assignee.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                <span className="text-white text-xs font-semibold">{task.assignee.avatar}</span>
                              </div>
                              <span className="text-sm text-gray-900 truncate">{task.assignee.name}</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                                <rect x="2" y="3" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                                <path d="M4 1v2M10 1v2M2 6h10" stroke="currentColor" strokeWidth="1.2"/>
                              </svg>
                              <span className="whitespace-nowrap">{task.startDate}</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                                <rect x="2" y="3" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                                <path d="M4 1v2M10 1v2M2 6h10" stroke="currentColor" strokeWidth="1.2"/>
                              </svg>
                              <span className="whitespace-nowrap">{task.dueDate}</span>
                            </div>
                            <div className="col-span-1 flex items-center gap-1 text-sm text-gray-600">
                              <Clock size={14} className="flex-shrink-0" />
                              <span className="whitespace-nowrap">{task.estimated}</span>
                            </div>
                            <div className="col-span-1 flex items-center gap-1 text-sm text-gray-600">
                              <Clock size={14} className="flex-shrink-0" />
                              <span className="whitespace-nowrap">{task.logged}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  )
}

