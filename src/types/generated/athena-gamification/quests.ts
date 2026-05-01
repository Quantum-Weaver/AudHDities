// =====================================================
// FILE: types/generated/athena-gamification/quests.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-05-01T15:31:59.771Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Enums<'council_house'>;
export type SubmissionType = Enums<'submission_type'>;

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
  instructions: string | null;
  is_active: boolean | null;
  order_index: number | null;
  prerequisite_quest_id: string | null;
  quests_id: string;
  required_sovereignty_score: number | null;
  residual_multiplier_bonus: number | null;
  slug: string;
  sovereignty_reward: number | null;
  submission_type: SubmissionType;
  title: string;
  updated_at: string | null;
  updated_by: string | null;
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
  instructions?: string | null;
  is_active?: boolean | null;
  order_index?: number | null;
  prerequisite_quest_id?: string | null;
  quests_id?: string;
  required_sovereignty_score?: number | null;
  residual_multiplier_bonus?: number | null;
  slug?: string;
  sovereignty_reward?: number | null;
  submission_type?: SubmissionType;
  title?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for quests
 */
export interface QuestsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    house?: string;
    instructions?: string;
    is_active?: string;
    order_index?: string;
    prerequisite_quest_id?: string;
    quests_id?: string;
    required_sovereignty_score?: string;
    residual_multiplier_bonus?: string;
    slug?: string;
    sovereignty_reward?: string;
    submission_type?: string;
    title?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

