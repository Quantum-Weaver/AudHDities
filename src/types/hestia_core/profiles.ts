// =====================================================
// FILE: types/hestia_core/profiles.ts
// HANDLING: full_crud
// DEITY: hestia_core
// GENERATED: 2026-04-05T21:55:13.036Z
// SOURCE: database.types.ts lines 3393-3455
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

type CouncilHouse = Database['public']['Enums']['council_house'];
export type UserStatus = Database['public']['Enums']['user_status'];
export type UserTier = Database['public']['Enums']['user_tier'];

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
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  created_at: string | null;
  display_name: string | null;
  id: string;
  is_admin: boolean | null;
  is_creator: boolean | null;
  is_quantum_weaver: boolean | null;
  is_vendor: boolean | null;
  last_active: string | null;
  primary_house: CouncilHouse | null;
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
  avatar_url?: string | null;
  banner_url?: string | null;
  bio?: string | null;
  created_at?: string | null;
  display_name?: string | null;
  email?: string;
  id?: string;
  is_admin?: boolean | null;
  is_creator?: boolean | null;
  is_quantum_weaver?: boolean | null;
  is_vendor?: boolean | null;
  last_active?: string | null;
  primary_house?: CouncilHouse | null;
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
    avatar_url?: string;
    banner_url?: string;
    bio?: string;
    created_at?: string;
    display_name?: string;
    email?: string;
    id?: string;
    is_admin?: string;
    is_creator?: string;
    is_quantum_weaver?: string;
    is_vendor?: string;
    last_active?: string;
    primary_house?: string;
    sovereignty_score?: string;
    status?: string;
    updated_at?: string;
    user_tier?: string;
    username?: string;
  };
}

