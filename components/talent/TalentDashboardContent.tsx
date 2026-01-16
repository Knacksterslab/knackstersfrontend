'use client'

import React from 'react'
import { 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  User,
  Mail,
  Phone,
  Play,
  Pause,
  Loader2
} from 'lucide-react'
import { useTalentDashboard, useTalentEarnings } from '@/hooks/useTalentDashboard'
import { format } from 'date-fns'

export default function TalentDashboardContent() {
  const { data: dashboardData, loading, error } = useTalentDashboard()
  const { data: earningsData } = useTalentEarnings()
  
  const [activeTimer, setActiveTimer] = React.useState<string | null>(null)
  const [timerSeconds, setTimerSeconds] = React.useState(0)

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeTimer) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTimer])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = (taskId: string) => {
    if (activeTimer === taskId) {
      setActiveTimer(null)
      setTimerSeconds(0)
    } else {
      setActiveTimer(taskId)
      setTimerSeconds(0)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700'
      case 'COMPLETED':
        return 'bg-green-100 text-green-700'
      case 'IN_REVIEW':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatMinutesToHours = (minutes: number) => {
    const hours = (minutes / 60).toFixed(1)
    return `${hours} hrs`
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
  if (error || !dashboardData) {
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

  const { talent, stats, assignedTasks } = dashboardData

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {talent?.fullName || 'Talent'}!
        </h1>
        <p className="text-gray-600">Here's an overview of your tasks and earnings</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats?.activeTasks || 0}</h3>
          <p className="text-sm text-gray-600">Active Tasks</p>
        </div>

        {/* Hours This Week */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stats?.hoursLoggedThisWeek || '0'} hrs
          </h3>
          <p className="text-sm text-gray-600">Logged This Week</p>
        </div>

        {/* Earnings This Month */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${earningsData?.thisMonth?.earnings || '0'}
          </h3>
          <p className="text-sm text-gray-600">Earned This Month</p>
        </div>

        {/* Hourly Rate */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${earningsData?.hourlyRate || talent?.hourlyRate || '0'}/hr
          </h3>
          <p className="text-sm text-gray-600">Your Rate</p>
        </div>
      </div>

      {/* Active Tasks */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">My Active Tasks</h2>
        </div>

        <div className="p-6 space-y-4">
          {assignedTasks && assignedTasks.length > 0 ? (
            assignedTasks.map((task: any) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {task.project?.title || 'No Project'}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      {task.dueDate && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                      {task.estimatedMinutes && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>
                            {formatMinutesToHours(task.loggedMinutes || 0)} / {formatMinutesToHours(task.estimatedMinutes)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center gap-3">
                    {activeTimer === task.id && (
                      <div className="text-right mr-4">
                        <div className="text-2xl font-mono font-bold text-gray-900">
                          {formatTime(timerSeconds)}
                        </div>
                        <div className="text-xs text-gray-500">Active</div>
                      </div>
                    )}
                    <button
                      onClick={() => toggleTimer(task.id)}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        activeTimer === task.id
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      {activeTimer === task.id ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                  </div>
                </div>

                {/* Project Client Info */}
                {task.project?.client && (
                  <div className="bg-gray-50 rounded-lg p-4 border-t border-gray-200 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Client</p>
                            <p className="text-sm text-gray-700">
                              {task.project.client.fullName || task.project.client.companyName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No active tasks assigned</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">This Month Summary</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <CheckCircle size={20} className="text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.completedTasksThisMonth || 0}
              </p>
              <p className="text-xs text-gray-600">Tasks Completed</p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
              <Clock size={20} className="text-purple-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.hoursLoggedThisMonth || '0'} hrs
              </p>
              <p className="text-xs text-gray-600">Hours Logged</p>
            </div>

            <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
              <DollarSign size={20} className="text-green-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">
                ${earningsData?.thisMonth?.earnings || '0'}
              </p>
              <p className="text-xs text-gray-600">Total Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

