// =====================================================
// FILE: types/mnemosyne_assessment/taxonomy.ts
// HANDLING: full_crud
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T18:12:44.873Z
// SOURCE: database.types.ts lines 5051-5113
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type TaxonomyRow = Database['public']['Tables']['taxonomy']['Row'];
export type TaxonomyInsert = Database['public']['Tables']['taxonomy']['Insert'];
export type TaxonomyUpdate = Database['public']['Tables']['taxonomy']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for taxonomy
 * All fields are optional for partial updates
 */
export interface TaxonomyFormData {

}

/**
 * Validation result for taxonomy
 */
export interface TaxonomyValidationResult {
  valid: boolean;
  errors: {

  };
}

