// =====================================================
// FILE: types/generated/mnemosyne-assessment/ontology.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-23T02:14:53.111Z
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
  id: string;
  is_approved: boolean | null;
  object_id: string;
  predicate: OntologyPredicate;
  subject_id: string;
  updated_at: string | null;
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
  id?: string;
  is_approved?: boolean | null;
  object_id?: string;
  predicate?: OntologyPredicate;
  subject_id?: string;
  updated_at?: string | null;
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
    id?: string;
    is_approved?: string;
    object_id?: string;
    predicate?: string;
    subject_id?: string;
    updated_at?: string;
    weight?: string;
  };
}

