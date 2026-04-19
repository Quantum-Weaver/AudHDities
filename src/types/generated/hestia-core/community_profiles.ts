// =====================================================
// FILE: types/generated/hestia-core/community_profiles.ts
// HANDLING: join_table
// GENERATED: 2026-04-19T20:39:34.626Z
// SOURCE: database.types.ts lines 1296-1398
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CommunicationStyle = Database['public']['Enums']['communication_style'];
export type CouncilHouse = Database['public']['Enums']['council_house'];

// =====================================================
// CORE TYPES
// =====================================================

export type CommunityProfilesRow = Database['public']['Tables']['community_profiles']['Row'];
export type CommunityProfilesInsert = Database['public']['Tables']['community_profiles']['Insert'];
export type CommunityProfilesUpdate = Database['public']['Tables']['community_profiles']['Update'];

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

