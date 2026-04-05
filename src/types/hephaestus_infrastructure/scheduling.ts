// =====================================================
// FILE: types/hephaestus_infrastructure/scheduling.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.829Z
// SOURCE: database.types.ts lines 4327-4394
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SchedulingRow = Database['public']['Tables']['scheduling']['Row'];
export type SchedulingInsert = Database['public']['Tables']['scheduling']['Insert'];
export type SchedulingUpdate = Database['public']['Tables']['scheduling']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for scheduling
 * All fields are optional for partial updates
 */
export interface SchedulingFormData {

}

/**
 * Validation result for scheduling
 */
export interface SchedulingValidationResult {
  valid: boolean;
  errors: {

  };
}

