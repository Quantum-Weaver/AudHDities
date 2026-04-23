// =====================================================
// FILE: types/generated/athena-gamification/path_lessons.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-04-23T02:14:53.121Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type PathLessonsRow = Tables<'path_lessons'>;
export type PathLessonsInsert = TablesInsert<'path_lessons'>;
export type PathLessonsUpdate = TablesUpdate<'path_lessons'>;

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

