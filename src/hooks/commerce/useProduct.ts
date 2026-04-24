// hooks/commerce/useProduct.ts
'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useProducts } from '@/hooks/generated/plutus-economics/products.js';
import type { Tables } from '@/types/supabase/database.helpers.js';

// ============================================================================
// TYPES
// ============================================================================

export type Product = Tables<'products'>;

export type PurchaseTier = 'community' | 'ally' | 'corporate' | 'council';

export interface ProductPricing {
  tier: PurchaseTier;
  price: number | null;
  label: string;
  available: boolean;
}

export interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  isAvailable: boolean;
  isPublished: boolean;
  pricing: ProductPricing[];
  currentTierPrice: (tier: PurchaseTier) => number | null;
  getLowestPrice: () => number | null;
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
// DEFAULT VALUES
// ============================================================================

const TIER_LABELS: Record<PurchaseTier, string> = {
  community: 'Community',
  ally: 'Ally',
  corporate: 'Corporate',
  council: 'Council',
};

// ============================================================================
// BASE PRODUCT HOOK
// ============================================================================

export function useProduct(productId: string | undefined): UseProductReturn {
  const { data: product, loading, error, refetch } = useProducts(productId);

  const isAvailable = useMemo(() => {
    if (!product) return false;
    return product.active === true && product.is_published === true;
  }, [product]);

  const isPublished = useMemo(() => {
    return product?.is_published === true;
  }, [product]);

  const pricing = useMemo((): ProductPricing[] => {
    if (!product) return [];

    const tiers: PurchaseTier[] = ['community', 'ally', 'corporate'];
    
    return tiers.map(tier => {
      let price: number | null = null;
      
      switch (tier) {
        case 'community':
          price = (product as any).price_community ?? null;
          break;
        case 'ally':
          price = (product as any).price_ally ?? null;
          break;
        case 'corporate':
          price = (product as any).price_corporate ?? null;
          break;
      }

      return {
        tier,
        price,
        label: TIER_LABELS[tier],
        available: price !== null && price > 0,
      };
    });
  }, [product]);

  const currentTierPrice = useCallback((tier: PurchaseTier): number | null => {
    const effectiveTier = tier === 'council' ? 'community' : tier;
    const tierPricing = pricing.find(p => p.tier === effectiveTier);
    return tierPricing?.price ?? null;
  }, [pricing]);

  const getLowestPrice = useCallback((): number | null => {
    const availablePrices = pricing
      .filter(p => p.available && p.price !== null)
      .map(p => p.price as number);
    
    if (availablePrices.length === 0) return null;
    return Math.min(...availablePrices);
  }, [pricing]);

  return {
    product,
    loading,
    error: error || null,
    isAvailable,
    isPublished,
    pricing,
    currentTierPrice,
    getLowestPrice,
    refetch,
  };
}

// ============================================================================
// PRODUCT LIST HOOK
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
      sp.set('active', 'true');
      sp.set('is_published', 'true');

      const response = await fetch(`/api/generated/plutus-economics/products?${sp.toString()}`);
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
    return products.filter(p => p.active === true && p.is_published === true);
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