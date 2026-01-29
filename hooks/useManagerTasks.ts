/**
 * Manager Tasks Hook
 * Fetches and manages task data for managers
 */

import { useState, useEffect, useCallback } from 'react';
import { managerApi } from '@/lib/api/client';

interface TaskFilters {
  status?: string;
  clientId?: string;
  projectId?: string;
}

/**
 * Hook for fetching and managing manager tasks
 */
export function useManagerTasks(filters?: TaskFilters) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getTasks(filters);
      setTasks(response.data || []);
    } catch (err: any) {
      console.error('Error fetching manager tasks:', err);
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Categorize tasks by status
  const categorizedTasks = {
    unassigned: tasks.filter((task) => !task.assignedToId && task.status === 'PENDING'),
    assigned: tasks.filter(
      (task) =>
        task.assignedToId && (task.status === 'ACTIVE' || task.status === 'IN_REVIEW')
    ),
    completed: tasks.filter((task) => task.status === 'COMPLETED'),
    all: tasks,
  };

  return {
    tasks,
    categorizedTasks,
    loading,
    error,
    refresh: fetchTasks,
  };
}

/**
 * Hook for fetching available talent
 */
export function useAvailableTalent() {
  const [talent, setTalent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTalent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getAvailableTalent();
      setTalent(response.data || []);
    } catch (err: any) {
      console.error('Error fetching available talent:', err);
      setError(err.message || 'Failed to load talent');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTalent();
  }, [fetchTalent]);

  return {
    talent,
    loading,
    error,
    refresh: fetchTalent,
  };
}
