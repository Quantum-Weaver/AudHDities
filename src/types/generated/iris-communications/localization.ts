// =====================================================
// FILE: types/generated/iris-communications/localization.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-20T04:39:10.663Z
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
  created_at: string;
  created_by: string | null;
  currency_code: string | null;
  currency_symbol: string | null;
  date_format: string;
  first_day_of_week: number;
  id: string;
  is_default: boolean;
  language_id: string | null;
  number_format: string | null;
  region_code: string | null;
  status: ContentStatus;
  time_format: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for localization
 * All fields are optional for partial updates
 */
export interface LocalizationFormData {
  created_at?: string;
  created_by?: string | null;
  currency_code?: string | null;
  currency_symbol?: string | null;
  date_format?: string;
  first_day_of_week?: number;
  id?: string;
  is_default?: boolean;
  language_id?: string | null;
  number_format?: string | null;
  region_code?: string | null;
  status?: ContentStatus;
  time_format?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for localization
 */
export interface LocalizationValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    currency_code?: string;
    currency_symbol?: string;
    date_format?: string;
    first_day_of_week?: string;
    id?: string;
    is_default?: string;
    language_id?: string;
    number_format?: string;
    region_code?: string;
    status?: string;
    time_format?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

