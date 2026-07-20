// =====================================================
// FILE: types/generated/mnemosyne-assessment/assessment_questions.ts
// HANDLING: assessment
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-20T04:39:10.357Z
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

export type ContentStatus = Enums<'content_status'>;

export type AssessmentQuestionsRow = Tables<'assessment_questions'>;
export type AssessmentQuestionsInsert = TablesInsert<'assessment_questions'>;
export type AssessmentQuestionsUpdate = TablesUpdate<'assessment_questions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for assessment_questions
 * All fields are optional for partial updates
 */
export interface AssessmentQuestionsFormData {
  category?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  id?: string;
  is_required?: boolean;
  labels_high?: string | null;
  labels_low?: string | null;
  options?: Json | null;
  question_text?: string;
  question_type?: string | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

