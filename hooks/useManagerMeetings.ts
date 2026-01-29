/**
 * Manager Meetings Hook
 * Handles meeting scheduling and management
 */

import { useState, useEffect, useCallback } from 'react';
import { managerApi } from '@/lib/api/client';

export function useManagerMeetings(filters?: { status?: string; type?: string }) {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getMeetings(filters);
      setMeetings(response.data || []);
    } catch (err: any) {
      console.error('Error fetching meetings:', err);
      setError(err.message || 'Failed to load meetings');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  return {
    meetings,
    loading,
    error,
    refresh: fetchMeetings,
  };
}

export function useClientMeetings(clientId: string | null) {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientMeetings = useCallback(async () => {
    if (!clientId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getClientMeetings(clientId);
      setMeetings(response.data || []);
    } catch (err: any) {
      console.error('Error fetching client meetings:', err);
      setError(err.message || 'Failed to load meetings');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      fetchClientMeetings();
    } else {
      setMeetings([]);
    }
  }, [clientId, fetchClientMeetings]);

  return {
    meetings,
    loading,
    error,
    refresh: fetchClientMeetings,
  };
}

export function useMeetingActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scheduleMeeting = useCallback(async (data: {
    clientId: string;
    type: string;
    scheduledAt: string;
    durationMinutes: number;
    title?: string;
    agenda?: string;
    location?: string;
    meetingLink?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.scheduleMeeting(data);
      if (!response.success) {
        throw new Error(response.error || 'Failed to schedule meeting');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to schedule meeting';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const completeMeeting = useCallback(async (meetingId: string, notes?: string, actionItems?: string[]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.completeMeeting(meetingId, notes, actionItems);
      if (!response.success) {
        throw new Error(response.error || 'Failed to complete meeting');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to complete meeting';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMeeting = useCallback(async (meetingId: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.updateMeeting(meetingId, data);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update meeting');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update meeting';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    scheduleMeeting,
    completeMeeting,
    updateMeeting,
    loading,
    error,
  };
}
