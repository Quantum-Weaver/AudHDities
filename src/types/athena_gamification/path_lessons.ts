// =====================================================
// FILE: types/athena_gamification/path_lessons.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T19:46:33.047Z
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
 * Public view of path_lessons
 */
export interface PublicPathLessons {
  created_at: string | null
  lesson_id: string
  order_index: number
  path_id: string
}

/**
 * Form data for path_lessons
 * All fields are optional for partial updates
 */
export interface PathLessonsFormData {
  created_at?: string | null;
  lesson_id?: string;
  order_index?: number;
  path_id?: string;
}

/**
 * Validation result for path_lessons
 */
export interface PathLessonsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    lesson_id?: string;
    order_index?: string;
    path_id?: string;
  };
}

