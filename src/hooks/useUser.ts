// hooks/useUser.ts
// Client-side user hook for React components

"use client";

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  email: string;
  user_tier: 'community' | 'ally' | 'corporate' | 'council';
  sovereignty_score: number;
  is_admin: boolean;
  is_creator: boolean;
  is_vendor: boolean;
  is_quantum_weaver: boolean;
  primary_house: string | null;
  status: 'active' | 'suspended' | 'deleted';
  created_at: string;
  updated_at: string;
}

export interface UseUserReturn {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCreator: boolean;
  isVendor: boolean;
  isQuantumWeaver: boolean;
  userTier: UserProfile['user_tier'] | null;
  sovereigntyScore: number;
  refetch: () => Promise<void>;
}

/**
 * Client-side hook to get current user and profile
 * Automatically reacts to auth state changes
 * 
 * @example
 * const { user, profile, isLoading, isAuthenticated } = useUser();
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (!isAuthenticated) return <LoginButton />;
 * return <div>Welcome, {profile?.display_name}</div>;
 */
export function useUser(): UseUserReturn {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return null;
    }

    return data as UserProfile;
  }, [supabase]);

  const loadUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

      if (userError) throw userError;

      setUser(currentUser);

      if (currentUser) {
        const userProfile = await fetchProfile(currentUser.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error('Error loading user:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, fetchProfile]);

  // Listen to auth state changes
  useEffect(() => {
    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      
      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile, loadUser]);

  return {
    user,
    profile,
    isLoading,
    error,
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