// =====================================================
// FILE: validators/posts.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Posts SCHEMAS
// =====================================================

export const PostsRowSchema = z.object({
  allow_tipping: z.boolean().nullable(),
  author_id: z.string(),
  body: z.string().nullable(),
  channel_id: z.string().nullable(),
  comment_count: z.number().nullable(),
  content_type: z.any(),
  created_at: z.string().nullable(),
  emerald_count: z.number().nullable(),
  id: z.string(),
  media_urls: z.any().nullable(),
  published_at: z.string().nullable(),
  resonance_count: z.number().nullable(),
  sovereignty_tags: z.any().nullable(),
  tips_received: z.number().nullable(),
  title: z.string().nullable(),
  updated_at: z.string().nullable(),
  visibility: z.any(),
});

export const PostsInsertSchema = z.object({
  allow_tipping: z.boolean().nullable().optional(),
  author_id: z.string().optional(),
  body: z.string().nullable().optional(),
  channel_id: z.string().nullable().optional(),
  comment_count: z.number().nullable().optional(),
  content_type: z.any().optional(),
  created_at: z.string().nullable().optional(),
  emerald_count: z.number().nullable().optional(),
  id: z.string().optional(),
  media_urls: z.any().nullable().optional(),
  published_at: z.string().nullable().optional(),
  resonance_count: z.number().nullable().optional(),
  sovereignty_tags: z.any().nullable().optional(),
  tips_received: z.number().nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  visibility: z.any().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PostsRowInput = z.infer<typeof PostsRowSchema>;
export type PostsInsertInput = z.infer<typeof PostsInsertSchema>;
