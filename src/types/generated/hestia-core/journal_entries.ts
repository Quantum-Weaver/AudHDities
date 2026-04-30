// =====================================================
// FILE: types/generated/hestia-core/journal_entries.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T04:17:47.451Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type JournalEntriesRow = Tables<'journal_entries'>;
export type JournalEntriesInsert = TablesInsert<'journal_entries'>;
export type JournalEntriesUpdate = TablesUpdate<'journal_entries'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of journal_entries
 */
export interface PublicJournalEntries {
  content: string;
  created_at: string | null;
  created_by: string | null;
  journal_entries_id: string;
  mood: string | null;
  slug: string;
  tags: string[] | null;
  title: string;
  updated_at: string | null;
  updated_by: string | null;
  user_id: string;
}

/**
 * Form data for journal_entries
 * All fields are optional for partial updates
 */
export interface JournalEntriesFormData {
  content?: string;
  created_at?: string | null;
  created_by?: string | null;
  journal_entries_id?: string;
  mood?: string | null;
  slug?: string;
  tags?: string[] | null;
  title?: string;
  updated_at?: string | null;
  updated_by?: string | null;
  user_id?: string;
}

/**
 * Validation result for journal_entries
 */
export interface JournalEntriesValidationResult {
  valid: boolean;
  errors: {
    content?: string;
    created_at?: string;
    created_by?: string;
    journal_entries_id?: string;
    mood?: string;
    slug?: string;
    tags?: string;
    title?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
  };
}

