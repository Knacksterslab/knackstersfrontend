'use client'

import React from 'react'
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'

interface NotificationCenterProps {
  notifications: Array<{
    id: string
    type: string
    title: string
    message: string
    isRead: boolean
    createdAt: Date
  }>
  onRefresh?: () => void
}

export default function NotificationCenter({ notifications = [], onRefresh }: NotificationCenterProps) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'warning':
        return { Icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-50' }
      case 'success':
        return { Icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50' }
      case 'info':
        return { Icon: Info, color: 'text-blue-500', bgColor: 'bg-blue-50' }
      case 'alert':
      case 'error':
        return { Icon: AlertTriangle, color: 'text-orange-500', bgColor: 'bg-orange-50' }
      default:
        return { Icon: Info, color: 'text-gray-500', bgColor: 'bg-gray-50' }
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Notifications & Alerts</h2>
        <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
          View all
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Info size={24} className="text-gray-400" />
            </div>
            <h4 className="text-base font-semibold text-gray-900 mb-1.5">Your notifications & alerts will appear here</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              We'll notify you about task updates, meetings, billing changes, and important account activities.
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const { Icon, color, bgColor } = getIcon(notification.type)
            return (
              <div key={notification.id} className={`p-3 ${bgColor} rounded-lg`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon size={18} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{formatTime(notification.createdAt)}</p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

