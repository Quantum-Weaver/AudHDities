// =====================================================
// FILE: types/generated/hermes-social/comments.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.681Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

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
  content: string;
  created_at: string | null;
  created_by: string | null;
  id: string;
  is_edited: boolean | null;
  is_hidden: boolean | null;
  post_id: string;
  reply_count: number | null;
  updated_at: string | null;
}

/**
 * Form data for comments
 * All fields are optional for partial updates
 */
export interface CommentsFormData {
  author_id?: string;
  content?: string;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  is_edited?: boolean | null;
  is_hidden?: boolean | null;
  post_id?: string;
  reply_count?: number | null;
  updated_at?: string | null;
}

