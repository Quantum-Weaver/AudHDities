// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_answers.ts
// HANDLING: assessment
// GENERATED: 2026-04-13T15:29:50.884Z
// SOURCE: database.types.ts lines 42-95
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

import type { Json } from 'src/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type AcidTestAnswersRow = Database['public']['Tables']['acid_test_answers']['Row'];
export type AcidTestAnswersInsert = Database['public']['Tables']['acid_test_answers']['Insert'];
export type AcidTestAnswersUpdate = Database['public']['Tables']['acid_test_answers']['Update'];

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

