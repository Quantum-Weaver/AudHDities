// =====================================================
// FILE: types/generated/mnemosyne-assessment/etymology.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.733Z
// SOURCE: database.types.ts lines 2215-2293
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type EtymologyRow = Database['public']['Tables']['etymology']['Row'];
export type EtymologyInsert = Database['public']['Tables']['etymology']['Insert'];
export type EtymologyUpdate = Database['public']['Tables']['etymology']['Update'];

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
  id: string;
  is_approved: boolean | null;
  language: string;
  original_meaning: string;
  related_words: string[] | null;
  root: string | null;
  semantic_shift: string | null;
  updated_at: string | null;
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
  id?: string;
  is_approved?: boolean | null;
  language?: string;
  original_meaning?: string;
  related_words?: string[] | null;
  root?: string | null;
  semantic_shift?: string | null;
  updated_at?: string | null;
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
    id?: string;
    is_approved?: string;
    language?: string;
    original_meaning?: string;
    related_words?: string;
    root?: string;
    semantic_shift?: string;
    updated_at?: string;
    word?: string;
  };
}

