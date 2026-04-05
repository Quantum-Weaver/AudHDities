// =====================================================
// FILE: types/mnemosyne_assessment/etymology.ts
// HANDLING: full_crud
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T18:12:44.704Z
// SOURCE: database.types.ts lines 1902-1970
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type EtymologyRow = Database['public']['Tables']['etymology']['Row'];
export type EtymologyInsert = Database['public']['Tables']['etymology']['Insert'];
export type EtymologyUpdate = Database['public']['Tables']['etymology']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for etymology
 * All fields are optional for partial updates
 */
export interface EtymologyFormData {

}

/**
 * Validation result for etymology
 */
export interface EtymologyValidationResult {
  valid: boolean;
  errors: {

  };
}

