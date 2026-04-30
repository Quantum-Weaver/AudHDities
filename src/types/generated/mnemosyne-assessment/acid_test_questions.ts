// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_questions.ts
// HANDLING: assessment
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T15:32:13.251Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AcidQuestionType = Enums<'acid_question_type'>;

export type AcidTestQuestionsRow = Tables<'acid_test_questions'>;
export type AcidTestQuestionsInsert = TablesInsert<'acid_test_questions'>;
export type AcidTestQuestionsUpdate = TablesUpdate<'acid_test_questions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for acid_test_questions
 * All fields are optional for partial updates
 */
export interface AcidTestQuestionsFormData {
  acid_test_questions_id?: string;
  category?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  explanation?: string | null;
  is_active?: boolean | null;
  order_index?: number | null;
  question_text?: string;
  question_type?: AcidQuestionType;
  updated_at?: string | null;
  weight?: number | null;
}

