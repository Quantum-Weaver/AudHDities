// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_answers.ts
// HANDLING: assessment
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T00:26:45.428Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

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

