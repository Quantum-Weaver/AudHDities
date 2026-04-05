// =====================================================
// FILE: types/hermes_social/posts.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T19:46:33.056Z
// SOURCE: database.types.ts lines 3145-3219
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentType = Database['public']['Enums']['content_type'];
export type PostVisibility = Database['public']['Enums']['post_visibility'];

export type PostsRow = Database['public']['Tables']['posts']['Row'];
export type PostsInsert = Database['public']['Tables']['posts']['Insert'];
export type PostsUpdate = Database['public']['Tables']['posts']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of posts
 */
export interface PublicPosts {
  allow_tipping: boolean | null
  author_id: string
  body: string | null
  channel_id: string | null
  comment_count: number | null
  content_type: ContentType
  created_at: string | null
  emerald_count: number | null
  id: string
  media_urls: string[] | null
  published_at: string | null
  resonance_count: number | null
  sovereignty_tags: string[] | null
  tips_received: number | null
  title: string | null
  updated_at: string | null
  visibility: PostVisibility
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
  emerald_count?: number | null;
  id?: string;
  media_urls?: string[] | null;
  published_at?: string | null;
  resonance_count?: number | null;
  sovereignty_tags?: string[] | null;
  tips_received?: number | null;
  title?: string | null;
  updated_at?: string | null;
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
    emerald_count?: string;
    id?: string;
    media_urls?: string;
    published_at?: string;
    resonance_count?: string;
    sovereignty_tags?: string;
    tips_received?: string;
    title?: string;
    updated_at?: string;
    visibility?: string;
  };
}

