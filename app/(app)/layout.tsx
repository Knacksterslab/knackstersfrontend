'use client'

import { UserProvider } from '@/contexts/UserContext'
import AuthGuard from '@/components/auth/AuthGuard'
import { usePathname } from 'next/navigation'

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
  )
}

