/**
 * Admin Dashboard Hook
 * Fetches admin dashboard data from backend
 */

import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '@/lib/api/client';

export function useAdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsResponse, usersResponse] = await Promise.all([
        adminApi.getStats(),
        adminApi.getUsers({ limit: 10 }),
      ]);
      
      setStats(statsResponse);
      setUsers(usersResponse.data || []);
    } catch (err: any) {
      console.error('Error fetching admin dashboard:', err);
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    stats,
    users,
    loading,
    error,
    refresh: fetchData,
  };
}

export function useAdminUsers(filters?: {
  role?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const [data, setData] = useState<{ users: any[]; total: number; hasMore: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getUsers(filters);
      setData(response.data || { users: [], total: 0, hasMore: false });
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUser = async (userId: string, data: any) => {
    try {
      await adminApi.updateUser(userId, data);
      await fetchUsers(); // Refresh list
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update user');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await adminApi.deleteUser(userId);
      await fetchUsers(); // Refresh list
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete user');
    }
  };

  return {
    data,
    loading,
    error,
    refresh: fetchUsers,
    updateUser,
    deleteUser,
  };
}

export function useAdminActivities(filters?: {
  userId?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getActivities(filters);
      setData(response.data || []);
    } catch (err: any) {
      console.error('Error fetching activities:', err);
      setError(err.message || 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    data,
    loading,
    error,
    refresh: fetchActivities,
  };
}
