// hooks/entities/useCommunity.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { CommunityProfile, CommunityProfileWithRelations } from '@/types/supabase/tables/community_profiles';

interface UseCommunityReturn {
  communityProfile: CommunityProfileWithRelations | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  updateCommunityProfile: (updates: Partial<CommunityProfile>) => Promise<CommunityProfileWithRelations | null>;
}

// Helper to normalize community profile
function normalizeCommunityProfile(data: any): CommunityProfileWithRelations {
  return {
    ...data,
    nd_identity: data.nd_identity ?? [],
    sensory_accommodations: data.sensory_accommodations ?? [],
    support_needs: data.support_needs ?? [],
  };
}

// =====================================================
// useCommunity - fetch community profile for current user
// =====================================================
export function useCommunity(): UseCommunityReturn {
  const { user } = useAuth();
  const [communityProfile, setCommunityProfile] = useState<CommunityProfileWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

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
        .select(`
          *,
          user:user_id (
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .eq('id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      setCommunityProfile(data ? normalizeCommunityProfile(data) : null);

    } catch (err) {
      console.error('Error fetching community profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch community profile'));
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  const updateCommunityProfile = useCallback(async (updates: Partial<CommunityProfile>): Promise<CommunityProfileWithRelations | null> => {
    if (!user) {
      setError(new Error('You must be logged in to update your community profile'));
      return null;
    }

    try {
      const { data, error: updateError } = await supabase
        .from('community_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setCommunityProfile(data ? normalizeCommunityProfile(data) : null);
      return data;

    } catch (err) {
      console.error('Error updating community profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to update community profile'));
      return null;
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchCommunityProfile();
  }, [fetchCommunityProfile]);

  return {
    communityProfile,
    loading,
    error,
    refresh: fetchCommunityProfile,
    updateCommunityProfile,
  };
}

// =====================================================
// useCommunityByUserId - fetch community profile by user ID
// =====================================================
export function useCommunityByUserId(userId: string): Omit<UseCommunityReturn, 'updateCommunityProfile'> {
  const [communityProfile, setCommunityProfile] = useState<CommunityProfileWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchCommunityProfile = useCallback(async () => {
    if (!userId) {
      setCommunityProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('community_profiles')
        .select(`
          *,
          user:user_id (
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .eq('id', userId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      setCommunityProfile(data ? normalizeCommunityProfile(data) : null);

    } catch (err) {
      console.error('Error fetching community profile by user ID:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch community profile'));
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    fetchCommunityProfile();
  }, [fetchCommunityProfile]);

  return {
    communityProfile,
    loading,
    error,
    refresh: fetchCommunityProfile,
  };
}