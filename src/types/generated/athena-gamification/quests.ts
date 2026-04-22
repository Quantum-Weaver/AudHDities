// =====================================================
// FILE: types/generated/athena-gamification/quests.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.639Z
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

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type SubmissionType = Database['public']['Enums']['submission_type'];
export type QuestsRow = Tables<'quests'>;
export type QuestsInsert = TablesInsert<'quests'>;
export type QuestsUpdate = TablesUpdate<'quests'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of quests
 */
export interface PublicQuests {
  created_at: string | null;
  created_by: string | null;
  description: string;
  house: CouncilHouse;
  id: string;
  instructions: string | null;
  is_active: boolean | null;
  order_index: number | null;
  prerequisite_quest_id: string | null;
  required_sovereignty_score: number | null;
  residual_multiplier_bonus: number | null;
  sovereignty_reward: number | null;
  submission_type: SubmissionType;
  title: string;
  updated_at: string | null;
}

/**
 * Form data for quests
 * All fields are optional for partial updates
 */
export interface QuestsFormData {
  created_at?: string | null;
  created_by?: string | null;
  description?: string;
  house?: CouncilHouse;
  id?: string;
  instructions?: string | null;
  is_active?: boolean | null;
  order_index?: number | null;
  prerequisite_quest_id?: string | null;
  required_sovereignty_score?: number | null;
  residual_multiplier_bonus?: number | null;
  sovereignty_reward?: number | null;
  submission_type?: SubmissionType;
  title?: string;
  updated_at?: string | null;
}

