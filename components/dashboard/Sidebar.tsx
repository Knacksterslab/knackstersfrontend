'use client'

import React from 'react'
import { LayoutDashboard, FolderKanban, CreditCard, HelpCircle } from 'lucide-react'
import UnifiedSidebar, { sidebarThemes } from '@/components/shared/UnifiedSidebar'
import { useLogout } from '@/hooks/useLogout'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { handleLogout } = useLogout()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/client-dashboard' },
    { id: 'tasks', label: 'Tasks / Projects', icon: FolderKanban, path: '/tasks-projects' },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCard, path: '/billing' },
    { id: 'support', label: 'Support / Help', icon: HelpCircle, path: '/support' },
  ]

  return (
    <UnifiedSidebar
      isOpen={isOpen}
      onClose={onClose}
      menuItems={menuItems}
      theme={sidebarThemes.client}
      onLogout={handleLogout}
    />
  )
}

