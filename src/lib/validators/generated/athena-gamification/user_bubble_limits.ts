// =====================================================
// FILE: validators/user_bubble_limits.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// UserBubbleLimits SCHEMAS
// =====================================================

export const UserBubbleLimitsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  daily_points: z.number().nullable(),
  hourly_pops: z.number().nullable(),
  last_pop_at: z.string().nullable(),
  reset_date: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const UserBubbleLimitsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  daily_points: z.number().nullable().optional(),
  hourly_pops: z.number().nullable().optional(),
  last_pop_at: z.string().nullable().optional(),
  reset_date: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string(),
});

export const UserBubbleLimitsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  daily_points: z.number().nullable().optional(),
  hourly_pops: z.number().nullable().optional(),
  last_pop_at: z.string().nullable().optional(),
  reset_date: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserBubbleLimitsRowInput = z.infer<typeof UserBubbleLimitsRowSchema>;
export type UserBubbleLimitsInsertInput = z.infer<typeof UserBubbleLimitsInsertSchema>;
export type UserBubbleLimitsUpdateInput = z.infer<typeof UserBubbleLimitsUpdateSchema>;
