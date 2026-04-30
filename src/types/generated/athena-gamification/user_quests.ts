// =====================================================
// FILE: types/generated/athena-gamification/user_quests.ts
// HANDLING: join_table
// DEITY: athena-gamification
// GENERATED: 2026-04-30T00:26:46.981Z
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

export type QuestStatus = Enums<'quest_status'>;

export type UserQuestsRow = Tables<'user_quests'>;
export type UserQuestsInsert = TablesInsert<'user_quests'>;
export type UserQuestsUpdate = TablesUpdate<'user_quests'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for user_quests
 * All fields are optional for partial updates
 */
export interface UserQuestsFormData {
  completed_at?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  quest_id?: string;
  started_at?: string | null;
  status?: QuestStatus | null;
  submission_metadata?: Json | null;
  submitted_content?: string | null;
  updated_at?: string | null;
  user_id?: string;
}

