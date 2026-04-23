// =====================================================
// FILE: types/generated/iris-communications/continents.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-23T02:14:52.720Z
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
  created_at: string | null;
  created_by: string | null;
  id: string;
  name: string;
  name_localized: Json | null;
  population_estimate: number | null;
}

/**
 * Form data for continents
 * All fields are optional for partial updates
 */
export interface ContinentsFormData {
  code?: string;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  name?: string;
  name_localized?: Json | null;
  population_estimate?: number | null;
}

/**
 * Validation result for continents
 */
export interface ContinentsValidationResult {
  valid: boolean;
  errors: {
    code?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    name?: string;
    name_localized?: string;
    population_estimate?: string;
  };
}

