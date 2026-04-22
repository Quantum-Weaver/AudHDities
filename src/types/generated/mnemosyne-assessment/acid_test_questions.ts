// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_questions.ts
// TYPE: table
// HANDLING: assessment
// GENERATED: 2026-04-22T18:15:09.467Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AcidQuestionType = Database['public']['Enums']['acid_question_type'];
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
  category?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  explanation?: string | null;
  id?: string;
  is_active?: boolean | null;
  order_index?: number | null;
  question_text?: string;
  question_type?: AcidQuestionType;
  updated_at?: string | null;
  weight?: number | null;
}

