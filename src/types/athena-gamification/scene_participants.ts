// =====================================================
// FILE: types/generated/athena-gamification/scene_participants.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.751Z
// SOURCE: database.types.ts lines 5207-5252
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SceneParticipantsRow = Database['public']['Tables']['scene_participants']['Row'];
export type SceneParticipantsInsert = Database['public']['Tables']['scene_participants']['Insert'];
export type SceneParticipantsUpdate = Database['public']['Tables']['scene_participants']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scene_participants
 */
export interface PublicSceneParticipants {
  created_by: string | null;
  joined_at: string | null;
  role: string | null;
  scene_id: string;
  user_id: string;
}

/**
 * Form data for scene_participants
 * All fields are optional for partial updates
 */
export interface SceneParticipantsFormData {
  created_by?: string | null;
  joined_at?: string | null;
  role?: string | null;
  scene_id?: string;
  user_id?: string;
}

/**
 * Validation result for scene_participants
 */
export interface SceneParticipantsValidationResult {
  valid: boolean;
  errors: {
    created_by?: string;
    joined_at?: string;
    role?: string;
    scene_id?: string;
    user_id?: string;
  };
}

