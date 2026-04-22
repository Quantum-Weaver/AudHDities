// =====================================================
// FILE: types/generated/hestia-core/community_profiles.ts
// TYPE: table
// HANDLING: join_table
// GENERATED: 2026-04-22T18:24:18.831Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CommunicationStyle = Database['public']['Enums']['communication_style'];
export type CouncilHouse = Database['public']['Enums']['council_house'];
export type CommunityProfilesRow = Tables<'community_profiles'>;
export type CommunityProfilesInsert = TablesInsert<'community_profiles'>;
export type CommunityProfilesUpdate = TablesUpdate<'community_profiles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for community_profiles
 * All fields are optional for partial updates
 */
export interface CommunityProfilesFormData {
  created_at?: string | null;
  created_by?: string | null;
  crisis_contact_email?: string | null;
  crisis_contact_name?: string | null;
  crisis_contact_phone?: string | null;
  crisis_instructions?: string | null;
  house_adept?: boolean | null;
  house_initiate?: boolean | null;
  house_joined_at?: string | null;
  house_master?: boolean | null;
  id?: string;
  is_mentor?: boolean | null;
  joined_house?: CouncilHouse | null;
  mentee_count?: number | null;
  mentor_since?: string | null;
  nd_identity?: string[] | null;
  peer_endorsements?: number | null;
  profile_id?: string;
  sensory_accommodations?: string[] | null;
  support_needs?: string[] | null;
  updated_at?: string | null;
}

