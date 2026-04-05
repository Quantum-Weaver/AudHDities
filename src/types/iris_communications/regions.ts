// =====================================================
// FILE: types/iris_communications/regions.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T19:46:33.086Z
// SOURCE: database.types.ts lines 3798-3847
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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
  continent_id: string
  country_code: string
  country_code_3: string | null
  created_at: string | null
  flag_emoji: string | null
  id: string
  is_active: boolean | null
  name: string
  name_localized: Json | null
  phone_code: string | null
  updated_at: string | null
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
    flag_emoji?: string;
    id?: string;
    is_active?: string;
    name?: string;
    name_localized?: string;
    phone_code?: string;
    updated_at?: string;
  };
}

