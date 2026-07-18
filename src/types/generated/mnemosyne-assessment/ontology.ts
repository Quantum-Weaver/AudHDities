// =====================================================
// FILE: types/generated/mnemosyne-assessment/ontology.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:09:31.361Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

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
  cardinality: string;
  cardinality_keyword_id: string | null;
  constraints: Json | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  object_external: string | null;
  object_family_id: string | null;
  object_keyword_id: string | null;
  predicate: string;
  predicate_keyword_id: string | null;
  relationship_source_keyword_id: string | null;
  relationship_type: string;
  subject_family_id: string;
  subject_keyword_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for ontology
 * All fields are optional for partial updates
 */
export interface OntologyFormData {
  cardinality?: string;
  cardinality_keyword_id?: string | null;
  constraints?: Json | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  object_external?: string | null;
  object_family_id?: string | null;
  object_keyword_id?: string | null;
  predicate?: string;
  predicate_keyword_id?: string | null;
  relationship_source_keyword_id?: string | null;
  relationship_type?: string;
  subject_family_id?: string;
  subject_keyword_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for ontology
 */
export interface OntologyValidationResult {
  valid: boolean;
  errors: {
    cardinality?: string;
    cardinality_keyword_id?: string;
    constraints?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    object_external?: string;
    object_family_id?: string;
    object_keyword_id?: string;
    predicate?: string;
    predicate_keyword_id?: string;
    relationship_source_keyword_id?: string;
    relationship_type?: string;
    subject_family_id?: string;
    subject_keyword_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

