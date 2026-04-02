// src/types/supabase/tables/feed.ts
import type { Database } from '../database.types';

export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

export type Channel = Database['public']['Tables']['channels']['Row'];
export type ChannelInsert = Database['public']['Tables']['channels']['Insert'];
export type ChannelUpdate = Database['public']['Tables']['channels']['Update'];

export type Comment = Database['public']['Tables']['comments']['Row'];
export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentUpdate = Database['public']['Tables']['comments']['Update'];

export type Emerald = Database['public']['Tables']['emeralds']['Row'];
export type EmeraldInsert = Database['public']['Tables']['emeralds']['Insert'];
export type EmeraldUpdate = Database['public']['Tables']['emeralds']['Update'];

export type PersonalizedFeedItem = Database['public']['Views']['personalized_feed']['Row'];

export interface PostWithDetails extends Post {
  author?: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  };
  channel?: {
    handle: string;
    display_name: string | null;
  };
  comments?: Comment[];
}