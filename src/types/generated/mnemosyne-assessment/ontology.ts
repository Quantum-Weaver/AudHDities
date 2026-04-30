// =====================================================
// FILE: types/generated/mnemosyne-assessment/ontology.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T15:32:13.548Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type OntologyPredicate = Enums<'ontology_predicate'>;

export type OntologyRow = Tables<'ontology'>;
export type OntologyInsert = TablesInsert<'ontology'>;
export type OntologyUpdate = TablesUpdate<'ontology'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of ontology
 */
export interface PublicOntology {
  approved_by: string | null;
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  is_approved: boolean | null;
  object_id: string;
  ontology_id: string;
  predicate: OntologyPredicate;
  subject_id: string;
  updated_at: string | null;
  updated_by: string | null;
  weight: number | null;
}

/**
 * Form data for ontology
 * All fields are optional for partial updates
 */
export interface OntologyFormData {
  approved_by?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  is_approved?: boolean | null;
  object_id?: string;
  ontology_id?: string;
  predicate?: OntologyPredicate;
  subject_id?: string;
  updated_at?: string | null;
  updated_by?: string | null;
  weight?: number | null;
}

/**
 * Validation result for ontology
 */
export interface OntologyValidationResult {
  valid: boolean;
  errors: {
    approved_by?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    is_approved?: string;
    object_id?: string;
    ontology_id?: string;
    predicate?: string;
    subject_id?: string;
    updated_at?: string;
    updated_by?: string;
    weight?: string;
  };
}

