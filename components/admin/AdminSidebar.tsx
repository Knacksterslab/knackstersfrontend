'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Image as ImageIcon,
  LogOut,
  MessageSquare,
  UserCheck
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

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

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section with "Admin" badge */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin-dashboard" className="flex items-center gap-3 mb-2">
          <Image 
            src="/logo.svg" 
            alt="Knacksters Logo" 
            width={40} 
            height={40}
            className="flex-shrink-0"
          />
          <h1 className="text-xl font-semibold text-gray-900">Knacksters</h1>
        </Link>
        <div className="pl-[52px]">
          <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
            Administrator
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            if (item.submenu) {
              return (
                <li key={item.id}>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <ul className="space-y-1">
                    {item.submenu.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = pathname === subItem.path;
                      
                      return (
                        <li key={subItem.id}>
                          <Link
                            href={subItem.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                              isSubActive
                                ? 'bg-red-50 text-red-600'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <SubIcon size={20} className={isSubActive ? 'text-red-600' : 'text-gray-400'} />
                            <span className="text-sm font-medium">{subItem.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <Link
                  href={item.path === '#' ? '/admin-dashboard' : item.path}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isActive ? 'text-red-600' : 'text-gray-400'} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Feedback Widget */}
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
        <button className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Leave Feedback
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
            sessionStorage.removeItem('admin_auth');
            window.location.reload();
          }}
          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors w-full"
        >
          <LogOut size={20} className="text-gray-400" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}
