// hooks/useCreators.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface Creator {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  creator_profiles: {
    verified_badge: boolean;        // Convert null to false
    verification_status: string | null;
    creative_categories: string[] | null;
    creative_description: string | null;
    total_products: number;         // Convert null to 0
    total_sales: number;            // Convert null to 0
    total_earnings: number;         // Convert null to 0
  };
}

interface UseCreatorsOptions {
  limit?: number;
  verifiedOnly?: boolean;
  search?: string;
  category?: string;
}

interface UseCreatorsReturn {
  creators: Creator[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

// Helper to normalize creator data from database
function normalizeCreator(data: any): Creator {
  return {
    id: data.id,
    username: data.username,
    display_name: data.display_name,
    avatar_url: data.avatar_url,
    bio: data.bio,
    created_at: data.created_at,
    creator_profiles: {
      verified_badge: data.creator_profiles?.verified_badge ?? false,
      verification_status: data.creator_profiles?.verification_status ?? null,
      creative_categories: data.creator_profiles?.creative_categories ?? [],
      creative_description: data.creator_profiles?.creative_description ?? null,
      total_products: data.creator_profiles?.total_products ?? 0,
      total_sales: data.creator_profiles?.total_sales ?? 0,
      total_earnings: data.creator_profiles?.total_earnings ?? 0,
    },
  };
}

export function useCreators(options: UseCreatorsOptions = {}): UseCreatorsReturn {
  const { limit = 12, verifiedOnly = false, search, category } = options;
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchCreators = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const offset = (currentPage - 1) * limit;
      
      let query = supabase
        .from('profiles')
        .select(`
          id,
          username,
          display_name,
          avatar_url,
          bio,
          created_at,
          creator_profiles!inner (
            verified_badge,
            verification_status,
            creative_categories,
            creative_description,
            total_products,
            total_sales,
            total_earnings
          )
        `)
        .eq('is_creator', true);
      
      if (verifiedOnly) {
        query = query.eq('creator_profiles.verified_badge', true);
      }
      
      if (search) {
        query = query.or(`display_name.ilike.%${search}%,username.ilike.%${search}%`);
      }
      
      if (category) {
        query = query.contains('creator_profiles.creative_categories', [category]);
      }
      
      query = query.order('created_at', { ascending: false });
      query = query.range(offset, offset + limit - 1);
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      // Normalize the data to ensure types match
      const normalizedCreators = (data || []).map(normalizeCreator);
      
      if (reset) {
        setCreators(normalizedCreators);
      } else {
        setCreators(prev => [...prev, ...normalizedCreators]);
      }
      
      setHasMore((data?.length || 0) === limit);
      setPage(currentPage);
      
    } catch (err) {
      console.error('Error fetching creators:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch creators'));
    } finally {
      setLoading(false);
    }
  }, [page, limit, verifiedOnly, search, category, supabase]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      await fetchCreators(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    await fetchCreators(true);
  };

  useEffect(() => {
    fetchCreators(true);
  }, [search, category, verifiedOnly]);

  return {
    creators,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}