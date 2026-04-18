/**
 * useDashboard Hook
 * Fetches and manages dashboard data
 */

import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '@/lib/api/client';
import Session from 'supertokens-auth-react/recipe/session';

interface DashboardData {
  user: any;
  subscription: any;
  hoursBalance: any;
  recentProjects: any[];
  notifications: any[];
  accountManager: any;
  upcomingMeeting?: any;
  totalMeetingCount: number;
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async (showSpinner = true) => {
    try {
      if (showSpinner) {
        setLoading(true);
      }
      setError(null);

      const sessionExists = await Session.doesSessionExist();

      if (!sessionExists) {
        setError('No active session');
        setLoading(false);
        return;
      }

      const response = await dashboardApi.getOverview();

      if (response.success && response.data) {
        setData(response.data);
      } else if (showSpinner) {
        setError('Failed to load dashboard data');
      }
    } catch (err: any) {
      if (showSpinner) {
        setError(err.message || 'An error occurred');
      }
    } finally {
      if (showSpinner) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchDashboard(true);
  }, [fetchDashboard]);

  // Background refresh — updates data silently without showing the loading spinner
  const refresh = useCallback(() => {
    fetchDashboard(false);
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refresh,
  };
}
