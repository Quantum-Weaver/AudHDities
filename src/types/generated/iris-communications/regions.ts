// =====================================================
// FILE: types/generated/iris-communications/regions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:30:35.456Z
// SOURCE: database.types.ts lines 4710-4769
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type RegionsRow = Database['public']['Tables']['regions']['Row'];
export type RegionsInsert = Database['public']['Tables']['regions']['Insert'];
export type RegionsUpdate = Database['public']['Tables']['regions']['Update'];

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
    id?: string;
    is_active?: string;
    name?: string;
    name_localized?: string;
    phone_code?: string;
    updated_at?: string;
  };
}

