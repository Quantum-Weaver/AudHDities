// =====================================================
// FILE: validators/generated/hermes-social/posts.ts
// GENERATED: 2026-04-16T23:20:33.897Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { CONTENT_TYPE } from '@/lib/constants/generated/hermes-social/content_type';
import { POST_VISIBILITY } from '@/lib/constants/generated/hermes-social/post_visibility';

// =====================================================
// Posts SCHEMAS
// =====================================================

export const PostsRowSchema = z.object({
  allow_tipping: z.boolean().nullable(),
  author_id: z.string(),
  body: z.string().nullable(),
  channel_id: z.string().nullable(),
  comment_count: z.number().nullable(),
  content_type: z.enum(Object.values(CONTENT_TYPE)),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  emerald_count: z.number().nullable(),
  id: z.string(),
  media_urls: z.any().nullable(),
  published_at: z.string().nullable(),
  resonance_count: z.number().nullable(),
  sovereignty_tags: z.any().nullable(),
  tips_received: z.number().nullable(),
  title: z.string().nullable(),
  updated_at: z.string().nullable(),
  visibility: z.enum(Object.values(POST_VISIBILITY)),
});

export const PostsInsertSchema = z.object({
  allow_tipping: z.boolean().nullable().optional(),
  author_id: z.string(),
  body: z.string().nullable().optional(),
  channel_id: z.string().nullable().optional(),
  comment_count: z.number().nullable().optional(),
  content_type: z.enum(Object.values(CONTENT_TYPE)).optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  emerald_count: z.number().nullable().optional(),
  id: z.string().optional(),
  media_urls: z.any().nullable().optional(),
  published_at: z.string().nullable().optional(),
  resonance_count: z.number().nullable().optional(),
  sovereignty_tags: z.any().nullable().optional(),
  tips_received: z.number().nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  visibility: z.enum(Object.values(POST_VISIBILITY)).optional(),
});

export const PostsUpdateSchema = z.object({
  allow_tipping: z.boolean().nullable().optional(),
  author_id: z.string().optional(),
  body: z.string().nullable().optional(),
  channel_id: z.string().nullable().optional(),
  comment_count: z.number().nullable().optional(),
  content_type: z.enum(Object.values(CONTENT_TYPE)).optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  emerald_count: z.number().nullable().optional(),
  id: z.string().optional(),
  media_urls: z.any().nullable().optional(),
  published_at: z.string().nullable().optional(),
  resonance_count: z.number().nullable().optional(),
  sovereignty_tags: z.any().nullable().optional(),
  tips_received: z.number().nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  visibility: z.enum(Object.values(POST_VISIBILITY)).optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PostsRowInput = z.infer<typeof PostsRowSchema>;
export type PostsInsertInput = z.infer<typeof PostsInsertSchema>;
export type PostsUpdateInput = z.infer<typeof PostsUpdateSchema>;
