'use client'

import React from 'react'
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
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Account Manager</h2>

      {/* Profile Section - Minimal and clean like screenshot */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 shadow-lg">
            {accountManager.avatarUrl ? (
              <Image 
                src={accountManager.avatarUrl} 
                alt={accountManager.fullName}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">{getInitials(accountManager.fullName)}</span>
              </div>
            )}
          </div>
          {/* Status indicator - simple green dot */}
          {accountManager.isAvailable && (
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
          )}
        </div>

        {/* Name and Title - Clean and simple */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{accountManager.fullName}</h3>
        <p className="text-base text-gray-500">Account Manager</p>
      </div>
    </div>
  )
}


