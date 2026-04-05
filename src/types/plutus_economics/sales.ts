// =====================================================
// FILE: types/plutus_economics/sales.ts
// HANDLING: full_crud
// DEITY: plutus_economics
// GENERATED: 2026-04-05T18:12:44.821Z
// SOURCE: database.types.ts lines 4144-4224
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SalesRow = Database['public']['Tables']['sales']['Row'];
export type SalesInsert = Database['public']['Tables']['sales']['Insert'];
export type SalesUpdate = Database['public']['Tables']['sales']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for sales
 * All fields are optional for partial updates
 */
export interface SalesFormData {

}

/**
 * Validation result for sales
 */
export interface SalesValidationResult {
  valid: boolean;
  errors: {

  };
}

