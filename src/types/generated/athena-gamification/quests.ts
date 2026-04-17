// =====================================================
// FILE: types/generated/athena-gamification/quests.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T22:45:09.537Z
// SOURCE: database.types.ts lines 4747-4815
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type SubmissionType = Database['public']['Enums']['submission_type'];

// =====================================================
// CORE TYPES
// =====================================================

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

