'use client'

import { useEffect, useRef } from 'react'

/**
 * Calls `reset` after `delayMs` whenever `value` becomes truthy.
 * Properly clears the timer if the component unmounts before it fires,
 * preventing state-update-on-unmounted-component warnings.
 *
 * Usage:
 *   useAutoReset(successMessage, () => setSuccessMessage(''), 3000)
 */
export function useAutoReset<T>(
  value: T,
  reset: () => void,
  delayMs = 3000
): void {
  const resetRef = useRef(reset)
  resetRef.current = reset

  useEffect(() => {
    if (!value) return
    const timer = setTimeout(() => resetRef.current(), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])
}
