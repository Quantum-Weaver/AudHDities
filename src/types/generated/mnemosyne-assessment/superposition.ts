// =====================================================
// FILE: types/generated/mnemosyne-assessment/superposition.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T15:32:13.753Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SuperpositionStatus = Enums<'superposition_status'>;

export type SuperpositionRow = Tables<'superposition'>;
export type SuperpositionInsert = TablesInsert<'superposition'>;
export type SuperpositionUpdate = TablesUpdate<'superposition'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of superposition
 */
export interface PublicSuperposition {
  collapse_count: number | null;
  concept_id: string;
  created_at: string | null;
  created_by: string | null;
  observer_count: number | null;
  possible_meanings: Json;
  probability_distribution: Json;
  status: SuperpositionStatus | null;
  superposition_id: string;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for superposition
 * All fields are optional for partial updates
 */
export interface SuperpositionFormData {
  collapse_count?: number | null;
  concept_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  observer_count?: number | null;
  possible_meanings?: Json;
  probability_distribution?: Json;
  status?: SuperpositionStatus | null;
  superposition_id?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for superposition
 */
export interface SuperpositionValidationResult {
  valid: boolean;
  errors: {
    collapse_count?: string;
    concept_id?: string;
    created_at?: string;
    created_by?: string;
    observer_count?: string;
    possible_meanings?: string;
    probability_distribution?: string;
    status?: string;
    superposition_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

