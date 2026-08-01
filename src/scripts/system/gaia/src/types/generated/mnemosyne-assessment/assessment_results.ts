// =====================================================
// FILE: types/generated/mnemosyne-assessment/assessment_results.ts
// HANDLING: assessment
// DEITY: mnemosyne-assessment
// GENERATED: 2026-08-01T17:46:58.382Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type AssessmentResultsRow = Tables<'assessment_results'>;
export type AssessmentResultsInsert = TablesInsert<'assessment_results'>;
export type AssessmentResultsUpdate = TablesUpdate<'assessment_results'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for assessment_results
 * All fields are optional for partial updates
 */
export interface AssessmentResultsFormData {
  category?: string;
  completed_at?: string;
  created_at?: string;
  created_by?: string;
  id?: string;
  recommendations?: Json | null;
  result_data?: Json | null;
  status?: string;
  summary_text?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

