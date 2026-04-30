// =====================================================
// FILE: types/generated/iris-communications/customs.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-30T15:32:13.418Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CustomCategoryType = Enums<'custom_category_type'>;

export type CustomsRow = Tables<'customs'>;
export type CustomsInsert = TablesInsert<'customs'>;
export type CustomsUpdate = TablesUpdate<'customs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of customs
 */
export interface PublicCustoms {
  category: CustomCategoryType;
  created_at: string | null;
  created_by: string | null;
  customs_id: string;
  description: string;
  guidance: string | null;
  is_active: boolean | null;
  is_sensitive: boolean | null;
  name: string;
  persona_id: string | null;
  region_id: string | null;
  slug: string;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for customs
 * All fields are optional for partial updates
 */
export interface CustomsFormData {
  category?: CustomCategoryType;
  created_at?: string | null;
  created_by?: string | null;
  customs_id?: string;
  description?: string;
  guidance?: string | null;
  is_active?: boolean | null;
  is_sensitive?: boolean | null;
  name?: string;
  persona_id?: string | null;
  region_id?: string | null;
  slug?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for customs
 */
export interface CustomsValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    created_at?: string;
    created_by?: string;
    customs_id?: string;
    description?: string;
    guidance?: string;
    is_active?: string;
    is_sensitive?: string;
    name?: string;
    persona_id?: string;
    region_id?: string;
    slug?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

