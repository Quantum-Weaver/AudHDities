// =====================================================
// FILE: types/generated/mnemosyne-assessment/taxonomy.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T15:32:13.787Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TaxonomyNodeType = Enums<'taxonomy_node_type'>;

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
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  domain: string | null;
  is_active: boolean | null;
  level: number | null;
  name: string;
  node_type: TaxonomyNodeType;
  parent_id: string | null;
  path: string;
  slug: string;
  taxonomy_id: string;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for taxonomy
 * All fields are optional for partial updates
 */
export interface TaxonomyFormData {
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  domain?: string | null;
  is_active?: boolean | null;
  level?: number | null;
  name?: string;
  node_type?: TaxonomyNodeType;
  parent_id?: string | null;
  path?: string;
  slug?: string;
  taxonomy_id?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for taxonomy
 */
export interface TaxonomyValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    domain?: string;
    is_active?: string;
    level?: string;
    name?: string;
    node_type?: string;
    parent_id?: string;
    path?: string;
    slug?: string;
    taxonomy_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

