'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { LayoutDashboard, FolderKanban, Clock, CreditCard, HelpCircle, MessageSquare, LogOut, X } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useUser()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/client-dashboard' },
    { id: 'tasks', label: 'Tasks / Projects', icon: FolderKanban, path: '/tasks-projects' },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCard, path: '/billing' },
    { id: 'support', label: 'Support / Help', icon: HelpCircle, path: '/support' },
  ]

  const isActive = (path: string) => {
    if (path === '#') return false
    return pathname === path
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
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.svg" 
              alt="Knacksters Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <span 
              className="text-xl font-semibold text-gray-900"
              style={{ 
                fontFamily: 'var(--font-public-sans), sans-serif',
                fontWeight: 600
              }}
            >
              Knacksters
            </span>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.path !== '#') {
                      router.push(item.path)
                      onClose?.() // Close sidebar on mobile after navigation
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Feedback Section */}
      <div className="p-4 m-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <MessageSquare size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Have anything to say?
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Feel free to share any feedback or suggestions you have
            </p>
            <button className="w-full bg-blue-600 text-white text-xs py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <MessageSquare size={14} />
              Leave Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Log Out */}
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
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
    </>
  )
}

