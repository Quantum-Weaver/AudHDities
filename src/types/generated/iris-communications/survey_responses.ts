// =====================================================
// FILE: types/generated/iris-communications/survey_responses.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T22:45:09.575Z
// SOURCE: database.types.ts lines 6151-6208
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

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

