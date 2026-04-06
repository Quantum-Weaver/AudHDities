// =====================================================
// FILE: types/athena_gamification/user_quests.ts
// HANDLING: join_table
// DEITY: athena_gamification
// GENERATED: 2026-04-05T21:55:13.124Z
// SOURCE: database.types.ts lines 5442-5495
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type QuestStatus = Database['public']['Enums']['quest_status'];

export type UserQuestsRow = Database['public']['Tables']['user_quests']['Row'];
export type UserQuestsInsert = Database['public']['Tables']['user_quests']['Insert'];
export type UserQuestsUpdate = Database['public']['Tables']['user_quests']['Update'];

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
  id?: string;
  quest_id?: string;
  started_at?: string | null;
  status?: QuestStatus | null;
  submission_metadata?: Json | null;
  submitted_content?: string | null;
  updated_at?: string | null;
  user_id?: string;
}

