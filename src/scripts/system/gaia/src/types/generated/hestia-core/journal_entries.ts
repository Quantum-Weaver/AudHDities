// =====================================================
// FILE: types/generated/hestia-core/journal_entries.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T17:46:58.427Z
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
  body: string | null;
  created_at: string;
  created_by: string;
  entry_date: string;
  id: string;
  mood: string | null;
  status: ContentStatus;
  tags: string[] | null;
  title: string | null;
  updated_at: string;
  updated_by: string | null;
  visibility: string;
}

/**
 * Form data for journal_entries
 * All fields are optional for partial updates
 */
export interface JournalEntriesFormData {
  body?: string | null;
  created_at?: string;
  created_by?: string;
  entry_date?: string;
  id?: string;
  mood?: string | null;
  status?: ContentStatus;
  tags?: string[] | null;
  title?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  visibility?: string;
}

/**
 * Validation result for journal_entries
 */
export interface JournalEntriesValidationResult {
  valid: boolean;
  errors: {
    body?: string;
    created_at?: string;
    created_by?: string;
    entry_date?: string;
    id?: string;
    mood?: string;
    status?: string;
    tags?: string;
    title?: string;
    updated_at?: string;
    updated_by?: string;
    visibility?: string;
  };
}

