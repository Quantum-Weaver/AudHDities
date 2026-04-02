/* @/hooks/useUser.ts */
'use client';

import { useAuth } from './useAuth';
import { useProfile } from './useProfile';

export function useUser() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading, refreshProfile } = useProfile(user?.id);

  return {
    user,
    profile,
    isLoading: authLoading || profileLoading,
    isAuthenticated: !!user,
    isCreator: profile?.is_creator ?? false,
    isVendor: profile?.is_vendor ?? false,
    isAdmin: profile?.is_admin ?? false,
    isQuantumWeaver: profile?.is_quantum_weaver ?? false,
    userTier: profile?.user_tier ?? 'community',
    sovereigntyScore: profile?.sovereignty_score ?? 0,
    signOut,
    refreshProfile
  };
}