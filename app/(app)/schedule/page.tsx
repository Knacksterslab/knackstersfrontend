'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SchedulePage() {
  const router = useRouter()
  
  useEffect(() => {
    // Check sessionStorage to maintain backward compatibility
    // This handles old links and Cal.com redirects that use /schedule
    const talentProfileId = sessionStorage.getItem('talentProfileId')
    
    if (talentProfileId) {
      router.replace('/schedule/talent')
    } else {
      router.replace('/schedule/client')
    }
  }, [router])
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}

