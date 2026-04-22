// =====================================================
// FILE: types/generated/hestia-core/vendor_profiles.ts
// TYPE: table
// HANDLING: join_table
// GENERATED: 2026-04-22T18:15:10.989Z
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

export type BusinessType = Database['public']['Enums']['business_type'];
export type VerificationStatus = Database['public']['Enums']['verification_status'];
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
  id?: string;
  product_categories?: string[] | null;
  profile_id?: string;
  stripe_account_id?: string | null;
  total_earnings?: number | null;
  total_products?: number | null;
  total_sales?: number | null;
  updated_at?: string | null;
  verified_at?: string | null;
  verified_badge?: boolean | null;
  verified_by?: string | null;
  website_url?: string | null;
}

