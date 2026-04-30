// =====================================================
// FILE: types/generated/iris-communications/localization.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-30T15:32:13.515Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type LocalizationRow = Tables<'localization'>;
export type LocalizationInsert = TablesInsert<'localization'>;
export type LocalizationUpdate = TablesUpdate<'localization'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of localization
 */
export interface PublicLocalization {
  approved_by: string | null;
  context: string | null;
  created_at: string | null;
  created_by: string | null;
  is_approved: boolean | null;
  language_code: string;
  localization_id: string;
  plural_form: number | null;
  resource_key: string;
  translation: string;
  updated_at: string | null;
  updated_by: string | null;
  version: number | null;
}

/**
 * Form data for localization
 * All fields are optional for partial updates
 */
export interface LocalizationFormData {
  approved_by?: string | null;
  context?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  is_approved?: boolean | null;
  language_code?: string;
  localization_id?: string;
  plural_form?: number | null;
  resource_key?: string;
  translation?: string;
  updated_at?: string | null;
  updated_by?: string | null;
  version?: number | null;
}

/**
 * Validation result for localization
 */
export interface LocalizationValidationResult {
  valid: boolean;
  errors: {
    approved_by?: string;
    context?: string;
    created_at?: string;
    created_by?: string;
    is_approved?: string;
    language_code?: string;
    localization_id?: string;
    plural_form?: string;
    resource_key?: string;
    translation?: string;
    updated_at?: string;
    updated_by?: string;
    version?: string;
  };
}

