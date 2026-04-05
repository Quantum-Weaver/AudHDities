// =====================================================
// FILE: types/athena_gamification/progress.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T19:46:33.068Z
// SOURCE: database.types.ts lines 3456-3525
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ProgressStatus = Database['public']['Enums']['progress_status'];

export type ProgressRow = Database['public']['Tables']['progress']['Row'];
export type ProgressInsert = Database['public']['Tables']['progress']['Insert'];
export type ProgressUpdate = Database['public']['Tables']['progress']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of progress
 */
export interface PublicProgress {
  completed_at: string | null
  created_at: string | null
  id: string
  last_activity_at: string | null
  lesson_id: string | null
  notes: string | null
  path_id: string | null
  progress_percent: number | null
  score: number | null
  started_at: string | null
  status: ProgressStatus
  updated_at: string | null
  user_id: string
}

/**
 * Form data for progress
 * All fields are optional for partial updates
 */
export interface ProgressFormData {
  completed_at?: string | null;
  created_at?: string | null;
  id?: string;
  last_activity_at?: string | null;
  lesson_id?: string | null;
  notes?: string | null;
  path_id?: string | null;
  progress_percent?: number | null;
  score?: number | null;
  started_at?: string | null;
  status?: ProgressStatus;
  updated_at?: string | null;
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
    id?: string;
    last_activity_at?: string;
    lesson_id?: string;
    notes?: string;
    path_id?: string;
    progress_percent?: string;
    score?: string;
    started_at?: string;
    status?: string;
    updated_at?: string;
    user_id?: string;
  };
}

