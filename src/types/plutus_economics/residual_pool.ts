// =====================================================
// FILE: types/plutus_economics/residual_pool.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.818Z
// SOURCE: database.types.ts lines 4093-4143
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ResidualPoolRow = Database['public']['Tables']['residual_pool']['Row'];
export type ResidualPoolInsert = Database['public']['Tables']['residual_pool']['Insert'];
export type ResidualPoolUpdate = Database['public']['Tables']['residual_pool']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for residual_pool
 * All fields are optional for partial updates
 */
export interface ResidualPoolFormData {

}

/**
 * Validation result for residual_pool
 */
export interface ResidualPoolValidationResult {
  valid: boolean;
  errors: {

  };
}

