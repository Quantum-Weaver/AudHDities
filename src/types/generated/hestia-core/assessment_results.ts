// =====================================================
// FILE: types/generated/hestia-core/assessment_results.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.249Z
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
 * Public view of assessment_results
 */
export interface PublicAssessmentResults {
  category: string;
  completed_at: string;
  created_at: string;
  created_by: string;
  id: string;
  recommendations: Json | null;
  result_data: Json | null;
  status: string;
  summary_text: string | null;
  updated_at: string;
  updated_by: string | null;
}

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

/**
 * Validation result for assessment_results
 */
export interface AssessmentResultsValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    completed_at?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    recommendations?: string;
    result_data?: string;
    status?: string;
    summary_text?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

