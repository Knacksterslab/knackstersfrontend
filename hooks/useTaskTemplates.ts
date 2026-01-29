/**
 * Task Templates Hook
 * Handles template management and application
 */

import { useState, useEffect, useCallback } from 'react';
import { managerApi } from '@/lib/api/client';

export function useTaskTemplates() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.getTemplates();
      setTemplates(response.data || []);
    } catch (err: any) {
      console.error('Error fetching templates:', err);
      setError(err.message || 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates,
    loading,
    error,
    refresh: fetchTemplates,
  };
}

export function useTemplateActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTemplate = useCallback(async (data: {
    name: string;
    description?: string;
    category?: string;
    isPublic?: boolean;
    tasks: Array<{
      name: string;
      description?: string;
      priority?: string;
      estimatedMinutes?: number;
    }>;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.createTemplate(data);
      if (!response.success) {
        throw new Error(response.error || 'Failed to create template');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create template';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTemplate = useCallback(async (templateId: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.updateTemplate(templateId, data);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update template');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update template';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTemplate = useCallback(async (templateId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.deleteTemplate(templateId);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete template');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete template';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyTemplate = useCallback(async (templateId: string, projectId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await managerApi.applyTemplate(templateId, projectId);
      if (!response.success) {
        throw new Error(response.error || 'Failed to apply template');
      }
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to apply template';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createTemplate,
    updateTemplate,
    deleteTemplate,
    applyTemplate,
    loading,
    error,
  };
}
