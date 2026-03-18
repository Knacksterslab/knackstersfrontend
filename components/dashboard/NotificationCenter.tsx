'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { AlertCircle, CheckCircle, AlertTriangle, Info, CheckCheck } from 'lucide-react'
import { notificationsApi } from '@/lib/api/client'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}

interface NotificationCenterProps {
  notifications: Notification[]
  onRefresh?: () => void
}

export default function NotificationCenter({ notifications = [], onRefresh }: NotificationCenterProps) {
  const [showAll, setShowAll] = useState(false)
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const [markingAllRead, setMarkingAllRead] = useState(false)

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!onRefresh) return
    const interval = setInterval(() => {
      onRefresh()
    }, 30_000)
    return () => clearInterval(interval)
  }, [onRefresh])

  // Deduplicate notifications by ID and content
  const uniqueNotifications = React.useMemo(() => {
    const seenIds = new Set<string>()
    const seenContent = new Set<string>()

    return notifications.filter(notification => {
      if (seenIds.has(notification.id)) return false
      const contentFingerprint = `${notification.type}:${notification.title}:${notification.message}`
      if (seenContent.has(contentFingerprint)) return false
      seenIds.add(notification.id)
      seenContent.add(contentFingerprint)
      return true
    })
  }, [notifications])

  // Filter out locally-marked-as-read ones so UI updates immediately
  const visibleNotifications = uniqueNotifications.filter(n => !readIds.has(n.id))

  const handleMarkRead = useCallback(async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    // Optimistically hide the notification
    setReadIds(prev => new Set(prev).add(id))
    try {
      await notificationsApi.markAsRead(id)
      onRefresh?.()
    } catch {
      // Revert on failure
      setReadIds(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }, [onRefresh])

  const handleMarkAllRead = useCallback(async () => {
    if (markingAllRead || visibleNotifications.length === 0) return
    setMarkingAllRead(true)
    // Optimistically hide all
    const allIds = new Set(visibleNotifications.map(n => n.id))
    setReadIds(prev => new Set([...prev, ...allIds]))
    try {
      await notificationsApi.markAllAsRead()
      onRefresh?.()
    } catch {
      // Revert on failure
      setReadIds(prev => {
        const next = new Set(prev)
        allIds.forEach(id => next.delete(id))
        return next
      })
    } finally {
      setMarkingAllRead(false)
    }
  }, [markingAllRead, visibleNotifications, onRefresh])

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'warning':
        return { Icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-50 hover:bg-red-100' }
      case 'success':
        return { Icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50 hover:bg-green-100' }
      case 'info':
        return { Icon: Info, color: 'text-blue-500', bgColor: 'bg-blue-50 hover:bg-blue-100' }
      case 'alert':
      case 'error':
        return { Icon: AlertTriangle, color: 'text-orange-500', bgColor: 'bg-orange-50 hover:bg-orange-100' }
      default:
        return { Icon: Info, color: 'text-gray-500', bgColor: 'bg-gray-50 hover:bg-gray-100' }
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

  const displayedNotifications = showAll ? visibleNotifications : visibleNotifications.slice(0, 3)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          Notifications & Alerts
          {visibleNotifications.length > 0 && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
              {visibleNotifications.length}
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2">
          {visibleNotifications.length > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={markingAllRead}
              className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap disabled:opacity-50"
              title="Mark all as read"
            >
              <CheckCheck size={14} />
              {markingAllRead ? 'Clearing…' : 'Mark all read'}
            </button>
          )}
          {visibleNotifications.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
            >
              {showAll ? 'Show less' : `View all (${visibleNotifications.length})`}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {visibleNotifications.length === 0 ? (
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
          displayedNotifications.map((notification) => {
            const { Icon, color, bgColor } = getIcon(notification.type)
            return (
              <div
                key={notification.id}
                className={`p-3 ${bgColor} rounded-lg cursor-pointer transition-colors group`}
                onClick={(e) => handleMarkRead(notification.id, e)}
                title="Click to dismiss"
              >
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
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCheck size={14} className="text-gray-400 mt-0.5" />
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
