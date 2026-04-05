// =====================================================
// FILE: types/iris_communications/survey_responses.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T18:12:44.860Z
// SOURCE: database.types.ts lines 4855-4902
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SurveyResponsesRow = Database['public']['Tables']['survey_responses']['Row'];
export type SurveyResponsesInsert = Database['public']['Tables']['survey_responses']['Insert'];
export type SurveyResponsesUpdate = Database['public']['Tables']['survey_responses']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for survey_responses
 * All fields are optional for partial updates
 */
export interface SurveyResponsesFormData {

}

/**
 * Validation result for survey_responses
 */
export interface SurveyResponsesValidationResult {
  valid: boolean;
  errors: {

  };
}

