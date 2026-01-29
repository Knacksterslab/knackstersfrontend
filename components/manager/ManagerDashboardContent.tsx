'use client'

import React from 'react'
import { 
  Users, 
  UserCheck, 
  ClipboardList, 
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  DollarSign,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { useManagerDashboard } from '@/hooks/useManagerDashboard'
import { formatDistanceToNow } from 'date-fns'

export default function ManagerDashboardContent() {
  const { data, loading, error } = useManagerDashboard()

  // Calculate urgent tasks from real data
  const lowHoursClients = data?.transformedClients?.filter(c => c.status === 'low-minutes').length || 0
  const pendingTasks = data?.stats?.activeTasks || 0
  
  const urgentTasks = [
    ...(lowHoursClients > 0 ? [{
      id: '1',
      title: 'Clients running low on hours',
      count: lowHoursClients,
      priority: 'high',
      link: '/manager-dashboard/clients'
    }] : []),
    ...(pendingTasks > 0 ? [{
      id: '2',
      title: 'Active tasks needing attention',
      count: pendingTasks,
      priority: 'medium',
      link: '/manager-dashboard/assignments'
    }] : []),
    ...((data?.stats?.upcomingMeetings ?? 0) > 0 ? [{
      id: '3',
      title: 'Upcoming meetings to prepare',
      count: data?.stats?.upcomingMeetings ?? 0,
      priority: 'medium',
      link: '/manager-dashboard/meet-greet'
    }] : [])
  ].slice(0, 3) // Show max 3 urgent items

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'timesheet':
      case 'TIME_LOG': return Clock
      case 'client':
      case 'USER': return Users
      case 'talent': return UserCheck
      case 'task':
      case 'TASK': return ClipboardList
      case 'PROJECT': return ClipboardList
      default: return AlertCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'new': return 'bg-blue-100 text-blue-700'
      case 'scheduled': return 'bg-purple-100 text-purple-700'
      case 'completed': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  // Error state
  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold">Failed to load dashboard</p>
          <p className="text-gray-600 text-sm">{error || 'Please try again later'}</p>
        </div>
      </div>
    )
  }

  const { manager, stats, clients, recentActivities, upcomingMeetings } = data

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {manager?.fullName || 'Manager'}!
        </h1>
        <p className="text-gray-600">Here's an overview of your managed clients and talent</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Clients */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats?.totalClients || 0}</h3>
          <p className="text-sm text-gray-600 mb-2">Active Clients</p>
          <Link href="/manager-dashboard/clients" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </Link>
        </div>

        {/* Talent Pool */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserCheck size={24} className="text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats?.activeProjects || 0}</h3>
          <p className="text-sm text-gray-600 mb-2">Active Projects</p>
          <Link href="/manager-dashboard/talent" className="text-xs text-purple-600 hover:text-purple-700 font-medium">
            View all →
          </Link>
        </div>

        {/* Active Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ClipboardList size={24} className="text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats?.activeTasks || 0}</h3>
          <p className="text-sm text-gray-600 mb-2">Active Tasks</p>
          <Link href="/manager-dashboard/assignments" className="text-xs text-green-600 hover:text-green-700 font-medium">
            Manage →
          </Link>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats?.upcomingMeetings || 0}</h3>
          <p className="text-sm text-gray-600 mb-2">Upcoming Meetings</p>
          <Link href="/manager-dashboard/timesheets" className="text-xs text-orange-600 hover:text-orange-700 font-medium">
            View →
          </Link>
        </div>
      </div>

      {/* Urgent Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle size={24} className="text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Urgent Actions</h2>
        </div>

        <div className="space-y-3">
          {urgentTasks.map((task) => (
            <Link
              key={task.id}
              href={task.link}
              className={`flex items-center justify-between p-4 border-2 rounded-lg hover:shadow-sm transition-all ${getPriorityColor(task.priority)}`}
            >
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  task.priority === 'high' ? 'bg-red-200 text-red-700' : 'bg-yellow-200 text-yellow-700'
                }`}>
                  {task.count}
                </div>
                <span className="font-semibold text-gray-900">{task.title}</span>
              </div>
              <span className="text-sm text-gray-600">Action needed →</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {recentActivities && recentActivities.length > 0 ? (
                recentActivities.map((activity: any) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{activity.action || 'Activity'}</h4>
                          <span className="text-xs text-gray-400">
                            {activity.createdAt ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true }) : ''}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {activity.user?.fullName || activity.user?.companyName || 'User'}
                        </p>
                        <p className="text-xs text-gray-400">{activity.type}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8">
                  <Clock size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">This Month</h2>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {data?.monthlyStats?.totalRevenue > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Est. Revenue</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${data.monthlyStats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Clients</p>
                    <p className="text-xl font-bold text-gray-900">
                      {data?.monthlyStats?.activeClients || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hours Logged</p>
                    <p className="text-xl font-bold text-gray-900">
                      {data?.monthlyStats?.totalHoursLogged.toLocaleString() || 0}h
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <DollarSign size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Utilization Rate</p>
                    <p className="text-xl font-bold text-gray-900">
                      {data?.monthlyStats?.utilizationRate || 0}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    (data?.monthlyStats?.utilizationRate || 0) > 75 
                      ? 'text-green-600 bg-green-50'
                      : (data?.monthlyStats?.utilizationRate || 0) > 50
                        ? 'text-yellow-600 bg-yellow-50'
                        : 'text-gray-600 bg-gray-100'
                  }`}>
                    {(data?.monthlyStats?.utilizationRate || 0) > 75 ? 'Excellent' : 
                     (data?.monthlyStats?.utilizationRate || 0) > 50 ? 'Good' : 'Low'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Meetings</h2>
          <Link href="/manager-dashboard/meet-greet" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            View all →
          </Link>
        </div>

        <div className="p-6">
          {data?.transformedMeetings && data.transformedMeetings.length > 0 ? (
            <div className="space-y-3">
              {data.transformedMeetings.slice(0, 3).map((meeting, index) => {
                const meetingDate = new Date(meeting.scheduledAt)
                const isToday = meetingDate.toDateString() === new Date().toDateString()
                const isTomorrow = new Date(meetingDate).setHours(0,0,0,0) === new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0,0,0,0)
                
                const dateLabel = isToday 
                  ? `Today, ${meetingDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
                  : isTomorrow
                    ? `Tomorrow, ${meetingDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
                    : meetingDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
                
                const colorClass = index === 0 ? 'purple' : index === 1 ? 'blue' : 'green'
                
                return (
                  <div key={meeting.id} className={`flex items-center justify-between p-4 bg-${colorClass}-50 border border-${colorClass}-100 rounded-lg`}>
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className={`text-${colorClass}-600`} />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {meeting.clientName} - {meeting.type.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-gray-600">{dateLabel}</p>
                      </div>
                    </div>
                    {meeting.videoUrl ? (
                      <a 
                        href={meeting.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 bg-${colorClass}-600 text-white text-sm font-semibold rounded-lg hover:bg-${colorClass}-700 transition-colors`}
                      >
                        Join Call
                      </a>
                    ) : (
                      <button className={`px-4 py-2 border-2 border-${colorClass}-600 text-${colorClass}-600 text-sm font-semibold rounded-lg hover:bg-${colorClass}-50 transition-colors`}>
                        View Details
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar size={40} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 text-sm">No upcoming meetings</p>
              <p className="text-gray-500 text-xs mt-1">
                Schedule meetings with your clients to stay connected
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

