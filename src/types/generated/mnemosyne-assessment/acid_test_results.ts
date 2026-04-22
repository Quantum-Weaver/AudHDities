// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_results.ts
// TYPE: table
// HANDLING: assessment
// GENERATED: 2026-04-22T18:15:09.476Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AcidPersona = Database['public']['Enums']['acid_persona'];
export type UserTier = Database['public']['Enums']['user_tier'];
export type AcidTestResultsRow = Tables<'acid_test_results'>;
export type AcidTestResultsInsert = TablesInsert<'acid_test_results'>;
export type AcidTestResultsUpdate = TablesUpdate<'acid_test_results'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for acid_test_results
 * All fields are optional for partial updates
 */
export interface AcidTestResultsFormData {
  answers?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  persona_description?: string | null;
  persona_label?: AcidPersona | null;
  recommendations?: Json | null;
  scores_by_category?: Json | null;
  suggested_tier?: UserTier | null;
  total_score?: number | null;
  updated_at?: string | null;
  user_id?: string;
}

