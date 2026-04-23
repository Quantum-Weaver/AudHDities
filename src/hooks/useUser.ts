// hooks/useUser.ts
// Client-side user hook for React components

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

/**
 * Client-side hook to get current user and profile
 * Automatically reacts to auth state changes
 * Uses generated API route for profile data
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
  const [profile, setProfile] = useState<ProfilesRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async (userId: string): Promise<ProfilesRow | null> => {
    try {
      const response = await fetch(`/api/generated/hestia-core/profiles/${userId}`);
      const result = await response.json();

      if (result.success) {
        return result.data as ProfilesRow;
      } else {
        console.error('Error fetching profile:', result.error);
        return null;
      }
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