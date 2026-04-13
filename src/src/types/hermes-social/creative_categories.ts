// =====================================================
// FILE: types/generated/hermes-social/creative_categories.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T21:47:20.956Z
// SOURCE: database.types.ts lines 1605-1664
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CreativeCategoriesRow = Database['public']['Tables']['creative_categories']['Row'];
export type CreativeCategoriesInsert = Database['public']['Tables']['creative_categories']['Insert'];
export type CreativeCategoriesUpdate = Database['public']['Tables']['creative_categories']['Update'];

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

