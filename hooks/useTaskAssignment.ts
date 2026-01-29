/**
 * Task Assignment Hook
 * Handles task assignment to talent
 */

import { useState, useCallback } from 'react';
import { managerApi } from '@/lib/api/client';

export function useTaskAssignment() {
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignTask = useCallback(async (taskId: string, talentId: string) => {
    try {
      setAssigning(true);
      setError(null);

      const response = await managerApi.assignTask(taskId, talentId);

      if (!response.success) {
        throw new Error(response.error || 'Failed to assign task');
      }

      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to assign task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setAssigning(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    assignTask,
    assigning,
    error,
    clearError,
  };
}
