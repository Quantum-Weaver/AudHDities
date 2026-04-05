// =====================================================
// FILE: types/hephaestus_infrastructure/analytics.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.623Z
// SOURCE: database.types.ts lines 417-463
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type AnalyticsRow = Database['public']['Tables']['analytics']['Row'];
export type AnalyticsInsert = Database['public']['Tables']['analytics']['Insert'];
export type AnalyticsUpdate = Database['public']['Tables']['analytics']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for analytics
 * All fields are optional for partial updates
 */
export interface AnalyticsFormData {

}

/**
 * Validation result for analytics
 */
export interface AnalyticsValidationResult {
  valid: boolean;
  errors: {

  };
}

