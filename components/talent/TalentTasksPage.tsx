'use client'

import React, { useState } from 'react'
import TalentPageWrapper from './TalentPageWrapper'
import { 
  Play, 
  Pause, 
  Calendar, 
  Clock, 
  User,
  Mail,
  Phone,
  CheckCircle,
  Upload,
  Plus
} from 'lucide-react'

export default function TalentTasksPage() {
  const [activeTimer, setActiveTimer] = useState<string | null>(null)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all')

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeTimer) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTimer])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = (taskId: string) => {
    if (activeTimer === taskId) {
      setActiveTimer(null)
      setTimerSeconds(0)
    } else {
      setActiveTimer(taskId)
      setTimerSeconds(0)
    }
  }

  const allTasks = [
    {
      id: '1',
      title: 'Design Homepage Mockup',
      project: 'Website Redesign Project',
      description: 'Create a modern and responsive homepage mockup for the company website redesign.',
      status: 'In Progress',
      deadline: 'Dec 22, 2025',
      allocatedTime: '8 hours',
      loggedTime: '4.5 hours',
      businessManager: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@knacksters.com',
        phone: '+1 (555) 123-4567'
      }
    },
    {
      id: '2',
      title: 'Implement User Authentication',
      project: 'Mobile App Development',
      description: 'Build secure authentication system with JWT tokens and OAuth integration.',
      status: 'Pending',
      deadline: 'Dec 25, 2025',
      allocatedTime: '12 hours',
      loggedTime: '0 hours',
      businessManager: {
        name: 'Michael Chen',
        email: 'michael.chen@knacksters.com',
        phone: '+1 (555) 987-6543'
      }
    },
    {
      id: '3',
      title: 'Create Marketing Banner',
      project: 'Q1 Marketing Campaign',
      description: 'Design eye-catching banner for social media marketing campaign.',
      status: 'In Progress',
      deadline: 'Dec 20, 2025',
      allocatedTime: '4 hours',
      loggedTime: '2 hours',
      businessManager: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@knacksters.com',
        phone: '+1 (555) 123-4567'
      }
    },
    {
      id: '4',
      title: 'Database Schema Design',
      project: 'Backend Infrastructure',
      description: 'Design and document the database schema for the new platform.',
      status: 'Completed',
      deadline: 'Dec 15, 2025',
      allocatedTime: '6 hours',
      loggedTime: '6 hours',
      businessManager: {
        name: 'Michael Chen',
        email: 'michael.chen@knacksters.com',
        phone: '+1 (555) 987-6543'
      }
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Completed':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredTasks = allTasks.filter(task => {
    if (selectedTab === 'active') return task.status === 'In Progress' || task.status === 'Pending'
    if (selectedTab === 'completed') return task.status === 'Completed'
    return true
  })

  return (
    <TalentPageWrapper>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
              <p className="text-gray-600">Manage and track your assigned tasks</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center border-b border-gray-200">
                <button
                  onClick={() => setSelectedTab('all')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'all'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Tasks ({allTasks.length})
                </button>
                <button
                  onClick={() => setSelectedTab('active')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'active'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Active ({allTasks.filter(t => t.status === 'In Progress' || t.status === 'Pending').length})
                </button>
                <button
                  onClick={() => setSelectedTab('completed')}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    selectedTab === 'completed'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Completed ({allTasks.filter(t => t.status === 'Completed').length})
                </button>
              </div>

              {/* Tasks List */}
              <div className="p-6 space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-6">
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.project}</p>
                        <p className="text-sm text-gray-700 mb-4">{task.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>Due: {task.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{task.loggedTime} / {task.allocatedTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Timer */}
                      {task.status !== 'Completed' && (
                        <div className="flex items-center gap-3">
                          {activeTimer === task.id && (
                            <div className="text-right mr-4">
                              <div className="text-2xl font-mono font-bold text-gray-900">
                                {formatTime(timerSeconds)}
                              </div>
                              <div className="text-xs text-gray-500">Active</div>
                            </div>
                          )}
                          <button
                            onClick={() => toggleTimer(task.id)}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                              activeTimer === task.id
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                          >
                            {activeTimer === task.id ? <Pause size={20} /> : <Play size={20} />}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Time Tracking Section */}
                    {task.status !== 'Completed' && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Manual Time Entry</h4>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            placeholder="Hours"
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                          <input
                            type="number"
                            placeholder="Minutes"
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                          <input
                            type="date"
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            Log Time
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Business Manager */}
                    <div className="bg-gray-50 rounded-lg p-4 border-t border-gray-200 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Business Manager</p>
                              <p className="text-sm text-gray-700">{task.businessManager.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Mail size={14} />
                              <span>{task.businessManager.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone size={14} />
                              <span>{task.businessManager.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {task.status !== 'Completed' && (
                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <Upload size={18} />
                          Upload Deliverable
                        </button>
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                          <CheckCircle size={18} />
                          Mark as Complete
                        </button>
                      </div>
                    )}

                    {task.status === 'Completed' && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle size={20} />
                        <span className="text-sm font-semibold">Task completed successfully</span>
                      </div>
                    )}
                  </div>
                ))}

                {filteredTasks.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No tasks found in this category</p>
                  </div>
                )}
              </div>
      </div>
    </TalentPageWrapper>
  )
}

