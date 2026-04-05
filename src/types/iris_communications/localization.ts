// =====================================================
// FILE: types/iris_communications/localization.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.741Z
// SOURCE: database.types.ts lines 2575-2631
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type LocalizationRow = Database['public']['Tables']['localization']['Row'];
export type LocalizationInsert = Database['public']['Tables']['localization']['Insert'];
export type LocalizationUpdate = Database['public']['Tables']['localization']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for localization
 * All fields are optional for partial updates
 */
export interface LocalizationFormData {

}

/**
 * Validation result for localization
 */
export interface LocalizationValidationResult {
  valid: boolean;
  errors: {

  };
}

