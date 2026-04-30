// =====================================================
// FILE: types/generated/hermes-social/comments.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-04-30T04:17:47.108Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type CommentsRow = Tables<'comments'>;
export type CommentsInsert = TablesInsert<'comments'>;
export type CommentsUpdate = TablesUpdate<'comments'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of comments
 */
export interface PublicComments {
  author_id: string;
  comments_id: string;
  content: string;
  created_at: string | null;
  created_by: string | null;
  is_edited: boolean | null;
  is_hidden: boolean | null;
  post_id: string;
  reply_count: number | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for comments
 * All fields are optional for partial updates
 */
export interface CommentsFormData {
  author_id?: string;
  comments_id?: string;
  content?: string;
  created_at?: string | null;
  created_by?: string | null;
  is_edited?: boolean | null;
  is_hidden?: boolean | null;
  post_id?: string;
  reply_count?: number | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for comments
 */
export interface CommentsValidationResult {
  valid: boolean;
  errors: {
    author_id?: string;
    comments_id?: string;
    content?: string;
    created_at?: string;
    created_by?: string;
    is_edited?: string;
    is_hidden?: string;
    post_id?: string;
    reply_count?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

