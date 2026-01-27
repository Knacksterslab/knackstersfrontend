'use client'

import React from 'react'
import { 
  LayoutDashboard, 
  Users,
  UserCheck,
  ClipboardList,
  Clock,
  Calendar,
  HelpCircle,
} from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import UnifiedSidebar, { sidebarThemes } from '@/components/shared/UnifiedSidebar'

interface ManagerSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function ManagerSidebar({ isOpen = false, onClose }: ManagerSidebarProps) {
  const { logout } = useUser()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/manager-dashboard' },
    { id: 'clients', label: 'Clients', icon: Users, path: '/manager-dashboard/clients' },
    { id: 'talent', label: 'Talent Pool', icon: UserCheck, path: '/manager-dashboard/talent' },
    { id: 'assignments', label: 'Task Assignments', icon: ClipboardList, path: '/manager-dashboard/assignments' },
    { id: 'timesheets', label: 'Timesheet Approvals', icon: Clock, path: '/manager-dashboard/timesheets' },
    { id: 'meetgreet', label: 'Meet & Greet', icon: Calendar, path: '/manager-dashboard/meet-greet' },
    { id: 'support', label: 'Support / Help', icon: HelpCircle, path: '/manager-dashboard/support' },
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
      theme={sidebarThemes.manager}
      roleBadge={{
        text: 'Business Manager',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
      }}
      onLogout={handleLogout}
      showFeedback={true}
    />
  )
}

