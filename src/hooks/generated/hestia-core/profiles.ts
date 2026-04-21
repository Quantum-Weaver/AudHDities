// =====================================================
// HOOK: useProfiles
// DEITY: hestia-core
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { ProfilesRow } from '@/types/generated/hestia-core/profiles';

// Import enums for filter validation
import { 
  BADGE_TYPE, COUNCIL_HOUSE, SENSORY_MODE, USER_STATUS, USER_TIER 
} from '@/lib/constants/generated/hestia-core';


export interface ProfilesFilters {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  badge_type?: BadgeType;
  council_house?: CouncilHouse;
  sensory_mode?: SensoryMode;
  user_status?: UserStatus;
  user_tier?: UserTier;
}

export function useProfiles(id?: string) {
  const [data, setData] = useState<ProfilesRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/generated/hestia-core/profiles/${id}`);
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

export function useProfilesList(filters?: ProfilesFilters) {
  const [data, setData] = useState<ProfilesRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (filters?.page) searchParams.set('page', String(filters.page));
      if (filters?.limit) searchParams.set('limit', String(filters.limit));
      if (filters?.sort) searchParams.set('sort', filters.sort);
      if (filters?.order) searchParams.set('order', filters.order);
      
      // Add enum filters with validation
      
      if (filters?.badge_type) {
        const validValues = Object.values(BADGE_TYPE);
        if (validValues.includes(filters.badge_type)) {
          searchParams.set('badge_type', filters.badge_type);
        }
      }

      if (filters?.council_house) {
        const validValues = Object.values(COUNCIL_HOUSE);
        if (validValues.includes(filters.council_house)) {
          searchParams.set('council_house', filters.council_house);
        }
      }

      if (filters?.sensory_mode) {
        const validValues = Object.values(SENSORY_MODE);
        if (validValues.includes(filters.sensory_mode)) {
          searchParams.set('sensory_mode', filters.sensory_mode);
        }
      }

      if (filters?.user_status) {
        const validValues = Object.values(USER_STATUS);
        if (validValues.includes(filters.user_status)) {
          searchParams.set('user_status', filters.user_status);
        }
      }

      if (filters?.user_tier) {
        const validValues = Object.values(USER_TIER);
        if (validValues.includes(filters.user_tier)) {
          searchParams.set('user_tier', filters.user_tier);
        }
      }
      
      const url = `/api/generated/hestia-core/profiles?${searchParams.toString()}`;
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
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, loading, error, refetch: fetchData };
}

// Mutation hooks
export function useCreateProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProfilesInsert) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generated/hestia-core/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useUpdateProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, data: ProfilesUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/generated/hestia-core/profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

export function useDeleteProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/generated/hestia-core/profiles/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { delete: deleteRecord, loading, error };
}
