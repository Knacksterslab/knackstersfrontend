'use client'

import React from 'react'
import { Phone, MessageSquare } from 'lucide-react'
import Image from 'next/image'

interface AccountManagerProps {
  accountManager: {
    id: string
    fullName: string
    email: string
    avatarUrl?: string | null
    isAvailable: boolean
  } | null
}

export default function AccountManager({ accountManager }: AccountManagerProps) {
  if (!accountManager) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Your Account Manager</h2>
      </div>

      {/* Profile Section - Centered with larger image */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-4">
          {/* Profile Picture */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
            {accountManager.avatarUrl ? (
              <Image 
                src={accountManager.avatarUrl} 
                alt={accountManager.fullName}
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{getInitials(accountManager.fullName)}</span>
              </div>
            )}
          </div>
          {/* Status indicator */}
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Name and Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{accountManager.fullName}</h3>
        <p className="text-sm text-gray-600 mb-2">Account Manager</p>
        <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${
          accountManager.isAvailable 
            ? 'text-green-600 bg-green-50' 
            : 'text-gray-600 bg-gray-100'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            accountManager.isAvailable 
              ? 'bg-green-600 animate-pulse' 
              : 'bg-gray-600'
          }`}></div>
          {accountManager.isAvailable ? 'Available Now' : 'Away'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-6 text-center">
        Your dedicated Account Manager coordinates all experts, ensures quality delivery, and keeps your projects on track. Reach out anytime for support, updates, or to discuss new requirements.
      </p>

      {/* Contact Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <MessageSquare size={18} className="text-gray-700 flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-900">Chat</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#E9414C] rounded-lg hover:bg-red-50 transition-colors shadow-sm">
          <Phone size={18} className="text-[#E9414C] flex-shrink-0" />
          <span className="text-sm font-bold text-[#E9414C]">Schedule Call</span>
        </button>
      </div>
    </div>
  )
}

