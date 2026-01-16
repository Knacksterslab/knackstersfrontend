'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import { 
  ClipboardList, 
  Plus,
  Calendar,
  Clock,
  User,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function ManagerAssignmentsPage() {
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'unassigned' | 'assigned' | 'completed'>('unassigned')

  const unassignedTasks = [
    {
      id: 't1',
      title: 'Design Homepage Mockup',
      project: 'Website Redesign',
      client: 'TechCorp Inc.',
      description: 'Create a modern and responsive homepage mockup for the company website redesign.',
      estimatedHours: 8,
      deadline: 'Dec 25, 2025',
      priority: 'high',
      requiredSkills: ['UI/UX Design', 'Figma', 'Responsive Design']
    },
    {
      id: 't2',
      title: 'API Integration',
      project: 'Mobile App Development',
      client: 'DesignStudio Pro',
      description: 'Integrate third-party payment API with the mobile application.',
      estimatedHours: 12,
      deadline: 'Dec 28, 2025',
      priority: 'medium',
      requiredSkills: ['React Native', 'API Integration', 'Backend']
    },
    {
      id: 't3',
      title: 'Database Optimization',
      project: 'MVP Development',
      client: 'StartupXYZ',
      description: 'Optimize database queries and implement caching strategy.',
      estimatedHours: 6,
      deadline: 'Dec 22, 2025',
      priority: 'high',
      requiredSkills: ['PostgreSQL', 'Redis', 'Performance']
    }
  ]

  const assignedTasks = [
    {
      id: 't4',
      title: 'User Authentication System',
      project: 'Web App Development',
      client: 'TechCorp Inc.',
      assignedTo: 'Alex Anderson',
      assignedDate: 'Dec 15, 2025',
      deadline: 'Dec 27, 2025',
      status: 'In Progress',
      progress: 60
    },
    {
      id: 't5',
      title: 'Marketing Banner Design',
      project: 'Q1 Campaign',
      client: 'DesignStudio Pro',
      assignedTo: 'Jessica Martinez',
      assignedDate: 'Dec 16, 2025',
      deadline: 'Dec 23, 2025',
      status: 'In Progress',
      progress: 40
    }
  ]

  const completedTasks = [
    {
      id: 't6',
      title: 'Database Schema Design',
      project: 'Backend Infrastructure',
      client: 'TechCorp Inc.',
      assignedTo: 'Michael Chen',
      completedDate: 'Dec 18, 2025',
      hoursLogged: 6
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Completed': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <ManagerPageWrapper>
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Assignments</h1>
                <p className="text-gray-600">Match client tasks with available talent</p>
              </div>
              <button 
                onClick={() => setShowAssignModal(true)}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Create New Task
              </button>
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
                  <span className="text-sm text-gray-600">Completed (Today)</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{completedTasks.length}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-purple-600" />
                  <span className="text-sm text-gray-600">Active Talent</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
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
                  <div className="space-y-4">
                    {unassignedTasks.map((task) => (
                      <div key={task.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                                {task.priority} priority
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{task.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users size={16} />
                                <span><strong>Client:</strong> {task.client}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <ClipboardList size={16} />
                                <span><strong>Project:</strong> {task.project}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar size={16} />
                                <span><strong>Due:</strong> {task.deadline}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              <Clock size={16} className="text-gray-400" />
                              <span className="text-sm font-semibold text-gray-700">
                                Estimated: {task.estimatedHours} hours
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {task.requiredSkills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
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
                </div>
              )}

              {/* Assigned Tasks */}
              {selectedTab === 'assigned' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {assignedTasks.map((task) => (
                      <div key={task.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                                {task.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users size={16} />
                                <span><strong>Client:</strong> {task.client}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User size={16} />
                                <span><strong>Assigned to:</strong> {task.assignedTo}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar size={16} />
                                <span><strong>Due:</strong> {task.deadline}</span>
                              </div>
                            </div>

                            <div className="mb-2">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                <span>Progress</span>
                                <span className="font-semibold">{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 transition-all"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
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
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Tasks */}
              {selectedTab === 'completed' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {completedTasks.map((task) => (
                      <div key={task.id} className="border border-green-200 bg-green-50 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CheckCircle size={24} className="text-green-600" />
                              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users size={16} />
                                <span><strong>Client:</strong> {task.client}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User size={16} />
                                <span><strong>By:</strong> {task.assignedTo}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar size={16} />
                                <span><strong>Completed:</strong> {task.completedDate}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={16} />
                                <span><strong>Hours:</strong> {task.hoursLogged}h</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
                          <CheckCircle size={18} />
                          View Deliverables
                        </button>
                      </div>
                    ))}
                  </div>
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
    </ManagerPageWrapper>
  )
}

