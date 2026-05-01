// =====================================================
// FILE: types/generated/iris-communications/regions.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-05-01T03:24:41.927Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

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
  is_active: boolean | null;
  name: string;
  name_localized: Json | null;
  phone_code: string | null;
  regions_id: string;
  updated_at: string | null;
  updated_by: string | null;
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
  is_active?: boolean | null;
  name?: string;
  name_localized?: Json | null;
  phone_code?: string | null;
  regions_id?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for regions
 */
export interface RegionsValidationResult {
  valid: boolean;
  errors: {
    continent_id?: string;
    country_code?: string;
    country_code_3?: string;
    created_at?: string;
    created_by?: string;
    flag_emoji?: string;
    is_active?: string;
    name?: string;
    name_localized?: string;
    phone_code?: string;
    regions_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

