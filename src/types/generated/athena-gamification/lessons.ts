// =====================================================
// FILE: types/generated/athena-gamification/lessons.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-07-18T23:17:10.915Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  content: Json | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  difficulty: string | null;
  display_order: number;
  estimated_duration: string | null;
  icon_url: string | null;
  id: string;
  lesson_type: string | null;
  name: string;
  resources: Json | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for lessons
 * All fields are optional for partial updates
 */
export interface LessonsFormData {
  content?: Json | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  difficulty?: string | null;
  display_order?: number;
  estimated_duration?: string | null;
  icon_url?: string | null;
  id?: string;
  lesson_type?: string | null;
  name?: string;
  resources?: Json | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for lessons
 */
export interface LessonsValidationResult {
  valid: boolean;
  errors: {
    content?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    difficulty?: string;
    display_order?: string;
    estimated_duration?: string;
    icon_url?: string;
    id?: string;
    lesson_type?: string;
    name?: string;
    resources?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

