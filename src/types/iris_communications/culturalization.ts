// =====================================================
// FILE: types/iris_communications/culturalization.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T21:55:12.970Z
// SOURCE: database.types.ts lines 1553-1623
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CurrencyPositionType = Database['public']['Enums']['currency_position_type'];
export type DateFormatType = Database['public']['Enums']['date_format_type'];
export type MeasurementSystemType = Database['public']['Enums']['measurement_system_type'];
export type TimeFormatType = Database['public']['Enums']['time_format_type'];

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
  currency_code: string | null;
  currency_position: string | null;
  currency_symbol: string | null;
  date_format: DateFormatType | null;
  decimal_separator: string | null;
  first_day_of_week: number | null;
  id: string;
  measurement_system:string | null;
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

