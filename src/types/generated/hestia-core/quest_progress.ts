// =====================================================
// FILE: types/generated/hestia-core/quest_progress.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.712Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type QuestProgressRow = Tables<'quest_progress'>;
export type QuestProgressInsert = TablesInsert<'quest_progress'>;
export type QuestProgressUpdate = TablesUpdate<'quest_progress'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of quest_progress
 */
export interface PublicQuestProgress {
  completed_at: string | null;
  created_at: string;
  id: string;
  objective_key: string;
  objective_status: string;
  progress_data: Json | null;
  quest_id: string;
  updated_at: string;
  user_id: string;
}

/**
 * Form data for quest_progress
 * All fields are optional for partial updates
 */
export interface QuestProgressFormData {
  completed_at?: string | null;
  created_at?: string;
  id?: string;
  objective_key?: string;
  objective_status?: string;
  progress_data?: Json | null;
  quest_id?: string;
  updated_at?: string;
  user_id?: string;
}

/**
 * Validation result for quest_progress
 */
export interface QuestProgressValidationResult {
  valid: boolean;
  errors: {
    completed_at?: string;
    created_at?: string;
    id?: string;
    objective_key?: string;
    objective_status?: string;
    progress_data?: string;
    quest_id?: string;
    updated_at?: string;
    user_id?: string;
  };
}

