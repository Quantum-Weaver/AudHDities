// src/types/supabase/tables/acid_test_answers.ts
import type { Database } from '../database.types';

export type AcidTestAnswer = Database['public']['Tables']['acid_test_answers']['Row'];
export type AcidTestAnswerInsert = Database['public']['Tables']['acid_test_answers']['Insert'];
export type AcidTestAnswerUpdate = Database['public']['Tables']['acid_test_answers']['Update'];

export interface AcidTestAnswerWithRelations extends AcidTestAnswer {
  question?: Database['public']['Tables']['acid_test_questions']['Row'];
}

export const acidTestAnswerDefaults = {
  ally_tier_price: null,
  indicates_nd: false,
  score_value: 0,
} as const;