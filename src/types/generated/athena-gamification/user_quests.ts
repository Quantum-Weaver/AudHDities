// =====================================================
// FILE: types/generated/athena-gamification/user_quests.ts
// TYPE: table
// HANDLING: join_table
// GENERATED: 2026-04-22T18:24:20.121Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type QuestStatus = Database['public']['Enums']['quest_status'];
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

