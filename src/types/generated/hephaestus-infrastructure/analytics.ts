// =====================================================
// FILE: types/generated/hephaestus-infrastructure/analytics.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T16:03:06.217Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type AnalyticsRow = Tables<'analytics'>;
export type AnalyticsInsert = TablesInsert<'analytics'>;
export type AnalyticsUpdate = TablesUpdate<'analytics'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of analytics
 */
export interface PublicAnalytics {
  created_at: string;
  dimension: string | null;
  dimension_value: string | null;
  id: string;
  metric_name: string;
  metric_unit: string | null;
  metric_value: number;
  notes: string | null;
  period: string;
  period_end: string | null;
  period_start: string | null;
  source_table: string | null;
}

/**
 * Form data for analytics
 * All fields are optional for partial updates
 */
export interface AnalyticsFormData {
  created_at?: string;
  dimension?: string | null;
  dimension_value?: string | null;
  id?: string;
  metric_name?: string;
  metric_unit?: string | null;
  metric_value?: number;
  notes?: string | null;
  period?: string;
  period_end?: string | null;
  period_start?: string | null;
  source_table?: string | null;
}

/**
 * Validation result for analytics
 */
export interface AnalyticsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    dimension?: string;
    dimension_value?: string;
    id?: string;
    metric_name?: string;
    metric_unit?: string;
    metric_value?: string;
    notes?: string;
    period?: string;
    period_end?: string;
    period_start?: string;
    source_table?: string;
  };
}

