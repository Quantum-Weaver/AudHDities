// =====================================================
// FILE: types/generated/hestia-core/creator_profiles.ts
// TYPE: table
// HANDLING: join_table
// GENERATED: 2026-04-22T18:24:19.004Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type VerificationStatus = Database['public']['Enums']['verification_status'];
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

