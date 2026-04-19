// app/hooks/useProfile.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/tables-helper';
import type { NDPreferences, SensoryPreferences, AlgorithmPreferences } from '@/types/preferences';

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

export interface UnifiedPreferences {
  nd: NDPreferences;
  sensory: SensoryPreferences;
  algorithm: AlgorithmPreferences;
}

// ============================================================================
// DEFAULT PREFERENCES
// ============================================================================

export const DEFAULT_ND_PREFERENCES: NDPreferences = {
  reduced_motion: false,
  high_contrast: false,
  focus_mode: false,
  sound_notifications: true,
  visual_timers: true,
  tl_dr_enabled: true,
  dyslexia_friendly: false,
  adhd_friendly: false,
  autism_friendly: false,
};

export const DEFAULT_SENSORY_PREFERENCES: SensoryPreferences = {
  light_sensitivity: 'medium',
  sound_sensitivity: 'medium',
  crowd_sensitivity: 'medium',
  touch_sensitivity: 'low',
  vestibular_sensitivity: 'low',
  olfactory_sensitivity: 'low',
};

export const DEFAULT_ALGORITHM_PREFERENCES: AlgorithmPreferences = {
  hide_politics: false,
  recommend_new: true,
  hide_marketing: false,
  recommend_related: true,
  recommend_trending: true,
  hide_trauma_content: true,
  show_boosted_content: true,
  show_subscribed_only: false,
  chronological_preferred: false,
};

// ============================================================================
// PREFERENCE PARSERS
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
// MAIN USE PROFILE HOOK
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [permissions, setPermissions] = useState<ProfilePermissions>({
    canEdit: false,
    isOwner: false,
    isAdmin: false,
    isModerator: false,
    canViewPrivate: false,
  });
  
  const supabase = createClient();
  const profileId = targetUserId || user?.id;

  const fetchProfile = useCallback(async () => {
    if (!profileId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();

      if (fetchError) throw fetchError;

      setProfile(data);
      
      const isOwner = user?.id === profileId;
      const isAdmin = data?.is_admin === true;
      const isModerator = data?.is_moderator === true;
      
      setPermissions({
        canEdit: isOwner || isAdmin,
        isOwner,
        isAdmin,
        isModerator,
        canViewPrivate: isOwner || isAdmin || isModerator,
      });

    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
    } finally {
      setLoading(false);
    }
  }, [profileId, user, supabase]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<ProfileUpdate>): Promise<Profile | null> => {
    if (!profileId || !permissions.canEdit) {
      throw new Error('Not authorized to edit this profile');
    }

    try {
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profileId)
        .select()
        .single();

      if (updateError) throw updateError;
      
      setProfile(data);
      return data;
      
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const updateNDPreferences = async (preferences: Partial<NDPreferences>) => {
    if (!profile) return;
    const current = parseNDPreferences(profile.nd_preferences);
    const updated = { ...current, ...preferences };
    await updateProfile({ nd_preferences: updated as any });
  };

  const updateSensoryPreferences = async (preferences: Partial<SensoryPreferences>) => {
    if (!profile) return;
    const current = parseSensoryPreferences(profile.sensory_preferences);
    const updated = { ...current, ...preferences };
    await updateProfile({ sensory_preferences: updated as any });
  };

  const updateAlgorithmPreferences = async (preferences: Partial<AlgorithmPreferences>) => {
    if (!profile) return;
    const current = parseAlgorithmPreferences(profile.algorithm_preferences);
    const updated = { ...current, ...preferences };
    await updateProfile({ algorithm_preferences: updated as any });
  };

  const awardBadge = async (badgeName: string): Promise<boolean> => {
    if (!profileId || !permissions.canEdit) return false;

    try {
      const { error } = await supabase.rpc('award_badge', {
        p_profile_id: profileId,
        p_badge_name: badgeName,
      });

      if (error) throw error;
      
      await fetchProfile();
      return true;
      
    } catch (err) {
      console.error('Error awarding badge:', err);
      return false;
    }
  };

  const hasBadge = (badgeName: string): boolean => {
    if (!profile?.badges) return false;
    if (Array.isArray(profile.badges)) {
      return profile.badges.includes(badgeName);
    }
    return false;
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return {
    profile,
    loading,
    error,
    permissions,
    updateProfile,
    refreshProfile,
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
  const supabase = createClient();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchId = async () => {
      if (!username) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle();
      
      setProfileId(data?.id || null);
      setLoading(false);
    };

    fetchId();
  }, [username, supabase]);

  const profile = useProfile(profileId || undefined);
  
  return {
    ...profile,
    loading: loading || profile.loading,
  };
}

