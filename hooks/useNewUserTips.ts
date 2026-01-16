/**
 * useNewUserTips Hook
 * Manages new user tip visibility and dismissal
 */

import { useState, useEffect, useCallback } from 'react';

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

  // Fetch dismissed tips from backend
  const fetchDismissedTips = useCallback(async () => {
    try {
      setTipState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/preferences/tips`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch tips');
      }

      const data = await response.json();

      if (data.success) {
        setTipState({
          dismissedTips: data.data.dismissedTips || {},
          isOnboardingComplete: data.data.isOnboardingComplete || false,
          loading: false,
          error: null,
        });
      } else {
        throw new Error(data.message || 'Failed to fetch tips');
      }
    } catch (error: any) {
      console.error('Error fetching dismissed tips:', error);
      setTipState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to load tips',
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
      // Optimistically update UI
      setTipState(prev => ({
        ...prev,
        dismissedTips: {
          ...prev.dismissedTips,
          [tipId]: {
            dismissed: true,
            dismissedAt: new Date().toISOString(),
          },
        },
      }));

      // Send to backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/preferences/tips/dismiss`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tipId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to dismiss tip');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to dismiss tip');
      }
    } catch (error: any) {
      console.error('Error dismissing tip:', error);
      // Revert optimistic update on error
      await fetchDismissedTips();
    }
  }, [fetchDismissedTips]);

  // Complete onboarding (dismisses all tips)
  const completeOnboarding = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/preferences/onboarding/complete`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }

      const data = await response.json();

      if (data.success) {
        setTipState(prev => ({
          ...prev,
          isOnboardingComplete: true,
        }));
      } else {
        throw new Error(data.message || 'Failed to complete onboarding');
      }
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
    }
  }, []);

  // Reset all tips (for testing)
  const resetTips = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/preferences/tips/reset`,
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
    } catch (error: any) {
      console.error('Error resetting tips:', error);
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
