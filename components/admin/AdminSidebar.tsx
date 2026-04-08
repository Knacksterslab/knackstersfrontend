'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Image as ImageIcon,
  MessageSquare,
  UserCheck,
  Ticket,
  User,
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import UnifiedSidebar, { sidebarThemes } from '@/components/shared/UnifiedSidebar';

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const { logout } = useUser()

  const menuItems = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin-dashboard',
    },
    {
      id: 'talent',
      label: 'Talent Applications',
      icon: UserCheck,
      path: '/admin-dashboard/talent',
    },
    {
      id: 'content',
      label: 'Content',
      icon: FileText,
      path: '#',
      submenu: [
        {
          id: 'hero',
          label: 'Hero Section',
          icon: ImageIcon,
          path: '/admin-dashboard/content/hero',
        },
        {
          id: 'landing',
          label: 'Landing Page',
          icon: FileText,
          path: '/admin-dashboard/content/landing',
        },
        {
          id: 'partners',
          label: 'Partner Logos',
          icon: ImageIcon,
          path: '/admin-dashboard/content/partners',
        },
        {
          id: 'faq',
          label: 'FAQ',
          icon: MessageSquare,
          path: '/admin-dashboard/content/faq',
        },
        {
          id: 'legal',
          label: 'Legal Pages',
          icon: FileText,
          path: '/admin-dashboard/content/legal',
        },
      ],
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      path: '/admin-dashboard/users',
    },
    {
      id: 'support',
      label: 'Support Tickets',
      icon: Ticket,
      path: '/admin-dashboard/support',
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      path: '/admin-dashboard/profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin-dashboard/settings',
    },
  ];

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      window.location.href = '/'
    }
  };

  return (
    <UnifiedSidebar
      isOpen={isOpen}
      onClose={onClose}
      menuItems={menuItems}
      theme={sidebarThemes.admin}
      roleBadge={{
        text: 'Administrator',
        bgColor: 'bg-red-50',
        textColor: 'text-red-600',
      }}
      onLogout={handleLogout}
    />
  );
}
