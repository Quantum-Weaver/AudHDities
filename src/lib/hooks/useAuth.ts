// src/hooks/useAuth.ts
// =====================================================
// HOOK: useAuth
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { CommunityProfilesRow } from '@/lib/generated/types/hestia-core/community_profiles';

export interface AuthState {
  user: User | null;
  profile: CommunityProfilesRow | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<{ error: Error | null }>;
  signInWithLink: (email: string, redirectTo: string) => Promise<{ error: Error | null }>;
  resetPassword: (email: string, redirectTo?: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export function useAuth(): AuthState & AuthActions {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CommunityProfilesRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const response = await fetch(
        `/api/generated/hestia-core/community_profiles?created_by=${userId}&limit=1`
      );
      const result = await response.json();

      if (result.success) {
        const rows = result.data?.data ?? result.data ?? [];
        setProfile(Array.isArray(rows) ? (rows[0] ?? null) : rows);
      } else {
        console.error('Failed to fetch profile:', result.error);
        setProfile(null);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setProfile(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); return { error }; }
    return { error: null };
  }, [supabase]);

  const signUp = useCallback(async (email: string, password: string, metadata?: Record<string, unknown>) => {
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password, options: { data: metadata } });
    if (error) { setError(error.message); return { error }; }
    return { error: null };
  }, [supabase]);

  const signInWithLink = useCallback(async (email: string, redirectTo: string) => {
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: false },
    });
    if (error) { setError(error.message); return { error }; }
    return { error: null };
  }, [supabase]);

  const resetPassword = useCallback(async (email: string, redirectTo?: string) => {
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      redirectTo ? { redirectTo } : undefined
    );
    if (error) { setError(error.message); return { error }; }
    return { error: null };
  }, [supabase]);

  const updatePassword = useCallback(async (password: string) => {
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError(error.message); return { error }; }
    return { error: null };
  }, [supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, [supabase]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const newUser = session?.user || null;
        setUser(newUser);
        if (newUser) { await fetchProfile(newUser.id); } else { setProfile(null); }
        setLoading(false);
      }
    );

    supabase.auth.getUser().then(({ data: { user: initialUser } }) => {
      setUser(initialUser || null);
      if (initialUser) { fetchProfile(initialUser.id); }
      setLoading(false);
    });

    return () => { subscription.unsubscribe(); };
  }, [supabase, fetchProfile]);

  return { user, profile, loading, error, signIn, signUp, signInWithLink, resetPassword, updatePassword, signOut, refreshProfile };
}