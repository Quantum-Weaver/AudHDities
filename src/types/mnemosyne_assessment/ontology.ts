// =====================================================
// FILE: types/mnemosyne_assessment/ontology.ts
// HANDLING: full_crud
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T18:12:44.759Z
// SOURCE: database.types.ts lines 2934-3004
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type OntologyRow = Database['public']['Tables']['ontology']['Row'];
export type OntologyInsert = Database['public']['Tables']['ontology']['Insert'];
export type OntologyUpdate = Database['public']['Tables']['ontology']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for ontology
 * All fields are optional for partial updates
 */
export interface OntologyFormData {

}

/**
 * Validation result for ontology
 */
export interface OntologyValidationResult {
  valid: boolean;
  errors: {

  };
}

