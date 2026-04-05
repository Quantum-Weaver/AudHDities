// =====================================================
// FILE: types/hestia_core/vendor_profiles.ts
// HANDLING: join_table
// DEITY: hestia_core
// GENERATED: 2026-04-05T18:12:44.899Z
// SOURCE: database.types.ts lines 5496-5579
// =====================================================

import type { Database } from '@/types/supabase/database.types';

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

}

