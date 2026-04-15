// =====================================================
// FILE: types/generated/mnemosyne-assessment/superposition.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.526Z
// SOURCE: database.types.ts lines 5874-5927
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SuperpositionStatus = Database['public']['Enums']['superposition_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type SuperpositionRow = Database['public']['Tables']['superposition']['Row'];
export type SuperpositionInsert = Database['public']['Tables']['superposition']['Insert'];
export type SuperpositionUpdate = Database['public']['Tables']['superposition']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of superposition
 */
export interface PublicSuperposition {
  collapse_count: number | null;
  concept_id: string;
  "created_at": "string | null";
  created_by: string | null;
  id: string;
  observer_count: number | null;
  possible_meanings: Json;
  probability_distribution: Json;
  status: SuperpositionStatus | null;
  "updated_at": "string | null";
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

