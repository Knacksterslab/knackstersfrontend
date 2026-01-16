/**
 * useTasks Hook
 * Fetches and manages tasks data
 */

import { useState, useEffect, useCallback } from 'react';
import { tasksApi } from '@/lib/api/client';

export function useTasks(status?: string) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await tasksApi.getAll(status);
      
      if (response.success && response.data) {
        setTasks(response.data);
      } else {
        setError('Failed to load tasks');
      }
    } catch (err: any) {
      console.error('Tasks fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const refresh = () => {
    fetchTasks();
  };

  const createTask = async (data: any) => {
    try {
      const response = await tasksApi.create(data);
      if (response.success) {
        await fetchTasks(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to create task');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create task');
    }
  };

  const updateTask = async (id: string, data: any) => {
    try {
      const response = await tasksApi.update(id, data);
      if (response.success) {
        await fetchTasks(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to update task');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update task');
    }
  };

  const updateTaskStatus = async (id: string, status: string) => {
    try {
      const response = await tasksApi.updateStatus(id, status);
      if (response.success) {
        await fetchTasks(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to update task status');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update task status');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await tasksApi.delete(id);
      if (response.success) {
        await fetchTasks(); // Refresh list
        return true;
      }
      throw new Error(response.error || 'Failed to delete task');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete task');
    }
  };

  const logTime = async (taskId: string, data: { minutes: number; date?: string; description?: string }) => {
    try {
      const response = await tasksApi.logTime(taskId, data);
      if (response.success) {
        await fetchTasks(); // Refresh to show updated logged time
        return response.data;
      }
      throw new Error(response.error || 'Failed to log time');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to log time');
    }
  };

  return {
    tasks,
    loading,
    error,
    refresh,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    logTime,
  };
}

export function useTask(id: string) {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTask = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await tasksApi.getById(id);
      
      if (response.success && response.data) {
        setTask(response.data);
      } else {
        setError('Failed to load task');
      }
    } catch (err: any) {
      console.error('Task fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const refresh = () => {
    fetchTask();
  };

  return {
    task,
    loading,
    error,
    refresh,
  };
}
