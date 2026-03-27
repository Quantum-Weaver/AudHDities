// hooks/useCreator.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product } from './useProducts';
import type { Database } from '@/types/supabase/database.types';

// Profile types from database
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Creator = Database['public']['Tables']['creator_profiles']['Row'];
export type CreatorInsert = Database['public']['Tables']['creator_profiles']['Insert'];
export type CreatorUpdate = Database['public']['Tables']['creator_profiles']['Update'];


interface UseCreatorReturn {
  creator: Creator | null;
  products: Product[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useCreator(username: string): UseCreatorReturn {
  const [creator, setCreator] = useState<Creator | null>(null);
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
            creative_categories[],
            creative_description,
            portfolio_url,
            total_products,
            total_sales,
            total_earnings,
            default_residual_pool
          )
        `)
        .eq('username', username)
        .eq('is_creator', true)
        .single();
      
      if (creatorError) throw creatorError;
      
      setCreator(creatorData);
      
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