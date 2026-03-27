// hooks/entities/useContributions.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { 
  Contribution, 
  ContributionInsert, 
  ContributionUpdate,
  ContributionType
} from '@/types/supabase/tables/contributions';

// Re-export types for convenience
export type { 
  Contribution, 
  ContributionInsert, 
  ContributionUpdate,
  ContributionType 
} from '@/types/supabase/tables/contributions';

// Local type that matches the actual API response
interface ContributionWithDetailsLocal extends Contribution {
  contributor: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  product: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

interface UseContributionsOptions {
  productId?: string;
  contributorId?: string;
  isResidualEligible?: boolean;
}

interface UseContributionsReturn {
  contributions: ContributionWithDetailsLocal[];
  loading: boolean;
  error: Error | null;
  fetchContributions: () => Promise<void>;
  getContribution: (id: string) => Promise<ContributionWithDetailsLocal | null>;
  createContribution: (data: Omit<ContributionInsert, 'id' | 'created_at' | 'updated_at'>) => Promise<ContributionWithDetailsLocal | null>;
  updateContribution: (id: string, updates: Partial<ContributionUpdate>) => Promise<ContributionWithDetailsLocal | null>;
  deleteContribution: (id: string) => Promise<boolean>;
}

// =====================================================
// useContributions - fetch and manage contributions
// =====================================================
export function useContributions(options: UseContributionsOptions = {}): UseContributionsReturn {
  const { productId, contributorId, isResidualEligible } = options;
  const { user } = useAuth();
  const [contributions, setContributions] = useState<ContributionWithDetailsLocal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  // Fetch contributions based on filters
  const fetchContributions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('contributions')
        .select(`
          *,
          contributor:contributor_id (
            id,
            username,
            display_name,
            avatar_url
          ),
          product:product_id (
            id,
            title,
            slug
          )
        `)
        .order('created_at', { ascending: false });
      
      if (productId) {
        query = query.eq('product_id', productId);
      }
      
      if (contributorId) {
        query = query.eq('contributor_id', contributorId);
      }
      
      if (isResidualEligible !== undefined) {
        query = query.eq('is_residual_eligible', isResidualEligible);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      // Type assertion is safe here because the data matches the local type
      setContributions(data as ContributionWithDetailsLocal[] || []);
    } catch (err) {
      console.error('Error fetching contributions:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch contributions'));
    } finally {
      setLoading(false);
    }
  }, [productId, contributorId, isResidualEligible, supabase]);

  // Get single contribution by ID
  const getContribution = useCallback(async (id: string): Promise<ContributionWithDetailsLocal | null> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('contributions')
        .select(`
          *,
          contributor:contributor_id (
            id,
            username,
            display_name,
            avatar_url
          ),
          product:product_id (
            id,
            title,
            slug
          )
        `)
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      return data as ContributionWithDetailsLocal;
    } catch (err) {
      console.error('Error fetching contribution:', err);
      return null;
    }
  }, [supabase]);

  // Create new contribution
  const createContribution = useCallback(async (
    data: Omit<ContributionInsert, 'id' | 'created_at' | 'updated_at'>
  ): Promise<ContributionWithDetailsLocal | null> => {
    if (!user) {
      setError(new Error('You must be logged in to create a contribution'));
      return null;
    }
    
    try {
      const { data: result, error: createError } = await supabase
        .from('contributions')
        .insert({
          ...data,
          contributor_id: data.contributor_id,
        })
        .select(`
          *,
          contributor:contributor_id (
            id,
            username,
            display_name,
            avatar_url
          ),
          product:product_id (
            id,
            title,
            slug
          )
        `)
        .single();
      
      if (createError) throw createError;
      
      // Refresh list
      await fetchContributions();
      
      return result as ContributionWithDetailsLocal;
    } catch (err) {
      console.error('Error creating contribution:', err);
      setError(err instanceof Error ? err : new Error('Failed to create contribution'));
      return null;
    }
  }, [user, supabase, fetchContributions]);

  // Update existing contribution
  const updateContribution = useCallback(async (
    id: string, 
    updates: Partial<ContributionUpdate>
  ): Promise<ContributionWithDetailsLocal | null> => {
    if (!user) {
      setError(new Error('You must be logged in to update a contribution'));
      return null;
    }
    
    try {
      const { data, error: updateError } = await supabase
        .from('contributions')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select(`
          *,
          contributor:contributor_id (
            id,
            username,
            display_name,
            avatar_url
          ),
          product:product_id (
            id,
            title,
            slug
          )
        `)
        .single();
      
      if (updateError) throw updateError;
      
      // Refresh list
      await fetchContributions();
      
      return data as ContributionWithDetailsLocal;
    } catch (err) {
      console.error('Error updating contribution:', err);
      setError(err instanceof Error ? err : new Error('Failed to update contribution'));
      return null;
    }
  }, [user, supabase, fetchContributions]);

  // Delete contribution
  const deleteContribution = useCallback(async (id: string): Promise<boolean> => {
    if (!user) {
      setError(new Error('You must be logged in to delete a contribution'));
      return false;
    }
    
    try {
      const { error: deleteError } = await supabase
        .from('contributions')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      
      // Refresh list
      await fetchContributions();
      
      return true;
    } catch (err) {
      console.error('Error deleting contribution:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete contribution'));
      return false;
    }
  }, [user, supabase, fetchContributions]);

  // Initial fetch on mount or when filters change
  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  return {
    contributions,
    loading,
    error,
    fetchContributions,
    getContribution,
    createContribution,
    updateContribution,
    deleteContribution,
  };
}

// =====================================================
// useProductContributions - fetch contributions for a specific product
// =====================================================
export function useProductContributions(productId: string) {
  return useContributions({ productId });
}

// =====================================================
// useUserContributions - fetch contributions for a specific user
// =====================================================
export function useUserContributions(contributorId?: string) {
  const { user } = useAuth();
  const effectiveContributorId = contributorId || user?.id;
  
  return useContributions({ contributorId: effectiveContributorId });
}

// =====================================================
// useResidualEligibleContributions - fetch contributions eligible for residuals
// =====================================================
export function useResidualEligibleContributions(productId?: string) {
  return useContributions({ productId, isResidualEligible: true });
}