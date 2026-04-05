// =====================================================
// FILE: types/plutus_economics/transactions.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.880Z
// SOURCE: database.types.ts lines 5158-5214
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type TransactionsRow = Database['public']['Tables']['transactions']['Row'];
export type TransactionsInsert = Database['public']['Tables']['transactions']['Insert'];
export type TransactionsUpdate = Database['public']['Tables']['transactions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for transactions
 * All fields are optional for partial updates
 */
export interface TransactionsFormData {

}

/**
 * Validation result for transactions
 */
export interface TransactionsValidationResult {
  valid: boolean;
  errors: {

  };
}

