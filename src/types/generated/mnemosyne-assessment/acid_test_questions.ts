// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_questions.ts
// HANDLING: assessment
// GENERATED: 2026-04-15T19:30:35.409Z
// SOURCE: database.types.ts lines 96-145
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AcidQuestionType = Database['public']['Enums']['acid_question_type'];

// =====================================================
// CORE TYPES
// =====================================================

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

