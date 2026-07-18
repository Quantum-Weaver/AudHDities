// =====================================================
// FILE: types/generated/iris-communications/customs.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:30:03.673Z
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

export type CustomsRow = Tables<'customs'>;
export type CustomsInsert = TablesInsert<'customs'>;
export type CustomsUpdate = TablesUpdate<'customs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of customs
 */
export interface PublicCustoms {
  created_at: string;
  created_by: string | null;
  culturalization_id: string | null;
  custom_type: string | null;
  description: string | null;
  guidance: string | null;
  id: string;
  name: string;
  practice: string | null;
  region_id: string | null;
  significance: string | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for customs
 * All fields are optional for partial updates
 */
export interface CustomsFormData {
  created_at?: string;
  created_by?: string | null;
  culturalization_id?: string | null;
  custom_type?: string | null;
  description?: string | null;
  guidance?: string | null;
  id?: string;
  name?: string;
  practice?: string | null;
  region_id?: string | null;
  significance?: string | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for customs
 */
export interface CustomsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    culturalization_id?: string;
    custom_type?: string;
    description?: string;
    guidance?: string;
    id?: string;
    name?: string;
    practice?: string;
    region_id?: string;
    significance?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

