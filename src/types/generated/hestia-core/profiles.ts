// =====================================================
// FILE: types/generated/hestia-core/profiles.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T21:41:50.780Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BadgeType = Database['public']['Enums']['badge_type'];
export type CouncilHouse = Database['public']['Enums']['council_house'];
export type SensoryMode = Database['public']['Enums']['sensory_mode'];
export type UserStatus = Database['public']['Enums']['user_status'];
export type UserTier = Database['public']['Enums']['user_tier'];
export type ProfilesRow = Tables<'profiles'>;
export type ProfilesInsert = TablesInsert<'profiles'>;
export type ProfilesUpdate = TablesUpdate<'profiles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Full fields for validation (internal use)
export interface ProfilesAllFields {
  username: string | null;
}

/**
 * Public view of profiles
 */
export interface PublicProfiles {
  username: string | null;
}

/**
 * Form data for profiles
 * Auto-generated and sensitive fields excluded
 * All fields are optional for partial updates
 */
export interface ProfilesFormData {
  username?: string | null;
}
