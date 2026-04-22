// =====================================================
// FILE: types/generated/mnemosyne-assessment/ontology.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.721Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type OntologyRow = Tables<'ontology'>;
export type OntologyInsert = TablesInsert<'ontology'>;
export type OntologyUpdate = TablesUpdate<'ontology'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicOntology = Omit<OntologyRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type OntologyFormData = Partial<OntologyInsert>;

