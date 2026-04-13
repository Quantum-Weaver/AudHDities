// =====================================================
// FILE: types/generated/athena-gamification/path_lessons.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.896Z
// SOURCE: database.types.ts lines 3490-3535
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

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
  created_at: string | null;
  created_by: string | null;
  lesson_id: string;
  order_index: number;
  path_id: string;
}

/**
 * Form data for path_lessons
 * All fields are optional for partial updates
 */
export interface PathLessonsFormData {
  created_at?: string | null;
  created_by?: string | null;
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
    created_by?: string;
    lesson_id?: string;
    order_index?: string;
    path_id?: string;
  };
}

