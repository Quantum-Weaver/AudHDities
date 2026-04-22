// =====================================================
// FILE: types/generated/mnemosyne-assessment/superposition.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.780Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SuperpositionStatus = Database['public']['Enums']['superposition_status'];
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

