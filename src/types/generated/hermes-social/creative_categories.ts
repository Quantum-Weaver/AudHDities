// =====================================================
// FILE: types/generated/hermes-social/creative_categories.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.765Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CreativeCategoriesRow = Tables<'creative_categories'>;
export type CreativeCategoriesInsert = TablesInsert<'creative_categories'>;
export type CreativeCategoriesUpdate = TablesUpdate<'creative_categories'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of creative_categories
 */
export interface PublicCreativeCategories {
  color: string | null;
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  display_order: number | null;
  icon: string | null;
  id: string;
  is_active: boolean | null;
  name: string;
  parent_id: string | null;
  slug: string;
  updated_at: string | null;
}

/**
 * Form data for creative_categories
 * All fields are optional for partial updates
 */
export interface CreativeCategoriesFormData {
  color?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  display_order?: number | null;
  icon?: string | null;
  id?: string;
  is_active?: boolean | null;
  name?: string;
  parent_id?: string | null;
  slug?: string;
  updated_at?: string | null;
}

