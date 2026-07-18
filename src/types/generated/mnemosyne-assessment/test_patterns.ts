// =====================================================
// FILE: types/generated/mnemosyne-assessment/test_patterns.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:09:31.574Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type TestPatternsRow = Tables<'test_patterns'>;
export type TestPatternsInsert = TablesInsert<'test_patterns'>;
export type TestPatternsUpdate = TablesUpdate<'test_patterns'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of test_patterns
 */
export interface PublicTestPatterns {
  created_at: string;
  created_by: string | null;
  description: string | null;
  expected_result: string;
  icon_emoji: string | null;
  id: string;
  name: string;
  priority: string;
  template_category: string;
  test_query_template: string;
  test_type: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for test_patterns
 * All fields are optional for partial updates
 */
export interface TestPatternsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  expected_result?: string;
  icon_emoji?: string | null;
  id?: string;
  name?: string;
  priority?: string;
  template_category?: string;
  test_query_template?: string;
  test_type?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for test_patterns
 */
export interface TestPatternsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    expected_result?: string;
    icon_emoji?: string;
    id?: string;
    name?: string;
    priority?: string;
    template_category?: string;
    test_query_template?: string;
    test_type?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

