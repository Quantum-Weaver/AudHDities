// hooks/useCreator.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product } from './useProducts';
import { CreatorProfile } from '@/types/supabase/tables';


export interface CreatorDetail {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;  
  creator_profiles: {
    verified_badge: boolean | false;        // Convert null to false
    verification_status: string | null;
    creative_categories: string[] | null;
    creative_description: string | null;
    total_products: number;         // Convert null to 0
    total_sales: number;            // Convert null to 0
    total_earnings: number;         // Convert null to 0
    default_residual_pool: number | 0;    
  };
}

interface UseCreatorsOptions {
  limit?: number;
  verifiedOnly?: boolean;
  search?: string;
  category?: string;
}

interface UseCreatorReturn {
  creator: CreatorDetail | null;
  products: Product[];
  loading: boolean;
  error: Error | null;
}

// Helper to normalize creator data from database
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
      verification_status: data.creator_profiles?.verification_status ?? false,
      creative_categories: data.creator_profiles?.creative_categories ?? [],
      creative_description: data.creator_profiles?.creative_description ?? null,
      total_products: data.creator_profiles?.total_products ?? 0,
      total_sales: data.creator_profiles?.total_sales ?? 0,
      total_earnings: data.creator_profiles?.total_earnings ?? 0,
      default_residual_pool: data.default_residual_pool ?? 0
    },    
  };
}

export function useCreator(username: string): UseCreatorReturn {
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
            default_residual_pool: 30,
            total_products: 0,
            total_sales: 0,
            total_earnings: 0,
            verified_badge: false,
            verification_status: 'pending' as const,
            creative_categories: [],          
          )
        `)
        .eq('username', username)
        .eq('is_creator', true)
        .single();

      if (creatorError) throw creatorError;
      const normalizeCreator = normalizeCreatorDetail(creatorData);
      setCreator(normalizeCreator);
      
      // Fetch creator's products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', creatorData)
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
    error
  };
}