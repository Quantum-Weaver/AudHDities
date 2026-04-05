// =====================================================
// FILE: types/hermes_social/activity.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T18:12:44.607Z
// SOURCE: database.types.ts lines 186-236
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ActivityRow = Database['public']['Tables']['activity']['Row'];
export type ActivityInsert = Database['public']['Tables']['activity']['Insert'];
export type ActivityUpdate = Database['public']['Tables']['activity']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for activity
 * All fields are optional for partial updates
 */
export interface ActivityFormData {

}

/**
 * Validation result for activity
 */
export interface ActivityValidationResult {
  valid: boolean;
  errors: {

  };
}

