// =====================================================
// FILE: types/generated/mnemosyne-assessment/etymology.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-20T04:39:10.500Z
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
  atom_id: string | null;
  atom_word: string | null;
  combining_form: string | null;
  completion_progress: number | null;
  created_at: string;
  created_by: string | null;
  etymon: string | null;
  evolution_notes: string | null;
  historical_meaning: string | null;
  id: string;
  keyword_id: string;
  morpheme_breakdown: string | null;
  prefix: string | null;
  root_language: string | null;
  root_word: string | null;
  sanctuary_meaning: string | null;
  suffix: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for etymology
 * All fields are optional for partial updates
 */
export interface EtymologyFormData {
  atom_id?: string | null;
  atom_word?: string | null;
  combining_form?: string | null;
  completion_progress?: number | null;
  created_at?: string;
  created_by?: string | null;
  etymon?: string | null;
  evolution_notes?: string | null;
  historical_meaning?: string | null;
  id?: string;
  keyword_id?: string;
  morpheme_breakdown?: string | null;
  prefix?: string | null;
  root_language?: string | null;
  root_word?: string | null;
  sanctuary_meaning?: string | null;
  suffix?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for etymology
 */
export interface EtymologyValidationResult {
  valid: boolean;
  errors: {
    atom_id?: string;
    atom_word?: string;
    combining_form?: string;
    completion_progress?: string;
    created_at?: string;
    created_by?: string;
    etymon?: string;
    evolution_notes?: string;
    historical_meaning?: string;
    id?: string;
    keyword_id?: string;
    morpheme_breakdown?: string;
    prefix?: string;
    root_language?: string;
    root_word?: string;
    sanctuary_meaning?: string;
    suffix?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

