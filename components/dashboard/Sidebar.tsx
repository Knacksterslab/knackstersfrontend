'use client'

import React from 'react'
import { LayoutDashboard, FolderKanban, CreditCard, HelpCircle } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import UnifiedSidebar, { sidebarThemes } from '@/components/shared/UnifiedSidebar'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { logout } = useUser()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/client-dashboard' },
    { id: 'tasks', label: 'Tasks / Projects', icon: FolderKanban, path: '/tasks-projects' },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCard, path: '/billing' },
    { id: 'support', label: 'Support / Help', icon: HelpCircle, path: '/support' },
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
      theme={sidebarThemes.client}
      onLogout={handleLogout}
      showFeedback={true}
    />
  )
}

