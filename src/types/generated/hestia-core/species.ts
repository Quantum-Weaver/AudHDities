// =====================================================
// FILE: types/generated/hestia-core/species.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.841Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type SpeciesRow = Tables<'species'>;
export type SpeciesInsert = TablesInsert<'species'>;
export type SpeciesUpdate = TablesUpdate<'species'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of species
 */
export interface PublicSpecies {
  created_at: string;
  created_by: string | null;
  data_type: string | null;
  description: string | null;
  family_id: string | null;
  genus_id: string | null;
  id: string;
  keyword_id: string | null;
  keyword_ids: string[] | null;
  name: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for species
 * All fields are optional for partial updates
 */
export interface SpeciesFormData {
  created_at?: string;
  created_by?: string | null;
  data_type?: string | null;
  description?: string | null;
  family_id?: string | null;
  genus_id?: string | null;
  id?: string;
  keyword_id?: string | null;
  keyword_ids?: string[] | null;
  name?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for species
 */
export interface SpeciesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    data_type?: string;
    description?: string;
    family_id?: string;
    genus_id?: string;
    id?: string;
    keyword_id?: string;
    keyword_ids?: string;
    name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

