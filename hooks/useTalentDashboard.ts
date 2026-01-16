/**
 * Talent Dashboard Hook
 * Fetches talent dashboard data from backend
 */

import { useState, useEffect, useCallback } from 'react';
import { talentApi } from '@/lib/api/client';

interface TalentDashboardData {
  talent: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    skills?: string[];
    hourlyRate?: number;
  };
  stats: {
    assignedTasks: number;
    activeTasks: number;
    completedTasksThisMonth: number;
    hoursLoggedThisMonth: string;
    hoursLoggedThisWeek: string;
    upcomingMeetings: number;
    unreadNotifications: number;
  };
  assignedTasks: any[];
  recentTimeLogs: any[];
  upcomingMeetings: any[];
  notifications: any[];
}

export function useTalentDashboard() {
  const [data, setData] = useState<TalentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await talentApi.getDashboard();
      setData(response.data || null);
    } catch (err: any) {
      console.error('Error fetching talent dashboard:', err);
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

export function useTalentEarnings() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEarnings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await talentApi.getEarnings();
      setData(response.data || null);
    } catch (err: any) {
      console.error('Error fetching earnings:', err);
      setError(err.message || 'Failed to load earnings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  return {
    data,
    loading,
    error,
    refresh: fetchEarnings,
  };
}

export function useTalentStats() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await talentApi.getStats();
      setData(response.data || null);
    } catch (err: any) {
      console.error('Error fetching talent stats:', err);
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
