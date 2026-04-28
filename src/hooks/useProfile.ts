// app/hooks/useProfile.ts
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from './useAuth';
import { useProfiles, useProfilesList, useUpdateProfiles } from './generated/hestia-core/profiles';
import { useCreatorProfiles, useCreateCreatorProfiles, useUpdateCreatorProfiles } from './generated/hestia-core/creator_profiles';
import { useVendorProfiles, useCreateVendorProfiles, useUpdateVendorProfiles } from './generated/hestia-core/vendor_profiles';
import { useCommunityProfiles, useCreateCommunityProfiles, useUpdateCommunityProfiles } from './generated/hestia-core/community_profiles';
import { useApplicationsList, useCreateApplications } from './generated/themis-governance/applications';
import type { Tables, TablesInsert, TablesUpdate } from '../types/supabase/database.helpers';
import type { NDPreferences, SensoryPreferences, AlgorithmPreferences } from '../types/preferences';

// ============================================================================
// TYPES - Derived from database schema
// ============================================================================

export type Profile = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;

export type CreatorProfile = Tables<'creator_profiles'>;
export type VendorProfile = Tables<'vendor_profiles'>;
export type CommunityProfile = Tables<'community_profiles'>;

export type Application = Tables<'applications'>;

// ============================================================================
// DEFAULT PREFERENCES (unchanged — business logic)
// ============================================================================

export const DEFAULT_ND_PREFERENCES: NDPreferences = {
  reduced_motion: false, high_contrast: false, focus_mode: false,
  sound_notifications: true, visual_timers: true, tl_dr_enabled: true,
  dyslexia_friendly: false, adhd_friendly: false, autism_friendly: false,
};

export const DEFAULT_SENSORY_PREFERENCES: SensoryPreferences = {
  light_sensitivity: 'medium', sound_sensitivity: 'medium', crowd_sensitivity: 'medium',
  touch_sensitivity: 'low', vestibular_sensitivity: 'low', olfactory_sensitivity: 'low',
};

export const DEFAULT_ALGORITHM_PREFERENCES: AlgorithmPreferences = {
  hide_politics: false, recommend_new: true, hide_marketing: false,
  recommend_related: true, recommend_trending: true, hide_trauma_content: true,
  show_boosted_content: true, show_subscribed_only: false, chronological_preferred: false,
};

// ============================================================================
// PREFERENCE PARSERS (unchanged — business logic)
// ============================================================================

export function parseNDPreferences(json: unknown): NDPreferences {
  if (!json || typeof json !== 'object') return DEFAULT_ND_PREFERENCES;
  const prefs = json as Partial<NDPreferences>;
  return {
    reduced_motion: prefs.reduced_motion ?? DEFAULT_ND_PREFERENCES.reduced_motion,
    high_contrast: prefs.high_contrast ?? DEFAULT_ND_PREFERENCES.high_contrast,
    focus_mode: prefs.focus_mode ?? DEFAULT_ND_PREFERENCES.focus_mode,
    sound_notifications: prefs.sound_notifications ?? DEFAULT_ND_PREFERENCES.sound_notifications,
    visual_timers: prefs.visual_timers ?? DEFAULT_ND_PREFERENCES.visual_timers,
    tl_dr_enabled: prefs.tl_dr_enabled ?? DEFAULT_ND_PREFERENCES.tl_dr_enabled,
    dyslexia_friendly: prefs.dyslexia_friendly ?? DEFAULT_ND_PREFERENCES.dyslexia_friendly,
    adhd_friendly: prefs.adhd_friendly ?? DEFAULT_ND_PREFERENCES.adhd_friendly,
    autism_friendly: prefs.autism_friendly ?? DEFAULT_ND_PREFERENCES.autism_friendly,
  };
}

export function parseSensoryPreferences(json: unknown): SensoryPreferences {
  if (!json || typeof json !== 'object') return DEFAULT_SENSORY_PREFERENCES;
  const prefs = json as Partial<SensoryPreferences>;
  return {
    light_sensitivity: prefs.light_sensitivity ?? DEFAULT_SENSORY_PREFERENCES.light_sensitivity,
    sound_sensitivity: prefs.sound_sensitivity ?? DEFAULT_SENSORY_PREFERENCES.sound_sensitivity,
    crowd_sensitivity: prefs.crowd_sensitivity ?? DEFAULT_SENSORY_PREFERENCES.crowd_sensitivity,
    touch_sensitivity: prefs.touch_sensitivity ?? DEFAULT_SENSORY_PREFERENCES.touch_sensitivity,
    vestibular_sensitivity: prefs.vestibular_sensitivity ?? DEFAULT_SENSORY_PREFERENCES.vestibular_sensitivity,
    olfactory_sensitivity: prefs.olfactory_sensitivity ?? DEFAULT_SENSORY_PREFERENCES.olfactory_sensitivity,
  };
}

