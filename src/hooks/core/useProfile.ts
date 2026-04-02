/* @/hooks/useProfile.ts */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from '@/lib/supabase/client';
import type { Profile } from '@/types/supabase/tables/profiles';

export function useProfile(userId?: string) {
  const supabase = useSupabase();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const refreshProfile = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    await fetchProfile(userId);
  }, [userId, fetchProfile]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchProfile(userId);
  }, [userId, fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!userId) return { error: 'No user ID' };
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, [userId, supabase]);

  return { profile, loading, error, refreshProfile, updateProfile };
}