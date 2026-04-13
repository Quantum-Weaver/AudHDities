// =====================================================
// FILE: types/generated/mnemosyne-assessment/acid_test_results.ts
// HANDLING: assessment
// GENERATED: 2026-04-13T21:47:20.944Z
// SOURCE: database.types.ts lines 146-205
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

import type { Json } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type AcidPersona = Database['public']['Enums']['acid_persona'];
export type UserTier = Database['public']['Enums']['user_tier'];

// =====================================================
// CORE TYPES
// =====================================================

export type AcidTestResultsRow = Database['public']['Tables']['acid_test_results']['Row'];
export type AcidTestResultsInsert = Database['public']['Tables']['acid_test_results']['Insert'];
export type AcidTestResultsUpdate = Database['public']['Tables']['acid_test_results']['Update'];

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

