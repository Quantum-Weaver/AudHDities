// =====================================================
// HOOKS: creator_profiles
// GENERATED: Manual (GAIA pattern)
// DEITY: hestia-core
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { CreatorProfilesRow, CreatorProfilesInsert, CreatorProfilesUpdate } from '@/types/generated/hestia-core/creator_profiles';

/**
 * Fetch a single creator_profiles record by ID
 */
export function useCreatorProfiles(id: string | undefined) {
  const [data, setData] = useState<CreatorProfilesRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    setLoading(true);
    try {
      const response = await fetch(`/api/generated/hestia-core/creator_profiles/${id}`);
      const result = await response.json();
      if (result.success) { setData(result.data); setError(null); }
      else { setError(result.error); }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally { setLoading(false); }
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
}

/**
 * Fetch a paginated list of creator_profiles records
 */
export function useCreatorProfilesList(params?: {
  page?: number; limit?: number; filters?: Record<string, string>; sort?: string; order?: 'asc' | 'desc';
}) {
  const [data, setData] = useState<CreatorProfilesRow[]>([]);
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
      if (params?.filters) Object.entries(params.filters).forEach(([k, v]) => searchParams.set(k, v));
      const response = await fetch(`/api/generated/hestia-core/creator_profiles?${searchParams.toString()}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data.data || result.data || []);
        setTotal(result.data.pagination?.total || 0);
        setError(null);
      } else { setError(result.error); }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally { setLoading(false); }
  }, [params]);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, total, loading, error, refetch: fetchData };
}

/**
 * Create a new creator_profiles record
 */
export function useCreateCreatorProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: CreatorProfilesInsert) => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/generated/hestia-core/creator_profiles', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) return { data: result.data, error: null };
      else { setError(result.error); return { data: null, error: result.error }; }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message); return { data: null, error: message };
    } finally { setLoading(false); }
  }, []);
  return { create, loading, error };
}

/**
 * Update a creator_profiles record
 */
export function useUpdateCreatorProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: CreatorProfilesUpdate) => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/generated/hestia-core/creator_profiles/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) return { data: result.data, error: null };
      else { setError(result.error); return { data: null, error: result.error }; }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message); return { data: null, error: message };
    } finally { setLoading(false); }
  }, []);
  return { update, loading, error };
}

/**
 * Delete a creator_profiles record
 */
export function useDeleteCreatorProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/generated/hestia-core/creator_profiles/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) return { success: true, error: null };
      else { setError(result.error); return { success: false, error: result.error }; }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message); return { success: false, error: message };
    } finally { setLoading(false); }
  }, []);
  return { deleteRecord, loading, error };
}