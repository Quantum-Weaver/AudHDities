// =====================================================
/* @/types/core/community_profiles.ts */
// COMMUNITY PROFILES - Pure Type Definitions
// No logic, no constants, just types
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM TYPES (from database)
// =====================================================

export type CommunicationStyle = Database['public']['Enums']['communication_style'];
export type JoinedHouse = Database['public']['Enums']['council_house'];
// =====================================================
// CORE PROFILE TYPES
// =====================================================
/**
 * Raw profile row from database
 * Matches exactly what Supabase returns
**/
export type CommunityProfileRow = Database['public']['Tables']['community_profiles']['Row'];

export type CommunityProfileInsert = Database['public']['Tables']['community_profiles']['Insert'];
export type CommunityProfileUpdate = Database['public']['Tables']['community_profiles']['Update'];

// =====================================================
// DERIVED TYPES (for frontend use)
// =====================================================

/**
 * Public profile - what anyone can see
 */
export interface PublicCommunityProfile {
  id: string;
  username: string | null;
  joined_house?: JoinedHouse;
  communication_style: CommunicationStyle;
  nd_identity?: string[] | null;
  is_mentor?: boolean | null;
  peer_endorsements?: number | null;
  created_at: string | null;
}

/**
 * Own profile - includes private fields
 */
export interface OwnCommunityProfile extends PublicCommunityProfile {
  crisis_contact_email?: string | null;
  crisis_contact_name?: string | null;
  crisis_contact_phone?: string | null;
  crisis_instructions?: string | null;
  house_adept?: boolean | null;
  house_initiate?: boolean | null;
  house_joined_at?: string | null;
  house_master?: boolean | null;
  mentee_count?: number | null;
  mentor_since?: string | null;
  sensory_accommodations?: string[] | null;
  support_needs: string[] | null;
  updated_at: string | null;  
}

/**
 * Profile form data (for editing)
 */
export interface CommunityProfileFormData {
  crisis_contact_email?: string | null;
  crisis_contact_name?: string | null;
  crisis_contact_phone?: string | null;
  crisis_instructions?: string | null;
  communication_style: CommunicationStyle;
  nd_identity?: string[] | null;
  sensory_accommodations?: string[] | null;
  support_needs: string[] | null;
}

/**
 * Profile validation result
 */
export interface CommunityProfileValidationResult {
  valid: boolean;
  errors: {
    username?: string;
  };
}