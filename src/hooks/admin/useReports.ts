// hooks/admin/useReports.ts
'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { ReportInsert, ReportType } from '@/types/supabase/tables/reports';

interface UseReportsReturn {
  submitReport: (params: {
    reportType: ReportType;
    reason: string;
    description?: string;
    reportedUserId?: string;
    productId?: string;
    commentId?: string;
    postId?: string;
    reportedUrl?: string;
    reportedContent?: string;
  }) => Promise<boolean>;
  loading: boolean;
  error: Error | null;
}

export function useReports(): UseReportsReturn {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const submitReport = useCallback(async ({
    reportType,
    reason,
    description,
    reportedUserId,
    productId,
    commentId,
    postId,
    reportedUrl,
    reportedContent,
  }: {
    reportType: ReportType;
    reason: string;
    description?: string;
    reportedUserId?: string;
    productId?: string;
    commentId?: string;
    postId?: string;
    reportedUrl?: string;
    reportedContent?: string;
  }): Promise<boolean> => {
    if (!user) {
      setError(new Error('You must be logged in to submit a report'));
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const reportData: ReportInsert = {
        reporter_id: user.id,
        report_type: reportType,
        reason,
        description: description || null,
        reported_user_id: reportedUserId || null,
        product_id: productId || null,
        comment_id: commentId || null,
        post_id: postId || null,
        reported_url: reportedUrl || null,
        reported_content: reportedContent || null,
        status: 'pending',
      };

      const { error: insertError } = await supabase
        .from('reports')
        .insert(reportData);

      if (insertError) throw insertError;

      return true;

    } catch (err) {
      console.error('Error submitting report:', err);
      setError(err instanceof Error ? err : new Error('Failed to submit report'));
      return false;

    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  return {
    submitReport,
    loading,
    error,
  };
}