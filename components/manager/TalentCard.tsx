'use client'

import React from 'react'
import { User, CheckCircle, Clock, Star } from 'lucide-react'
import { getInitials } from '@/lib/transformers/manager'

interface TalentCardProps {
  talent: {
    id: string
    fullName: string | null
    email: string
    avatarUrl?: string | null
    status: string
    _count?: {
      assignedTasks: number
    }
  }
  isSelected: boolean
  onSelect: (talentId: string) => void
  isAssigning?: boolean
}

export default function TalentCard({
  talent,
  isSelected,
  onSelect,
  isAssigning = false,
}: TalentCardProps) {
  const taskCount = talent._count?.assignedTasks || 0
  const workloadColor =
    taskCount === 0
      ? 'text-green-600'
      : taskCount <= 3
      ? 'text-blue-600'
      : taskCount <= 6
      ? 'text-yellow-600'
      : 'text-red-600'

  return (
    <button
      onClick={() => !isAssigning && onSelect(talent.id)}
      disabled={isAssigning}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-purple-600 bg-purple-50'
          : 'border-gray-200 hover:border-purple-300 bg-white'
      } ${isAssigning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {talent.avatarUrl ? (
            <img
              src={talent.avatarUrl}
              alt={talent.fullName || 'Talent'}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {getInitials(talent.fullName || 'U')}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {talent.fullName || 'Unnamed Talent'}
            </h3>
            {isSelected && (
              <CheckCircle size={18} className="text-purple-600 flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-gray-600 truncate mb-2">{talent.email}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Clock size={14} className={workloadColor} />
              <span className={workloadColor}>
                {taskCount === 0 ? 'Available' : `${taskCount} active tasks`}
              </span>
            </div>

            {talent.status === 'ACTIVE' && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-green-600">Active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
