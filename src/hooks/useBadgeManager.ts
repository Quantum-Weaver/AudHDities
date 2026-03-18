// app/hooks/useBadgeManager.ts
'use client';

import { createClient } from '@/lib/supabase/client';
import { useProfile } from './useProfile';

export function useBadgeManager() {
  const supabase = createClient();
  const { profile, updateProfile } = useProfile();

  const awardBadge = async (badgeName: string) => {
    if (!profile) return;

    // Call the database function
    const { error } = await supabase.rpc('award_badge', {
      user_id: profile.id,
      badge_name: badgeName,
    });

    if (error) {
      console.error('Error awarding badge:', error);
      return false;
    }

    // Refresh profile to get new badges
    await updateProfile({});
    return true;
  };

  const hasBadge = (badgeName: string) => {
    return profile?.badges?.includes(badgeName) || false;
  };

  return { awardBadge, hasBadge, badges: profile?.badges || [] };
}
