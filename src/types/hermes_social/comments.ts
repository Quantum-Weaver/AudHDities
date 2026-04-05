// =====================================================
// FILE: types/hermes_social/comments.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T19:46:32.943Z
// SOURCE: database.types.ts lines 902-959
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CommentsRow = Database['public']['Tables']['comments']['Row'];
export type CommentsInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentsUpdate = Database['public']['Tables']['comments']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of comments
 */
export interface PublicComments {
  author_id: string
  content: string
  created_at: string | null
  id: string
  is_edited: boolean | null
  is_hidden: boolean | null
  post_id: string
  reply_count: number | null
  updated_at: string | null
}

/**
 * Form data for comments
 * All fields are optional for partial updates
 */
export interface CommentsFormData {
  author_id?: string;
  content?: string;
  created_at?: string | null;
  id?: string;
  is_edited?: boolean | null;
  is_hidden?: boolean | null;
  post_id?: string;
  reply_count?: number | null;
  updated_at?: string | null;
}

/**
 * Validation result for comments
 */
export interface CommentsValidationResult {
  valid: boolean;
  errors: {
    author_id?: string;
    content?: string;
    created_at?: string;
    id?: string;
    is_edited?: string;
    is_hidden?: string;
    post_id?: string;
    reply_count?: string;
    updated_at?: string;
  };
}

