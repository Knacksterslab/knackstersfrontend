'use client'

import { UserProvider } from '@/contexts/UserContext'
import AuthGuard from '@/components/auth/AuthGuard'
import { usePathname } from 'next/navigation'
import SuperTokensProvider from '@/components/providers/SuperTokensProvider'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Public routes that don't require authentication
  const publicPaths = ['/schedule', '/signup', '/talent-network']
  const isPublicPath = publicPaths.some(path => pathname?.startsWith(path))

  return (
    <SuperTokensProvider>
      <UserProvider>
        {isPublicPath ? (
          // Public routes - no auth required
          children
        ) : (
          // Protected routes - require authentication
          <AuthGuard>
            {children}
          </AuthGuard>
        )}
      </UserProvider>
    </SuperTokensProvider>
  )
}