// ============================================================================
// CREATOR PROFILE HOOK
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

export function useCreatorProfile() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  
  const supabase = createClient();
  const canEdit = profile?.is_creator === true || profile?.is_admin === true;

  const fetchCreatorProfile = useCallback(async () => {
    if (!user) {
      setCreatorProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      setCreatorProfile(data);

      if (!data) {
        const { data: appData } = await supabase
          .from('applications')
          .select('status')
          .eq('user_id', user.id)
          .eq('application_type', 'creator')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        setApplicationStatus(appData?.status || null);
      } else {
        setApplicationStatus(null);
      }

    } catch (err) {
      console.error('Error fetching creator profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch creator profile'));
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchCreatorProfile();
  }, [fetchCreatorProfile]);

  const createCreatorProfile = async (
    data: Partial<Omit<CreatorProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>
  ): Promise<CreatorProfile | null> => {
    if (!user) throw new Error('Not authenticated');

    try {
      const { data: newProfile, error: createError } = await supabase
        .from('creator_profiles')
        .insert({
          ...data,
          profile_id: user.id,
        })
        .select()
        .single();

      if (createError) throw createError;
      
      setCreatorProfile(newProfile);
      await supabase.from('profiles').update({ is_creator: true }).eq('id', user.id);
      
      return newProfile;
      
    } catch (err) {
      console.error('Error creating creator profile:', err);
      throw err;
    }
  };

  const updateCreatorProfile = async (
    updates: Partial<Omit<CreatorProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>
  ): Promise<CreatorProfile | null> => {
    if (!creatorProfile || !canEdit) throw new Error('Not authorized');

    try {
      const { data, error: updateError } = await supabase
        .from('creator_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', creatorProfile.id)
        .select()
        .single();

      if (updateError) throw updateError;
      
      setCreatorProfile(data);
      return data;
      
    } catch (err) {
      console.error('Error updating creator profile:', err);
      throw err;
    }
  };

  const refreshCreatorProfile = async () => {
    await fetchCreatorProfile();
  };

  const hasActiveApplication = applicationStatus === 'pending' || applicationStatus === 'in_review';

  return {
    creatorProfile,
    loading,
    error,
    canEdit,
    createCreatorProfile,
    updateCreatorProfile,
    refreshCreatorProfile,
    hasActiveApplication,
    applicationStatus,
  };
}

// ============================================================================
// VENDOR PROFILE HOOK
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

export function useVendorProfile() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  
  const supabase = createClient();
  const canEdit = profile?.is_vendor === true || profile?.is_admin === true;

  const fetchVendorProfile = useCallback(async () => {
    if (!user) {
      setVendorProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      setVendorProfile(data);

      if (!data) {
        const { data: appData } = await supabase
          .from('applications')
          .select('status')
          .eq('user_id', user.id)
          .eq('application_type', 'vendor')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        setApplicationStatus(appData?.status || null);
      } else {
        setApplicationStatus(null);
      }

    } catch (err) {
      console.error('Error fetching vendor profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch vendor profile'));
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchVendorProfile();
  }, [fetchVendorProfile]);

  const createVendorProfile = async (
    data: Partial<Omit<VendorProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>
  ): Promise<VendorProfile | null> => {
    if (!user) throw new Error('Not authenticated');

    try {
      const { data: newProfile, error: createError } = await supabase
        .from('vendor_profiles')
        .insert({
          ...data,
          profile_id: user.id,
        })
        .select()
        .single();

      if (createError) throw createError;
      
      setVendorProfile(newProfile);
      await supabase.from('profiles').update({ is_vendor: true }).eq('id', user.id);
      
      return newProfile;
      
    } catch (err) {
      console.error('Error creating vendor profile:', err);
      throw err;
    }
  };

  const updateVendorProfile = async (
    updates: Partial<Omit<VendorProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>
  ): Promise<VendorProfile | null> => {
    if (!vendorProfile || !canEdit) throw new Error('Not authorized');

    try {
      const { data, error: updateError } = await supabase
        .from('vendor_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', vendorProfile.id)
        .select()
        .single();

      if (updateError) throw updateError;
      
      setVendorProfile(data);
      return data;
      
    } catch (err) {
      console.error('Error updating vendor profile:', err);
      throw err;
    }
  };

  const refreshVendorProfile = async () => {
    await fetchVendorProfile();
  };

  const hasActiveApplication = applicationStatus === 'pending' || applicationStatus === 'in_review';

  return {
    vendorProfile,
    loading,
    error,
    canEdit,
    createVendorProfile,
    updateVendorProfile,
    refreshVendorProfile,
    hasActiveApplication,
    applicationStatus,
  };
}

