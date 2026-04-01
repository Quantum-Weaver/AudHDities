// src/types/supabase/tables/comments.ts
import type { Database } from '../database.types';

export type Comment = Database['public']['Tables']['comments']['Row'];
export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentUpdate = Database['public']['Tables']['comments']['Update'];

export interface CommentWithRelations extends Comment {
  author?: Database['public']['Tables']['profiles']['Row'];
  post?: Database['public']['Tables']['posts']['Row'];
  parent?: Database['public']['Tables']['comments']['Row'];
  replies?: Database['public']['Tables']['comments']['Row'][];
}

export const commentDefaults = {
  is_edited: false,
  is_hidden: false,
} as const;