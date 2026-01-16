/**
 * useProjects Hook
 * Fetches and manages projects data
 */

import { useState, useEffect, useCallback } from 'react';
import { projectsApi } from '@/lib/api/client';

export function useProjects(status?: string) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectsApi.getAll(status);
      
      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        setError('Failed to load projects');
      }
    } catch (err: any) {
      console.error('Projects fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const refresh = () => {
    fetchProjects();
  };

  const createProject = async (data: any) => {
    try {
      const response = await projectsApi.create(data);
      if (response.success) {
        await fetchProjects(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to create project');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create project');
    }
  };

  const updateProject = async (id: string, data: any) => {
    try {
      const response = await projectsApi.update(id, data);
      if (response.success) {
        await fetchProjects(); // Refresh list
        return response.data;
      }
      throw new Error(response.error || 'Failed to update project');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update project');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await projectsApi.delete(id);
      if (response.success) {
        await fetchProjects(); // Refresh list
        return true;
      }
      throw new Error(response.error || 'Failed to delete project');
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete project');
    }
  };

  return {
    projects,
    loading,
    error,
    refresh,
    createProject,
    updateProject,
    deleteProject,
  };
}

export function useProject(id: string) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await projectsApi.getById(id);
      
      if (response.success && response.data) {
        setProject(response.data);
      } else {
        setError('Failed to load project');
      }
    } catch (err: any) {
      console.error('Project fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const refresh = () => {
    fetchProject();
  };

  return {
    project,
    loading,
    error,
    refresh,
  };
}
