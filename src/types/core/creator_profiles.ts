// =====================================================
/* @/types/core/creator_profiles.ts */
// CREATOR PROFILES - Pure Type Definitions
// No logic, no constants, just types
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM TYPES (from database)
// =====================================================

export type CreatorVerificationStatus = Database['public']['Enums']['verification_status'];

// =====================================================
// CORE PROFILE TYPES
// =====================================================
/**
 * Raw profile row from database
 * Matches exactly what Supabase returns
**/
export type CreatorProfileRow = Database['public']['Tables']['creator_profiles']['Row'];

export type CreatorProfileInsert = Database['public']['Tables']['creator_profiles']['Insert'];
export type CreatorProfileUpdate = Database['public']['Tables']['creator_profiles']['Update'];

// =====================================================
// DERIVED TYPES (for frontend use)
// =====================================================

/**
 * Public profile - what anyone can see
 */
export interface PublicCreatorProfile {
  id: string;
  username: string | null;
  creative_description?: string | null;
  creator_moniker: string;
  creator_logo_url?: string | null;
  portfolio_url?: string | null;
  created_at: string | null;
  creative_categories: string[] | null;
}

/**
 * Own profile - includes private fields
 */
export interface OwnCreatorProfile extends PublicCreatorProfile {
  total_products?: number | null;
  total_earnings?: number | null;
  total_sales?: number | null;
  stripe_account_id: string | null;
  verification_status: CreatorVerificationStatus;
  verified_at: string | null;
  verified_by: string | null;
  default_residual_pool?: number | null;
  updated_at: string | null;  
}

/**
 * Profile form data (for editing)
 */
export interface CreatorProfileFormData {
  creator_moniker?: string;
  creative_description?: string | null;
  creator_logo_url: string | null;
  default_residual_pool?: number | null;
  portfolio_url?: string | null;
  stripe_account_id?: string | null;
  creative_categories?: string[] | null;
}

/**
 * Profile validation result
 */
export interface CreatorProfileValidationResult {
  valid: boolean;
  errors: {
    creator_moniker?: string;
    username?: string;
  };
}