// =====================================================
// FILE: types/generated/mnemosyne-assessment/thesaurus_entries.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:09:31.579Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type ThesaurusEntriesRow = Tables<'thesaurus_entries'>;
export type ThesaurusEntriesInsert = TablesInsert<'thesaurus_entries'>;
export type ThesaurusEntriesUpdate = TablesUpdate<'thesaurus_entries'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of thesaurus_entries
 */
export interface PublicThesaurusEntries {
  concept: string;
  created_at: string;
  created_by: string | null;
  description: string | null;
  entry_text: string;
  entry_type: string;
  id: string;
  keyword_id: string | null;
  language: string;
  ontology_id: string | null;
  review_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  status: ContentStatus;
  submitted_by: string | null;
  taxonomy_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for thesaurus_entries
 * All fields are optional for partial updates
 */
export interface ThesaurusEntriesFormData {
  concept?: string;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  entry_text?: string;
  entry_type?: string;
  id?: string;
  keyword_id?: string | null;
  language?: string;
  ontology_id?: string | null;
  review_notes?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  status?: ContentStatus;
  submitted_by?: string | null;
  taxonomy_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for thesaurus_entries
 */
export interface ThesaurusEntriesValidationResult {
  valid: boolean;
  errors: {
    concept?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    entry_text?: string;
    entry_type?: string;
    id?: string;
    keyword_id?: string;
    language?: string;
    ontology_id?: string;
    review_notes?: string;
    reviewed_at?: string;
    reviewed_by?: string;
    status?: string;
    submitted_by?: string;
    taxonomy_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

