// =====================================================
// FILE: types/athena_gamification/learning_paths.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.729Z
// SOURCE: database.types.ts lines 2358-2420
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type LearningPathsRow = Database['public']['Tables']['learning_paths']['Row'];
export type LearningPathsInsert = Database['public']['Tables']['learning_paths']['Insert'];
export type LearningPathsUpdate = Database['public']['Tables']['learning_paths']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for learning_paths
 * All fields are optional for partial updates
 */
export interface LearningPathsFormData {

}

/**
 * Validation result for learning_paths
 */
export interface LearningPathsValidationResult {
  valid: boolean;
  errors: {

  };
}

