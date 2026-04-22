// =====================================================
// FILE: types/generated/hermes-social/replies.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.540Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

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

