// =====================================================
// FILE: types/generated/athena-gamification/path_lessons.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.235Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

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

