// =====================================================
// FILE: types/athena_gamification/scene_participants.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T19:46:33.107Z
// SOURCE: database.types.ts lines 4225-4260
// =====================================================

import type { Database } from '@/types/supabase/database.types';

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
  joined_at: string | null
  role: string | null
  scene_id: string
  user_id: string
}

/**
 * Form data for scene_participants
 * All fields are optional for partial updates
 */
export interface SceneParticipantsFormData {
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
    joined_at?: string;
    role?: string;
    scene_id?: string;
    user_id?: string;
  };
}

