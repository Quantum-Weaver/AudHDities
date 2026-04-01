// hooks/commerce/useSale.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Sale } from '@/types/supabase/tables/sales';

// Local type for sale with buyer info (partial profile)
interface SaleWithBuyer extends Sale {
  product?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  buyer?: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  residual_payouts?: {
    id: string;
    amount: number;
    status: string;
    calculation_note: string | null;
    contributor_id: string | null;
  }[];
}

interface UseSaleReturn {
  sale: SaleWithBuyer | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

// =====================================================
// useSale - fetch a single sale by ID
// =====================================================
export function useSale(saleId: string): UseSaleReturn {
  const [sale, setSale] = useState<SaleWithBuyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const supabase = createClient();

  const fetchSale = useCallback(async () => {
    if (!saleId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('sales')
        .select(`
          *,
          product:product_id (
            id,
            title,
            slug
          ),
          buyer:buyer_id (
            id,
            username,
            display_name,
            avatar_url
          ),
          residual_payouts (
            id,
            amount,
            status,
            calculation_note,
            contributor_id
          )
        `)
        .eq('id', saleId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      // Verify user has permission to view this sale
      if (data && user) {
        const isBuyer = data.buyer_id === user.id;
        const isAdmin = false; // Would need to check admin status
        const isCreator = false; // Would need to check if user owns the product
        
        if (!isBuyer && !isAdmin && !isCreator) {
          setSale(null);
          setError(new Error('You do not have permission to view this sale'));
          return;
        }
      }

      setSale(data as SaleWithBuyer);

    } catch (err) {
      console.error('Error fetching sale:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch sale'));
    } finally {
      setLoading(false);
    }
  }, [saleId, user, supabase]);

  useEffect(() => {
    fetchSale();
  }, [fetchSale]);

  return {
    sale,
    loading,
    error,
    refresh: fetchSale,
  };
}

// =====================================================
// useSaleByStripeSession - fetch sale by Stripe session ID
// =====================================================
export function useSaleByStripeSession(sessionId: string): UseSaleReturn {
  const [sale, setSale] = useState<SaleWithBuyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const supabase = createClient();

  const fetchSale = useCallback(async () => {
    if (!sessionId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('sales')
        .select(`
          *,
          product:product_id (
            id,
            title,
            slug
          ),
          buyer:buyer_id (
            id,
            username,
            display_name,
            avatar_url
          ),
          residual_payouts (
            id,
            amount,
            status,
            calculation_note,
            contributor_id
          )
        `)
        .eq('stripe_session_id', sessionId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      // Verify user has permission to view this sale
      if (data && user) {
        const isBuyer = data.buyer_id === user.id;
        if (!isBuyer) {
          setSale(null);
          setError(new Error('You do not have permission to view this sale'));
          return;
        }
      }

      setSale(data as SaleWithBuyer);

    } catch (err) {
      console.error('Error fetching sale by session:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch sale'));
    } finally {
      setLoading(false);
    }
  }, [sessionId, user, supabase]);

  useEffect(() => {
    fetchSale();
  }, [fetchSale]);

  return {
    sale,
    loading,
    error,
    refresh: fetchSale,
  };
}
