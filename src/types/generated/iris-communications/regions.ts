// =====================================================
// FILE: types/generated/iris-communications/regions.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.693Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type RegionsRow = Tables<'regions'>;
export type RegionsInsert = TablesInsert<'regions'>;
export type RegionsUpdate = TablesUpdate<'regions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of regions
 */
export interface PublicRegions {
  continent_id: string;
  country_code: string;
  country_code_3: string | null;
  created_at: string | null;
  created_by: string | null;
  flag_emoji: string | null;
  id: string;
  is_active: boolean | null;
  name: string;
  name_localized: Json | null;
  phone_code: string | null;
  updated_at: string | null;
}

/**
 * Form data for regions
 * All fields are optional for partial updates
 */
export interface RegionsFormData {
  continent_id?: string;
  country_code?: string;
  country_code_3?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  flag_emoji?: string | null;
  id?: string;
  is_active?: boolean | null;
  name?: string;
  name_localized?: Json | null;
  phone_code?: string | null;
  updated_at?: string | null;
}

