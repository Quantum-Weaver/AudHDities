// =====================================================
// FILE: types/generated/iris-communications/survey_responses.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.796Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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

