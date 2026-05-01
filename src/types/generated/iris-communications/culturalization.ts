// =====================================================
// FILE: types/generated/iris-communications/culturalization.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-05-01T15:31:59.543Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CurrencyPositionType = Enums<'currency_position_type'>;
export type DateFormatType = Enums<'date_format_type'>;
export type MeasurementSystemType = Enums<'measurement_system_type'>;
export type TimeFormatType = Enums<'time_format_type'>;

export type CulturalizationRow = Tables<'culturalization'>;
export type CulturalizationInsert = TablesInsert<'culturalization'>;
export type CulturalizationUpdate = TablesUpdate<'culturalization'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of culturalization
 */
export interface PublicCulturalization {
  created_at: string | null;
  created_by: string | null;
  culturalization_id: string;
  currency_code: string | null;
  currency_position:;
  currency_symbol: string | null;
  date_format: DateFormatType | null;
  decimal_separator: string | null;
  first_day_of_week: number | null;
  measurement_system:;
  region_id: string;
  thousands_separator: string | null;
  time_format: TimeFormatType | null;
  timezone: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for culturalization
 * All fields are optional for partial updates
 */
export interface CulturalizationFormData {
  created_at?: string | null;
  created_by?: string | null;
  culturalization_id?: string;
  currency_code?: string | null;
  currency_symbol?: string | null;
  date_format?: DateFormatType | null;
  decimal_separator?: string | null;
  first_day_of_week?: number | null;
  region_id?: string;
  thousands_separator?: string | null;
  time_format?: TimeFormatType | null;
  timezone?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for culturalization
 */
export interface CulturalizationValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    culturalization_id?: string;
    currency_code?: string;
    currency_position?: string;
    currency_symbol?: string;
    date_format?: string;
    decimal_separator?: string;
    first_day_of_week?: string;
    measurement_system?: string;
    region_id?: string;
    thousands_separator?: string;
    time_format?: string;
    timezone?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

