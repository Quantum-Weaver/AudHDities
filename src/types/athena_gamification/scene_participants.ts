// =====================================================
// FILE: types/athena_gamification/scene_participants.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T18:12:44.823Z
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
 * Form data for scene_participants
 * All fields are optional for partial updates
 */
export interface SceneParticipantsFormData {

}

/**
 * Validation result for scene_participants
 */
export interface SceneParticipantsValidationResult {
  valid: boolean;
  errors: {

  };
}

