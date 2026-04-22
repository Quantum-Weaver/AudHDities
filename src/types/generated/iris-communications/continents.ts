// =====================================================
// FILE: types/generated/iris-communications/continents.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.917Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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