export function parseAlgorithmPreferences(json: unknown): AlgorithmPreferences {
  if (!json || typeof json !== 'object') return DEFAULT_ALGORITHM_PREFERENCES;
  const prefs = json as Partial<AlgorithmPreferences>;
  return {
    hide_politics: prefs.hide_politics ?? DEFAULT_ALGORITHM_PREFERENCES.hide_politics,
    recommend_new: prefs.recommend_new ?? DEFAULT_ALGORITHM_PREFERENCES.recommend_new,
    hide_marketing: prefs.hide_marketing ?? DEFAULT_ALGORITHM_PREFERENCES.hide_marketing,
    recommend_related: prefs.recommend_related ?? DEFAULT_ALGORITHM_PREFERENCES.recommend_related,
    recommend_trending: prefs.recommend_trending ?? DEFAULT_ALGORITHM_PREFERENCES.recommend_trending,
    hide_trauma_content: prefs.hide_trauma_content ?? DEFAULT_ALGORITHM_PREFERENCES.hide_trauma_content,
    show_boosted_content: prefs.show_boosted_content ?? DEFAULT_ALGORITHM_PREFERENCES.show_boosted_content,
    show_subscribed_only: prefs.show_subscribed_only ?? DEFAULT_ALGORITHM_PREFERENCES.show_subscribed_only,
    chronological_preferred: prefs.chronological_preferred ?? DEFAULT_ALGORITHM_PREFERENCES.chronological_preferred,
  };
}

// ============================================================================
// PROFILE PERMISSIONS
// ============================================================================

export interface ProfilePermissions {
  canEdit: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  canViewPrivate: boolean;
}

// ============================================================================
// MAIN USE PROFILE HOOK — Now uses generated hooks
// ============================================================================

export interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  permissions: ProfilePermissions;
  updateProfile: (updates: Partial<ProfileUpdate>) => Promise<Profile | null>;
  refreshProfile: () => Promise<void>;
  updateNDPreferences: (preferences: Partial<NDPreferences>) => Promise<void>;
  updateSensoryPreferences: (preferences: Partial<SensoryPreferences>) => Promise<void>;
  updateAlgorithmPreferences: (preferences: Partial<AlgorithmPreferences>) => Promise<void>;
  awardBadge: (badgeName: string) => Promise<boolean>;
  hasBadge: (badgeName: string) => boolean;
}

export function useProfile(targetUserId?: string): UseProfileReturn {
  const { user } = useAuth();
  const profileId = targetUserId || user?.id;

  // Use generated hooks
  const { data: profile, loading, error, refetch } = useProfiles(profileId);
  const { update } = useUpdateProfiles();

  const permissions = useMemo((): ProfilePermissions => {
    const isOwner = user?.id === profileId;
    const isAdmin = profile?.is_admin === true;
    const isModerator = profile?.is_moderator === true;
    return {
      canEdit: isOwner || isAdmin,
      isOwner,
      isAdmin,
      isModerator,
      canViewPrivate: isOwner || isAdmin || isModerator,
    };
  }, [user, profileId, profile]);

  const updateProfile = useCallback(async (updates: Partial<ProfileUpdate>): Promise<Profile | null> => {
    if (!profileId || !permissions.canEdit) throw new Error('Not authorized');
    const result = await update(profileId, updates as ProfileUpdate);
    if (result.error) throw new Error(result.error);
    await refetch();
    return result.data;
  }, [profileId, permissions.canEdit, update, refetch]);

  const updateNDPreferences = useCallback(async (prefs: Partial<NDPreferences>) => {
    if (!profile) return;
    const current = parseNDPreferences(profile.nd_preferences);
    await updateProfile({ nd_preferences: { ...current, ...prefs } as any });
  }, [profile, updateProfile]);

  const updateSensoryPreferences = useCallback(async (prefs: Partial<SensoryPreferences>) => {
    if (!profile) return;
    const current = parseSensoryPreferences(profile.sensory_preferences);
    await updateProfile({ sensory_preferences: { ...current, ...prefs } as any });
  }, [profile, updateProfile]);

  const updateAlgorithmPreferences = useCallback(async (prefs: Partial<AlgorithmPreferences>) => {
    if (!profile) return;
    const current = parseAlgorithmPreferences(profile.algorithm_preferences);
    await updateProfile({ algorithm_preferences: { ...current, ...prefs } as any });
  }, [profile, updateProfile]);

  const awardBadge = useCallback(async (badgeName: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/rpc/award_badge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_user_id: profileId, p_badge_slug: badgeName }),
      });
      const result = await response.json();
      if (result.success) { await refetch(); return true; }
      return false;
    } catch { return false; }
  }, [profileId, refetch]);

  const hasBadge = useCallback((badgeName: string): boolean => {
    if (!profile?.badges) return false;
    if (Array.isArray(profile.badges)) return profile.badges.includes(badgeName);
    return false;
  }, [profile]);

  return {
    profile,
    loading,
    error: error ? new Error(error) : null,
    permissions,
    updateProfile,
    refreshProfile: refetch,
    updateNDPreferences,
    updateSensoryPreferences,
    updateAlgorithmPreferences,
    awardBadge,
    hasBadge,
  };
}

