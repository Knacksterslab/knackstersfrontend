/**
 * Manager Dashboard Hook
 * Fetches manager dashboard data from backend
 */

import { useState, useEffect, useCallback } from 'react';
import { managerApi } from '@/lib/api/client';

interface ManagerDashboardData {
  manager: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    role: string;
  };
  stats: {
    totalClients: number;
    activeProjects: number;
    activeTasks: number;
    upcomingMeetings: number;
    unreadNotifications: number;
  };
  clients: any[];
  upcomingMeetings: any[];
  recentActivities: any[];
  notifications: any[];
}

export function useManagerDashboard() {
  const [data, setData] = useState<ManagerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getDashboard();
      setData(response.data || null);
    } catch (err: any) {
      console.error('Error fetching manager dashboard:', err);
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refresh: fetchDashboard,
  };
}

export function useManagerClients() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getClients();
      setData(response.data || []);
    } catch (err: any) {
      console.error('Error fetching clients:', err);
      setError(err.message || 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    data,
    loading,
    error,
    refresh: fetchClients,
  };
}

export function useManagerStats() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getStats();
      setData(response.data || null);
    } catch (err: any) {
      console.error('Error fetching manager stats:', err);
      setError(err.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    data,
    loading,
    error,
    refresh: fetchStats,
  };
}
