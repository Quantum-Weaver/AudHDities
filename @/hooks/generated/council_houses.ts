// =====================================================
// HOOK: useCouncilHouses
// GENERATED: 2026-04-13T23:49:00.373Z
// SOURCE: database.types.ts
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { CouncilHousesRow, CouncilHousesInsert, CouncilHousesUpdate } from '@/types/generated/hestia-core/council_houses.ts';

// =====================================================
// CouncilHouses HOOKS
// =====================================================

/**
 * Hook to fetch a single council_houses record
 */
export function useCouncilHouses(id: string | undefined) {
  const [data, setData] = useState<CouncilHousesRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/generated/council_houses/${id}`);
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
 * Hook to fetch a list of council_houses records with pagination
 */
export function useCouncilHousesList(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}) {
  const [data, setData] = useState<CouncilHousesRow[]>([]);
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
      
      const url = `/api/generated/council_houses?${searchParams.toString()}`;
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
 * Hook to create a new council_houses record
 */
export function useCreateCouncilHouses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CouncilHousesInsert) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generated/council_houses', {
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
 * Hook to update a council_houses record
 */
export function useUpdateCouncilHouses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, data: CouncilHousesUpdate) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/generated/council_houses/${id}`, {
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
 * Hook to delete a council_houses record
 */
export function useDeleteCouncilHouses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/generated/council_houses/${id}`, {
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
