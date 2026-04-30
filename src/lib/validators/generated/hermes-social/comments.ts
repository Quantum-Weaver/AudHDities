// =====================================================
// FILE: validators/comments.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Comments SCHEMAS
// =====================================================

export const CommentsRowSchema = z.object({
  author_id: z.string(),
  comments_id: z.string(),
  content: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  is_edited: z.boolean().nullable(),
  is_hidden: z.boolean().nullable(),
  post_id: z.string(),
  reply_count: z.number().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const CommentsInsertSchema = z.object({
  author_id: z.string(),
  comments_id: z.string().optional(),
  content: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  is_edited: z.boolean().nullable().optional(),
  is_hidden: z.boolean().nullable().optional(),
  post_id: z.string(),
  reply_count: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const CommentsUpdateSchema = z.object({
  author_id: z.string().optional(),
  comments_id: z.string().optional(),
  content: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  is_edited: z.boolean().nullable().optional(),
  is_hidden: z.boolean().nullable().optional(),
  post_id: z.string().optional(),
  reply_count: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CommentsRowInput = z.infer<typeof CommentsRowSchema>;
export type CommentsInsertInput = z.infer<typeof CommentsInsertSchema>;
export type CommentsUpdateInput = z.infer<typeof CommentsUpdateSchema>;
