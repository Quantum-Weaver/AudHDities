// =====================================================
// FILE: types/generated/iris-communications/culturalization.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.891Z
// SOURCE: database.types.ts lines 1805-1885
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CurrencyPositionType = Database['public']['Enums']['currency_position_type'];
export type DateFormatType = Database['public']['Enums']['date_format_type'];
export type MeasurementSystemType = Database['public']['Enums']['measurement_system_type'];
export type TimeFormatType = Database['public']['Enums']['time_format_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type CulturalizationRow = Database['public']['Tables']['culturalization']['Row'];
export type CulturalizationInsert = Database['public']['Tables']['culturalization']['Insert'];
export type CulturalizationUpdate = Database['public']['Tables']['culturalization']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of culturalization
 */
export interface PublicCulturalization {
  created_at: string | null;
  created_by: string | null;
  currency_code: string | null;
  currency_position:;
  currency_symbol: string | null;
  date_format: DateFormatType | null;
  decimal_separator: string | null;
  first_day_of_week: number | null;
  id: string;
  measurement_system:;
  region_id: string;
  thousands_separator: string | null;
  time_format: TimeFormatType | null;
  timezone: string | null;
  updated_at: string | null;
}

/**
 * Form data for culturalization
 * All fields are optional for partial updates
 */
export interface CulturalizationFormData {
  created_at?: string | null;
  created_by?: string | null;
  currency_code?: string | null;
  currency_symbol?: string | null;
  date_format?: DateFormatType | null;
  decimal_separator?: string | null;
  first_day_of_week?: number | null;
  id?: string;
  region_id?: string;
  thousands_separator?: string | null;
  time_format?: TimeFormatType | null;
  timezone?: string | null;
  updated_at?: string | null;
}

/**
 * Validation result for culturalization
 */
export interface CulturalizationValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    currency_code?: string;
    currency_position?: string;
    currency_symbol?: string;
    date_format?: string;
    decimal_separator?: string;
    first_day_of_week?: string;
    id?: string;
    measurement_system?: string;
    region_id?: string;
    thousands_separator?: string;
    time_format?: string;
    timezone?: string;
    updated_at?: string;
  };
}

