'use client'

import React, { useState } from 'react'
import { Clock, MoreVertical } from 'lucide-react'

interface TaskSummaryProps {
  tasks: Array<{
    id: string
    taskNumber: string
    name: string
    status: string
    projectName: string
    assignedTo?: {
      fullName: string
      avatarUrl?: string | null
    } | null
    dueDate?: Date | null
    loggedMinutes: number
  }>
}

export default function TaskSummary({ tasks = [] }: TaskSummaryProps) {
  const [activeTab, setActiveTab] = useState('active')

  const tabs = [
    { id: 'active', label: 'Active', count: tasks.length },
    { id: 'pending', label: 'Pending', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 }
  ]

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
      hour: '2-digit',
      minute: '2-digit'
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Active Task Summary</h2>
        <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
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

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your tasks will appear here</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Once you have active tasks, they'll show up here with progress tracking, deadlines, and assigned Knacksters.
            </p>
            <button 
              onClick={() => {
                // Trigger request new task action
                const requestButton = document.querySelector('[data-action="request-task"]') as HTMLElement;
                if (requestButton) {
                  requestButton.click();
                } else {
                  window.location.href = '/dashboard#request-task';
                }
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
              Request New Task
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all group">
              <div className="flex items-start justify-between mb-3">
                {/* Left: Checkbox + Task Info */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{task.projectName}</p>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {task.name} <span className="text-sm text-gray-500">#{task.taskNumber}</span>
                    </h3>
                  </div>
                </div>
                
                {/* Right: More Options */}
                <button className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={18} className="text-gray-400" />
                </button>
              </div>

              {/* Bottom Grid: Knackster, Hours, Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 border-t border-gray-100">
                {/* Knackster */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Knackster</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-semibold">
                        {task.assignedTo ? getInitials(task.assignedTo.fullName) : 'NA'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {task.assignedTo?.fullName || 'Unassigned'}
                    </p>
                  </div>
                </div>

                {/* Hours Logged */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Hours Logged</p>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400 flex-shrink-0" />
                    <p className="text-sm font-semibold text-gray-900">
                      {formatMinutes(task.loggedMinutes)}
                    </p>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Due Date</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(task.dueDate)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

