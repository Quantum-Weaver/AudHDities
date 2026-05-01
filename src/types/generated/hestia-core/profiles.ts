// =====================================================
// FILE: types/generated/hestia-core/profiles.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-05-01T03:24:41.752Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BadgeType = Enums<'badge_type'>;
export type CouncilHouse = Enums<'council_house'>;
export type SensoryMode = Enums<'sensory_mode'>;
export type UserStatus = Enums<'user_status'>;
export type UserTier = Enums<'user_tier'>;

export type ProfilesRow = Tables<'profiles'>;
export type ProfilesInsert = TablesInsert<'profiles'>;
export type ProfilesUpdate = TablesUpdate<'profiles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of profiles
 * Excludes sensitive fields: email
 */
export interface PublicProfiles {
  algorithm_preferences: Json | null;
  avatar_url: string | null;
  badges: BadgeType | null;
  banner_url: string | null;
  bio: string | null;
  created_at: string | null;
  created_by: string | null;
  display_name: string | null;
  dyslexia_mode: boolean | null;
  full_name: string | null;
  is_admin: boolean | null;
  is_creator: boolean | null;
  is_moderator: boolean | null;
  is_quantum_weaver: boolean | null;
  is_vendor: boolean | null;
  last_active: string | null;
  nd_preferences: Json | null;
  preferred_environment: string | null;
  primary_house: CouncilHouse | null;
  profiles_id: string;
  pronouns: string | null;
  sensory_mode: SensoryMode | null;
  sensory_preferences: Json | null;
  sovereignty_score: number | null;
  status: UserStatus | null;
  updated_at: string | null;
  updated_by: string | null;
  user_tier: UserTier | null;
  username: string | null;
}

/**
 * Form data for profiles
 * All fields are optional for partial updates
 */
export interface ProfilesFormData {
  algorithm_preferences?: Json | null;
  avatar_url?: string | null;
  badges?: BadgeType | null;
  banner_url?: string | null;
  bio?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  display_name?: string | null;
  dyslexia_mode?: boolean | null;
  email?: string;
  full_name?: string | null;
  is_admin?: boolean | null;
  is_creator?: boolean | null;
  is_moderator?: boolean | null;
  is_quantum_weaver?: boolean | null;
  is_vendor?: boolean | null;
  last_active?: string | null;
  nd_preferences?: Json | null;
  preferred_environment?: string | null;
  primary_house?: CouncilHouse | null;
  profiles_id?: string;
  pronouns?: string | null;
  sensory_mode?: SensoryMode | null;
  sensory_preferences?: Json | null;
  sovereignty_score?: number | null;
  status?: UserStatus | null;
  updated_at?: string | null;
  updated_by?: string | null;
  user_tier?: UserTier | null;
  username?: string | null;
}

/**
 * Validation result for profiles
 */
export interface ProfilesValidationResult {
  valid: boolean;
  errors: {
    algorithm_preferences?: string;
    avatar_url?: string;
    badges?: string;
    banner_url?: string;
    bio?: string;
    created_at?: string;
    created_by?: string;
    display_name?: string;
    dyslexia_mode?: string;
    email?: string;
    full_name?: string;
    is_admin?: string;
    is_creator?: string;
    is_moderator?: string;
    is_quantum_weaver?: string;
    is_vendor?: string;
    last_active?: string;
    nd_preferences?: string;
    preferred_environment?: string;
    primary_house?: string;
    profiles_id?: string;
    pronouns?: string;
    sensory_mode?: string;
    sensory_preferences?: string;
    sovereignty_score?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    user_tier?: string;
    username?: string;
  };
}

