// =====================================================
// HOOKS: vendor_profiles
// GENERATED: Manual (GAIA pattern)
// DEITY: hestia-core
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { VendorProfilesRow, VendorProfilesInsert, VendorProfilesUpdate } from '@/types/generated/hestia-core/vendor_profiles';

export function useVendorProfiles(id: string | undefined) {
  const [data, setData] = useState<VendorProfilesRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    setLoading(true);
    try {
      const response = await fetch(`/api/generated/hestia-core/vendor_profiles/${id}`);
      const result = await response.json();
      if (result.success) { setData(result.data); setError(null); }
      else { setError(result.error); }
    } catch (err) { setError(err instanceof Error ? err.message : 'Unknown error'); }
    finally { setLoading(false); }
  }, [id]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
}

export function useVendorProfilesList(params?: {
  page?: number; limit?: number; filters?: Record<string, string>; sort?: string; order?: 'asc' | 'desc';
}) {
  const [data, setData] = useState<VendorProfilesRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const sp = new URLSearchParams();
      if (params?.page) sp.set('page', String(params.page));
      if (params?.limit) sp.set('limit', String(params.limit));
      if (params?.sort) sp.set('sort', params.sort);
      if (params?.order) sp.set('order', params.order);
      if (params?.filters) Object.entries(params.filters).forEach(([k, v]) => sp.set(k, v));
      const response = await fetch(`/api/generated/hestia-core/vendor_profiles?${sp.toString()}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data.data || result.data || []);
        setTotal(result.data.pagination?.total || 0);
        setError(null);
      } else { setError(result.error); }
    } catch (err) { setError(err instanceof Error ? err.message : 'Unknown error'); }
    finally { setLoading(false); }
  }, [params]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, total, loading, error, refetch: fetchData };
}

export function useCreateVendorProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: VendorProfilesInsert) => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/generated/hestia-core/vendor_profiles', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) return { data: result.data, error: null };
      else { setError(result.error); return { data: null, error: result.error }; }
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error';
      setError(m); return { data: null, error: m };
    } finally { setLoading(false); }
  }, []);
  return { create, loading, error };
}

export function useUpdateVendorProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: VendorProfilesUpdate) => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/generated/hestia-core/vendor_profiles/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) return { data: result.data, error: null };
      else { setError(result.error); return { data: null, error: result.error }; }
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error';
      setError(m); return { data: null, error: m };
    } finally { setLoading(false); }
  }, []);
  return { update, loading, error };
}

export function useDeleteVendorProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/generated/hestia-core/vendor_profiles/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) return { success: true, error: null };
      else { setError(result.error); return { success: false, error: result.error }; }
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error';
      setError(m); return { success: false, error: m };
    } finally { setLoading(false); }
  }, []);
  return { deleteRecord, loading, error };
}