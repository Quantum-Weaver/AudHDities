// =====================================================
// FILE: types/plutus_economics/ledger.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.732Z
// SOURCE: database.types.ts lines 2421-2477
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type LedgerRow = Database['public']['Tables']['ledger']['Row'];
export type LedgerInsert = Database['public']['Tables']['ledger']['Insert'];
export type LedgerUpdate = Database['public']['Tables']['ledger']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for ledger
 * All fields are optional for partial updates
 */
export interface LedgerFormData {

}

/**
 * Validation result for ledger
 */
export interface LedgerValidationResult {
  valid: boolean;
  errors: {

  };
}

