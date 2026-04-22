// =====================================================
// FILE: types/generated/athena-gamification/lessons.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.021Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LessonContentType = Database['public']['Enums']['lesson_content_type'];
export type LessonsRow = Tables<'lessons'>;
export type LessonsInsert = TablesInsert<'lessons'>;
export type LessonsUpdate = TablesUpdate<'lessons'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of lessons
 */
export interface PublicLessons {
  content_body: string | null;
  content_type: LessonContentType;
  content_url: string | null;
  created_at: string | null;
  created_by: string | null;
  creator_id: string;
  description: string;
  duration_minutes: number | null;
  id: string;
  is_published: boolean | null;
  order_index: number | null;
  slug: string;
  title: string;
  updated_at: string | null;
}

/**
 * Form data for lessons
 * All fields are optional for partial updates
 */
export interface LessonsFormData {
  content_body?: string | null;
  content_type?: LessonContentType;
  content_url?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  creator_id?: string;
  description?: string;
  duration_minutes?: number | null;
  id?: string;
  is_published?: boolean | null;
  order_index?: number | null;
  slug?: string;
  title?: string;
  updated_at?: string | null;
}

