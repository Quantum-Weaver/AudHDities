// =====================================================
// FILE: types/generated/hestia-core/community_profiles.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T18:15:38.583Z
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
 * Public view of community_profiles
 */
export interface PublicCommunityProfiles {
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  created_at: string;
  created_by: string | null;
  display_name: string;
  icon_emoji: string | null;
  id: string;
  sensory_hints: string | null;
  slug: string;
  social_links: Json | null;
  sovereign_tier: SovereignTier;
  status: ProfileStatus;
  updated_at: string;
  updated_by: string | null;
  website_url: string | null;
}

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

/**
 * Validation result for community_profiles
 */
export interface CommunityProfilesValidationResult {
  valid: boolean;
  errors: {
    avatar_url?: string;
    banner_url?: string;
    bio?: string;
    created_at?: string;
    created_by?: string;
    display_name?: string;
    icon_emoji?: string;
    id?: string;
    sensory_hints?: string;
    slug?: string;
    social_links?: string;
    sovereign_tier?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    website_url?: string;
  };
}

