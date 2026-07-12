// =====================================================
// FILE: types/generated/hestia-core/work_participants.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.990Z
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
 * Public view of work_participants
 */
export interface PublicWorkParticipants {
  created_at: string;
  created_by: string | null;
  id: string;
  notes: string | null;
  role: string | null;
  updated_at: string;
  updated_by: string | null;
  user_id: string;
  work_id: string;
}

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

/**
 * Validation result for work_participants
 */
export interface WorkParticipantsValidationResult {
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
    work_id?: string;
  };
}

