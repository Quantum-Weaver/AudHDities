// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_results.ts
// HANDLING: assessment
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T00:26:45.471Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AcidPersona = Enums<'acid_persona'>;
export type UserTier = Enums<'user_tier'>;

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

