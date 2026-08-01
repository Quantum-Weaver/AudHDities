// =====================================================
// FILE: types/generated/hermes-social/merchant_profiles.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-08-01T18:08:02.221Z
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

export type MerchantProfilesRow = Tables<'merchant_profiles'>;
export type MerchantProfilesInsert = TablesInsert<'merchant_profiles'>;
export type MerchantProfilesUpdate = TablesUpdate<'merchant_profiles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of merchant_profiles
 */
export interface PublicMerchantProfiles {
  application_id: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  business_type: string | null;
  created_at: string;
  created_by: string;
  customization_policy: string | null;
  icon_emoji: string | null;
  id: string;
  primary_category: string | null;
  return_policy: string | null;
  secondary_categories: string[] | null;
  sensory_hints: string | null;
  shipping_policy: string | null;
  slug: string;
  social_links: Json | null;
  status: ProfileStatus;
  store_url: string | null;
  tagline: string | null;
  total_products: number | null;
  total_sales: number | null;
  updated_at: string;
  updated_by: string | null;
  vendor_name: string;
  verified_at: string | null;
  verified_by: string | null;
  website_url: string | null;
}

/**
 * Form data for merchant_profiles
 * All fields are optional for partial updates
 */
export interface MerchantProfilesFormData {
  application_id?: string | null;
  avatar_url?: string | null;
  banner_url?: string | null;
  bio?: string | null;
  business_type?: string | null;
  created_at?: string;
  created_by?: string;
  customization_policy?: string | null;
  icon_emoji?: string | null;
  id?: string;
  primary_category?: string | null;
  return_policy?: string | null;
  secondary_categories?: string[] | null;
  sensory_hints?: string | null;
  shipping_policy?: string | null;
  slug?: string;
  social_links?: Json | null;
  status?: ProfileStatus;
  store_url?: string | null;
  tagline?: string | null;
  total_products?: number | null;
  total_sales?: number | null;
  updated_at?: string;
  updated_by?: string | null;
  vendor_name?: string;
  verified_at?: string | null;
  verified_by?: string | null;
  website_url?: string | null;
}

/**
 * Validation result for merchant_profiles
 */
export interface MerchantProfilesValidationResult {
  valid: boolean;
  errors: {
    application_id?: string;
    avatar_url?: string;
    banner_url?: string;
    bio?: string;
    business_type?: string;
    created_at?: string;
    created_by?: string;
    customization_policy?: string;
    icon_emoji?: string;
    id?: string;
    primary_category?: string;
    return_policy?: string;
    secondary_categories?: string;
    sensory_hints?: string;
    shipping_policy?: string;
    slug?: string;
    social_links?: string;
    status?: string;
    store_url?: string;
    tagline?: string;
    total_products?: string;
    total_sales?: string;
    updated_at?: string;
    updated_by?: string;
    vendor_name?: string;
    verified_at?: string;
    verified_by?: string;
    website_url?: string;
  };
}

