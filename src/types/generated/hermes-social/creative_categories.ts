// =====================================================
// FILE: types/generated/hermes-social/creative_categories.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-04-23T02:14:52.765Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

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

/**
 * Validation result for creative_categories
 */
export interface CreativeCategoriesValidationResult {
  valid: boolean;
  errors: {
    color?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon?: string;
    id?: string;
    is_active?: string;
    name?: string;
    parent_id?: string;
    slug?: string;
    updated_at?: string;
  };
}

