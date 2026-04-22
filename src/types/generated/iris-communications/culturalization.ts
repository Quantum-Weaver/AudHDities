// =====================================================
// FILE: types/generated/iris-communications/culturalization.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.798Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
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

