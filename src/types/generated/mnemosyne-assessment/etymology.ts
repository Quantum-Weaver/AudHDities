// =====================================================
// FILE: types/generated/mnemosyne-assessment/etymology.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.121Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

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

