// =====================================================
// FILE: types/generated/mnemosyne-assessment/etymology.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-05-01T03:24:41.421Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type EtymologyRow = Tables<'etymology'>;
export type EtymologyInsert = TablesInsert<'etymology'>;
export type EtymologyUpdate = TablesUpdate<'etymology'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of etymology
 */
export interface PublicEtymology {
  approved_at: string | null;
  approved_by: string | null;
  contributor_id: string | null;
  created_at: string | null;
  created_by: string | null;
  cultural_context: string | null;
  current_meaning: string;
  etymology_id: string;
  is_approved: boolean | null;
  language: string;
  original_meaning: string;
  related_words: string[] | null;
  root: string | null;
  semantic_shift: string | null;
  updated_at: string | null;
  updated_by: string | null;
  word: string;
}

/**
 * Form data for etymology
 * All fields are optional for partial updates
 */
export interface EtymologyFormData {
  approved_at?: string | null;
  approved_by?: string | null;
  contributor_id?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  cultural_context?: string | null;
  current_meaning?: string;
  etymology_id?: string;
  is_approved?: boolean | null;
  language?: string;
  original_meaning?: string;
  related_words?: string[] | null;
  root?: string | null;
  semantic_shift?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  word?: string;
}

/**
 * Validation result for etymology
 */
export interface EtymologyValidationResult {
  valid: boolean;
  errors: {
    approved_at?: string;
    approved_by?: string;
    contributor_id?: string;
    created_at?: string;
    created_by?: string;
    cultural_context?: string;
    current_meaning?: string;
    etymology_id?: string;
    is_approved?: string;
    language?: string;
    original_meaning?: string;
    related_words?: string;
    root?: string;
    semantic_shift?: string;
    updated_at?: string;
    updated_by?: string;
    word?: string;
  };
}

