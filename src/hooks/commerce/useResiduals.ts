// src/hooks/commerce/useResiduals.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { ResidualPayoutWithRelations } from '@/types/supabase/tables/residual_payouts';

interface EarningsByProduct {
  productId: string;
  productTitle: string;
  totalEarned: number;
  pending: number;
  paid: number;
  transactions: number;
}

interface ResidualsSummary {
  totalEarned: number;
  totalPending: number;
  totalPaid: number;
  totalTransactions: number;
  uniqueProducts: number;
}

interface UseResidualsReturn {
  residuals: ResidualPayoutWithRelations[];
  earningsByProduct: EarningsByProduct[];
  summary: ResidualsSummary;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  fetchByProduct: (productId: string) => Promise<ResidualPayoutWithRelations[]>;
}

export function useResiduals(): UseResidualsReturn {
  const { user } = useAuth();
  const [residuals, setResiduals] = useState<ResidualPayoutWithRelations[]>([]);
  const [earningsByProduct, setEarningsByProduct] = useState<EarningsByProduct[]>([]);
  const [summary, setSummary] = useState<ResidualsSummary>({
    totalEarned: 0,
    totalPending: 0,
    totalPaid: 0,
    totalTransactions: 0,
    uniqueProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchResiduals = useCallback(async () => {
    if (!user) {
      setResiduals([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/residuals/my');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch residuals');
      }

      setResiduals(data.residuals || []);
      setEarningsByProduct(data.earningsByProduct || []);
      setSummary(data.summary || {
        totalEarned: 0,
        totalPending: 0,
        totalPaid: 0,
        totalTransactions: 0,
        uniqueProducts: 0,
      });

    } catch (err) {
      console.error('Error fetching residuals:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch residuals'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchByProduct = useCallback(async (productId: string): Promise<ResidualPayoutWithRelations[]> => {
    if (!user) return [];

    try {
      const { data, error: fetchError } = await supabase
        .from('residual_payouts')
        .select(`
          *,
          product:product_id (*),
          sale:sale_id (*)
        `)
        .eq('contributor_id', user.id)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return data || [];

    } catch (err) {
      console.error('Error fetching residuals by product:', err);
      return [];
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchResiduals();
  }, [fetchResiduals]);

  return {
    residuals,
    earningsByProduct,
    summary,
    loading,
    error,
    refresh: fetchResiduals,
    fetchByProduct,
  };
}