/* @/hooks/entities/useCommunityProfile.ts */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import type { CommunityProfile } from '@/types/supabase/tables/community_profiles';

export function useCommunityProfile(userId?: string) {
  const supabase = useSupabase();
  const [communityProfile, setCommunityProfile] = useState<CommunityProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunityProfile = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('community_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCommunityProfile(data);
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
    fetchCommunityProfile(userId);
  }, [userId, fetchCommunityProfile]);

  const updateCommunityProfile = useCallback(async (updates: Partial<CommunityProfile>) => {
    if (!userId) return { error: 'No user ID' };
    
    try {
      const { data, error } = await supabase
        .from('community_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      setCommunityProfile(data);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, [userId, supabase]);

  return { communityProfile, loading, error, updateCommunityProfile };
}