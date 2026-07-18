// hooks/commerce/useProduct.ts
// Wares edition (2026-07-18): products became wares — one base price plus a
// pricing_model (free | fixed | pay_what_you_want | patronage_only), with
// per-user solidarity pricing computed server-side by
// calculate_sovereign_price at checkout. The old client-side tier ladder
// (community/ally/corporate) died with the products table.
'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useWares } from '@/hooks/generated/plutus-economics/wares.js';
import type { Tables, Enums } from '@/types/supabase/database.helpers.js';

// ============================================================================
// TYPES
// ============================================================================

export type Product = Tables<'wares'>;
export type PricingModel = Enums<'pricing_model'>;

export interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  isAvailable: boolean;
  isPublished: boolean;
  price: number | null;
  pricingModel: PricingModel | null;
  isFree: boolean;
  refetch: () => Promise<void>;
}

export interface UseProductListReturn {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  availableProducts: Product[];
  refetch: () => Promise<void>;
}

// ============================================================================
// BASE WARE HOOK
// ============================================================================

export function useProduct(wareId: string | undefined): UseProductReturn {
  const { data: product, loading, error, refetch } = useWares(wareId);

  const isPublished = product?.status === 'published';
  const inStock = product ? (product.quantity_available === null || product.quantity_available > 0) : false;
  const isAvailable = !!product && isPublished && inStock && product.pricing_model !== 'patronage_only';
  const isFree = product?.pricing_model === 'free';

  return {
    product: product ?? null,
    loading,
    error: error || null,
    isAvailable,
    isPublished,
    price: product?.price ?? null,
    pricingModel: product?.pricing_model ?? null,
    isFree,
    refetch,
  };
}

// ============================================================================
// WARE LIST HOOK
// ============================================================================

export function useProductList(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): UseProductListReturn {
  const [products, setProducts] = useState<Product[]>([]);
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
      if (params?.filters) {
        Object.entries(params.filters).forEach(([k, v]) => sp.set(k, v));
      }
      sp.set('status', 'published');

      const response = await fetch(`/api/generated/plutus-economics/wares?${sp.toString()}`);
      const result = await response.json();

      if (result.success) {
        setProducts(result.data.data || result.data || []);
        setTotal(result.data.pagination?.total || 0);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.limit, params?.sort, params?.order, params?.filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const availableProducts = useMemo(() => {
    return products.filter(p =>
      p.status === 'published' && (p.quantity_available === null || p.quantity_available > 0)
    );
  }, [products]);

  return {
    products,
    total,
    loading,
    error,
    availableProducts,
    refetch: fetchData,
  };
}
