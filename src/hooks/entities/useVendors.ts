// src/hooks/useVendors.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface Vendor {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  vendor_profiles: {
    business_name: string;
    business_type: string | null;
    business_description: string | null;
    business_logo_url: string | null;
    verified_badge: boolean;
    verification_status: string | null;
    product_categories: string[];
    total_products: number;
    total_sales: number;
    total_earnings: number;
  } | null;
}

interface UseVendorsOptions {
  limit?: number;
  verifiedOnly?: boolean;
  search?: string;
  category?: string;
}

interface UseVendorsReturn {
  vendors: Vendor[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

// Helper to normalize vendor data from database
function normalizeVendor(data: any): Vendor {
  return {
    id: data.id,
    username: data.username,
    display_name: data.display_name,
    avatar_url: data.avatar_url,
    bio: data.bio,
    created_at: data.created_at,
    vendor_profiles: data.vendor_profiles ? {
      business_name: data.vendor_profiles.business_name ?? '',
      business_type: data.vendor_profiles.business_type ?? null,
      business_description: data.vendor_profiles.business_description ?? null,
      business_logo_url: data.vendor_profiles.business_logo_url ?? null,
      verified_badge: data.vendor_profiles.verified_badge ?? false,
      verification_status: data.vendor_profiles.verification_status ?? null,
      product_categories: data.vendor_profiles.product_categories ?? [],
      total_products: data.vendor_profiles.total_products ?? 0,
      total_sales: data.vendor_profiles.total_sales ?? 0,
      total_earnings: data.vendor_profiles.total_earnings ?? 0,
    } : null,
  };
}

export function useVendors(options: UseVendorsOptions = {}): UseVendorsReturn {
  const { limit = 12, verifiedOnly = false, search, category } = options;
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchVendors = useCallback(async (reset: boolean = false) => {
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
          vendor_profiles!vendor_profiles_id_fkey (
            business_name,
            business_type,
            business_description,
            business_logo_url,
            verified_badge,
            verification_status,
            product_categories,
            total_products,
            total_sales,
            total_earnings
          )
        `)
        .eq('is_vendor', true);
      
      if (verifiedOnly) {
        query = query.eq('vendor_profiles.verified_badge', true);
      }
      
      if (search) {
        query = query.or(`vendor_profiles.business_name.ilike.%${search}%,display_name.ilike.%${search}%,username.ilike.%${search}%`);
      }
      
      if (category) {
        query = query.contains('vendor_profiles.product_categories', [category]);
      }
      
      query = query.order('created_at', { ascending: false });
      query = query.range(offset, offset + limit - 1);
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      const normalizedVendors = (data || []).map(normalizeVendor);
      
      if (reset) {
        setVendors(normalizedVendors);
      } else {
        setVendors(prev => [...prev, ...normalizedVendors]);
      }
      
      setHasMore((data?.length || 0) === limit);
      setPage(currentPage);
      
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch vendors'));
    } finally {
      setLoading(false);
    }
  }, [page, limit, verifiedOnly, search, category, supabase]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      await fetchVendors(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    await fetchVendors(true);
  };

  useEffect(() => {
    fetchVendors(true);
  }, [search, category, verifiedOnly]);

  return {
    vendors,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}