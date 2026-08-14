// src/hooks/useUser.ts
// =====================================================
// HOOK: useUser
// =====================================================
// Repointed 2026-07-18: the profiles table dissolved in the schema
// evolution. Public identity now lives in community_profiles (found by
// created_by), role flags in user_roles (one row per role), and the old
// numeric sovereignty_score became the sovereign_tier enum
// (dweller â†’ guild â†’ outlander â†’ sovereign_weaver).

"use client";

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import type { CommunityProfilesRow } from '@/lib/generated/types/hestia-core/community_profiles';
import type { Enums } from '@/lib/generated/supabase/database.helpers';

export type UserRole = Enums<'user_role'>;
export type SovereignTier = Enums<'sovereign_tier'>;

// The old numeric sovereignty_score became the sovereign_tier enum; where a
// number is still wanted (progress bars, beam intensity, star maps), each
// tier carries its light-level. One map, imported everywhere.
export const TIER_LIGHT: Record<SovereignTier, number> = {
  dweller: 100,
  guild: 400,
  outlander: 700,
  sovereign_weaver: 1000,
};

export function tierLight(tier: SovereignTier | null | undefined): number {
  return (tier && TIER_LIGHT[tier]) || 0;
}

export interface UseUserReturn {
  user: User | null;
  profile: CommunityProfilesRow | null;
  roles: UserRole[];
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCreator: boolean;
  isVendor: boolean;
  isQuantumWeaver: boolean;
  sovereignTier: SovereignTier | null;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CommunityProfilesRow | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchIdentity = useCallback(async (userId: string): Promise<{
    profile: CommunityProfilesRow | null;
    roles: UserRole[];
  }> => {
    try {
      const [profileRes, rolesRes] = await Promise.all([
        fetch(`/api/generated/hestia-core/community_profiles?created_by=${userId}&limit=1`).then(r => r.json()),
        fetch(`/api/generated/hestia-core/user_roles?user_id=${userId}&limit=20`).then(r => r.json()),
      ]);
      const profileRows = profileRes.success ? (profileRes.data?.data ?? profileRes.data ?? []) : [];
      const roleRows = rolesRes.success ? (rolesRes.data?.data ?? rolesRes.data ?? []) : [];
      return {
        profile: Array.isArray(profileRows) ? (profileRows[0] ?? null) : profileRows,
        roles: (Array.isArray(roleRows) ? roleRows : []).map((r: { role: UserRole }) => r.role),
      };
    } catch (err) {
      console.error('Error fetching identity:', err);
      return { profile: null, roles: [] };
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
        const identity = await fetchIdentity(currentUser.id);
        setProfile(identity.profile);
        setRoles(identity.roles);
      } else {
        setProfile(null);
        setRoles([]);
      }
    } catch (err) {
      console.error('Error loading user:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setUser(null);
      setProfile(null);
      setRoles([]);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, fetchIdentity]);

  useEffect(() => {
    loadUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        const identity = await fetchIdentity(session.user.id);
        setProfile(identity.profile);
        setRoles(identity.roles);
      } else {
        setProfile(null);
        setRoles([]);
      }
    });
    return () => { subscription.unsubscribe(); };
  }, [supabase, fetchIdentity, loadUser]);

  return {
    user, profile, roles, isLoading, error,
    isAuthenticated: !!user,
    isAdmin: roles.includes('admin'),
    isCreator: roles.includes('creator'),
    isVendor: roles.includes('vendor'),
    isQuantumWeaver: profile?.sovereign_tier === 'sovereign_weaver',
    sovereignTier: profile?.sovereign_tier ?? null,
    refetch: loadUser,
  };
}
