// =====================================================
// FILE: types/generated/hestia-core/vendor_profiles.ts
// HANDLING: join_table
// GENERATED: 2026-04-15T18:11:44.246Z
// SOURCE: database.types.ts lines 6670-6763
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BusinessType = Database['public']['Enums']['business_type'];
export type VerificationStatus = Database['public']['Enums']['verification_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type VendorProfilesRow = Database['public']['Tables']['vendor_profiles']['Row'];
export type VendorProfilesInsert = Database['public']['Tables']['vendor_profiles']['Insert'];
export type VendorProfilesUpdate = Database['public']['Tables']['vendor_profiles']['Update'];

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
  stripe_account_id?: string | null;
  total_earnings?: number | null;
  total_products?: number | null;
  total_sales?: number | null;
  updated_at?: string | null;
  username?: string | null;
  verified_at?: string | null;
  verified_badge?: boolean | null;
  verified_by?: string | null;
  website_url?: string | null;
}

