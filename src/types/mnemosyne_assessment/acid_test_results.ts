// =====================================================
// FILE: types/mnemosyne_assessment/acid_test_results.ts
// HANDLING: assessment
// DEITY: mnemosyne_assessment
// GENERATED: 2026-04-05T18:12:44.603Z
// SOURCE: database.types.ts lines 136-185
// =====================================================

import type { Database } from '@/types/supabase/database.types';

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

}

