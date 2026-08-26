// src/hooks/useProfile.ts
// =====================================================
// HOOK: useProfile — community_profiles edition
// =====================================================

'use client';

import { useCallback, useMemo } from 'react';
import { useUser } from './useUser';
import type { CommunityProfilesRow, CommunityProfilesUpdate } from '@/lib/generated/types/hestia-core/community_profiles';

export type Profile = CommunityProfilesRow;
export type ProfileUpdate = CommunityProfilesUpdate;

export interface ProfilePermissions {
  canEdit: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  canViewPrivate: boolean;
}

export interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  permissions: ProfilePermissions;
  updateProfile: (updates: Partial<ProfileUpdate>) => Promise<Profile | null>;
  refreshProfile: () => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const { user, profile, roles, isLoading, error, refetch } = useUser();

  const permissions = useMemo((): ProfilePermissions => {
    const isOwner = !!user && !!profile && profile.created_by === user.id;
    const isAdmin = roles.includes('admin');
    const isModerator = roles.includes('council');
    return {
      canEdit: isOwner || isAdmin,
      isOwner,
      isAdmin,
      isModerator,
      canViewPrivate: isOwner || isAdmin || isModerator,
    };
  }, [user, profile, roles]);

  const updateProfile = useCallback(async (updates: Partial<ProfileUpdate>): Promise<Profile | null> => {
    if (!profile || !permissions.canEdit) throw new Error('Not authorized');
    const response = await fetch(`/api/generated/hestia-core/community_profiles/${profile.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Update failed');
    await refetch();
    return result.data ?? null;
  }, [profile, permissions.canEdit, refetch]);

  return {
    profile,
    loading: isLoading,
    error,
    permissions,
    updateProfile,
    refreshProfile: refetch,
  };
}

export function useCurrentProfile() { return useProfile(); }
