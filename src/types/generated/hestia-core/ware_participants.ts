// =====================================================
// FILE: types/generated/hestia-core/ware_participants.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.978Z
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
 * Public view of ware_participants
 */
export interface PublicWareParticipants {
  created_at: string;
  created_by: string | null;
  id: string;
  notes: string | null;
  role: string | null;
  updated_at: string;
  updated_by: string | null;
  user_id: string;
  ware_id: string;
}

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

/**
 * Validation result for ware_participants
 */
export interface WareParticipantsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    id?: string;
    notes?: string;
    role?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
    ware_id?: string;
  };
}

