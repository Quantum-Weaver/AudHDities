// =====================================================
// FILE: types/generated/hestia-core/companion_cues.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-18T23:17:10.695Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type CompanionCuesRow = Tables<'companion_cues'>;
export type CompanionCuesInsert = TablesInsert<'companion_cues'>;
export type CompanionCuesUpdate = TablesUpdate<'companion_cues'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of companion_cues
 */
export interface PublicCompanionCues {
  companion_id: string | null;
  created_at: string;
  created_by: string;
  cue_behavior: string | null;
  cue_frequency: string | null;
  cue_type: string;
  id: string;
  is_active: boolean;
  last_cued_at: string | null;
  next_cue_at: string | null;
  notes: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for companion_cues
 * All fields are optional for partial updates
 */
export interface CompanionCuesFormData {
  companion_id?: string | null;
  created_at?: string;
  created_by?: string;
  cue_behavior?: string | null;
  cue_frequency?: string | null;
  cue_type?: string;
  id?: string;
  is_active?: boolean;
  last_cued_at?: string | null;
  next_cue_at?: string | null;
  notes?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for companion_cues
 */
export interface CompanionCuesValidationResult {
  valid: boolean;
  errors: {
    companion_id?: string;
    created_at?: string;
    created_by?: string;
    cue_behavior?: string;
    cue_frequency?: string;
    cue_type?: string;
    id?: string;
    is_active?: string;
    last_cued_at?: string;
    next_cue_at?: string;
    notes?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

