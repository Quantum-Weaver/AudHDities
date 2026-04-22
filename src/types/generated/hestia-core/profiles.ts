// =====================================================
// FILE: types/generated/hestia-core/profiles.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.474Z
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
  id: string;
  is_admin: boolean | null;
  is_creator: boolean | null;
  is_moderator: boolean | null;
  is_quantum_weaver: boolean | null;
  is_vendor: boolean | null;
  last_active: string | null;
  nd_preferences: Json | null;
  preferred_environment: string | null;
  primary_house: CouncilHouse | null;
  pronouns: string | null;
  sensory_mode: SensoryMode | null;
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
  badges?: BadgeType | null;
  banner_url?: string | null;
  bio?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  display_name?: string | null;
  dyslexia_mode?: boolean | null;
  email?: string;
  full_name?: string | null;
  id?: string;
  is_admin?: boolean | null;
  is_creator?: boolean | null;
  is_moderator?: boolean | null;
  is_quantum_weaver?: boolean | null;
  is_vendor?: boolean | null;
  last_active?: string | null;
  nd_preferences?: Json | null;
  preferred_environment?: string | null;
  primary_house?: CouncilHouse | null;
  pronouns?: string | null;
  sensory_mode?: SensoryMode | null;
  sensory_preferences?: Json | null;
  sovereignty_score?: number | null;
  status?: UserStatus | null;
  updated_at?: string | null;
  user_tier?: UserTier | null;
  username?: string | null;
}

