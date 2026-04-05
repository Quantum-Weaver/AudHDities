// =====================================================
// FILE: types/athena_gamification/path_lessons.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.762Z
// SOURCE: database.types.ts lines 3005-3040
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type PathLessonsRow = Database['public']['Tables']['path_lessons']['Row'];
export type PathLessonsInsert = Database['public']['Tables']['path_lessons']['Insert'];
export type PathLessonsUpdate = Database['public']['Tables']['path_lessons']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for path_lessons
 * All fields are optional for partial updates
 */
export interface PathLessonsFormData {

}

/**
 * Validation result for path_lessons
 */
export interface PathLessonsValidationResult {
  valid: boolean;
  errors: {

  };
}

