'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import { 
  Users, 
  ChevronDown,
  ChevronUp,
  Clock,
  AlertCircle,
  TrendingUp,
  Mail,
  Phone,
  Building,
  Loader2
} from 'lucide-react'
import { useManagerDashboard } from '@/hooks/useManagerDashboard'

export default function ManagerClientsPage() {
  const [expandedClient, setExpandedClient] = useState<string | null>(null)
  const { data, loading, error } = useManagerDashboard()

  const toggleExpand = (clientId: string) => {
    setExpandedClient(expandedClient === clientId ? null : clientId)
  }

  const getStatusColor = (status: string) => {
    const upperStatus = status?.toUpperCase()
    if (upperStatus === 'ACTIVE') return 'bg-green-100 text-green-700'
    if (upperStatus === 'LOW-MINUTES') return 'bg-orange-100 text-orange-700'
    if (upperStatus === 'INACTIVE') return 'bg-gray-100 text-gray-700'
    return 'bg-gray-100 text-gray-700'
  }

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'On Hold': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getMinutesPercentage = (used: number, total: number) => {
    return (used / total) * 100
  }

  if (loading) {
    return (
      <ManagerPageWrapper>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-purple-600" size={40} />
        </div>
      </ManagerPageWrapper>
    )
  }

  if (error || !data) {
    return (
      <ManagerPageWrapper>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error || 'Failed to load clients'}</p>
        </div>
      </ManagerPageWrapper>
    )
  }

  const clients = data.clients || []

  return (
    <ManagerPageWrapper>
      {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Clients</h1>
                <p className="text-gray-600">Manage your clients, their projects, and minute usage</p>
              </div>
              <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                Add New Client
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-blue-600" />
                  <span className="text-sm text-gray-600">Total Clients</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{data.stats?.totalClients || 0}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">Active Projects</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{data.stats?.activeProjects || 0}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={20} className="text-purple-600" />
                  <span className="text-sm text-gray-600">Total Minutes</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">48,000</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle size={20} className="text-orange-600" />
                  <span className="text-sm text-gray-600">Low Minutes</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
            </div>

            {/* Clients List */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">All Clients</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {clients.map((client: any) => {
                  const isExpanded = expandedClient === client.id
                  const minutesPercentage = getMinutesPercentage(client.minutesUsed, client.minutesPurchased)

                  return (
                    <div key={client.id} className="hover:bg-gray-50 transition-colors">
                      {/* Client Header */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(client.status)}`}>
                                {client.status === 'low-minutes' ? 'Low Minutes' : 'Active'}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Building size={16} />
                                <span>{client.company}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail size={16} />
                                <span>{client.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone size={16} />
                                <span>{client.phone}</span>
                              </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Minutes Usage</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {client.minutesUsed.toLocaleString()} / {client.minutesPurchased.toLocaleString()} min
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all ${
                                    minutesPercentage > 85 ? 'bg-red-500' : minutesPercentage > 70 ? 'bg-orange-500' : 'bg-purple-500'
                                  }`}
                                  style={{ width: `${minutesPercentage}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                                <span>{minutesPercentage.toFixed(1)}% used</span>
                                <span>{client.minutesAvailable.toLocaleString()} min remaining</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <span>Subscription: <strong className="text-gray-900">{client.subscription}</strong></span>
                              <span>Active Projects: <strong className="text-gray-900">{client.activeProjects}</strong></span>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleExpand(client.id)}
                            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                        </div>

                        {/* Expanded Projects */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-3">Projects</h4>
                            <div className="space-y-3">
                              {client.projects.map((project: any) => (
                                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <h5 className="font-semibold text-gray-900">{project.name}</h5>
                                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getProjectStatusColor(project.status)}`}>
                                        {project.status}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                      <span>{project.tasks} tasks</span>
                                      <span>•</span>
                                      <span>{project.minutesUsed} minutes used</span>
                                    </div>
                                  </div>
                                  <button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg font-semibold text-sm transition-colors">
                                    View Details
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
      </div>
    </ManagerPageWrapper>
  )
}

