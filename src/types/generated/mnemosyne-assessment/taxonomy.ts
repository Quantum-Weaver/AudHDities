// =====================================================
// FILE: types/generated/mnemosyne-assessment/taxonomy.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-20T04:39:10.902Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type TaxonomyRow = Tables<'taxonomy'>;
export type TaxonomyInsert = TablesInsert<'taxonomy'>;
export type TaxonomyUpdate = TablesUpdate<'taxonomy'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of taxonomy
 */
export interface PublicTaxonomy {
  class_id: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  domain_id: string | null;
  emoji: string | null;
  family_id: string | null;
  genus_id: string | null;
  id: string;
  is_primary: boolean | null;
  keyword_id: string | null;
  kingdom_id: string | null;
  name: string | null;
  order_id: string | null;
  phylum_id: string | null;
  species_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for taxonomy
 * All fields are optional for partial updates
 */
export interface TaxonomyFormData {
  class_id?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  domain_id?: string | null;
  emoji?: string | null;
  family_id?: string | null;
  genus_id?: string | null;
  id?: string;
  is_primary?: boolean | null;
  keyword_id?: string | null;
  kingdom_id?: string | null;
  name?: string | null;
  order_id?: string | null;
  phylum_id?: string | null;
  species_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for taxonomy
 */
export interface TaxonomyValidationResult {
  valid: boolean;
  errors: {
    class_id?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    domain_id?: string;
    emoji?: string;
    family_id?: string;
    genus_id?: string;
    id?: string;
    is_primary?: string;
    keyword_id?: string;
    kingdom_id?: string;
    name?: string;
    order_id?: string;
    phylum_id?: string;
    species_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

