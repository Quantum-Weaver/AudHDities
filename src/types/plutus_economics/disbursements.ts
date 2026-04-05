// =====================================================
// FILE: types/plutus_economics/disbursements.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.696Z
// SOURCE: database.types.ts lines 1728-1760
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type DisbursementsRow = Database['public']['Tables']['disbursements']['Row'];
export type DisbursementsInsert = Database['public']['Tables']['disbursements']['Insert'];
export type DisbursementsUpdate = Database['public']['Tables']['disbursements']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for disbursements
 * All fields are optional for partial updates
 */
export interface DisbursementsFormData {

}

/**
 * Validation result for disbursements
 */
export interface DisbursementsValidationResult {
  valid: boolean;
  errors: {

  };
}

