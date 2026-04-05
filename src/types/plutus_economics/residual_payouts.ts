// =====================================================
// FILE: types/plutus_economics/residual_payouts.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.815Z
// SOURCE: database.types.ts lines 4035-4092
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ResidualPayoutsRow = Database['public']['Tables']['residual_payouts']['Row'];
export type ResidualPayoutsInsert = Database['public']['Tables']['residual_payouts']['Insert'];
export type ResidualPayoutsUpdate = Database['public']['Tables']['residual_payouts']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for residual_payouts
 * All fields are optional for partial updates
 */
export interface ResidualPayoutsFormData {

}

/**
 * Validation result for residual_payouts
 */
export interface ResidualPayoutsValidationResult {
  valid: boolean;
  errors: {

  };
}

