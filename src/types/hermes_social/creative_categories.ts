// =====================================================
// FILE: types/hermes_social/creative_categories.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T18:12:44.678Z
// SOURCE: database.types.ts lines 1383-1432
// =====================================================

import type { Database } from '@/types/supabase/database.types';

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
 * Form data for creative_categories
 * All fields are optional for partial updates
 */
export interface CreativeCategoriesFormData {

}

/**
 * Validation result for creative_categories
 */
export interface CreativeCategoriesValidationResult {
  valid: boolean;
  errors: {

  };
}

