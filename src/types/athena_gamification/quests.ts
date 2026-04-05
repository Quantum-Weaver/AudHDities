// =====================================================
// FILE: types/athena_gamification/quests.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T19:46:33.078Z
// SOURCE: database.types.ts lines 3643-3701
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type SubmissionType = Database['public']['Enums']['submission_type'];

export type QuestsRow = Database['public']['Tables']['quests']['Row'];
export type QuestsInsert = Database['public']['Tables']['quests']['Insert'];
export type QuestsUpdate = Database['public']['Tables']['quests']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of quests
 */
export interface PublicQuests {
  created_at: string | null
  description: string
  house: CouncilHouse
  id: string
  instructions: string | null
  is_active: boolean | null
  order_index: number | null
  prerequisite_quest_id: string | null
  required_sovereignty_score: number | null
  residual_multiplier_bonus: number | null
  sovereignty_reward: number | null
  submission_type: SubmissionType
  title: string
  updated_at: string | null
}

/**
 * Form data for quests
 * All fields are optional for partial updates
 */
export interface QuestsFormData {
  created_at?: string | null;
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

/**
 * Validation result for quests
 */
export interface QuestsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    description?: string;
    house?: string;
    id?: string;
    instructions?: string;
    is_active?: string;
    order_index?: string;
    prerequisite_quest_id?: string;
    required_sovereignty_score?: string;
    residual_multiplier_bonus?: string;
    sovereignty_reward?: string;
    submission_type?: string;
    title?: string;
    updated_at?: string;
  };
}

