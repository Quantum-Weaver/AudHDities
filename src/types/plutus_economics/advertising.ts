// =====================================================
// FILE: types/plutus_economics/advertising.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.615Z
// SOURCE: database.types.ts lines 314-372
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type AdvertisingRow = Database['public']['Tables']['advertising']['Row'];
export type AdvertisingInsert = Database['public']['Tables']['advertising']['Insert'];
export type AdvertisingUpdate = Database['public']['Tables']['advertising']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for advertising
 * All fields are optional for partial updates
 */
export interface AdvertisingFormData {

}

/**
 * Validation result for advertising
 */
export interface AdvertisingValidationResult {
  valid: boolean;
  errors: {

  };
}

