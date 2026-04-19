// =====================================================
// FILE: types/generated/hestia-core/creator_profiles.ts
// HANDLING: join_table
// GENERATED: 2026-04-19T20:39:34.632Z
// SOURCE: database.types.ts lines 1903-2003
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type VerificationStatus = Database['public']['Enums']['verification_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type CreatorProfilesRow = Database['public']['Tables']['creator_profiles']['Row'];
export type CreatorProfilesInsert = Database['public']['Tables']['creator_profiles']['Insert'];
export type CreatorProfilesUpdate = Database['public']['Tables']['creator_profiles']['Update'];

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
  default_residual_pool?: number | null;
  id?: string;
  portfolio_url?: string | null;
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

