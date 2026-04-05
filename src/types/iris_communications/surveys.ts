// =====================================================
// FILE: types/iris_communications/surveys.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.864Z
// SOURCE: database.types.ts lines 4903-4964
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SurveysRow = Database['public']['Tables']['surveys']['Row'];
export type SurveysInsert = Database['public']['Tables']['surveys']['Insert'];
export type SurveysUpdate = Database['public']['Tables']['surveys']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for surveys
 * All fields are optional for partial updates
 */
export interface SurveysFormData {

}

/**
 * Validation result for surveys
 */
export interface SurveysValidationResult {
  valid: boolean;
  errors: {

  };
}

