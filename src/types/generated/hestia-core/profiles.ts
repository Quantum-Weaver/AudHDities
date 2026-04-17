// =====================================================
// FILE: types/generated/hestia-core/profiles.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T17:34:19.696Z
// SOURCE: database.types.ts lines 4120-4205
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type UserStatus = Database['public']['Enums']['user_status'];
export type UserTier = Database['public']['Enums']['user_tier'];

// =====================================================
// CORE TYPES
// =====================================================

export type ProfilesRow = Database['public']['Tables']['profiles']['Row'];
export type ProfilesInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfilesUpdate = Database['public']['Tables']['profiles']['Update'];

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
  banner_url: string | null;
  bio: string | null;
  created_at: string | null;
  created_by: string | null;
  display_name: string | null;
  id: string;
  is_admin: boolean | null;
  is_creator: boolean | null;
  is_quantum_weaver: boolean | null;
  is_vendor: boolean | null;
  last_active: string | null;
  nd_preferences: Json | null;
  preferred_environment: string | null;
  primary_house: CouncilHouse | null;
  sensory_preferences: Json | null;
  sovereignty_score: number | null;
  status: UserStatus | null;
  updated_at: string | null;
  user_tier: UserTier | null;
  username: string | null;
}

/**
 * Own profile - includes all fields
 */
export interface OwnProfiles extends PublicProfiles {
  algorithm_preferences: Json | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  created_at: string | null;
  created_by: string | null;
  display_name: string | null;
  email: string;
  id: string;
  is_admin: boolean | null;
  is_creator: boolean | null;
  is_quantum_weaver: boolean | null;
  is_vendor: boolean | null;
  last_active: string | null;
  nd_preferences: Json | null;
  preferred_environment: string | null;
  primary_house: CouncilHouse | null;
  sensory_preferences: Json | null;
  sovereignty_score: number | null;
  status: UserStatus | null;
  updated_at: string | null;
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
  banner_url?: string | null;
  bio?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  display_name?: string | null;
  email?: string;
  id?: string;
  is_admin?: boolean | null;
  is_creator?: boolean | null;
  is_quantum_weaver?: boolean | null;
  is_vendor?: boolean | null;
  last_active?: string | null;
  nd_preferences?: Json | null;
  preferred_environment?: string | null;
  primary_house?: CouncilHouse | null;
  sensory_preferences?: Json | null;
  sovereignty_score?: number | null;
  status?: UserStatus | null;
  updated_at?: string | null;
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
    banner_url?: string;
    bio?: string;
    created_at?: string;
    created_by?: string;
    display_name?: string;
    email?: string;
    id?: string;
    is_admin?: string;
    is_creator?: string;
    is_quantum_weaver?: string;
    is_vendor?: string;
    last_active?: string;
    nd_preferences?: string;
    preferred_environment?: string;
    primary_house?: string;
    sensory_preferences?: string;
    sovereignty_score?: string;
    status?: string;
    updated_at?: string;
    user_tier?: string;
    username?: string;
  };
}

