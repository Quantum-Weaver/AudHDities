// =====================================================
// HOOK: useAuth
// GENERATED: Manual (or by GAIA)
// SOURCE: Supabase Auth
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { ProfilesRow } from '@/types/generated/hestia-core/profiles';

export interface AuthState {
  user: User | null;
  profile: ProfilesRow | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export function useAuth(): AuthState & AuthActions {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfilesRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data for a user
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`/api/generated/hestia-core/profiles/${userId}`);
      const result = await response.json();
      
      if (result.success) {
        setProfile(result.data);
      } else {
        console.error('Failed to fetch profile:', result.error);
        setProfile(null);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setProfile(null);
    }
  }, []);

  // Refresh profile (useful after updates)
  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  // Sign in
  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      return { error };
    }
    
    return { error: null };
  }, [supabase]);

  // Sign up
  const signUp = useCallback(async (email: string, password: string, metadata?: Record<string, unknown>) => {
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }
    });
    
    if (error) {
      setError(error.message);
      return { error };
    }
    
    return { error: null };
  }, [supabase]);

  // Sign out
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, [supabase]);

  // Listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const newUser = session?.user || null;
        setUser(newUser);
        
        if (newUser) {
          await fetchProfile(newUser.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      const initialUser = session?.user || null;
      setUser(initialUser);
      
      if (initialUser) {
        fetchProfile(initialUser.id);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  return {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    refreshProfile
  };
}