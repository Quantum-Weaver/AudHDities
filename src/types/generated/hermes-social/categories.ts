// =====================================================
// FILE: types/generated/hermes-social/categories.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-07-18T23:17:10.659Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type CategoriesRow = Tables<'categories'>;
export type CategoriesInsert = TablesInsert<'categories'>;
export type CategoriesUpdate = TablesUpdate<'categories'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of categories
 */
export interface PublicCategories {
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  icon_emoji: string | null;
  icon_url: string | null;
  id: string;
  name: string;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for categories
 * All fields are optional for partial updates
 */
export interface CategoriesFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  icon_emoji?: string | null;
  icon_url?: string | null;
  id?: string;
  name?: string;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for categories
 */
export interface CategoriesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon_emoji?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

