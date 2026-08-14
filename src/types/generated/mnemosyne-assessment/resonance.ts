// =====================================================
// FILE: types/generated/mnemosyne-assessment/resonance.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-08-01T21:41:40.305Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ResonanceRow = Tables<'resonance'>;
export type ResonanceInsert = TablesInsert<'resonance'>;
export type ResonanceUpdate = TablesUpdate<'resonance'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of resonance
 */
export interface PublicResonance {
  created_at: string;
  id: string;
  notes: string | null;
  resonance_type: string;
  signal_id: string | null;
  updated_at: string;
  user_id: string;
  work_id: string | null;
}

/**
 * Form data for resonance
 * All fields are optional for partial updates
 */
export interface ResonanceFormData {
  created_at?: string;
  id?: string;
  notes?: string | null;
  resonance_type?: string;
  signal_id?: string | null;
  updated_at?: string;
  user_id?: string;
  work_id?: string | null;
}

/**
 * Validation result for resonance
 */
export interface ResonanceValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    id?: string;
    notes?: string;
    resonance_type?: string;
    signal_id?: string;
    updated_at?: string;
    user_id?: string;
    work_id?: string;
  };
}

