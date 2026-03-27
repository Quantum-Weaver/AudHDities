// hooks/admin/useApplications.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Application, ApplicationWithUser, ApplicationType } from '@/types/supabase/tables/applications';

interface UseApplicationsStats {
  total: number;
  pending: number;
  verified: number;
  rejected: number;
  suspended: number;
}

interface UseApplicationsReturn {
  applications: ApplicationWithUser[];
  stats: UseApplicationsStats;
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  approveApplication: (id: string, notes?: string) => Promise<boolean>;
  rejectApplication: (id: string, notes?: string) => Promise<boolean>;
  deleteApplication: (id: string) => Promise<boolean>;
}

interface UseApplicationsOptions {
  limit?: number;
  type?: ApplicationType | 'all';
  status?: 'pending' | 'verified' | 'rejected' | 'suspended' | 'all';
  search?: string;
}

export function useApplications(options: UseApplicationsOptions = {}): UseApplicationsReturn {
  const { limit = 20, type = 'all', status = 'pending', search } = options;
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
  const [stats, setStats] = useState<UseApplicationsStats>({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
    suspended: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchStats = useCallback(async () => {
    try {
      let query = supabase
        .from('applications')
        .select('status', { count: 'exact', head: false });

      if (type !== 'all') {
        query = query.eq('application_type', type);
      }

      const { data, error: statsError } = await query;

      if (statsError) throw statsError;

      const statsCounts = {
        total: 0,
        pending: 0,
        verified: 0,
        rejected: 0,
        suspended: 0,
      };

      data?.forEach(app => {
        statsCounts.total++;
        if (app.status === 'pending') statsCounts.pending++;
        if (app.status === 'verified') statsCounts.verified++;
        if (app.status === 'rejected') statsCounts.rejected++;
        if (app.status === 'suspended') statsCounts.suspended++;
      });

      setStats(statsCounts);

    } catch (err) {
      console.error('Error fetching application stats:', err);
    }
  }, [supabase, type]);

  const fetchApplications = useCallback(async (reset: boolean = false) => {
    if (!user) return;

    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const offset = (currentPage - 1) * limit;

      let query = supabase
        .from('applications')
        .select(`
          *,
          user:profiles!applications_user_id_fkey (
            id,
            username,
            display_name,
            email
          ),
          reviewer:profiles!applications_reviewed_by_fkey (
            id,
            username,
            display_name
          )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (type !== 'all') {
        query = query.eq('application_type', type);
      }

      if (status !== 'all') {
        query = query.eq('status', status);
      }

      if (search) {
        query = query.or(`
          user.display_name.ilike.%${search}%,
          user.username.ilike.%${search}%,
          user.email.ilike.%${search}%,
          form_data->>business_name.ilike.%${search}%,
          form_data->>creative_categories.cs.{${search}}
        `);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Parse form_data for each application
      const parsedApplications = (data || []).map(app => ({
        ...app,
        form_data: typeof app.form_data === 'object' 
          ? app.form_data 
          : JSON.parse(app.form_data as string || '{}'),
        user: app.user || undefined,
        reviewer: app.reviewer || undefined,
      })) as ApplicationWithUser[];

      if (reset) {
        setApplications(parsedApplications);
      } else {
        setApplications(prev => [...prev, ...parsedApplications]);
      }

      setHasMore((data?.length || 0) === limit);
      setPage(currentPage);

    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch applications'));
    } finally {
      setLoading(false);
    }
  }, [page, limit, type, status, search, user, supabase]);

  const approveApplication = useCallback(async (id: string, notes?: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error: updateError } = await supabase
        .from('applications')
        .update({
          status: 'verified',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
          review_notes: notes || null,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // Log admin action
      await supabase
        .from('admin_logs')
        .insert({
          admin_id: user.id,
          action: 'approve_application',
          target_id: id,
          target_type: 'application',
          public_note: `Approved application`,
        });

      await refresh();
      return true;

    } catch (err) {
      console.error('Error approving application:', err);
      setError(err instanceof Error ? err : new Error('Failed to approve application'));
      return false;
    }
  }, [user, supabase]);

  const rejectApplication = useCallback(async (id: string, notes?: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error: updateError } = await supabase
        .from('applications')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
          review_notes: notes || null,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // Log admin action
      await supabase
        .from('admin_logs')
        .insert({
          admin_id: user.id,
          action: 'reject_application',
          target_id: id,
          target_type: 'application',
          public_note: `Rejected application${notes ? `: ${notes}` : ''}`,
        });

      await refresh();
      return true;

    } catch (err) {
      console.error('Error rejecting application:', err);
      setError(err instanceof Error ? err : new Error('Failed to reject application'));
      return false;
    }
  }, [user, supabase]);

  const deleteApplication = useCallback(async (id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error: deleteError } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Log admin action
      await supabase
        .from('admin_logs')
        .insert({
          admin_id: user.id,
          action: 'delete_application',
          target_id: id,
          target_type: 'application',
          public_note: `Deleted application`,
        });

      await refresh();
      return true;

    } catch (err) {
      console.error('Error deleting application:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete application'));
      return false;
    }
  }, [user, supabase]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      await fetchApplications(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    await Promise.all([fetchApplications(true), fetchStats()]);
  };

  useEffect(() => {
    if (user) {
      fetchApplications(true);
      fetchStats();
    }
  }, [user, type, status, search]);

  return {
    applications,
    stats,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    approveApplication,
    rejectApplication,
    deleteApplication,
  };
}