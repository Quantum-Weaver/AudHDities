// =====================================================
// FILE: types/iris_communications/customs.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.693Z
// SOURCE: database.types.ts lines 1668-1727
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CustomsRow = Database['public']['Tables']['customs']['Row'];
export type CustomsInsert = Database['public']['Tables']['customs']['Insert'];
export type CustomsUpdate = Database['public']['Tables']['customs']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for customs
 * All fields are optional for partial updates
 */
export interface CustomsFormData {

}

/**
 * Validation result for customs
 */
export interface CustomsValidationResult {
  valid: boolean;
  errors: {

  };
}

