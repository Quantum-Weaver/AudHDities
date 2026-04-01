// src/types/supabase/tables/posts.ts
import type { Database } from '../database.types';
import type { PostVisibility, ContentType as PostContentType } from '../enums';  // ← Add

export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

export type PostWithAuthor = Post & {
  author: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  channel: {
    id: string;
    handle: string;
    display_name: string | null;
  } | null;
};

export type PostWithEngagement = Post & {
  has_emerald_from_user?: boolean;
  user_comment_count?: number;
};

// Re-export for convenience
export type { PostVisibility, PostContentType };

export interface PostWithRelations extends Post {
  author?: Database['public']['Tables']['profiles']['Row'];
  channel?: Database['public']['Tables']['channels']['Row'];
  comments?: Database['public']['Tables']['comments']['Row'][];
  emeralds?: Database['public']['Tables']['emeralds']['Row'][];
}

export const postDefaults = {
  allow_tipping: true,
  comment_count: 0,
  emerald_count: 0,
  resonance_count: 0,
  tips_received: 0,
  visibility: 'public' as PostVisibility,
} as const;