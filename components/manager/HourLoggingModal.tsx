'use client'

import React, { useState, useEffect } from 'react'
import { X, Clock, Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useClientProjects } from '@/hooks/useManagerClients'
import { useTimeLogActions } from '@/hooks/useManagerTimeLogs'

interface HourLoggingModalProps {
  isOpen: boolean
  onClose: () => void
  clientId: string
  onSuccess: () => void
}

export default function HourLoggingModal({
  isOpen,
  onClose,
  clientId,
  onSuccess,
}: HourLoggingModalProps) {
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [selectedTask, setSelectedTask] = useState<string>('')
  const [selectedTalent, setSelectedTalent] = useState<string>('')
  const [hours, setHours] = useState<string>('')
  const [minutes, setMinutes] = useState<string>('')
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState<string>('09:00')
  const [description, setDescription] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState(false)

  const { projects, loading: loadingProjects } = useClientProjects(clientId)
  const { logHours, loading: logging, error } = useTimeLogActions()

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedProject('')
      setSelectedTask('')
      setSelectedTalent('')
      setHours('')
      setMinutes('')
      setDate(new Date().toISOString().split('T')[0])
      setTime('09:00')
      setDescription('')
      setShowSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const selectedProjectData = projects.find(p => p.id === selectedProject)
  const tasks = selectedProjectData?.tasks || []
  const selectedTaskData = tasks.find((t: any) => t.id === selectedTask)

  const handleSubmit = async () => {
    if (!selectedTask || !selectedTalent || (!hours && !minutes)) {
      return
    }

    const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0)
    if (totalMinutes === 0) return

    const startTime = new Date(`${date}T${time}:00`)

    try {
      await logHours({
        taskId: selectedTask,
        talentId: selectedTalent,
        durationMinutes: totalMinutes,
        startTime: startTime.toISOString(),
        description: description || undefined,
      })

      setShowSuccess(true)
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (err) {
      console.error('Failed to log hours:', err)
    }
  }

  const canSubmit = selectedTask && selectedTalent && (hours || minutes) && !logging

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Log Hours for Talent</h2>
          <button
            onClick={onClose}
            disabled={logging}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Success State */}
        {showSuccess && (
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hours Logged Successfully!</h3>
              <p className="text-gray-600">Time has been tracked and client hours updated.</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !showSuccess && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Failed to Log Hours</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        {!showSuccess && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Project Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project *
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => {
                    setSelectedProject(e.target.value)
                    setSelectedTask('')
                    setSelectedTalent('')
                  }}
                  disabled={loadingProjects}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Task Selection */}
              {selectedProject && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Task *
                  </label>
                  <select
                    value={selectedTask}
                    onChange={(e) => {
                      setSelectedTask(e.target.value)
                      const task = tasks.find((t: any) => t.id === e.target.value)
                      if (task?.assignedToId) {
                        setSelectedTalent(task.assignedToId)
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a task</option>
                    {tasks.map((task: any) => (
                      <option key={task.id} value={task.id}>
                        {task.name} {task.assignedTo && `(Assigned to ${task.assignedTo.fullName})`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Talent Selection */}
              {selectedTask && selectedTaskData?.assignedTo && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Talent *
                  </label>
                  <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {selectedTaskData.assignedTo.fullName?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {selectedTaskData.assignedTo.fullName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedTaskData.assignedTo.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Duration *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      placeholder="Hours"
                      min="0"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span className="text-xs text-gray-500 mt-1 block">Hours</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Minutes"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span className="text-xs text-gray-500 mt-1 block">Minutes</span>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details about the work performed..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                disabled={logging}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {logging ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Logging...</span>
                  </>
                ) : (
                  <>
                    <Clock size={20} />
                    <span>Log Hours</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
