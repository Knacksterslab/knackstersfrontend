/**
 * Manager Time Logs Hook
 * Handles time logging and approval for manager
 */

import { useState, useEffect, useCallback } from 'react';
import { managerApi } from '@/lib/api/client';

export function useManagerTimeLogs() {
  const [pendingLogs, setPendingLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getPendingTimeLogs();
      setPendingLogs(response.data || []);
    } catch (err: any) {
      console.error('Error fetching pending time logs:', err);
      setError(err.message || 'Failed to load time logs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingLogs();
  }, [fetchPendingLogs]);

  return {
    pendingLogs,
    loading,
    error,
    refresh: fetchPendingLogs,
  };
}

export function useClientTimeLogs(clientId: string | null) {
  const [timeLogs, setTimeLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientTimeLogs = useCallback(async () => {
    if (!clientId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getClientTimeLogs(clientId);
      setTimeLogs(response.data || []);
    } catch (err: any) {
      console.error('Error fetching client time logs:', err);
      setError(err.message || 'Failed to load time logs');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      fetchClientTimeLogs();
    } else {
      setTimeLogs([]);
    }
  }, [clientId, fetchClientTimeLogs]);

  return {
    timeLogs,
    loading,
    error,
    refresh: fetchClientTimeLogs,
  };
}

export function useApprovedTimeLogs() {
  const [approvedLogs, setApprovedLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApprovedLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getApprovedTimeLogs();
      setApprovedLogs(response.data || []);
    } catch (err: any) {
      console.error('Error fetching approved time logs:', err);
      setError(err.message || 'Failed to load approved time logs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovedLogs();
  }, [fetchApprovedLogs]);

  return {
    approvedLogs,
    loading,
    error,
    refresh: fetchApprovedLogs,
  };
}

export function useTimeLogActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logHours = useCallback(async (data: {
    taskId: string;
    talentId: string;
    durationMinutes: number;
    startTime: string;
    description?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.logHours(data);
      if (!response.success) {
        throw new Error(response.error || 'Failed to log hours');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to log hours';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const approveTimeLog = useCallback(async (timeLogId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.approveTimeLog(timeLogId);
      if (!response.success) {
        throw new Error(response.error || 'Failed to approve time log');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to approve time log';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const rejectTimeLog = useCallback(async (timeLogId: string, reason: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.rejectTimeLog(timeLogId, reason);
      if (!response.success) {
        throw new Error(response.error || 'Failed to reject time log');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to reject time log';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    logHours,
    approveTimeLog,
    rejectTimeLog,
    loading,
    error,
  };
}
