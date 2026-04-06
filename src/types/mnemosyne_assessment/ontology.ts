// =====================================================
// FILE: types/mnemosyne_assessment/ontology.ts
// HANDLING: full_crud
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T21:55:13.019Z
// SOURCE: database.types.ts lines 2934-3004
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type OntologyPredicate = Database['public']['Enums']['ontology_predicate'];

export type OntologyRow = Database['public']['Tables']['ontology']['Row'];
export type OntologyInsert = Database['public']['Tables']['ontology']['Insert'];
export type OntologyUpdate = Database['public']['Tables']['ontology']['Update'];

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

