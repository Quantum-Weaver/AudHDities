// =====================================================
// FILE: types/generated/athena-gamification/progress.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.334Z
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

export type ProgressStatus = Database['public']['Enums']['progress_status'];
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
  id: string;
  last_activity_at: string | null;
  lesson_id: string | null;
  notes: string | null;
  path_id: string | null;
  progress_percent: number | null;
  score: number | null;
  started_at: string | null;
  status: ProgressStatus;
  updated_at: string | null;
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

