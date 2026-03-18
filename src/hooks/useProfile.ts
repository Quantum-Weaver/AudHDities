// app/hooks/useProfile.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import type { 
  Profile as DatabaseProfile, 
  NDPreferences, 
  SensoryPreferences,
  DEFAULT_ND_PREFERENCES,
  DEFAULT_SENSORY_PREFERENCES 
} from '@/types/hooks/profile';


// Extended Profile type matching your database schema
export type Profile = DatabaseProfile & {
  // These are already in DatabaseProfile, but we ensure they're properly typed
  user_tier: 'community' | 'ally' | 'corporate' | null;
  primary_house: 'hearth_keeper' | 'chancellor' | 'seer' | 'aethelred' | 
                 'curator' | 'archivist' | 'skald' | 'codex' | 'executioner' | null;
  communication_style: 'direct' | 'gentle' | 'detailed' | 'concise' | null;
  notification_frequency: 'instant' | 'daily' | 'weekly' | 'never' | null;
  status: 'active' | 'suspended' | 'deleted' | null;
  
  // JSON fields with proper typing
  nd_preferences: {
    reduced_motion: boolean;
    high_contrast: boolean;
    focus_mode: boolean;
    sound_notifications: boolean;
    visual_timers: boolean;
    tl_dr_enabled: boolean;
    dyslexia_friendly: boolean;
    adhd_friendly: boolean;
    autism_friendly: boolean;
  } | null;
  
  sensory_preferences: {
    light_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
    sound_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
    crowd_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
    touch_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
    vestibular_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
    olfactory_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  } | null;
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
  updatePreferences: (preferences: Partial<Profile['nd_preferences']>) => Promise<void>;
  updateSensory: (sensory: Partial<Profile['sensory_preferences']>) => Promise<void>;
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

      setProfile(data as Profile);
      
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

  // Initial fetch and subscription to changes
  useEffect(() => {
    fetchProfile();

    // Subscribe to realtime changes (optional - remove if not needed)
    const channel = supabase
      .channel(`profile-${profileId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${profileId}`,
        },
        (payload) => {
          setProfile(payload.new as Profile);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profileId, supabase, fetchProfile]);

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
      
      setProfile(data as Profile);
      return data as Profile;
      
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  // Update ND preferences (neurodivergent settings)
  const updatePreferences = async (preferences: Partial<Profile['nd_preferences']>) => {
    if (!profile?.nd_preferences) return;
    
    const updatedPreferences = {
      ...profile.nd_preferences,
      ...preferences,
    };
    
    await updateProfile({ nd_preferences: updatedPreferences as any });
  };

  // Update sensory preferences
  const updateSensory = async (sensory: Partial<Profile['sensory_preferences']>) => {
    if (!profile?.sensory_preferences) return;
    
    const updatedSensory = {
      ...profile.sensory_preferences,
      ...sensory,
    };
    
    await updateProfile({ sensory_preferences: updatedSensory as any });
  };

  // Award a badge to the user
  const awardBadge = async (badgeName: string): Promise<boolean> => {
    if (!profileId || !permissions.canEdit) return false;

    try {
      // Call the award_badge function (we created this earlier)
      const { error } = await supabase.rpc('award_badge', {
        user_id: profileId,
        badge_name: badgeName,
      });

      if (error) throw error;
      
      // Refresh profile to get updated badges
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

// Optional: Specialized hooks for common use cases
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
        .single();
      
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
        .single();
      
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
