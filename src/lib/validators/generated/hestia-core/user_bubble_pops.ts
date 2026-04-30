// =====================================================
// FILE: validators/user_bubble_pops.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// UserBubblePops SCHEMAS
// =====================================================

export const UserBubblePopsRowSchema = z.object({
  bubble_id: z.string(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  environment: z.string().nullable(),
  points_awarded: z.number(),
  popped_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_bubble_pops_id: z.string(),
  user_id: z.string(),
});

export const UserBubblePopsInsertSchema = z.object({
  bubble_id: z.string(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  environment: z.string().nullable().optional(),
  points_awarded: z.number(),
  popped_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_bubble_pops_id: z.string().optional(),
  user_id: z.string(),
});

export const UserBubblePopsUpdateSchema = z.object({
  bubble_id: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  environment: z.string().nullable().optional(),
  points_awarded: z.number().optional(),
  popped_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_bubble_pops_id: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserBubblePopsRowInput = z.infer<typeof UserBubblePopsRowSchema>;
export type UserBubblePopsInsertInput = z.infer<typeof UserBubblePopsInsertSchema>;
export type UserBubblePopsUpdateInput = z.infer<typeof UserBubblePopsUpdateSchema>;
