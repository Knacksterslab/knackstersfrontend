'use client'

import React, { useState, useEffect } from 'react'
import { X, Search, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import TalentCard from './TalentCard'
import { useAvailableTalent } from '@/hooks/useManagerTasks'
import { useTaskAssignment } from '@/hooks/useTaskAssignment'

interface Task {
  id: string
  name: string
  taskNumber: string
  description?: string
  project?: {
    title: string
    client?: {
      fullName: string | null
      companyName: string | null
    }
  }
}

interface TaskAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onSuccess: () => void
}

export default function TaskAssignmentModal({
  isOpen,
  onClose,
  task,
  onSuccess,
}: TaskAssignmentModalProps) {
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const { talent, loading: loadingTalent, error: talentError } = useAvailableTalent()
  const { assignTask, assigning, error: assignError } = useTaskAssignment()

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedTalentId(null)
      setSearchQuery('')
      setShowSuccess(false)
    }
  }, [isOpen])

  if (!isOpen || !task) return null

  // Filter talent by search query
  const filteredTalent = talent.filter((t) => {
    const searchLower = searchQuery.toLowerCase()
    const fullName = t.fullName?.toLowerCase() || ''
    const email = t.email.toLowerCase()
    return fullName.includes(searchLower) || email.includes(searchLower)
  })

  // Sort talent by workload (least busy first)
  const sortedTalent = [...filteredTalent].sort((a, b) => {
    const aCount = a._count?.assignedTasks || 0
    const bCount = b._count?.assignedTasks || 0
    return aCount - bCount
  })

  const handleAssign = async () => {
    if (!selectedTalentId) return

    try {
      await assignTask(task.id, selectedTalentId)
      setShowSuccess(true)
      
      // Auto close after success animation
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 1500)
    } catch (error) {
      console.error('Assignment failed:', error)
    }
  }

  const selectedTalent = talent.find((t) => t.id === selectedTalentId)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assign Task to Talent</h2>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <strong>Task:</strong> {task.name}
              </p>
              {task.project && (
                <>
                  <p className="text-sm text-gray-600">
                    <strong>Project:</strong> {task.project.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Client:</strong>{' '}
                    {task.project.client?.fullName || task.project.client?.companyName || 'N/A'}
                  </p>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={assigning}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Success State */}
        {showSuccess && (
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Task Assigned Successfully!</h3>
              <p className="text-gray-600">
                {selectedTalent?.fullName} has been notified about the new task.
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {(talentError || assignError) && !showSuccess && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">
                {assignError ? 'Assignment Failed' : 'Error Loading Talent'}
              </p>
              <p className="text-sm text-red-700">{talentError || assignError}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {!showSuccess && (
          <>
            {/* Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search talent by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Talent List */}
            <div className="flex-1 overflow-y-auto p-6">
              {loadingTalent ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin text-purple-600" size={40} />
                </div>
              ) : sortedTalent.length === 0 ? (
                <div className="text-center py-12">
                  <User size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? 'No Matching Talent Found' : 'No Available Talent'}
                  </h3>
                  <p className="text-gray-600">
                    {searchQuery
                      ? 'Try adjusting your search query'
                      : 'There are no active talent members available to assign'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">
                    {sortedTalent.length} talent member{sortedTalent.length !== 1 ? 's' : ''}{' '}
                    available
                  </p>
                  {sortedTalent.map((t) => (
                    <TalentCard
                      key={t.id}
                      talent={t}
                      isSelected={selectedTalentId === t.id}
                      onSelect={setSelectedTalentId}
                      isAssigning={assigning}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        {!showSuccess && (
          <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              disabled={assigning}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedTalentId || assigning || loadingTalent}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {assigning ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Assigning...</span>
                </>
              ) : (
                <>
                  <User size={20} />
                  <span>Assign to {selectedTalent?.fullName?.split(' ')[0] || 'Talent'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
