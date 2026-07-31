// =====================================================
// FILE: types/generated/athena-gamification/path_lessons.ts
// HANDLING: join_table
// DEITY: athena-gamification
// GENERATED: 2026-07-31T23:16:54.666Z
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

