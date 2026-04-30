// =====================================================
// FILE: types/generated/iris-communications/survey_responses.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-30T00:26:46.714Z
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
 * Excludes sensitive fields: ip_address, user_agent
 */
export interface PublicSurveyResponses {
  answers: Json;
  created_at: string | null;
  created_by: string | null;
  duration_seconds: number | null;
  id: string;
  survey_id: string;
  user_id: string;
}

/**
 * Form data for survey_responses
 * All fields are optional for partial updates
 */
export interface SurveyResponsesFormData {
  answers?: Json;
  created_at?: string | null;
  created_by?: string | null;
  duration_seconds?: number | null;
  id?: string;
  ip_address?: unknown;
  survey_id?: string;
  user_agent?: string | null;
  user_id?: string;
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
    duration_seconds?: string;
    id?: string;
    ip_address?: string;
    survey_id?: string;
    user_agent?: string;
    user_id?: string;
  };
}

