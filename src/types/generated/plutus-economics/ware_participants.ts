// =====================================================
// FILE: types/generated/plutus-economics/ware_participants.ts
// HANDLING: join_table
// DEITY: plutus-economics
// GENERATED: 2026-07-18T23:17:11.277Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type WareParticipantsRow = Tables<'ware_participants'>;
export type WareParticipantsInsert = TablesInsert<'ware_participants'>;
export type WareParticipantsUpdate = TablesUpdate<'ware_participants'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for ware_participants
 * All fields are optional for partial updates
 */
export interface WareParticipantsFormData {
  created_at?: string;
  created_by?: string | null;
  id?: string;
  notes?: string | null;
  role?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  user_id?: string;
  ware_id?: string;
}

