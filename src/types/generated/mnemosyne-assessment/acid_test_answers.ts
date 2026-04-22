// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_answers.ts
// TYPE: table
// HANDLING: assessment
// GENERATED: 2026-04-22T18:24:18.526Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type AcidTestAnswersRow = Tables<'acid_test_answers'>;
export type AcidTestAnswersInsert = TablesInsert<'acid_test_answers'>;
export type AcidTestAnswersUpdate = TablesUpdate<'acid_test_answers'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for acid_test_answers
 * All fields are optional for partial updates
 */
export interface AcidTestAnswersFormData {
  ally_tier_price?: number | null;
  answer_text?: string;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  indicates_nd?: boolean | null;
  order_index?: number | null;
  persona_contribution?: Json | null;
  question_id?: string;
  score_value?: number | null;
}

