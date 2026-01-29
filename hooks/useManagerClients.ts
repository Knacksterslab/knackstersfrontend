/**
 * Manager Clients Hook
 * Fetches and manages individual client data
 */

import { useState, useEffect, useCallback } from 'react';
import { managerApi } from '@/lib/api/client';

interface ClientDetails {
  id: string;
  email: string;
  fullName: string | null;
  companyName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  status: string;
  subscriptions: any[];
  hoursBalances: any[];
  clientProjects: any[];
  _count: {
    clientProjects: number;
    notifications: number;
  };
}

/**
 * Hook for fetching individual client details
 */
export function useManagerClientDetails(clientId: string | null) {
  const [client, setClient] = useState<ClientDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientDetails = useCallback(async () => {
    if (!clientId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getClientDetails(clientId);
      setClient(response.data || null);
    } catch (err: any) {
      console.error('Error fetching client details:', err);
      setError(err.message || 'Failed to load client details');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      fetchClientDetails();
    } else {
      setClient(null);
    }
  }, [clientId, fetchClientDetails]);

  return {
    client,
    loading,
    error,
    refresh: fetchClientDetails,
  };
}

/**
 * Hook for fetching projects for a specific client
 */
export function useClientProjects(clientId: string | null) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!clientId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getProjects();
      // Filter projects for this client
      const clientProjects = response.data?.filter(
        (project: any) => project.client.id === clientId || project.clientId === clientId
      ) || [];
      setProjects(clientProjects);
    } catch (err: any) {
      console.error('Error fetching client projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      fetchProjects();
    } else {
      setProjects([]);
    }
  }, [clientId, fetchProjects]);

  return {
    projects,
    loading,
    error,
    refresh: fetchProjects,
  };
}
