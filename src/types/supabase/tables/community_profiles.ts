// src/types/supabase/tables/community_profiles.ts
import type { Database } from '../database.types';

export type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
export type CommunityProfileInsert = Database['public']['Tables']['community_profiles']['Insert'];
export type CommunityProfileUpdate = Database['public']['Tables']['community_profiles']['Update'];

export type NDIdentity = 'autistic' | 'adhd' | 'dyslexic' | 'dyspraxic' | 'tourettes' | 'other';

export interface CommunityProfileWithRelations extends CommunityProfile {
  user?: Database['public']['Tables']['profiles']['Row'];
}

export const communityProfileDefaults = {
  is_mentor: false,
  house_initiate: false,
  house_adept: false,
  house_master: false,
  mentee_count: 0,
  peer_endorsements: 0,
  nd_identity: [],
  sensory_accommodations: [],
  support_needs: [],
} as const;