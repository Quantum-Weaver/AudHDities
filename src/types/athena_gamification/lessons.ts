// =====================================================
// FILE: types/athena_gamification/lessons.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.735Z
// SOURCE: database.types.ts lines 2478-2533
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type LessonsRow = Database['public']['Tables']['lessons']['Row'];
export type LessonsInsert = Database['public']['Tables']['lessons']['Insert'];
export type LessonsUpdate = Database['public']['Tables']['lessons']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for lessons
 * All fields are optional for partial updates
 */
export interface LessonsFormData {

}

/**
 * Validation result for lessons
 */
export interface LessonsValidationResult {
  valid: boolean;
  errors: {

  };
}

