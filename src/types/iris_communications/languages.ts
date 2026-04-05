// =====================================================
// FILE: types/iris_communications/languages.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.726Z
// SOURCE: database.types.ts lines 2316-2357
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type LanguagesRow = Database['public']['Tables']['languages']['Row'];
export type LanguagesInsert = Database['public']['Tables']['languages']['Insert'];
export type LanguagesUpdate = Database['public']['Tables']['languages']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for languages
 * All fields are optional for partial updates
 */
export interface LanguagesFormData {

}

/**
 * Validation result for languages
 */
export interface LanguagesValidationResult {
  valid: boolean;
  errors: {

  };
}

