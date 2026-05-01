// =====================================================
// FILE: types/generated/hermes-social/posts.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-05-01T03:24:41.715Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentType = Enums<'content_type'>;
export type PostVisibility = Enums<'post_visibility'>;

export type PostsRow = Tables<'posts'>;
export type PostsInsert = TablesInsert<'posts'>;
export type PostsUpdate = TablesUpdate<'posts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of posts
 */
export interface PublicPosts {
  allow_tipping: boolean | null;
  author_id: string;
  body: string | null;
  channel_id: string | null;
  comment_count: number | null;
  content_type: ContentType;
  created_at: string | null;
  created_by: string | null;
  emerald_count: number | null;
  media_urls: string[] | null;
  posts_id: string;
  published_at: string | null;
  resonance_count: number | null;
  sovereignty_tags: string[] | null;
  tips_received: number | null;
  title: string | null;
  updated_at: string | null;
  updated_by: string | null;
  visibility: PostVisibility;
}

/**
 * Form data for posts
 * All fields are optional for partial updates
 */
export interface PostsFormData {
  allow_tipping?: boolean | null;
  author_id?: string;
  body?: string | null;
  channel_id?: string | null;
  comment_count?: number | null;
  content_type?: ContentType;
  created_at?: string | null;
  created_by?: string | null;
  emerald_count?: number | null;
  media_urls?: string[] | null;
  posts_id?: string;
  published_at?: string | null;
  resonance_count?: number | null;
  sovereignty_tags?: string[] | null;
  tips_received?: number | null;
  title?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  visibility?: PostVisibility;
}

/**
 * Validation result for posts
 */
export interface PostsValidationResult {
  valid: boolean;
  errors: {
    allow_tipping?: string;
    author_id?: string;
    body?: string;
    channel_id?: string;
    comment_count?: string;
    content_type?: string;
    created_at?: string;
    created_by?: string;
    emerald_count?: string;
    media_urls?: string;
    posts_id?: string;
    published_at?: string;
    resonance_count?: string;
    sovereignty_tags?: string;
    tips_received?: string;
    title?: string;
    updated_at?: string;
    updated_by?: string;
    visibility?: string;
  };
}

