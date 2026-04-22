// =====================================================
// FILE: types/generated/mnemosyne-assessment/taxonomy.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.463Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type TaxonomyRow = Tables<'taxonomy'>;
export type TaxonomyInsert = TablesInsert<'taxonomy'>;
export type TaxonomyUpdate = TablesUpdate<'taxonomy'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicTaxonomy = Omit<TaxonomyRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type TaxonomyFormData = Partial<TaxonomyInsert>;

