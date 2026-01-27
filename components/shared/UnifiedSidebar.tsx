'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { LogOut, MessageSquare, X, LucideIcon } from 'lucide-react'
import FeedbackModal from '@/components/feedback/FeedbackModal'

export interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  path: string
  badge?: string
  submenu?: Array<{
    id: string
    label: string
    icon: LucideIcon
    path: string
  }>
}

export interface SidebarTheme {
  primary: string // e.g., 'blue', 'purple', 'orange', 'red'
  activeBackground: string // e.g., 'bg-blue-50'
  activeText: string // e.g., 'text-blue-600'
  badgeBackground: string // e.g., 'bg-blue-50'
  badgeText: string // e.g., 'text-blue-600'
  hoverBackground: string // e.g., 'hover:bg-blue-50'
}

interface UnifiedSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  menuItems: MenuItem[]
  theme: SidebarTheme
  roleBadge?: {
    text: string
    bgColor: string
    textColor: string
  }
  onLogout: () => void | Promise<void>
  showFeedback?: boolean
}

export default function UnifiedSidebar({
  isOpen = false,
  onClose,
  menuItems,
  theme,
  roleBadge,
  onLogout,
  showFeedback = true,
}: UnifiedSidebarProps) {
  const pathname = usePathname()
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  const isActive = (path: string) => {
    if (path === '#') return false
    return pathname === path
  }

  const handleLogout = async () => {
    try {
      await onLogout()
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback to home page
      window.location.href = '/'
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between gap-3 mb-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Knacksters Logo"
                width={40}
                height={40}
                className="flex-shrink-0"
              />
              <h1
                className="text-xl font-semibold text-gray-900"
                style={{
                  fontFamily: 'var(--font-public-sans), sans-serif',
                  fontWeight: 600,
                }}
              >
                Knacksters
              </h1>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Role Badge */}
          {roleBadge && (
            <div className="pl-[52px]">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${roleBadge.bgColor} ${roleBadge.textColor}`}
              >
                {roleBadge.text}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)

              // Handle submenu items (for admin content section)
              if (item.submenu) {
                return (
                  <li key={item.id}>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <ul className="space-y-1">
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon
                        const isSubActive = isActive(subItem.path)

                        return (
                          <li key={subItem.id}>
                            <Link
                              href={subItem.path}
                              onClick={onClose}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isSubActive
                                  ? `${theme.activeBackground} ${theme.activeText}`
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <SubIcon
                                size={20}
                                className={
                                  isSubActive ? theme.activeText : 'text-gray-400'
                                }
                              />
                              <span className="text-sm font-medium">
                                {subItem.label}
                              </span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              }

              // Regular menu items
              return (
                <li key={item.id}>
                  <Link
                    href={item.path === '#' ? '/' : item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? `${theme.activeBackground} ${theme.activeText}`
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className={active ? theme.activeText : 'text-gray-400'}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Feedback Section */}
        {showFeedback && (
          <div className="p-4 mx-3 mb-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3 mb-3">
              <MessageSquare size={32} className="text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Have anything to say?
                </h3>
                <p className="text-xs text-gray-600">
                  Feel free to leave any feedback or contact support for help
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Leave Feedback
            </button>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-red-600 ${theme.hoverBackground.replace('hover:', '')}`}
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <FeedbackModal
            isOpen={showFeedbackModal}
            onClose={() => setShowFeedbackModal(false)}
          />
        )}
      </div>
    </>
  )
}

// Predefined theme configurations
export const sidebarThemes = {
  client: {
    primary: 'blue',
    activeBackground: 'bg-blue-50',
    activeText: 'text-blue-600',
    badgeBackground: 'bg-blue-50',
    badgeText: 'text-blue-600',
    hoverBackground: 'hover:bg-blue-50',
  },
  manager: {
    primary: 'purple',
    activeBackground: 'bg-purple-50',
    activeText: 'text-purple-600',
    badgeBackground: 'bg-purple-50',
    badgeText: 'text-purple-600',
    hoverBackground: 'hover:bg-purple-50',
  },
  talent: {
    primary: 'orange',
    activeBackground: 'bg-orange-50',
    activeText: 'text-orange-600',
    badgeBackground: 'bg-orange-50',
    badgeText: 'text-orange-600',
    hoverBackground: 'hover:bg-orange-50',
  },
  admin: {
    primary: 'red',
    activeBackground: 'bg-red-50',
    activeText: 'text-red-600',
    badgeBackground: 'bg-red-50',
    badgeText: 'text-red-600',
    hoverBackground: 'hover:bg-red-50',
  },
} as const
