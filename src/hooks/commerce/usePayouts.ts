// hooks/commerce/usePayouts.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Database } from '@/types/supabase/database.types';

export type ResidualPayout = Database['public']['Tables']['residual_payouts']['Row'];
export type PayoutStatus = Database['public']['Enums']['payout_status'];

export interface PayoutWithDetails extends ResidualPayout {
  product?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  contributor?: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  sale?: {
    id: string;
    created_at: string | null;
    buyer?: {
      username: string | null;
      display_name: string | null;
    } | null;
  } | null;
}

interface UsePayoutsOptions {
  status?: PayoutStatus | 'all';
  limit?: number;
  contributorId?: string;
}

interface UsePayoutsReturn {
  payouts: PayoutWithDetails[];
  loading: boolean;
  error: Error | null;
  totalEarned: number;
  totalPending: number;
  totalPaid: number;
  refresh: () => Promise<void>;
}

export function usePayouts(options: UsePayoutsOptions = {}): UsePayoutsReturn {
  const { status = 'all', limit = 50, contributorId } = options;
  const { user } = useAuth();
  const [payouts, setPayouts] = useState<PayoutWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const supabase = createClient();

  const fetchPayouts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('residual_payouts')
        .select(`
          *,
          product:product_id (
            id,
            title,
            slug
          ),
          contributor:contributor_id (
            id,
            username,
            display_name,
            avatar_url
          ),
          sale:sale_id (
            id,
            created_at,
            buyer:buyer_id (
              username,
              display_name
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      // Filter by contributor (if not admin, only show user's own)
      if (contributorId) {
        query = query.eq('contributor_id', contributorId);
      } else if (user) {
        query = query.eq('contributor_id', user.id);
      } else {
        setPayouts([]);
        setLoading(false);
        return;
      }

      // Filter by status
      if (status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Cast data to match our type (handles null from relations)
      const payoutsData = (data || []) as PayoutWithDetails[];

      // Calculate totals
      let earned = 0;
      let pending = 0;
      let paid = 0;

      payoutsData.forEach(p => {
        const amount = p.amount || 0;
        earned += amount;
        if (p.status === 'pending') pending += amount;
        if (p.status === 'paid') paid += amount;
      });

      setPayouts(payoutsData);
      setTotalEarned(earned);
      setTotalPending(pending);
      setTotalPaid(paid);

    } catch (err) {
      console.error('Error fetching payouts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch payouts'));
    } finally {
      setLoading(false);
    }
  }, [status, limit, contributorId, user, supabase]);

  useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  return {
    payouts,
    loading,
    error,
    totalEarned,
    totalPending,
    totalPaid,
    refresh: fetchPayouts,
  };
}