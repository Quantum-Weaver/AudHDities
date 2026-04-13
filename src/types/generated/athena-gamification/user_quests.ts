// =====================================================
// FILE: types/generated/athena-gamification/user_quests.ts
// HANDLING: join_table
// GENERATED: 2026-04-13T15:29:50.907Z
// SOURCE: database.types.ts lines 6606-6669
// =====================================================

import type { Database } from '@/types/supabase/database.types';

import type { Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type QuestStatus = Database['public']['Enums']['quest_status'];

// =====================================================
// CORE TYPES
// =====================================================

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

