// =====================================================
// FILE: types/plutus_economics/covenant_pool.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.675Z
// SOURCE: database.types.ts lines 1342-1382
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CovenantPoolRow = Database['public']['Tables']['covenant_pool']['Row'];
export type CovenantPoolInsert = Database['public']['Tables']['covenant_pool']['Insert'];
export type CovenantPoolUpdate = Database['public']['Tables']['covenant_pool']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for covenant_pool
 * All fields are optional for partial updates
 */
export interface CovenantPoolFormData {

}

/**
 * Validation result for covenant_pool
 */
export interface CovenantPoolValidationResult {
  valid: boolean;
  errors: {

  };
}

