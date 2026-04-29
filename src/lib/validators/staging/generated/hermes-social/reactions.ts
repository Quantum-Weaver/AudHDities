// =====================================================
// FILE: validators/reactions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
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
  reaction_type: z.enum(ENUM_VALUES.reactionType),
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
  reaction_type: z.enum(ENUM_VALUES.reactionType),
  reply_id: z.string().nullable().optional(),
  user_id: z.string(),
  weight: z.number().nullable().optional(),
});

export const ReactionsUpdateSchema = z.object({
  comment_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  post_id: z.string().nullable().optional(),
  reaction_type: z.enum(ENUM_VALUES.reactionType).optional(),
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
