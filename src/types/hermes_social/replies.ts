// =====================================================
// FILE: types/hermes_social/replies.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T21:55:13.054Z
// SOURCE: database.types.ts lines 3848-3895
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
    id?: string;
    is_edited?: string;
    is_hidden?: string;
    updated_at?: string;
  };
}

