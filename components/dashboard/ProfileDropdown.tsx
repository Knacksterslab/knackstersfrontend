'use client'

import React, { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { useLogout } from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'

/** Return the correct profile/settings paths based on the user's role. */
function getProfilePaths(role?: string) {
  switch (role) {
    case 'ADMIN':
      return { profile: '/admin-dashboard/profile', settings: '/admin-dashboard/settings' }
    case 'MANAGER':
      return { profile: '/manager-dashboard/profile', settings: '/manager-dashboard/profile' }
    case 'TALENT':
      return { profile: '/talent-dashboard/profile', settings: '/talent-dashboard/profile' }
    default:
      return { profile: '/profile', settings: '/settings' }
  }
}

export default function ProfileDropdown() {
  const { user } = useUser()
  const { handleLogout } = useLogout()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const paths = getProfilePaths(user?.role)

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const userName = user?.fullName || user?.email
  const userEmail = user?.email

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleProfile = () => {
    setIsOpen(false)
    router.push(paths.profile)
  }

  const handleSettings = () => {
    setIsOpen(false)
    router.push(paths.settings)
  }

  const avatarUrl = user?.avatarUrl

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 pr-1 sm:pr-2 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={userName || 'Avatar'} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-xs sm:text-sm font-semibold">
              {getInitials(userName)}
            </span>
          )}
        </div>
        {userName && (
          <span className="hidden md:block text-sm font-medium text-gray-900">
            {userName}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`text-gray-500 hidden sm:block transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt={userName || 'Avatar'} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-sm font-semibold">{getInitials(userName)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleProfile}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
            >
              <User size={16} className="text-gray-500" />
              View Profile
            </button>

            <button
              onClick={handleSettings}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
            >
              <Settings size={16} className="text-gray-500" />
              Settings
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 pt-1">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
