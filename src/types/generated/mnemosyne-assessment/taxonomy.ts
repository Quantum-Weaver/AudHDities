// =====================================================
// FILE: types/generated/mnemosyne-assessment/taxonomy.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.892Z
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

export type TaxonomyNodeType = Database['public']['Enums']['taxonomy_node_type'];
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

