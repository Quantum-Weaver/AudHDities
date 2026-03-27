// hooks/admin/useAdmin.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { AdminLog, AdminLogWithRelations } from '@/types/supabase/tables/admin_logs';

interface UseAdminStats {
  totalUsers: number;
  totalCreators: number;
  totalVendors: number;
  totalProducts: number;
  totalRevenue: number;
  pendingCreatorApps: number;
  pendingVendorApps: number;
}

interface UseAdminReturn {
  logs: AdminLogWithRelations[];
  stats: UseAdminStats;
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  createPublicNote: (action: string, note: string, targetId?: string, targetType?: string) => Promise<boolean>;
}

interface UseAdminOptions {
  limit?: number;
  search?: string;
}

export function useAdmin(options: UseAdminOptions = {}): UseAdminReturn {
  const { limit = 20, search } = options;
  const { user } = useAuth();
  const [logs, setLogs] = useState<AdminLogWithRelations[]>([]);
  const [stats, setStats] = useState<UseAdminStats>({
    totalUsers: 0,
    totalCreators: 0,
    totalVendors: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingCreatorApps: 0,
    pendingVendorApps: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchStats = useCallback(async () => {
    try {
      // User counts
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: creators } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_creator', true);

      const { count: vendors } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_vendor', true);

      // Product counts
      const { count: totalProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Revenue
      const { data: salesData } = await supabase
        .from('sales')
        .select('gross_amount');

      const totalRevenue = salesData?.reduce((sum, sale) => sum + (sale.gross_amount || 0), 0) || 0;

      // Pending applications
      const { count: pendingCreatorApps } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('application_type', 'creator')
        .eq('status', 'pending');

      const { count: pendingVendorApps } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('application_type', 'vendor')
        .eq('status', 'pending');

      setStats({
        totalUsers: totalUsers || 0,
        totalCreators: creators || 0,
        totalVendors: vendors || 0,
        totalProducts: totalProducts || 0,
        totalRevenue,
        pendingCreatorApps: pendingCreatorApps || 0,
        pendingVendorApps: pendingVendorApps || 0,
      });

    } catch (err) {
      console.error('Error fetching admin stats:', err);
    }
  }, [supabase]);

  const fetchLogs = useCallback(async (reset: boolean = false) => {
    if (!user) return;

    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const offset = (currentPage - 1) * limit;

      let query = supabase
        .from('admin_logs')
        .select(`
          *,
          admin:admin_id (
            id,
            username,
            display_name
          )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (search) {
        query = query.or(`action.ilike.%${search}%,public_note.ilike.%${search}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const normalizedLogs = (data || []).map(log => ({
        ...log,
        admin: log.admin,
      })) as AdminLogWithRelations[];

      if (reset) {
        setLogs(normalizedLogs);
      } else {
        setLogs(prev => [...prev, ...normalizedLogs]);
      }

      setHasMore((data?.length || 0) === limit);
      setPage(currentPage);

    } catch (err) {
      console.error('Error fetching admin logs:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch logs'));
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, user, supabase]);

  const createPublicNote = useCallback(async (
    action: string,
    publicNote: string,
    targetId?: string,
    targetType?: string
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error: insertError } = await supabase
        .from('admin_logs')
        .insert({
          admin_id: user.id,
          action,
          public_note: publicNote,
          target_id: targetId || null,
          target_type: targetType || null,
        });

      if (insertError) throw insertError;

      // Refresh logs
      await fetchLogs(true);
      return true;

    } catch (err) {
      console.error('Error creating public note:', err);
      setError(err instanceof Error ? err : new Error('Failed to create note'));
      return false;
    }
  }, [user, supabase, fetchLogs]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      await fetchLogs(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    await Promise.all([fetchLogs(true), fetchStats()]);
  };

  useEffect(() => {
    if (user) {
      fetchLogs(true);
      fetchStats();
    }
  }, [user, search]);

  return {
    logs,
    stats,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    createPublicNote,
  };
}