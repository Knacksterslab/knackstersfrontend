'use client'

import { useState, useEffect } from 'react'

interface UseTaskTimerReturn {
  activeTimer: string | null
  timerSeconds: number
  toggleTimer: (taskId: string) => void
  formatTime: (seconds: number) => string
}

/**
 * Tracks a running per-task timer.
 * Switching to a different task resets the counter.
 * Stopping the active task also resets to zero.
 */
export function useTaskTimer(): UseTaskTimerReturn {
  const [activeTimer, setActiveTimer] = useState<string | null>(null)
  const [timerSeconds, setTimerSeconds] = useState(0)

  useEffect(() => {
    if (!activeTimer) return
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [activeTimer])

  const toggleTimer = (taskId: string) => {
    setActiveTimer(prev => (prev === taskId ? null : taskId))
    setTimerSeconds(0)
  }

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return [hrs, mins, secs].map(n => n.toString().padStart(2, '0')).join(':')
  }

  return { activeTimer, timerSeconds, toggleTimer, formatTime }
}
