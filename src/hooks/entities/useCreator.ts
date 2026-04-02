/* @/hooks/entitis/useCreator.ts */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import type { CreatorProfile } from '@/types/supabase/tables/creator_profiles';

export function useCreator(userId?: string) {
  const supabase = useSupabase();
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCreator = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setCreator(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchCreator(userId);
  }, [userId, fetchCreator]);

  const applyForCreator = useCallback(async (applicationData: Partial<CreatorProfile>) => {
    if (!userId) return { error: 'No user ID' };
    
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          user_id: userId,
          application_type: 'creator',
          form_data: applicationData
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, [userId, supabase]);

  return { creator, loading, error, applyForCreator };
}