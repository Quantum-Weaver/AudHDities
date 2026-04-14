// =====================================================
// FILE: types/generated/iris-communications/continents.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T21:18:08.815Z
// SOURCE: database.types.ts lines 1369-1406
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ContinentsRow = Database['public']['Tables']['continents']['Row'];
export type ContinentsInsert = Database['public']['Tables']['continents']['Insert'];
export type ContinentsUpdate = Database['public']['Tables']['continents']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of continents
 */
export interface PublicContinents {
  code: string;
  "created_at": "string | null";
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

