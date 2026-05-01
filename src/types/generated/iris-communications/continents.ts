// =====================================================
// FILE: types/generated/iris-communications/continents.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-05-01T15:31:59.512Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ContinentsRow = Tables<'continents'>;
export type ContinentsInsert = TablesInsert<'continents'>;
export type ContinentsUpdate = TablesUpdate<'continents'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of continents
 */
export interface PublicContinents {
  code: string;
  continents_id: string;
  created_at: string | null;
  created_by: string | null;
  name: string;
  name_localized: Json | null;
  population_estimate: number | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for continents
 * All fields are optional for partial updates
 */
export interface ContinentsFormData {
  code?: string;
  continents_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  name?: string;
  name_localized?: Json | null;
  population_estimate?: number | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for continents
 */
export interface ContinentsValidationResult {
  valid: boolean;
  errors: {
    code?: string;
    continents_id?: string;
    created_at?: string;
    created_by?: string;
    name?: string;
    name_localized?: string;
    population_estimate?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

