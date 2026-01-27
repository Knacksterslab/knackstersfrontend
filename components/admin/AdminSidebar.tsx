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
} from 'lucide-react';
import UnifiedSidebar, { sidebarThemes } from '@/components/shared/UnifiedSidebar';

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
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
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin-dashboard/settings',
      badge: 'Soon',
    },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    window.location.reload();
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
      showFeedback={true}
    />
  );
}
