// app/hooks/useProfile.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import { NDPreferences, SensoryPreferences, DEFAULT_ND_PREFERENCES, DEFAULT_SENSORY_PREFERENCES } from '@/types/preferences';
import type { Database } from '@/types/supabase/database.types';

// Use the database type as the single source of truth
export type Profile = Database['public']['Tables']['profiles']['Row'] & {  
  nd_preferences_typed?: NDPreferences;
  sensory_preferences_typed?: SensoryPreferences;
};

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  permissions: {
    canEdit: boolean;
    isOwner: boolean;
    isAdmin: boolean;
  };
  updateProfile: (updates: Partial<Profile>) => Promise<Profile | null>;
  refreshProfile: () => Promise<void>;
  updatePreferences: (preferences: Partial<NDPreferences>) => Promise<void>;
  updateSensory: (preferences: Partial<SensoryPreferences>) => Promise<void>;
  awardBadge: (badgeName: string) => Promise<boolean>;
  hasBadge: (badgeName: string) => boolean;
}

export function useProfile(targetUserId?: string): UseProfileReturn {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [permissions, setPermissions] = useState({
    canEdit: false,
    isOwner: false,
    isAdmin: false,
  });
  
  const supabase = createClient();
  const profileId = targetUserId || user?.id;

  // Safe JSON parsers
  const parseNDPreferences = (json: unknown): NDPreferences => {
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
  };

  const parseSensoryPreferences = (json: unknown): SensoryPreferences => {
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
  };

  const updateNDPreferences = async (preferences: Partial<NDPreferences>) => {
    if (!profile) return;
    
    const current = profile.nd_preferences_typed || DEFAULT_ND_PREFERENCES;
    const updated = { ...current, ...preferences };
    
    await updateProfile({ nd_preferences_typed: updated });
  };

  const updateSensoryPreferences = async (preferences: Partial<SensoryPreferences>) => {
    if (!profile) return;
    
    const current = profile.sensory_preferences_typed || DEFAULT_SENSORY_PREFERENCES;
    const updated = { ...current, ...preferences };
    
    await updateProfile({ sensory_preferences_typed: updated });
  };

  // Fetch profile data
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
      
      // Set permissions
      const isOwner = user?.id === profileId;
      const isAdmin = data?.is_admin || false;
      
      setPermissions({
        canEdit: isOwner || isAdmin,
        isOwner,
        isAdmin,
      });

    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
    } finally {
      setLoading(false);
    }
  }, [profileId, user, supabase]);

  // Initial fetch
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Update profile
  const updateProfile = async (updates: Partial<Profile>): Promise<Profile | null> => {
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

  // Update ND preferences
  const updatePreferences = async (preferences: Partial<NDPreferences>) => {
    if (!profile) return;
    
    const current = parseNDPreferences(profile.nd_preferences_typed);
    const updated = { ...current, ...preferences };
    
    await updateProfile({ nd_preferences_typed: updated as any });
  };

  // Update sensory preferences
  const updateSensory = async (preferences: Partial<SensoryPreferences>) => {
    if (!profile) return;
    
    const current = parseSensoryPreferences(profile.sensory_preferences_typed);
    const updated = { ...current, ...preferences };
    
    await updateProfile({ sensory_preferences_typed: updated as any });
  };

  // Award a badge
  const awardBadge = async (badgeName: string): Promise<boolean> => {
    if (!profileId || !permissions.canEdit) return false;

    try {
      const { error } = await supabase.rpc('award_badge', {
        user_id: profileId,
        badge_name: badgeName,
      });

      if (error) throw error;
      
      await fetchProfile();
      return true;
      
    } catch (err) {
      console.error('Error awarding badge:', err);
      return false;
    }
  };

  // Check if user has a specific badge
  const hasBadge = (badgeName: string): boolean => {
    return profile?.badges?.includes(badgeName) || false;
  };

  // Manual refresh
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
    updatePreferences,
    updateSensory,
    awardBadge,
    hasBadge,
  };
}

// Specialized hooks
export function useCurrentProfile() {
  return useProfile();
}

export function useProfileByUsername(username: string) {
  const supabase = createClient();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchId = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle();
      
      setProfileId(data?.id || null);
      setLoading(false);
    };

    if (username) {
      fetchId();
    }
  }, [username, supabase]);

  const profile = useProfile(profileId || undefined);
  
  return {
    ...profile,
    loading: loading || profile.loading,
  };
}

export function useProfileByPublicSlug(slug: string) {
  const supabase = createClient();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchId = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('public_slug', slug)
        .maybeSingle();
      
      setProfileId(data?.id || null);
      setLoading(false);
    };

    if (slug) {
      fetchId();
    }
  }, [slug, supabase]);

  const profile = useProfile(profileId || undefined);
  
  return {
    ...profile,
    loading: loading || profile.loading,
  };
}