// ============================================================================
// SPECIALIZED PROFILE HOOKS
// ============================================================================

export function useCurrentProfile() {
  return useProfile();
}

export function useProfileByUsername(username: string) {
  const { data: profiles, loading } = useProfilesList({ filters: { username }, limit: 1 });
  const profileId = profiles?.[0]?.id;
  const profile = useProfile(profileId);
  return { ...profile, loading: loading || profile.loading };
}

// ============================================================================
// CREATOR PROFILE HOOK — Uses generated hooks
// ============================================================================

export interface UseCreatorProfileReturn {
  creatorProfile: CreatorProfile | null;
  loading: boolean;
  error: Error | null;
  canEdit: boolean;
  createCreatorProfile: (data: Partial<Omit<CreatorProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>) => Promise<CreatorProfile | null>;
  updateCreatorProfile: (updates: Partial<Omit<CreatorProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>) => Promise<CreatorProfile | null>;
  refreshCreatorProfile: () => Promise<void>;
  hasActiveApplication: boolean;
  applicationStatus: string | null;
}

export function useCreatorProfile(): UseCreatorProfileReturn {
  const { user } = useAuth();
  const { profile } = useProfile();

  const { data: creatorProfile, loading, error, refetch } = useCreatorProfiles(user?.id ? undefined : undefined);
  const { create: createProfile } = useCreateCreatorProfiles();
  const { update: updateProfile } = useUpdateCreatorProfiles();

  const { data: applications } = useApplicationsList({ 
    filters: { application_type: 'creator' },
    limit: 100 
  });
  const appStatus = applications?.find(a => a.application_type === 'creator')?.status || null;

  const canEdit = profile?.is_creator === true || profile?.is_admin === true;

  const createCreatorProfile = useCallback(async (data: any) => {
    if (!user) throw new Error('Not authenticated');
    const result = await createProfile({ ...data, profile_id: user.id } as any);
    if (result.error) throw new Error(result.error);
    await refetch();
    return result.data;
  }, [user, createProfile, refetch]);

  const updateCreatorProfile = useCallback(async (updates: any) => {
    if (!creatorProfile || !canEdit) throw new Error('Not authorized');
    const result = await updateProfile(creatorProfile.id, updates);
    if (result.error) throw new Error(result.error);
    await refetch();
    return result.data;
  }, [creatorProfile, canEdit, updateProfile, refetch]);

  return {
    creatorProfile,
    loading,
    error: error ? new Error(error) : null,
    canEdit,
    createCreatorProfile,
    updateCreatorProfile,
    refreshCreatorProfile: refetch,
    hasActiveApplication: appStatus === 'pending' || appStatus === 'reviewing',
    applicationStatus: appStatus,
  };
}

// ============================================================================
// VENDOR PROFILE HOOK — Uses generated hooks
// ============================================================================

export interface UseVendorProfileReturn {
  vendorProfile: VendorProfile | null;
  loading: boolean;
  error: Error | null;
  canEdit: boolean;
  createVendorProfile: (data: Partial<Omit<VendorProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>) => Promise<VendorProfile | null>;
  updateVendorProfile: (updates: Partial<Omit<VendorProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>) => Promise<VendorProfile | null>;
  refreshVendorProfile: () => Promise<void>;
  hasActiveApplication: boolean;
  applicationStatus: string | null;
}

