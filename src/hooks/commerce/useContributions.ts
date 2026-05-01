// src/hooks/commerce/useContributions.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Contribution, ContributionInsert, ContributionWithDetails } from '@/types/supabase/tables/contributions';


interface UseContributionsReturn {
  contributions: ContributionWithDetails[];
  loading: boolean;
  error: Error | null;
  createContribution: (params: ContributionInsert) => Promise<ContributionWithDetails | null>;
  updateContribution: (id: string, updates: Partial<Contribution>) => Promise<ContributionWithDetails | null>;
  deleteContribution: (id: string) => Promise<boolean>;
  fetchByProduct: (productId: string) => Promise<void>;
  fetchByContributor: (contributorId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useContributions(): UseContributionsReturn {
  const { user } = useAuth();
  const [contributions, setContributions] = useState<ContributionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchContributions = useCallback(async (productId?: string, contributorId?: string) => {
    if (!user) {
      setContributions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let url = '/api/contributions';
      const params = new URLSearchParams();
      
      if (productId) params.append('productId', productId);
      if (contributorId) params.append('contributorId', contributorId);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch contributions');
      }

      setContributions(data.contributions || []);

    } catch (err) {
      console.error('Error fetching contributions:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch contributions'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchByProduct = useCallback(async (productId: string) => {
    await fetchContributions(productId);
  }, [fetchContributions]);

  const fetchByContributor = useCallback(async (contributorId: string) => {
    await fetchContributions(undefined, contributorId);
  }, [fetchContributions]);

  const createContribution = useCallback(async (params: ContributionInsert): Promise<ContributionWithDetails | null> => {
    if (!user) {
      setError(new Error('Authentication required'));
      return null;
    }

    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create contribution');
      }

      // Refresh list
      await fetchContributions();
      
      return data.contribution;

    } catch (err) {
      console.error('Error creating contribution:', err);
      setError(err instanceof Error ? err : new Error('Failed to create contribution'));
      return null;
    }
  }, [user, fetchContributions]);

  const updateContribution = useCallback(async (id: string, updates: Partial<Contribution>): Promise<ContributionWithDetails | null> => {
    if (!user) {
      setError(new Error('Authentication required'));
      return null;
    }

    try {
      const response = await fetch(`/api/contributions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update contribution');
      }

      // Refresh list
      await fetchContributions();
      
      return data.contribution;

    } catch (err) {
      console.error('Error updating contribution:', err);
      setError(err instanceof Error ? err : new Error('Failed to update contribution'));
      return null;
    }
  }, [user, fetchContributions]);

  const deleteContribution = useCallback(async (id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const response = await fetch(`/api/contributions?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete contribution');
      }

      // Refresh list
      await fetchContributions();
      
      return true;

    } catch (err) {
      console.error('Error deleting contribution:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete contribution'));
      return false;
    }
  }, [user, fetchContributions]);

  const refresh = useCallback(async () => {
    await fetchContributions();
  }, [fetchContributions]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  return {
    contributions,
    loading,
    error,
    createContribution,
    updateContribution,
    deleteContribution,
    fetchByProduct,
    fetchByContributor,
    refresh,
  };
}