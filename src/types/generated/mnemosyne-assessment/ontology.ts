// =====================================================
// FILE: types/generated/mnemosyne-assessment/ontology.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.380Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type OntologyPredicate = Database['public']['Enums']['ontology_predicate'];
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