export function useVendorProfile(): UseVendorProfileReturn {
  const { user } = useAuth();
  const { profile } = useProfile();

  const { data: vendorProfile, loading, error, refetch } = useVendorProfiles(user?.id ? undefined : undefined);
  const { create: createProfile } = useCreateVendorProfiles();
  const { update: updateProfile } = useUpdateVendorProfiles();

  const { data: applications } = useApplicationsList({ 
    filters: { application_type: 'vendor' },
    limit: 100 
  });
  const appStatus = applications?.find(a => a.application_type === 'vendor')?.status || null;

  const canEdit = profile?.is_vendor === true || profile?.is_admin === true;

  const createVendorProfile = useCallback(async (data: any) => {
    if (!user) throw new Error('Not authenticated');
    const result = await createProfile({ ...data, profile_id: user.id } as any);
    if (result.error) throw new Error(result.error);
    await refetch();
    return result.data;
  }, [user, createProfile, refetch]);

  const updateVendorProfile = useCallback(async (updates: any) => {
    if (!vendorProfile || !canEdit) throw new Error('Not authorized');
    const result = await updateProfile(vendorProfile.id, updates);
    if (result.error) throw new Error(result.error);
    await refetch();
    return result.data;
  }, [vendorProfile, canEdit, updateProfile, refetch]);

  return {
    vendorProfile,
    loading,
    error: error ? new Error(error) : null,
    canEdit,
    createVendorProfile,
    updateVendorProfile,
    refreshVendorProfile: refetch,
    hasActiveApplication: appStatus === 'pending' || appStatus === 'reviewing',
    applicationStatus: appStatus,
  };
}

// ============================================================================
// COMMUNITY PROFILE HOOK — Uses generated hooks
// ============================================================================

export interface UseCommunityProfileReturn {
  communityProfile: CommunityProfile | null;
  loading: boolean;
  error: Error | null;
  canEdit: boolean;
  createCommunityProfile: (data: Partial<Omit<CommunityProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>) => Promise<CommunityProfile | null>;
  updateCommunityProfile: (updates: Partial<Omit<CommunityProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>) => Promise<CommunityProfile | null>;
  refreshCommunityProfile: () => Promise<void>;
  hasJoinedHouse: boolean;
}

export function useCommunityProfile(): UseCommunityProfileReturn {
  const { user } = useAuth();

  const { data: communityProfile, loading, error, refetch } = useCommunityProfiles(user?.id ? undefined : undefined);
  const { create: createProfile } = useCreateCommunityProfiles();
  const { update: updateProfile } = useUpdateCommunityProfiles();

  const createCommunityProfile = useCallback(async (data: any) => {
    if (!user) throw new Error('Not authenticated');
    const result = await createProfile({ ...data, profile_id: user.id } as any);
    if (result.error) throw new Error(result.error);
    await refetch();
    return result.data;
  }, [user, createProfile, refetch]);

  const updateCommunityProfile = useCallback(async (updates: any) => {
    if (!communityProfile) throw new Error('No community profile found');
    const result = await updateProfile(communityProfile.id, updates);
    if (result.error) throw new Error(result.error);
    await refetch();
    return result.data;
  }, [communityProfile, updateProfile, refetch]);

  return {
    communityProfile,
    loading,
    error: error ? new Error(error) : null,
    canEdit: true,
    createCommunityProfile,
    updateCommunityProfile,
    refreshCommunityProfile: refetch,
    hasJoinedHouse: !!communityProfile?.joined_house,
  };
}

// ============================================================================
// APPLICATION HOOK — Uses generated hooks
// ============================================================================

export interface UseApplicationReturn {
  application: Application | null;
  loading: boolean;
  error: Error | null;
  submitApplication: (applicationType: 'creator' | 'vendor', formData: Record<string, unknown>) => Promise<Application | null>;
  refreshApplication: () => Promise<void>;
}

export function useApplication(applicationType: 'creator' | 'vendor'): UseApplicationReturn {
  const { user } = useAuth();
  // Use the list hook instead of single hook
  const { data: applications, loading, error, refetch } = useApplicationsList({ 
    filters: { application_type: applicationType },
    limit: 100 
  });
  const { create } = useCreateApplications();

  // applications is now an array — find works
  const application = applications?.find(a => a.user_id === user?.id) || null;

  const submitApplication = useCallback(async (appType: 'creator' | 'vendor', formData: Record<string, unknown>) => {
    if (!user) throw new Error('Not authenticated');
    const result = await create({
      user_id: user.id,
      application_type: appType,
      form_data: formData,
      status: 'pending',
    } as any);
    if (result.error) throw new Error(result.error);
    await refetch();
    return result.data;
  }, [user, create, refetch]);

  return {
    application,
    loading,
    error: error ? new Error(error) : null,
    submitApplication,
    refreshApplication: refetch,
  };
}