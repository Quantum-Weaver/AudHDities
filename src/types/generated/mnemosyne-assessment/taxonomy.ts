// =====================================================
// FILE: types/generated/mnemosyne-assessment/taxonomy.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T21:18:08.865Z
// SOURCE: database.types.ts lines 6155-6217
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type TaxonomyNodeType = Database['public']['Enums']['taxonomy_node_type'];

// =====================================================
// CORE TYPES
// =====================================================

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
  "created_at": "string | null";
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
  "updated_at": "string | null";
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

