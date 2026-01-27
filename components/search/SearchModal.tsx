'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Search, X, Folder, CheckSquare, Calendar, ArrowRight, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState<'all' | 'projects' | 'tasks' | 'meetings'>('all')

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults(null)
      return
    }

    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, selectedType])

  const performSearch = async (searchQuery: string) => {
    try {
      setLoading(true)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const types = selectedType === 'all' ? 'projects,tasks,meetings' : selectedType
      const response = await fetch(`${API_URL}/api/client/search?q=${encodeURIComponent(searchQuery)}&types=${types}`, {
        credentials: 'include',
      })
      const data = await response.json()
      if (data.success) {
        setResults(data.data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResultClick = (type: string, id: string) => {
    if (type === 'project') {
      router.push(`/tasks-projects`)
    } else if (type === 'task') {
      router.push(`/tasks-projects`)
    } else if (type === 'meeting') {
      router.push(`/meetings`)
    }
    onClose()
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'NOT_STARTED': 'bg-gray-100 text-gray-700',
      'IN_PROGRESS': 'bg-blue-100 text-blue-700',
      'PENDING': 'bg-orange-100 text-orange-700',
      'ACTIVE': 'bg-green-100 text-green-700',
      'COMPLETED': 'bg-green-100 text-green-700',
      'ON_HOLD': 'bg-yellow-100 text-yellow-700',
      'SCHEDULED': 'bg-blue-100 text-blue-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 sm:pt-24">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tasks, meetings..."
              autoFocus
              className="flex-1 text-lg outline-none"
            />
            {loading && <Loader size={20} className="text-gray-400 animate-spin" />}
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-[#FF9634] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('projects')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'projects'
                  ? 'bg-[#FF9634] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setSelectedType('tasks')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'tasks'
                  ? 'bg-[#FF9634] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setSelectedType('meetings')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'meetings'
                  ? 'bg-[#FF9634] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Meetings
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {!query.trim() || query.trim().length < 2 ? (
            <div className="text-center py-12">
              <Search size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Type at least 2 characters to search</p>
            </div>
          ) : !results ? (
            <div className="text-center py-12">
              <Loader size={48} className="text-gray-300 mx-auto mb-4 animate-spin" />
              <p className="text-gray-500">Searching...</p>
            </div>
          ) : results.total === 0 ? (
            <div className="text-center py-12">
              <Search size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-1">No results found</p>
              <p className="text-sm text-gray-500">Try different keywords</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Projects */}
              {results.projects && results.projects.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Projects ({results.projects.length})
                  </h3>
                  <div className="space-y-2">
                    {results.projects.map((project: any) => (
                      <button
                        key={project.id}
                        onClick={() => handleResultClick('project', project.id)}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <Folder size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 mb-1">{project.title}</p>
                            <p className="text-sm text-gray-600 font-mono">{project.projectNumber}</p>
                            {project.description && (
                              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{project.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                              {project.status.replace('_', ' ')}
                            </span>
                            <ArrowRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {results.tasks && results.tasks.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Tasks ({results.tasks.length})
                  </h3>
                  <div className="space-y-2">
                    {results.tasks.map((task: any) => (
                      <button
                        key={task.id}
                        onClick={() => handleResultClick('task', task.id)}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <CheckSquare size={18} className="text-green-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 mb-1">{task.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <span className="font-mono">{task.taskNumber}</span>
                              <span>•</span>
                              <span>{task.project?.title}</span>
                            </div>
                            {task.assignedTo && (
                              <p className="text-sm text-gray-500">Assigned to: {task.assignedTo.fullName}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ')}
                            </span>
                            <ArrowRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Meetings */}
              {results.meetings && results.meetings.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Meetings ({results.meetings.length})
                  </h3>
                  <div className="space-y-2">
                    {results.meetings.map((meeting: any) => (
                      <button
                        key={meeting.id}
                        onClick={() => handleResultClick('meeting', meeting.id)}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <Calendar size={18} className="text-purple-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 mb-1">{meeting.title || 'Meeting'}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{formatDate(meeting.scheduledAt)}</span>
                              <span>•</span>
                              <span>{meeting.durationMinutes} min</span>
                              {meeting.accountManager && (
                                <>
                                  <span>•</span>
                                  <span>with {meeting.accountManager.fullName}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(meeting.status)}`}>
                              {meeting.status}
                            </span>
                            <ArrowRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {results && results.total > 0 && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              Found <span className="font-semibold">{results.total}</span> result{results.total !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
