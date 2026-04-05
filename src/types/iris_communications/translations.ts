// =====================================================
// FILE: types/iris_communications/translations.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.883Z
// SOURCE: database.types.ts lines 5215-5278
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type TranslationsRow = Database['public']['Tables']['translations']['Row'];
export type TranslationsInsert = Database['public']['Tables']['translations']['Insert'];
export type TranslationsUpdate = Database['public']['Tables']['translations']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for translations
 * All fields are optional for partial updates
 */
export interface TranslationsFormData {

}

/**
 * Validation result for translations
 */
export interface TranslationsValidationResult {
  valid: boolean;
  errors: {

  };
}

