'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users,
  UserCheck,
  ClipboardList,
  Clock,
  Calendar,
  HelpCircle,
  LogOut,
  MessageSquare,
  X
} from 'lucide-react'
import Image from 'next/image'
import { useUser } from '@/contexts/UserContext'

interface ManagerSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function ManagerSidebar({ isOpen = false, onClose }: ManagerSidebarProps) {
  const pathname = usePathname()
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
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Logo Section with "Business Manager" label */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between gap-3 mb-2">
          <Link href="/manager-dashboard" className="flex items-center gap-3">
            <Image 
              src="/logo.svg" 
              alt="Knacksters Logo" 
              width={40} 
              height={40}
              className="flex-shrink-0"
            />
            <h1 className="text-xl font-semibold text-gray-900">Knacksters</h1>
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
        <div className="pl-[52px]">
          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            Business Manager
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            
            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-purple-600' : 'text-gray-400'} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            )
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
          onClick={async () => {
            try {
              await logout()
              window.location.href = '/'
            } catch (error) {
              console.error('Logout error:', error)
              window.location.href = '/'
            }
          }}
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
    </>
  )
}

