// =====================================================
// FILE: types/generated/iris-communications/regions.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:09:31.444Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  code: string | null;
  continent_id: string | null;
  created_at: string;
  created_by: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  name: string;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for regions
 * All fields are optional for partial updates
 */
export interface RegionsFormData {
  code?: string | null;
  continent_id?: string | null;
  created_at?: string;
  created_by?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  name?: string;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for regions
 */
export interface RegionsValidationResult {
  valid: boolean;
  errors: {
    code?: string;
    continent_id?: string;
    created_at?: string;
    created_by?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

