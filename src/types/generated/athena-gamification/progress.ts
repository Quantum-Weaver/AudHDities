// =====================================================
// FILE: types/generated/athena-gamification/progress.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-05-01T03:24:41.765Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ProgressStatus = Enums<'progress_status'>;

export type ProgressRow = Tables<'progress'>;
export type ProgressInsert = TablesInsert<'progress'>;
export type ProgressUpdate = TablesUpdate<'progress'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of progress
 */
export interface PublicProgress {
  completed_at: string | null;
  created_at: string | null;
  created_by: string | null;
  last_activity_at: string | null;
  lesson_id: string | null;
  notes: string | null;
  path_id: string | null;
  progress_id: string;
  progress_percent: number | null;
  score: number | null;
  started_at: string | null;
  status: ProgressStatus;
  updated_at: string | null;
  updated_by: string | null;
  user_id: string;
}

/**
 * Form data for progress
 * All fields are optional for partial updates
 */
export interface ProgressFormData {
  completed_at?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  last_activity_at?: string | null;
  lesson_id?: string | null;
  notes?: string | null;
  path_id?: string | null;
  progress_id?: string;
  progress_percent?: number | null;
  score?: number | null;
  started_at?: string | null;
  status?: ProgressStatus;
  updated_at?: string | null;
  updated_by?: string | null;
  user_id?: string;
}

/**
 * Validation result for progress
 */
export interface ProgressValidationResult {
  valid: boolean;
  errors: {
    completed_at?: string;
    created_at?: string;
    created_by?: string;
    last_activity_at?: string;
    lesson_id?: string;
    notes?: string;
    path_id?: string;
    progress_id?: string;
    progress_percent?: string;
    score?: string;
    started_at?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
  };
}

