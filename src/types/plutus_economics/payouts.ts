// =====================================================
// FILE: types/plutus_economics/payouts.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.765Z
// SOURCE: database.types.ts lines 3041-3094
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type PayoutsRow = Database['public']['Tables']['payouts']['Row'];
export type PayoutsInsert = Database['public']['Tables']['payouts']['Insert'];
export type PayoutsUpdate = Database['public']['Tables']['payouts']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for payouts
 * All fields are optional for partial updates
 */
export interface PayoutsFormData {

}

/**
 * Validation result for payouts
 */
export interface PayoutsValidationResult {
  valid: boolean;
  errors: {

  };
}

