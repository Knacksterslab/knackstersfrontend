'use client'

import React from 'react'
import { Clock, Calendar, MoreVertical } from 'lucide-react'

interface Task {
  id: string
  tags: Array<{ label: string; color: string }>
  projectName: string
  taskName: string
  assignees: Array<{ initials: string; color: string }>
  time: string
  dueDate: string
}

export default function TasksKanban() {
  const columns = {
    active: {
      title: 'Active',
      count: 6,
      tasks: [
        {
          id: '#347U6',
          tags: [
            { label: 'Tag Name', color: 'bg-orange-100 text-orange-600' },
            { label: 'Tag Name', color: 'bg-blue-100 text-blue-600' }
          ],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [
            { initials: 'AH', color: 'bg-orange-500' },
            { initials: 'CD', color: 'bg-red-500' }
          ],
          time: '60 m',
          dueDate: 'Oct 12, 14:00'
        },
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-green-100 text-green-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [{ initials: 'AB', color: 'bg-blue-500' }],
          time: '23 m',
          dueDate: 'Nov 12, 17:00'
        },
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-red-100 text-red-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [
            { initials: 'AH', color: 'bg-orange-500' },
            { initials: 'CD', color: 'bg-red-500' },
            { initials: 'AB', color: 'bg-green-500' }
          ],
          time: '60 m',
          dueDate: 'Oct 12, 14:00'
        },
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-green-100 text-green-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [{ initials: 'AH', color: 'bg-orange-500' }],
          time: '23 m',
          dueDate: 'Nov 12, 17:00'
        },
        {
          id: '#347U6',
          tags: [
            { label: 'Tag Name', color: 'bg-orange-100 text-orange-600' },
            { label: 'Tag Name', color: 'bg-blue-100 text-blue-600' }
          ],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [
            { initials: 'AH', color: 'bg-orange-500' },
            { initials: 'CD', color: 'bg-red-500' }
          ],
          time: '60 m',
          dueDate: 'Oct 12, 14:00'
        },
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-green-100 text-green-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [{ initials: 'AB', color: 'bg-blue-500' }],
          time: '23 m',
          dueDate: 'Nov 12, 17:00'
        }
      ]
    },
    pending: {
      title: 'Pending',
      count: 4,
      tasks: [
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-green-100 text-green-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [{ initials: 'AB', color: 'bg-blue-500' }],
          time: '23 m',
          dueDate: 'Nov 12, 17:00'
        },
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-red-100 text-red-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [
            { initials: 'AH', color: 'bg-orange-500' },
            { initials: 'CD', color: 'bg-red-500' },
            { initials: 'AB', color: 'bg-green-500' }
          ],
          time: '60 m',
          dueDate: 'Oct 12, 14:00'
        },
        {
          id: '#347U6',
          tags: [
            { label: 'Tag Name', color: 'bg-orange-100 text-orange-600' },
            { label: 'Tag Name', color: 'bg-blue-100 text-blue-600' }
          ],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [
            { initials: 'AH', color: 'bg-orange-500' },
            { initials: 'CD', color: 'bg-red-500' }
          ],
          time: '60 m',
          dueDate: 'Oct 12, 14:00'
        },
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-green-100 text-green-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [{ initials: 'AB', color: 'bg-gray-400' }],
          time: '23 m',
          dueDate: 'Nov 12, 17:00'
        }
      ]
    },
    completed: {
      title: 'Completed',
      count: 3,
      tasks: [
        {
          id: '#347U6',
          tags: [
            { label: 'Tag Name', color: 'bg-blue-100 text-blue-600' },
            { label: 'Tag Name', color: 'bg-blue-100 text-blue-600' }
          ],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [{ initials: 'AB', color: 'bg-gray-400' }],
          time: '23 m',
          dueDate: 'Nov 12, 17:00'
        },
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-orange-100 text-orange-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [{ initials: 'AB', color: 'bg-blue-500' }],
          time: '23 m',
          dueDate: 'Nov 12, 17:00'
        },
        {
          id: '#347U6',
          tags: [{ label: 'Tag Name', color: 'bg-orange-100 text-orange-600' }],
          projectName: 'Project Name',
          taskName: 'Task Name Dolores Set Amet Lorem Ipsum Dolores',
          assignees: [
            { initials: 'AH', color: 'bg-orange-500' },
            { initials: 'CD', color: 'bg-red-500' }
          ],
          time: '60 m',
          dueDate: 'Oct 12, 14:00'
        }
      ]
    }
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {Object.entries(columns).map(([key, column]) => (
        <div key={key}>
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">{column.title}</h3>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-sm font-semibold rounded">
                {column.count}
              </span>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Task Cards */}
          <div className="space-y-4">
            {column.tasks.map((task, index) => (
              <div
                key={`${task.id}-${index}`}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Tags and ID */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs font-medium ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-500">{task.id}</span>
                </div>

                {/* Project and Task Name */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">{task.projectName}</p>
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {task.taskName}
                  </h4>
                </div>

                {/* Footer: Assignees, Time, Date */}
                <div className="flex items-center justify-between">
                  {/* Assignees */}
                  <div className="flex -space-x-2">
                    {task.assignees.slice(0, 3).map((assignee, idx) => (
                      <div
                        key={idx}
                        className={`w-7 h-7 ${assignee.color} rounded-full flex items-center justify-center border-2 border-white`}
                      >
                        <span className="text-white text-xs font-semibold">
                          {assignee.initials}
                        </span>
                      </div>
                    ))}
                    {task.assignees.length > 3 && (
                      <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-gray-700 text-xs font-semibold">
                          +{task.assignees.length - 3}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Time and Date */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{task.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

