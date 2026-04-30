// =====================================================
// FILE: types/generated/hestia-core/vendor_profiles.ts
// HANDLING: join_table
// DEITY: hestia-core
// GENERATED: 2026-04-30T04:17:48.520Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BusinessType = Enums<'business_type'>;
export type VerificationStatus = Enums<'verification_status'>;

export type VendorProfilesRow = Tables<'vendor_profiles'>;
export type VendorProfilesInsert = TablesInsert<'vendor_profiles'>;
export type VendorProfilesUpdate = TablesUpdate<'vendor_profiles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for vendor_profiles
 * All fields are optional for partial updates
 */
export interface VendorProfilesFormData {
  business_description?: string | null;
  business_logo_url?: string | null;
  business_name?: string;
  business_type?: BusinessType | null;
  created_at?: string | null;
  created_by?: string | null;
  product_categories?: string[] | null;
  profile_id?: string;
  stripe_account_id?: string | null;
  total_earnings?: number | null;
  total_products?: number | null;
  total_sales?: number | null;
  updated_at?: string | null;
  vendor_profiles_id?: string;
  verified_at?: string | null;
  verified_badge?: boolean | null;
  verified_by?: string | null;
  website_url?: string | null;
}

