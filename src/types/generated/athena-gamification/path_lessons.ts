// =====================================================
// FILE: types/generated/athena-gamification/path_lessons.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-07-10T18:14:59.605Z
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
  created_at: string;
  display_order: number;
  id: string;
  is_required: boolean;
  lesson_id: string;
  path_id: string;
  updated_at: string;
}

/**
 * Form data for path_lessons
 * All fields are optional for partial updates
 */
export interface PathLessonsFormData {
  created_at?: string;
  display_order?: number;
  id?: string;
  is_required?: boolean;
  lesson_id?: string;
  path_id?: string;
  updated_at?: string;
}

/**
 * Validation result for path_lessons
 */
export interface PathLessonsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    display_order?: string;
    id?: string;
    is_required?: string;
    lesson_id?: string;
    path_id?: string;
    updated_at?: string;
  };
}

