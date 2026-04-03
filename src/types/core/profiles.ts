// =====================================================
/* @/types/core/profiles.ts */
// PROFILES - Pure Type Definitions
// No logic, no constants, just types
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM TYPES (from database)
// =====================================================

export type UserTier = Database['public']['Enums']['user_tier'];
export type UserStatus = Database['public']['Enums']['user_status'];
export type CouncilHouse = Database['public']['Enums']['council_house'];

// =====================================================
// CORE PROFILE TYPES
// =====================================================
/**
 * Raw profile row from database
 * Matches exactly what Supabase returns
**/
export type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// =====================================================
// DERIVED TYPES (for frontend use)
// =====================================================

/**
 * Public profile - what anyone can see
 */
export interface PublicProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  primary_house: CouncilHouse | null;
  sovereignty_score: number | null;
  user_tier: UserTier | null;
  created_at: string | null;
}

/**
 * Own profile - includes private fields
 */
export interface OwnProfile extends PublicProfile {
  email: string;
  is_admin: boolean;
  is_creator: boolean;
  is_vendor: boolean;
  is_quantum_weaver: boolean;
  status: UserStatus;
  updated_at: string | null;
  last_active: string | null;
}

/**
 * Profile form data (for editing)
 */
export interface ProfileFormData {
  display_name: string;
  username: string;
  bio: string;
  avatar_url: string | null;
}

/**
 * Profile validation result
 */
export interface ProfileValidationResult {
  valid: boolean;
  errors: {
    username?: string;
    display_name?: string;
    bio?: string;
  };
}