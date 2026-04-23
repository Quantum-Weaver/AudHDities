// =====================================================
// FILE: types/generated/athena-gamification/scenes.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-04-23T02:14:53.471Z
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
export type SceneType = Enums<'scene_type'>;

export type ScenesRow = Tables<'scenes'>;
export type ScenesInsert = TablesInsert<'scenes'>;
export type ScenesUpdate = TablesUpdate<'scenes'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scenes
 */
export interface PublicScenes {
  created_at: string | null;
  created_by: string | null;
  creator_id: string;
  description: string;
  house: CouncilHouse | null;
  id: string;
  instructions: string | null;
  is_active: boolean | null;
  mythology_id: string | null;
  participant_count: number | null;
  scheduled_for: string | null;
  slug: string;
  title: string;
  type: SceneType;
  updated_at: string | null;
}

/**
 * Form data for scenes
 * All fields are optional for partial updates
 */
export interface ScenesFormData {
  created_at?: string | null;
  created_by?: string | null;
  creator_id?: string;
  description?: string;
  house?: CouncilHouse | null;
  id?: string;
  instructions?: string | null;
  is_active?: boolean | null;
  mythology_id?: string | null;
  participant_count?: number | null;
  scheduled_for?: string | null;
  slug?: string;
  title?: string;
  type?: SceneType;
  updated_at?: string | null;
}

/**
 * Validation result for scenes
 */
export interface ScenesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    creator_id?: string;
    description?: string;
    house?: string;
    id?: string;
    instructions?: string;
    is_active?: string;
    mythology_id?: string;
    participant_count?: string;
    scheduled_for?: string;
    slug?: string;
    title?: string;
    type?: string;
    updated_at?: string;
  };
}

