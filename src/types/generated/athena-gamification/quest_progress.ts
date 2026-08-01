// =====================================================
// FILE: types/generated/athena-gamification/quest_progress.ts
// HANDLING: join_table
// DEITY: athena-gamification
// GENERATED: 2026-08-01T16:03:06.846Z
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

