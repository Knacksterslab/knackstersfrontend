/**
 * useNewUserTips Hook
 * Manages new user tip visibility and dismissal
 */

import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '@/lib/config/env';

interface DismissedTip {
  dismissed: boolean;
  dismissedAt: string;
}

interface DismissedTips {
  [tipId: string]: DismissedTip;
}

interface TipState {
  dismissedTips: DismissedTips;
  isOnboardingComplete: boolean;
  loading: boolean;
  error: string | null;
}

export function useNewUserTips() {
  const [tipState, setTipState] = useState<TipState>({
    dismissedTips: {},
    isOnboardingComplete: false,
    loading: true,
    error: null,
  });

  // Fetch dismissed tips from localStorage (fallback to backend when available)
  const fetchDismissedTips = useCallback(async () => {
    try {
      setTipState(prev => ({ ...prev, loading: true, error: null }));

      // Try to fetch from backend
      try {
        const response = await fetch(
          `${API_URL}/api/user/preferences/tips`,
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setTipState({
              dismissedTips: data.data.dismissedTips || {},
              isOnboardingComplete: data.data.isOnboardingComplete || false,
              loading: false,
              error: null,
            });
            return;
          }
        }
      } catch {
        // Endpoint not available, fall back to localStorage
      }

      // Fallback to localStorage
      const storedTips = localStorage.getItem('dismissedTips');
      const storedOnboarding = localStorage.getItem('isOnboardingComplete');

      setTipState({
        dismissedTips: storedTips ? JSON.parse(storedTips) : {},
        isOnboardingComplete: storedOnboarding === 'true',
        loading: false,
        error: null,
      });
    } catch {
      // Non-critical — tips will fall back to localStorage
      setTipState(prev => ({
        ...prev,
        loading: false,
        error: null, // Don't show error for non-critical feature
      }));
    }
  }, []);

  // Load tips on mount
  useEffect(() => {
    fetchDismissedTips();
  }, [fetchDismissedTips]);

  // Check if a tip should be shown
  const shouldShowTip = useCallback((tipId: string): boolean => {
    // Don't show tips if onboarding is complete
    if (tipState.isOnboardingComplete) {
      return false;
    }

    // Check if tip has been dismissed
    return !tipState.dismissedTips[tipId]?.dismissed;
  }, [tipState.dismissedTips, tipState.isOnboardingComplete]);

  // Dismiss a specific tip
  const dismissTip = useCallback(async (tipId: string) => {
    try {
      const newTipState = {
        dismissed: true,
        dismissedAt: new Date().toISOString(),
      };

      // Optimistically update UI
      setTipState(prev => {
        const updatedTips = {
          ...prev.dismissedTips,
          [tipId]: newTipState,
        };
        
        // Save to localStorage as fallback
        localStorage.setItem('dismissedTips', JSON.stringify(updatedTips));

        return {
          ...prev,
          dismissedTips: updatedTips,
        };
      });

      // Try to send to backend
      try {
        const response = await fetch(
          `${API_URL}/api/user/preferences/tips/dismiss`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tipId }),
          }
        );

      } catch {
        // Backend not available; localStorage already updated above
      }
    } catch {
      // Dismissal is best-effort — ignore failures
    }
  }, []);

  // Complete onboarding (dismisses all tips)
  const completeOnboarding = useCallback(async () => {
    try {
      // Update local state and localStorage
      setTipState(prev => ({
        ...prev,
        isOnboardingComplete: true,
      }));
      localStorage.setItem('isOnboardingComplete', 'true');

      // Try to send to backend
      try {
        const response = await fetch(
          `${API_URL}/api/user/preferences/onboarding/complete`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

      } catch {
        // Backend not available; localStorage already updated above
      }
    } catch {
      // Best-effort — ignore failures
    }
  }, []);

  // Reset all tips (for testing)
  const resetTips = useCallback(async () => {
    try {
      const response = await fetch(
          `${API_URL}/api/user/preferences/tips/reset`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to reset tips');
      }

      const data = await response.json();

      if (data.success) {
        await fetchDismissedTips();
      } else {
        throw new Error(data.message || 'Failed to reset tips');
      }
    } catch {
      // Best-effort
    }
  }, [fetchDismissedTips]);

  return {
    shouldShowTip,
    dismissTip,
    completeOnboarding,
    resetTips,
    isOnboardingComplete: tipState.isOnboardingComplete,
    loading: tipState.loading,
    error: tipState.error,
  };
}
