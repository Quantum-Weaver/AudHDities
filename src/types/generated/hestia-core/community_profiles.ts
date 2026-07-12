// =====================================================
// FILE: types/generated/hestia-core/community_profiles.ts
// HANDLING: join_table
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.312Z
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

export type SovereignTier = Enums<'sovereign_tier'>;
export type ProfileStatus = Enums<'profile_status'>;

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
  avatar_url?: string | null;
  banner_url?: string | null;
  bio?: string | null;
  created_at?: string;
  created_by?: string | null;
  display_name?: string;
  icon_emoji?: string | null;
  id?: string;
  sensory_hints?: string | null;
  slug?: string;
  social_links?: Json | null;
  sovereign_tier?: SovereignTier;
  status?: ProfileStatus;
  updated_at?: string;
  updated_by?: string | null;
  website_url?: string | null;
}

