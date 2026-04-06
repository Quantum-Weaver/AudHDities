// =====================================================
// FILE: types/mnemosyne_assessment/taxonomy.ts
// HANDLING: full_crud
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T21:55:13.105Z
// SOURCE: database.types.ts lines 5051-5113
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TaxonomyNodeType = Database['public']['Enums']['taxonomy_node_type'];

export type TaxonomyRow = Database['public']['Tables']['taxonomy']['Row'];
export type TaxonomyInsert = Database['public']['Tables']['taxonomy']['Insert'];
export type TaxonomyUpdate = Database['public']['Tables']['taxonomy']['Update'];

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
  id: string;
  is_active: boolean | null;
  level: number | null;
  name: string;
  node_type: TaxonomyNodeType;
  parent_id: string | null;
  path: string;
  slug: string;
  updated_at: string | null;
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
  id?: string;
  is_active?: boolean | null;
  level?: number | null;
  name?: string;
  node_type?: TaxonomyNodeType;
  parent_id?: string | null;
  path?: string;
  slug?: string;
  updated_at?: string | null;
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
    id?: string;
    is_active?: string;
    level?: string;
    name?: string;
    node_type?: string;
    parent_id?: string;
    path?: string;
    slug?: string;
    updated_at?: string;
  };
}

