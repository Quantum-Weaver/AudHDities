// =====================================================
// FILE: types/generated/athena-gamification/scene_participants.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-04-30T04:17:48.157Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type SceneParticipantsRow = Tables<'scene_participants'>;
export type SceneParticipantsInsert = TablesInsert<'scene_participants'>;
export type SceneParticipantsUpdate = TablesUpdate<'scene_participants'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scene_participants
 */
export interface PublicSceneParticipants {
  created_at: string;
  created_by: string | null;
  joined_at: string | null;
  role: string | null;
  scene_participants_id: string;
  updated_at: string | null;
  user_id: string;
}

/**
 * Form data for scene_participants
 * All fields are optional for partial updates
 */
export interface SceneParticipantsFormData {
  created_at?: string;
  created_by?: string | null;
  joined_at?: string | null;
  role?: string | null;
  scene_participants_id?: string;
  updated_at?: string | null;
  user_id?: string;
}

/**
 * Validation result for scene_participants
 */
export interface SceneParticipantsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    joined_at?: string;
    role?: string;
    scene_participants_id?: string;
    updated_at?: string;
    user_id?: string;
  };
}

