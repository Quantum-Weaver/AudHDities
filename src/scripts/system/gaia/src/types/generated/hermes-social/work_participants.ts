// =====================================================
// FILE: types/generated/hermes-social/work_participants.ts
// HANDLING: join_table
// DEITY: hermes-social
// GENERATED: 2026-08-01T17:49:54.630Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type WorkParticipantsRow = Tables<'work_participants'>;
export type WorkParticipantsInsert = TablesInsert<'work_participants'>;
export type WorkParticipantsUpdate = TablesUpdate<'work_participants'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for work_participants
 * All fields are optional for partial updates
 */
export interface WorkParticipantsFormData {
  created_at?: string;
  created_by?: string | null;
  id?: string;
  notes?: string | null;
  role?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  user_id?: string;
  work_id?: string;
}

