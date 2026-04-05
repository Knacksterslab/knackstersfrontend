'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import { 
  UserCheck, 
  Mail,
  Clock,
  Briefcase,
  Filter,
  Loader2,
  AlertCircle,
  Users
} from 'lucide-react'
import { useAvailableTalent } from '@/hooks/useManagerTasks'

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function ManagerTalentPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const { talent, loading, error, refresh } = useAvailableTalent()

  const getStatus = (assignedTasks: number) => assignedTasks >= 3 ? 'busy' : 'available'

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700'
      case 'busy': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const withStatus = talent.map(t => ({
    ...t,
    status: getStatus(t._count?.assignedTasks ?? 0),
    currentTasks: t._count?.assignedTasks ?? 0,
  }))

  const filteredTalent = withStatus.filter(t => {
    if (selectedFilter === 'all') return true
    return t.status === selectedFilter
  })

  const totalAvailable = withStatus.filter(t => t.status === 'available').length
  const totalBusy = withStatus.filter(t => t.status === 'busy').length
  const totalOnTasks = withStatus.filter(t => t.currentTasks > 0).length

  if (loading) {
    return (
      <ManagerPageWrapper>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-purple-600" size={40} />
        </div>
      </ManagerPageWrapper>
    )
  }

  if (error) {
    return (
      <ManagerPageWrapper>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </ManagerPageWrapper>
    )
  }

  return (
    <ManagerPageWrapper>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Talent Pool</h1>
          <p className="text-gray-600">Active talent available for task assignment</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck size={20} className="text-purple-600" />
            <span className="text-sm text-gray-600">Total Active</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{talent.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={20} className="text-green-600" />
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalAvailable}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={20} className="text-blue-600" />
            <span className="text-sm text-gray-600">On Active Tasks</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalOnTasks}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter size={20} />
            <span className="font-semibold">Filter:</span>
          </div>
          <div className="flex gap-2">
            {[
              { id: 'all', label: `All (${withStatus.length})`, active: 'bg-purple-100 text-purple-700' },
              { id: 'available', label: `Available (${totalAvailable})`, active: 'bg-green-100 text-green-700' },
              { id: 'busy', label: `Busy (${totalBusy})`, active: 'bg-yellow-100 text-yellow-700' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === f.id ? f.active : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Talent Grid */}
      {filteredTalent.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users size={40} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">No talent found</p>
          <p className="text-sm text-gray-400 mt-1">
            {talent.length === 0
              ? 'No active talent in the system yet.'
              : 'No talent matches this filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTalent.map((person) => (
            <div key={person.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
                    {person.avatarUrl ? (
                      <img src={person.avatarUrl} alt={person.fullName || ''} className="w-14 h-14 object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-white">
                        {getInitials(person.fullName || 'T')}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{person.fullName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail size={14} />
                      <span className="truncate max-w-[200px]">{person.email}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getStatusColor(person.status)}`}>
                  {person.status === 'available' ? 'Available' : 'Busy'}
                </span>
              </div>

              {/* Workload */}
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Current workload:</strong>{' '}
                  {person.currentTasks === 0
                    ? 'No active tasks'
                    : `${person.currentTasks} active task${person.currentTasks !== 1 ? 's' : ''}`}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href="/manager-dashboard/assignments"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center text-sm"
                >
                  Assign Task
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </ManagerPageWrapper>
  )
}
