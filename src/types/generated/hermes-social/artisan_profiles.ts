// =====================================================
// FILE: types/generated/hermes-social/artisan_profiles.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-07-18T23:09:31.019Z
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

export type ProfileStatus = Enums<'profile_status'>;

export type ArtisanProfilesRow = Tables<'artisan_profiles'>;
export type ArtisanProfilesInsert = TablesInsert<'artisan_profiles'>;
export type ArtisanProfilesUpdate = TablesUpdate<'artisan_profiles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of artisan_profiles
 */
export interface PublicArtisanProfiles {
  application_id: string | null;
  artisan_name: string;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  created_at: string;
  created_by: string;
  icon_emoji: string | null;
  id: string;
  portfolio_url: string | null;
  primary_category: string | null;
  secondary_categories: string[] | null;
  sensory_hints: string | null;
  slug: string;
  social_links: Json | null;
  status: ProfileStatus;
  tagline: string | null;
  total_creations: number | null;
  total_followers: number | null;
  updated_at: string;
  updated_by: string | null;
  verified_at: string | null;
  verified_by: string | null;
  website_url: string | null;
}

/**
 * Form data for artisan_profiles
 * All fields are optional for partial updates
 */
export interface ArtisanProfilesFormData {
  application_id?: string | null;
  artisan_name?: string;
  avatar_url?: string | null;
  banner_url?: string | null;
  bio?: string | null;
  created_at?: string;
  created_by?: string;
  icon_emoji?: string | null;
  id?: string;
  portfolio_url?: string | null;
  primary_category?: string | null;
  secondary_categories?: string[] | null;
  sensory_hints?: string | null;
  slug?: string;
  social_links?: Json | null;
  status?: ProfileStatus;
  tagline?: string | null;
  total_creations?: number | null;
  total_followers?: number | null;
  updated_at?: string;
  updated_by?: string | null;
  verified_at?: string | null;
  verified_by?: string | null;
  website_url?: string | null;
}

/**
 * Validation result for artisan_profiles
 */
export interface ArtisanProfilesValidationResult {
  valid: boolean;
  errors: {
    application_id?: string;
    artisan_name?: string;
    avatar_url?: string;
    banner_url?: string;
    bio?: string;
    created_at?: string;
    created_by?: string;
    icon_emoji?: string;
    id?: string;
    portfolio_url?: string;
    primary_category?: string;
    secondary_categories?: string;
    sensory_hints?: string;
    slug?: string;
    social_links?: string;
    status?: string;
    tagline?: string;
    total_creations?: string;
    total_followers?: string;
    updated_at?: string;
    updated_by?: string;
    verified_at?: string;
    verified_by?: string;
    website_url?: string;
  };
}

