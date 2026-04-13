// =====================================================
// FILE: types/generated/iris-communications/customs.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.891Z
// SOURCE: database.types.ts lines 1940-2009
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CustomCategoryType = Database['public']['Enums']['custom_category_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type CustomsRow = Database['public']['Tables']['customs']['Row'];
export type CustomsInsert = Database['public']['Tables']['customs']['Insert'];
export type CustomsUpdate = Database['public']['Tables']['customs']['Update'];

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
  description: string;
  guidance: string | null;
  id: string;
  is_active: boolean | null;
  is_sensitive: boolean | null;
  name: string;
  persona_id: string | null;
  region_id: string | null;
  slug: string;
  updated_at: string | null;
}

/**
 * Form data for customs
 * All fields are optional for partial updates
 */
export interface CustomsFormData {
  category?: CustomCategoryType;
  created_at?: string | null;
  created_by?: string | null;
  description?: string;
  guidance?: string | null;
  id?: string;
  is_active?: boolean | null;
  is_sensitive?: boolean | null;
  name?: string;
  persona_id?: string | null;
  region_id?: string | null;
  slug?: string;
  updated_at?: string | null;
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
    description?: string;
    guidance?: string;
    id?: string;
    is_active?: string;
    is_sensitive?: string;
    name?: string;
    persona_id?: string;
    region_id?: string;
    slug?: string;
    updated_at?: string;
  };
}

