/**
 * useDashboard Hook
 * Fetches and manages dashboard data
 */

import { useState, useEffect } from 'react';
import { dashboardApi } from '@/lib/api/client';
import Session from 'supertokens-auth-react/recipe/session';

interface DashboardData {
  user: any;
  subscription: any;
  hoursBalance: any;
  recentTasks: any[];
  notifications: any[];
  accountManager: any;
  upcomingMeeting?: any;
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
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
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchDashboard();
  };

  return {
    data,
    loading,
    error,
    refresh,
  };
}
