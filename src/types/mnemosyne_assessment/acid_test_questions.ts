// =====================================================
// FILE: types/mnemosyne_assessment/acid_test_questions.ts
// HANDLING: assessment
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T19:46:32.891Z
// SOURCE: database.types.ts lines 86-135
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AcidQuestionType = Database['public']['Enums']['acid_question_type'];

export type AcidTestQuestionsRow = Database['public']['Tables']['acid_test_questions']['Row'];
export type AcidTestQuestionsInsert = Database['public']['Tables']['acid_test_questions']['Insert'];
export type AcidTestQuestionsUpdate = Database['public']['Tables']['acid_test_questions']['Update'];

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

