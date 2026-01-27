/**
 * useBilling Hook
 * Fetches and manages billing data
 */

import { useState, useEffect, useCallback } from 'react';
import { billingApi } from '@/lib/api/client';

export function useBilling() {
  const [summary, setSummary] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBillingData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [summaryRes, subscriptionRes] = await Promise.all([
        billingApi.getSummary(),
        billingApi.getSubscription(),
      ]);

      if (summaryRes.success && summaryRes.data) {
        setSummary(summaryRes.data);
      }

      if (subscriptionRes.success && subscriptionRes.data) {
        setSubscription(subscriptionRes.data);
      }
    } catch (err: any) {
      console.error('Billing fetch error:', err);
      setError(err.message || 'Failed to load billing data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBillingData();
  }, [fetchBillingData]);

  const refresh = () => {
    fetchBillingData();
  };

  return {
    summary,
    subscription,
    loading,
    error,
    refresh,
  };
}

export function useInvoices(status?: string) {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await billingApi.getInvoices(status);

      if (response.success && response.data) {
        setInvoices(response.data);
      } else {
        setError('Failed to load invoices');
      }
    } catch (err: any) {
      console.error('Invoices fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const refresh = () => {
    fetchInvoices();
  };

  return {
    invoices,
    loading,
    error,
    refresh,
  };
}

