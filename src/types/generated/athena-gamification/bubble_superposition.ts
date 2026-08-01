// =====================================================
// FILE: types/generated/athena-gamification/bubble_superposition.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-08-01T16:03:06.290Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type BubbleSuperpositionRow = Tables<'bubble_superposition'>;
export type BubbleSuperpositionInsert = TablesInsert<'bubble_superposition'>;
export type BubbleSuperpositionUpdate = TablesUpdate<'bubble_superposition'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of bubble_superposition
 */
export interface PublicBubbleSuperposition {
  bubble_id: string | null;
  cooldown_minutes: number | null;
  created_at: string;
  created_by: string | null;
  current_scene_id: string | null;
  id: string;
  max_instances: number | null;
  probability: number | null;
  spawn_locations: string[] | null;
  state_type: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
  visual_effect: string | null;
}

/**
 * Form data for bubble_superposition
 * All fields are optional for partial updates
 */
export interface BubbleSuperpositionFormData {
  bubble_id?: string | null;
  cooldown_minutes?: number | null;
  created_at?: string;
  created_by?: string | null;
  current_scene_id?: string | null;
  id?: string;
  max_instances?: number | null;
  probability?: number | null;
  spawn_locations?: string[] | null;
  state_type?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
  visual_effect?: string | null;
}

/**
 * Validation result for bubble_superposition
 */
export interface BubbleSuperpositionValidationResult {
  valid: boolean;
  errors: {
    bubble_id?: string;
    cooldown_minutes?: string;
    created_at?: string;
    created_by?: string;
    current_scene_id?: string;
    id?: string;
    max_instances?: string;
    probability?: string;
    spawn_locations?: string;
    state_type?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    visual_effect?: string;
  };
}

