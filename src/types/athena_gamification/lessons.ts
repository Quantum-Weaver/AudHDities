// =====================================================
// FILE: types/athena_gamification/lessons.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T19:46:33.021Z
// SOURCE: database.types.ts lines 2478-2533
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type LessonContentType = Database['public']['Enums']['lesson_content_type'];

export type LessonsRow = Database['public']['Tables']['lessons']['Row'];
export type LessonsInsert = Database['public']['Tables']['lessons']['Insert'];
export type LessonsUpdate = Database['public']['Tables']['lessons']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of lessons
 */
export interface PublicLessons {
  content_body: string | null
  content_type: LessonContentType
  content_url: string | null
  created_at: string | null
  creator_id: string
  description: string
  duration_minutes: number | null
  id: string
  is_published: boolean | null
  order_index: number | null
  slug: string
  title: string
  updated_at: string | null
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
    creator_id?: string;
    description?: string;
    duration_minutes?: string;
    id?: string;
    is_published?: string;
    order_index?: string;
    slug?: string;
    title?: string;
    updated_at?: string;
  };
}

