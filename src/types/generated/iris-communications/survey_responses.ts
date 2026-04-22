// =====================================================
// FILE: types/generated/iris-communications/survey_responses.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.373Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SurveyResponsesRow = Tables<'survey_responses'>;
export type SurveyResponsesInsert = TablesInsert<'survey_responses'>;
export type SurveyResponsesUpdate = TablesUpdate<'survey_responses'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSurveyResponses = Omit<SurveyResponsesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SurveyResponsesFormData = Partial<SurveyResponsesInsert>;

