// =====================================================
/* @/types/core/vendor_profiles.ts */
// VENDOR PROFILES - Pure Type Definitions
// No logic, no constants, just types
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM TYPES (from database)
// =====================================================

export type VendorVerificationStatus = Database['public']['Enums']['verification_status'];
export type BusinessType = Database['public']['Enums']['business_type'];
// =====================================================
// CORE PROFILE TYPES
// =====================================================
/**
 * Raw profile row from database
 * Matches exactly what Supabase returns
**/
export type VendorProfileRow = Database['public']['Tables']['vendor_profiles']['Row'];

export type VendorProfileInsert = Database['public']['Tables']['vendor_profiles']['Insert'];
export type VendorProfileUpdate = Database['public']['Tables']['vendor_profiles']['Update'];

// =====================================================
// DERIVED TYPES (for frontend use)
// =====================================================

/**
 * Public profile - what anyone can see
 */
export interface PublicVendorProfile {
  id: string;
  username: string | null;
  business_description?: string | null;
  business_name: string;
  business_logo_url?: string | null;
  website_url?: string | null;
  created_at: string | null;
  product_categories: string[] | null;
}

/**
 * Own profile - includes private fields
 */
export interface OwnVendorProfile extends PublicVendorProfile {
  total_products?: number | null;
  total_earnings?: number | null;
  total_sales?: number | null;
  stripe_account_id: string | null;
  business_type: BusinessType;
  verification_status: VendorVerificationStatus;
  verified_at: string | null;
  verified_by: string | null;
  updated_at: string | null;  
}

/**
 * Profile form data (for editing)
 */
export interface VendorProfileFormData {
  business_name?: string;
  business_type?: BusinessType;
  business_description?: string | null;
  business_logo_url: string | null;
  default_residual_pool?: number | null;
  website_url?: string | null;
  stripe_account_id?: string | null;
  product_categories?: string[] | null;
}

/**
 * Profile validation result
 */
export interface VendorProfileValidationResult {
  valid: boolean;
  errors: {
    business_name?: string;
    display_name?: string;
  };
}