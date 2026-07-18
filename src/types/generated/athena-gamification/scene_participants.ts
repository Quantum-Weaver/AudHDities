// =====================================================
// FILE: types/generated/athena-gamification/scene_participants.ts
// HANDLING: join_table
// DEITY: athena-gamification
// GENERATED: 2026-07-18T23:30:04.008Z
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
 * Form data for scene_participants
 * All fields are optional for partial updates
 */
export interface SceneParticipantsFormData {
  created_at?: string;
  id?: string;
  is_active?: boolean;
  joined_at?: string;
  last_active_at?: string;
  scene_id?: string;
  updated_at?: string;
  user_id?: string;
}

