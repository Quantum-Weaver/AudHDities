// =====================================================
// FILE: types/generated/hermes-social/posts.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.434Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentType = Database['public']['Enums']['content_type'];
export type PostVisibility = Database['public']['Enums']['post_visibility'];
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
  id: string;
  media_urls: string[] | null;
  published_at: string | null;
  resonance_count: number | null;
  sovereignty_tags: string[] | null;
  tips_received: number | null;
  title: string | null;
  updated_at: string | null;
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

