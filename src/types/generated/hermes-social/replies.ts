// =====================================================
// FILE: types/generated/hermes-social/replies.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-05-01T03:24:41.939Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type RepliesRow = Tables<'replies'>;
export type RepliesInsert = TablesInsert<'replies'>;
export type RepliesUpdate = TablesUpdate<'replies'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of replies
 */
export interface PublicReplies {
  author_id: string;
  comment_id: string;
  content: string;
  created_at: string | null;
  created_by: string | null;
  is_edited: boolean | null;
  is_hidden: boolean | null;
  replies_id: string;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for replies
 * All fields are optional for partial updates
 */
export interface RepliesFormData {
  author_id?: string;
  comment_id?: string;
  content?: string;
  created_at?: string | null;
  created_by?: string | null;
  is_edited?: boolean | null;
  is_hidden?: boolean | null;
  replies_id?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for replies
 */
export interface RepliesValidationResult {
  valid: boolean;
  errors: {
    author_id?: string;
    comment_id?: string;
    content?: string;
    created_at?: string;
    created_by?: string;
    is_edited?: string;
    is_hidden?: string;
    replies_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

