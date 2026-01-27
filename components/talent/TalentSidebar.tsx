'use client'

import React from 'react'
import { 
  LayoutDashboard, 
  CheckSquare,
  Clock, 
  DollarSign,
  User,
  HelpCircle,
} from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import UnifiedSidebar, { sidebarThemes } from '@/components/shared/UnifiedSidebar'

interface TalentSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function TalentSidebar({ isOpen = false, onClose }: TalentSidebarProps) {
  const { logout } = useUser()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/talent-dashboard' },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, path: '/talent-dashboard/tasks' },
    { id: 'timesheet', label: 'Timesheet', icon: Clock, path: '/talent-dashboard/timesheet' },
    { id: 'earnings', label: 'Earnings / Payments', icon: DollarSign, path: '/talent-dashboard/earnings' },
    { id: 'profile', label: 'Profile & Settings', icon: User, path: '/talent-dashboard/profile' },
    { id: 'support', label: 'Support / Help', icon: HelpCircle, path: '/talent-dashboard/support' },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      window.location.href = '/'
    }
  }

  return (
    <UnifiedSidebar
      isOpen={isOpen}
      onClose={onClose}
      menuItems={menuItems}
      theme={sidebarThemes.talent}
      roleBadge={{
        text: 'Talent',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-600',
      }}
      onLogout={handleLogout}
      showFeedback={true}
    />
  )
}

