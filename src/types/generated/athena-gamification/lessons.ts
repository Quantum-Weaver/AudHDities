// =====================================================
// FILE: types/generated/athena-gamification/lessons.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-05-01T15:31:59.639Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LessonContentType = Enums<'lesson_content_type'>;

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
  is_published: boolean | null;
  lessons_id: string;
  order_index: number | null;
  slug: string;
  title: string;
  updated_at: string | null;
  updated_by: string | null;
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
  is_published?: boolean | null;
  lessons_id?: string;
  order_index?: number | null;
  slug?: string;
  title?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for lessons
 */
export interface LessonsValidationResult {
  valid: boolean;
  errors: {
    content_body?: string;
    content_type?: string;
    content_url?: string;
    created_at?: string;
    created_by?: string;
    creator_id?: string;
    description?: string;
    duration_minutes?: string;
    is_published?: string;
    lessons_id?: string;
    order_index?: string;
    slug?: string;
    title?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

