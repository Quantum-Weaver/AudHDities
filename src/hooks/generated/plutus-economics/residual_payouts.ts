// =====================================================
// HOOK: useResidualPayouts
// GENERATED: 2026-04-17T22:45:10.708Z
// SOURCE: database.types.ts
// DEITY: plutus-economics
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { ResidualPayoutsRow, ResidualPayoutsInsert, ResidualPayoutsUpdate } from '@/types/generated/plutus-economics/residual_payouts';

// =====================================================
// ResidualPayouts HOOKS
// =====================================================

/**
 * Hook to fetch a single residual_payouts record
 */
export function useResidualPayouts(id: string | undefined) {
  const [data, setData] = useState<ResidualPayoutsRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/generated/plutus-economics/residual_payouts/${id}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch a list of residual_payouts records with pagination
 */
export function useResidualPayoutsList(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}) {
  const [data, setData] = useState<ResidualPayoutsRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.limit) searchParams.set('limit', String(params.limit));
      if (params?.sort) searchParams.set('sort', params.sort);
      if (params?.order) searchParams.set('order', params.order);
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          searchParams.set(key, value);
        });
      }
      
      const url = `/api/generated/plutus-economics/residual_payouts?${searchParams.toString()}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data.data || result.data || []);
        setTotal(result.data.pagination?.total || result.data.length || 0);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, loading, error, refetch: fetchData };
}

/**
 * Hook to create a new residual_payouts record
 */
export function useCreateResidualPayouts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ResidualPayoutsInsert) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generated/plutus-economics/residual_payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { data: result.data, error: null };
      } else {
        setError(result.error);
        return { data: null, error: result.error };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

/**
 * Hook to update a residual_payouts record
 */
export function useUpdateResidualPayouts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, data: ResidualPayoutsUpdate) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/generated/plutus-economics/residual_payouts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { data: result.data, error: null };
      } else {
        setError(result.error);
        return { data: null, error: result.error };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

/**
 * Hook to delete a residual_payouts record
 */
export function useDeleteResidualPayouts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/generated/plutus-economics/residual_payouts/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { success: true, error: null };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { delete: deleteRecord, loading, error };
}
