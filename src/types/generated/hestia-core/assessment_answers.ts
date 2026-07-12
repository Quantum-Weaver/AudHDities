// =====================================================
// FILE: types/generated/hestia-core/assessment_answers.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.239Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type AssessmentAnswersRow = Tables<'assessment_answers'>;
export type AssessmentAnswersInsert = TablesInsert<'assessment_answers'>;
export type AssessmentAnswersUpdate = TablesUpdate<'assessment_answers'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of assessment_answers
 */
export interface PublicAssessmentAnswers {
  answer_value: Json | null;
  answered_at: string;
  created_at: string;
  created_by: string;
  id: string;
  notes: string | null;
  question_id: string;
  status: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for assessment_answers
 * All fields are optional for partial updates
 */
export interface AssessmentAnswersFormData {
  answer_value?: Json | null;
  answered_at?: string;
  created_at?: string;
  created_by?: string;
  id?: string;
  notes?: string | null;
  question_id?: string;
  status?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for assessment_answers
 */
export interface AssessmentAnswersValidationResult {
  valid: boolean;
  errors: {
    answer_value?: string;
    answered_at?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    notes?: string;
    question_id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

