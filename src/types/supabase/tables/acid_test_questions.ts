// src/types/supabase/tables/acid_test_questions.ts
import type { Database } from '../database.types';

export type AcidTestQuestion = Database['public']['Tables']['acid_test_questions']['Row'];
export type AcidTestQuestionInsert = Database['public']['Tables']['acid_test_questions']['Insert'];
export type AcidTestQuestionUpdate = Database['public']['Tables']['acid_test_questions']['Update'];

export interface AcidTestQuestionWithRelations extends AcidTestQuestion {
  answers?: Database['public']['Tables']['acid_test_answers']['Row'][];
}

export const acidTestQuestionDefaults = {
  is_active: true,
  question_type: 'multiple_choice',
  order_index: 0,
} as const;