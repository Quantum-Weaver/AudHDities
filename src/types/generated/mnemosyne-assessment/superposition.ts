// =====================================================
// FILE: types/generated/mnemosyne-assessment/superposition.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-23T02:14:53.619Z
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
  id: string;
  observer_count: number | null;
  possible_meanings: Json;
  probability_distribution: Json;
  status: SuperpositionStatus | null;
  updated_at: string | null;
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
  id?: string;
  observer_count?: number | null;
  possible_meanings?: Json;
  probability_distribution?: Json;
  status?: SuperpositionStatus | null;
  updated_at?: string | null;
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
    id?: string;
    observer_count?: string;
    possible_meanings?: string;
    probability_distribution?: string;
    status?: string;
    updated_at?: string;
  };
}

