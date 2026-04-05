// =====================================================
// FILE: types/hephaestus_infrastructure/calendar.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.641Z
// SOURCE: database.types.ts lines 687-748
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CalendarRow = Database['public']['Tables']['calendar']['Row'];
export type CalendarInsert = Database['public']['Tables']['calendar']['Insert'];
export type CalendarUpdate = Database['public']['Tables']['calendar']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for calendar
 * All fields are optional for partial updates
 */
export interface CalendarFormData {

}

/**
 * Validation result for calendar
 */
export interface CalendarValidationResult {
  valid: boolean;
  errors: {

  };
}

