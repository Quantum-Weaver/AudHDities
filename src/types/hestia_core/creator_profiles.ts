// =====================================================
// FILE: types/hestia_core/creator_profiles.ts
// HANDLING: join_table
// DEITY: hestia_core
// GENERATED: 2026-04-05T21:55:12.966Z
// SOURCE: database.types.ts lines 1469-1552
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

type VerificationStatus = Database['public']['Enums']['verification_status'];

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
  creative_categories?: string[] | null;
  creative_description?: string | null;
  creator_logo_url?: string | null;
  creator_moniker?: string;
  default_residual_pool?: number | null;
  id?: string;
  portfolio_url?: string | null;
  stripe_account_id?: string | null;
  total_earnings?: number | null;
  total_products?: number | null;
  total_sales?: number | null;
  updated_at?: string | null;
  username?: string | null;
  verified_at?: string | null;
  verified_badge?: boolean | null;
  verified_by?: string | null;
}

