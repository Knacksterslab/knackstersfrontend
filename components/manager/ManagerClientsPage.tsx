'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import ClientDetailModal from './ClientDetailModal'
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
  Loader2,
  Calendar,
  FolderOpen,
  Eye
} from 'lucide-react'
import { useManagerDashboard } from '@/hooks/useManagerDashboard'
import { useClientProjects } from '@/hooks/useManagerClients'
import { getStatusColor, getInitials } from '@/lib/transformers/manager'

export default function ManagerClientsPage() {
  const [expandedClient, setExpandedClient] = useState<string | null>(null)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [clientProjects, setClientProjects] = useState<Record<string, any[]>>({})
  const { data, loading, error, refresh } = useManagerDashboard()

  const toggleExpand = async (clientId: string) => {
    if (expandedClient === clientId) {
      setExpandedClient(null)
      return
    }
    
    setExpandedClient(clientId)
    
    // Fetch projects for this client if not already loaded
    if (!clientProjects[clientId]) {
      try {
        const response = await fetch(`/api/manager/projects?clientId=${clientId}`, {
          credentials: 'include',
        })
        const result = await response.json()
        if (result.success) {
          setClientProjects(prev => ({ ...prev, [clientId]: result.data || [] }))
        }
      } catch (error) {
        console.error('Failed to fetch client projects:', error)
      }
    }
  }

  const getProjectStatusColor = (status: string) => {
    return getStatusColor(status)
  }

  const getMinutesPercentage = (used: number, total: number) => {
    if (total === 0) return 0
    return (used / total) * 100
  }

  const formatStatusLabel = (status: string) => {
    if (status === 'low-minutes') return 'Low Minutes'
    if (status === 'active') return 'Active'
    if (status === 'inactive') return 'Inactive'
    return status
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
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error || 'Failed to load clients'}</p>
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

  const clients = data.transformedClients || []
  
  // Calculate summary stats
  const totalMinutes = clients.reduce((sum, c) => sum + c.minutesPurchased, 0)
  const lowMinutesClients = clients.filter(c => c.status === 'low-minutes').length

  return (
    <ManagerPageWrapper>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clients</h1>
          <p className="text-gray-600">Manage your clients, their projects, and hour usage</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-blue-600" />
            <span className="text-sm text-gray-600">Total Clients</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
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
            <span className="text-sm text-gray-600">Total Hours</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(totalMinutes / 60).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={20} className="text-orange-600" />
            <span className="text-sm text-gray-600">Low Hours</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{lowMinutesClients}</p>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Clients</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {clients.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Clients Yet</h3>
              <p className="text-gray-600">
                Clients will appear here once they are assigned to you.
              </p>
            </div>
          ) : (
            clients.map((client) => {
              const isExpanded = expandedClient === client.id
              const minutesPercentage = getMinutesPercentage(client.minutesUsed, client.minutesPurchased)
              const projects = clientProjects[client.id] || []

              return (
                <div key={client.id} className="hover:bg-gray-50 transition-colors">
                  {/* Client Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Avatar */}
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">
                              {getInitials(client.name)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(client.status)}`}>
                              {formatStatusLabel(client.status)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ml-13">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building size={16} className="text-gray-400" />
                            <span>{client.company}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={16} className="text-gray-400" />
                            <span className="truncate">{client.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={16} className="text-gray-400" />
                            <span>{client.phone}</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4 ml-13">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Hours Usage</span>
                            <span className="text-sm font-semibold text-gray-900">
                              {Math.round(client.minutesUsed / 60)} / {Math.round(client.minutesPurchased / 60)} hrs
                            </span>
                          </div>
                          <div className="relative w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                minutesPercentage > 85 ? 'bg-red-500' : minutesPercentage > 70 ? 'bg-orange-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${Math.min(minutesPercentage, 100)}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                            <span>{minutesPercentage.toFixed(1)}% used</span>
                            <span>{Math.round(client.minutesAvailable / 60)} hrs remaining</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 ml-13">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span>Member {client.memberSince}</span>
                          </div>
                          <span>Subscription: <strong className="text-gray-900">{client.subscription}</strong></span>
                          <span>Projects: <strong className="text-gray-900">{client.activeProjects}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedClientId(client.id)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                        >
                          <Eye size={18} />
                          View Details
                        </button>
                        <button
                          onClick={() => toggleExpand(client.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Projects */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Projects</h4>
                        {projects.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <FolderOpen size={32} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">No projects yet</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {projects.map((project: any) => (
                              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h5 className="font-semibold text-gray-900">{project.title}</h5>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getProjectStatusColor(project.status)}`}>
                                      {project.status.replace('_', ' ')}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>{project.tasks?.length || 0} tasks</span>
                                    {project.estimatedHours && (
                                      <>
                                        <span>•</span>
                                        <span>{project.estimatedHours} hours estimated</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <button className="px-4 py-2 text-purple-600 hover:bg-purple-100 rounded-lg font-semibold text-sm transition-colors">
                                  View Details
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Client Detail Modal */}
      <ClientDetailModal
        isOpen={!!selectedClientId}
        onClose={() => setSelectedClientId(null)}
        clientId={selectedClientId}
      />
    </ManagerPageWrapper>
  )
}

