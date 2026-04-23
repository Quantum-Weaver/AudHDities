// =====================================================
// FILE: types/generated/hermes-social/replies.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-04-23T02:14:53.378Z
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
  id: string;
  is_edited: boolean | null;
  is_hidden: boolean | null;
  updated_at: string | null;
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
  id?: string;
  is_edited?: boolean | null;
  is_hidden?: boolean | null;
  updated_at?: string | null;
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
    id?: string;
    is_edited?: string;
    is_hidden?: string;
    updated_at?: string;
  };
}

