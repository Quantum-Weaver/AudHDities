// =====================================================
// FILE: validators/generated/hermes-social/reactions.ts
// GENERATED: 2026-04-15T01:41:08.130Z
// SOURCE: database.types.ts
// =====================================================

import type { ReactionType } from '@/lib/constants/generated/hermes-social/reaction_type';
import z from 'zod';

// =====================================================
// Reactions SCHEMAS
// =====================================================

export const ReactionsRowSchema = z.object({
  comment_id: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  post_id: z.string().nullable(),
  reaction_type: z.enum(Object.values('ReactionType')),
  reply_id: z.string().nullable(),
  user_id: z.string(),
  weight: z.number().nullable(),
});

export const ReactionsInsertSchema = z.object({
  comment_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  post_id: z.string().nullable().optional(),
  reaction_type: z.enum(Object.values('ReactionType')).optional(),
  reply_id: z.string().nullable().optional(),
  user_id: z.string().optional(),
  weight: z.number().nullable().optional(),
});

export const ReactionsUpdateSchema = z.object({
  comment_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  post_id: z.string().nullable().optional(),
  reaction_type: z.enum(Object.values('ReactionType')).optional(),
  reply_id: z.string().nullable().optional(),
  user_id: z.string().optional(),
  weight: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ReactionsRowInput = z.infer<typeof ReactionsRowSchema>;
export type ReactionsInsertInput = z.infer<typeof ReactionsInsertSchema>;
export type ReactionsUpdateInput = z.infer<typeof ReactionsUpdateSchema>;
