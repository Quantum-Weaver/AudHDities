// =====================================================
// FILE: types/generated/iris-communications/survey_responses.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-08-01T21:41:40.317Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type SurveyResponsesRow = Tables<'survey_responses'>;
export type SurveyResponsesInsert = TablesInsert<'survey_responses'>;
export type SurveyResponsesUpdate = TablesUpdate<'survey_responses'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of survey_responses
 */
export interface PublicSurveyResponses {
  answers: Json | null;
  created_at: string;
  created_by: string;
  id: string;
  is_anonymous: boolean;
  notes: string | null;
  status: string;
  submitted_at: string | null;
  survey_id: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for survey_responses
 * All fields are optional for partial updates
 */
export interface SurveyResponsesFormData {
  answers?: Json | null;
  created_at?: string;
  created_by?: string;
  id?: string;
  is_anonymous?: boolean;
  notes?: string | null;
  status?: string;
  submitted_at?: string | null;
  survey_id?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for survey_responses
 */
export interface SurveyResponsesValidationResult {
  valid: boolean;
  errors: {
    answers?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    is_anonymous?: string;
    notes?: string;
    status?: string;
    submitted_at?: string;
    survey_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

