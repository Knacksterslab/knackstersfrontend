/**
 * useMeetings Hook
 * Fetches and manages meetings data
 */

import { useState, useEffect, useCallback } from 'react';
import { meetingsApi } from '@/lib/api/client';

export function useMeetings(status?: string) {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await meetingsApi.getAll(status);

      if (response.success && response.data) {
        setMeetings(response.data);
      } else {
        setError('Failed to load meetings');
      }
    } catch (err: any) {
      console.error('Meetings fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const refresh = () => {
    fetchMeetings();
  };

  const createMeeting = async (data: any) => {
    try {
      const response = await meetingsApi.create(data);
      if (response.success) {
        await fetchMeetings(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to create meeting');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create meeting');
    }
  };

  const updateMeeting = async (id: string, data: any) => {
    try {
      const response = await meetingsApi.update(id, data);
      if (response.success) {
        await fetchMeetings(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to update meeting');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update meeting');
    }
  };

  const cancelMeeting = async (id: string, reason?: string) => {
    try {
      const response = await meetingsApi.cancel(id, reason);
      if (response.success) {
        await fetchMeetings(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to cancel meeting');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to cancel meeting');
    }
  };

  const completeMeeting = async (id: string, notes?: string) => {
    try {
      const response = await meetingsApi.complete(id, notes);
      if (response.success) {
        await fetchMeetings(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to complete meeting');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to complete meeting');
    }
  };

  return {
    meetings,
    loading,
    error,
    refresh,
    createMeeting,
    updateMeeting,
    cancelMeeting,
    completeMeeting,
  };
}

export function useUpcomingMeetings(limit?: number) {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await meetingsApi.getUpcoming(limit);

        if (response.success && response.data) {
          setMeetings(response.data);
        } else {
          setError('Failed to load upcoming meetings');
        }
      } catch (err: any) {
        console.error('Upcoming meetings fetch error:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [limit]);

  return {
    meetings,
    loading,
    error,
  };
}

export function useMeeting(id: string) {
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeeting = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await meetingsApi.getById(id);

      if (response.success && response.data) {
        setMeeting(response.data);
      } else {
        setError('Failed to load meeting');
      }
    } catch (err: any) {
      console.error('Meeting fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMeeting();
  }, [fetchMeeting]);

  const refresh = () => {
    fetchMeeting();
  };

  return {
    meeting,
    loading,
    error,
    refresh,
  };
}

export function useAvailableSlots(assignedToId: string, date: string, durationMinutes?: number) {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!assignedToId || !date) return;

      try {
        setLoading(true);
        setError(null);

        const response = await meetingsApi.getAvailableSlots(assignedToId, date, durationMinutes || 60);

        if (response.success && response.data) {
          setSlots(response.data);
        } else {
          setError('Failed to load available slots');
        }
      } catch (err: any) {
        console.error('Available slots fetch error:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [assignedToId, date, durationMinutes]);

  return {
    slots,
    loading,
    error,
  };
}
