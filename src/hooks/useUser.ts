// src/hooks/useUser.ts
// =====================================================
// HOOK: useUser
// =====================================================

"use client";

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import type { ProfilesRow } from '@/types/generated/hestia-core/profiles';

export interface UseUserReturn {
  user: User | null;
  profile: ProfilesRow | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCreator: boolean;
  isVendor: boolean;
  isQuantumWeaver: boolean;
  userTier: ProfilesRow['user_tier'] | null;
  sovereigntyScore: number;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfilesRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async (userId: string): Promise<ProfilesRow | null> => {
    try {
      const response = await fetch(`/api/generated/hestia-core/profiles/${userId}`);
      const result = await response.json();
      if (result.success) { return result.data as ProfilesRow; }
      console.error('Error fetching profile:', result.error);
      return null;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  }, []);

  const loadUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      setUser(currentUser);
      if (currentUser) { setProfile(await fetchProfile(currentUser.id)); } else { setProfile(null); }
    } catch (err) {
      console.error('Error loading user:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, fetchProfile]);

  useEffect(() => {
    loadUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      if (session?.user) { setProfile(await fetchProfile(session.user.id)); } else { setProfile(null); }
    });
    return () => { subscription.unsubscribe(); };
  }, [supabase, fetchProfile, loadUser]);

  return {
    user, profile, isLoading, error,
    isAuthenticated: !!user,
    isAdmin: profile?.is_admin === true,
    isCreator: profile?.is_creator === true,
    isVendor: profile?.is_vendor === true,
    isQuantumWeaver: profile?.is_quantum_weaver === true,
    userTier: profile?.user_tier || null,
    sovereigntyScore: profile?.sovereignty_score || 0,
    refetch: loadUser,
  };
}