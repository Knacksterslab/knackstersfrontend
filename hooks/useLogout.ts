'use client'

import { useUser } from '@/contexts/UserContext'

/**
 * Returns a handleLogout function that signs the user out and redirects to /.
 * Extracted from the repeated pattern in every sidebar / dropdown component.
 */
export function useLogout(redirectTo = '/') {
  const { logout } = useUser()

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // Logout failures should still redirect — user gets removed from session server-side
    } finally {
      window.location.href = redirectTo
    }
  }

  return { handleLogout }
}
