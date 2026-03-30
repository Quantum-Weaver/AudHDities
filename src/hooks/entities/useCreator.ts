// hooks/entities/useCreator.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '../entities/useProducts';
import type { CreatorProfile } from '@/types/supabase/tables.ts';

export interface CreatorDetail {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  creator_profiles: {
    verified_badge: boolean;
    creator_moniker: string;
    verification_status: string;
    creator_logo_url: string | null;
    creative_categories: string[];
    creative_description: string | null;
    portfolio_url: string | null;
    total_products: number;
    total_sales: number;
    total_earnings: number;
    default_residual_pool: number;
  };
}

interface UseCreatorReturn {
  creator: CreatorDetail | null;
  products: Product[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

// Helper to normalize creator detail data
function normalizeCreatorDetail(data: any): CreatorDetail {
  return {
    id: data.id,
    username: data.username,
    display_name: data.display_name,
    avatar_url: data.avatar_url,
    bio: data.bio,
    created_at: data.created_at,
    creator_profiles: {
      verified_badge: data.creator_profiles?.verified_badge ?? false,
      creator_moniker: data.creator_profiles?.creator_moniker,
      creator_logo_url: data.creator_profiles?.creator_logo_url ?? null,
      verification_status: data.creator_profiles?.verification_status ?? null,
      creative_categories: data.creator_profiles?.creative_categories ?? [],
      creative_description: data.creator_profiles?.creative_description ?? null,
      portfolio_url: data.creator_profiles?.portfolio_url ?? null,
      total_products: data.creator_profiles?.total_products ?? 0,
      total_sales: data.creator_profiles?.total_sales ?? 0,
      total_earnings: data.creator_profiles?.total_earnings ?? 0,
      default_residual_pool: data.creator_profiles?.default_residual_pool ?? 0
    },
  };
}

// =====================================================
// useCreatorByUsername - fetch creator by username
// =====================================================
export function useCreatorByUsername(username: string): UseCreatorReturn {
  const [creator, setCreator] = useState<CreatorDetail | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchCreator = useCallback(async () => {
    if (!username) return;
    
    try {
      setLoading(true);
      
      // Fetch creator profile
      const { data: creatorData, error: creatorError } = await supabase
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
            creator_moniker,
            creative_categories,
            creative_description,
            creator_logo_url,
            portfolio_url,
            total_products,
            total_sales,
            total_earnings,
            default_residual_pool
          )
        `)
        .eq('username', username)
        .eq('is_creator', true)
        .maybeSingle();
      
      if (creatorError) throw creatorError;
      
      if (!creatorData) {
        setCreator(null);
        setProducts([]);
        return;
      }

      const normalizedCreator = normalizeCreatorDetail(creatorData);
      setCreator(normalizedCreator);
      
      // Fetch creator's products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', creatorData.id)
        .eq('is_published', true)
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (productsError) throw productsError;
      
      setProducts(productsData || []);
      
    } catch (err) {
      console.error('Error fetching creator:', err);
      setError(err instanceof Error ? err : new Error('Creator not found'));
    } finally {
      setLoading(false);
    }
  }, [username, supabase]);

  useEffect(() => {
    fetchCreator();
  }, [fetchCreator]);

  return {
    creator,
    products,
    loading,
    error,
    refresh: fetchCreator,
  };
}

// =====================================================
// useCreatorById - fetch creator by user ID
// =====================================================
export function useCreatorById(userId: string): UseCreatorReturn {
  const [creator, setCreator] = useState<CreatorDetail | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchCreator = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      
      // Fetch creator profile
      const { data: creatorData, error: creatorError } = await supabase
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
            creator_moniker,
            creative_categories,
            creative_description,
            creator_logo_url,
            portfolio_url,
            total_products,
            total_sales,
            total_earnings,
            default_residual_pool
          )
        `)
        .eq('id', userId)
        .eq('is_creator', true)
        .maybeSingle();
      
      if (creatorError) throw creatorError;
      
      if (!creatorData) {
        setCreator(null);
        setProducts([]);
        return;
      }

      const normalizedCreator = normalizeCreatorDetail(creatorData);
      setCreator(normalizedCreator);
      
      // Fetch creator's products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', creatorData.id)
        .eq('is_published', true)
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (productsError) throw productsError;
      
      setProducts(productsData || []);
      
    } catch (err) {
      console.error('Error fetching creator:', err);
      setError(err instanceof Error ? err : new Error('Creator not found'));
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    fetchCreator();
  }, [fetchCreator]);

  return {
    creator,
    products,
    loading,
    error,
    refresh: fetchCreator,
  };
}

// =====================================================
// useCreator - main export (alias for useCreatorByUsername)
// =====================================================
export const useCreator = useCreatorByUsername;