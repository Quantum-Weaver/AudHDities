// =====================================================
// FILE: types/iris_communications/continents.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.665Z
// SOURCE: database.types.ts lines 1188-1214
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ContinentsRow = Database['public']['Tables']['continents']['Row'];
export type ContinentsInsert = Database['public']['Tables']['continents']['Insert'];
export type ContinentsUpdate = Database['public']['Tables']['continents']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for continents
 * All fields are optional for partial updates
 */
export interface ContinentsFormData {

}

/**
 * Validation result for continents
 */
export interface ContinentsValidationResult {
  valid: boolean;
  errors: {

  };
}

