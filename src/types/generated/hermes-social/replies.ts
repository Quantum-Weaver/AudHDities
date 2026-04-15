// =====================================================
// FILE: types/generated/hermes-social/replies.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:30:35.456Z
// SOURCE: database.types.ts lines 4770-4827
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type RepliesRow = Database['public']['Tables']['replies']['Row'];
export type RepliesInsert = Database['public']['Tables']['replies']['Insert'];
export type RepliesUpdate = Database['public']['Tables']['replies']['Update'];

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

