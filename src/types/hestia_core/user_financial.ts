// =====================================================
// FILE: types/hestia_core/user_financial.ts
// HANDLING: full_crud
// DEITY: hestia_core
// GENERATED: 2026-04-05T18:12:44.889Z
// SOURCE: database.types.ts lines 5324-5391
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type UserFinancialRow = Database['public']['Tables']['user_financial']['Row'];
export type UserFinancialInsert = Database['public']['Tables']['user_financial']['Insert'];
export type UserFinancialUpdate = Database['public']['Tables']['user_financial']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for user_financial
 * All fields are optional for partial updates
 */
export interface UserFinancialFormData {

}

/**
 * Validation result for user_financial
 */
export interface UserFinancialValidationResult {
  valid: boolean;
  errors: {

  };
}

