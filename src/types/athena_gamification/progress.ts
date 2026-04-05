// =====================================================
// FILE: types/athena_gamification/progress.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.784Z
// SOURCE: database.types.ts lines 3456-3525
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ProgressRow = Database['public']['Tables']['progress']['Row'];
export type ProgressInsert = Database['public']['Tables']['progress']['Insert'];
export type ProgressUpdate = Database['public']['Tables']['progress']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for progress
 * All fields are optional for partial updates
 */
export interface ProgressFormData {

}

/**
 * Validation result for progress
 */
export interface ProgressValidationResult {
  valid: boolean;
  errors: {

  };
}

