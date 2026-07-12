// =====================================================
// FILE: types/generated/hestia-core/merchant_profiles.ts
// HANDLING: join_table
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.572Z
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