// ============================================================================
// COMMUNITY PROFILE HOOK
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

export function useCommunityProfile() {
  const { user } = useAuth();
  const [communityProfile, setCommunityProfile] = useState<CommunityProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const supabase = createClient();
  const canEdit = true;

  const fetchCommunityProfile = useCallback(async () => {
    if (!user) {
      setCommunityProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('community_profiles')
        .select('*')
        .eq('profile_id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      setCommunityProfile(data);

    } catch (err) {
      console.error('Error fetching community profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch community profile'));
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchCommunityProfile();
  }, [fetchCommunityProfile]);

  const createCommunityProfile = async (
    data: Partial<Omit<CommunityProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>
  ): Promise<CommunityProfile | null> => {
    if (!user) throw new Error('Not authenticated');

    try {
      const { data: newProfile, error: createError } = await supabase
        .from('community_profiles')
        .insert({
          ...data,
          profile_id: user.id,
        })
        .select()
        .single();

      if (createError) throw createError;
      
      setCommunityProfile(newProfile);
      return newProfile;
      
    } catch (err) {
      console.error('Error creating community profile:', err);
      throw err;
    }
  };

  const updateCommunityProfile = async (
    updates: Partial<Omit<CommunityProfile, 'id' | 'created_at' | 'updated_at' | 'profile_id'>>
  ): Promise<CommunityProfile | null> => {
    if (!communityProfile) throw new Error('No community profile found');

    try {
      const { data, error: updateError } = await supabase
        .from('community_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', communityProfile.id)
        .select()
        .single();

      if (updateError) throw updateError;
      
      setCommunityProfile(data);
      return data;
      
    } catch (err) {
      console.error('Error updating community profile:', err);
      throw err;
    }
  };

  const refreshCommunityProfile = async () => {
    await fetchCommunityProfile();
  };

  const hasJoinedHouse = !!communityProfile?.joined_house;

  return {
    communityProfile,
    loading,
    error,
    canEdit,
    createCommunityProfile,
    updateCommunityProfile,
    refreshCommunityProfile,
    hasJoinedHouse,
  };
}

// ============================================================================
// APPLICATION HOOK (for creator/vendor applications)
// ============================================================================

export interface UseApplicationReturn {
  application: Application | null;
  loading: boolean;
  error: Error | null;
  submitApplication: (applicationType: 'creator' | 'vendor', formData: Record<string, unknown>) => Promise<Application | null>;
  refreshApplication: () => Promise<void>;
}

export function useApplication(applicationType: 'creator' | 'vendor') {
  const { user } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const supabase = createClient();

  const fetchApplication = useCallback(async () => {
    if (!user) {
      setApplication(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .eq('application_type', applicationType)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      setApplication(data);

    } catch (err) {
      console.error('Error fetching application:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch application'));
    } finally {
      setLoading(false);
    }
  }, [user, applicationType, supabase]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  const submitApplication = async (
    appType: 'creator' | 'vendor',
    formData: Record<string, unknown>
  ): Promise<Application | null> => {
    if (!user) throw new Error('Not authenticated');

    try {
      const { data, error: insertError } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          application_type: appType,
          form_data: formData,
          status: 'pending',
        })
        .select()
        .single();

      if (insertError) throw insertError;
      
      setApplication(data);
      return data;
      
    } catch (err) {
      console.error('Error submitting application:', err);
      throw err;
    }
  };

  const refreshApplication = async () => {
    await fetchApplication();
  };

  return {
    application,
    loading,
    error,
    submitApplication,
    refreshApplication,
  };
}