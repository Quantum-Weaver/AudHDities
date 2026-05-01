// =====================================================
// FILE: types/generated/hestia-core/creator_profiles.ts
// HANDLING: join_table
// DEITY: hestia-core
// GENERATED: 2026-05-01T15:31:59.540Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type VerificationStatus = Enums<'verification_status'>;

export type CreatorProfilesRow = Tables<'creator_profiles'>;
export type CreatorProfilesInsert = TablesInsert<'creator_profiles'>;
export type CreatorProfilesUpdate = TablesUpdate<'creator_profiles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for creator_profiles
 * All fields are optional for partial updates
 */
export interface CreatorProfilesFormData {
  created_at?: string | null;
  created_by?: string | null;
  creative_categories?: string[] | null;
  creative_description?: string | null;
  creator_logo_url?: string | null;
  creator_moniker?: string;
  creator_profiles_id?: string;
  default_residual_pool?: number | null;
  portfolio_url?: string | null;
  products_linked?: string[] | null;
  profile_id?: string;
  stripe_account_id?: string | null;
  total_earnings?: number | null;
  total_products?: number | null;
  total_sales?: number | null;
  updated_at?: string | null;
  verified_at?: string | null;
  verified_badge?: boolean | null;
  verified_by?: string | null;
}

