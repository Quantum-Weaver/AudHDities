// =====================================================
// FILE: types/mnemosyne_assessment/acid_test_questions.ts
// HANDLING: assessment
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T18:12:44.598Z
// SOURCE: database.types.ts lines 86-135
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type AcidTestQuestionsRow = Database['public']['Tables']['acid_test_questions']['Row'];
export type AcidTestQuestionsInsert = Database['public']['Tables']['acid_test_questions']['Insert'];
export type AcidTestQuestionsUpdate = Database['public']['Tables']['acid_test_questions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for acid_test_questions
 * All fields are optional for partial updates
 */
export interface AcidTestQuestionsFormData {

}

