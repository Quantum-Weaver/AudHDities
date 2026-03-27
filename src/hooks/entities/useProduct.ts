// hooks/entities/useProduct.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Database } from '@/types/supabase/database.types';
import type { Product, ProductWithCreator } from '@/types/supabase/tables/products';

// Re-export types for convenience
export type { Product, ProductWithCreator } from '@/types/supabase/tables/products';

interface UseProductReturn {
  product: ProductWithCreator | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

// Helper to normalize product with creator info
function normalizeProductWithCreator(data: any): ProductWithCreator {
  return {
    ...data,
    creator: data.creator ? {
      id: data.creator.id,
      username: data.creator.username,
      display_name: data.creator.display_name,
      avatar_url: data.creator.avatar_url,
    } : undefined,
  };
}

// =====================================================
// useProductById - fetch product by ID
// =====================================================
export function useProductById(productId: string): UseProductReturn {
  const [product, setProduct] = useState<ProductWithCreator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchProduct = useCallback(async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          creator:profiles!products_creator_id_fkey (
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .eq('id', productId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      setProduct(data ? normalizeProductWithCreator(data) : null);

    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch product'));
    } finally {
      setLoading(false);
    }
  }, [productId, supabase]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refresh: fetchProduct,
  };
}

// =====================================================
// useProductBySlug - fetch product by URL slug
// =====================================================
export function useProductBySlug(slug: string): UseProductReturn {
  const [product, setProduct] = useState<ProductWithCreator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          creator:profiles!products_creator_id_fkey (
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (fetchError) throw fetchError;

      setProduct(data ? normalizeProductWithCreator(data) : null);

    } catch (err) {
      console.error('Error fetching product by slug:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch product'));
    } finally {
      setLoading(false);
    }
  }, [slug, supabase]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refresh: fetchProduct,
  };
}

// =====================================================
// useCurrentUserProduct - fetch a product owned by the current user
// =====================================================
export function useCurrentUserProduct(productId: string): UseProductReturn & { isOwner: boolean } {
  const { user } = useAuth();
  const { product, loading, error, refresh } = useProductById(productId);
  
  const isOwner = user?.id === product?.creator_id;

  return {
    product,
    loading,
    error,
    refresh,
    isOwner,
  };
}

// =====================================================
// useProduct - main export (alias for useProductById)
// =====================================================
export const useProduct = useProductById;