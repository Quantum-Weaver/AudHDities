// =====================================================
// FILE: types/generated/athena-gamification/scene_participants.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.160Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SceneParticipantsRow = Tables<'scene_participants'>;
export type SceneParticipantsInsert = TablesInsert<'scene_participants'>;
export type SceneParticipantsUpdate = TablesUpdate<'scene_participants'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSceneParticipants = Omit<SceneParticipantsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SceneParticipantsFormData = Partial<SceneParticipantsInsert>;

