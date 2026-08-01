// =====================================================
// FILE: validators/residual_pool.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// ResidualPool SCHEMAS
// =====================================================

export const ResidualPoolRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  current_balance: z.number(),
  description: z.string().nullable(),
  distribution_schedule: z.string(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  last_distribution_amount: z.number().nullable(),
  last_distribution_at: z.string().nullable(),
  last_distribution_recipients: z.number().nullable(),
  name: z.string(),
  total_contributed_lifetime: z.number(),
  total_distributed_lifetime: z.number(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ResidualPoolInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  current_balance: z.number().optional(),
  description: z.string().nullable().optional(),
  distribution_schedule: z.string().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_distribution_amount: z.number().nullable().optional(),
  last_distribution_at: z.string().nullable().optional(),
  last_distribution_recipients: z.number().nullable().optional(),
  name: z.string().optional(),
  total_contributed_lifetime: z.number().optional(),
  total_distributed_lifetime: z.number().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ResidualPoolUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  current_balance: z.number().optional(),
  description: z.string().nullable().optional(),
  distribution_schedule: z.string().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_distribution_amount: z.number().nullable().optional(),
  last_distribution_at: z.string().nullable().optional(),
  last_distribution_recipients: z.number().nullable().optional(),
  name: z.string().optional(),
  total_contributed_lifetime: z.number().optional(),
  total_distributed_lifetime: z.number().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ResidualPoolRowInput = z.infer<typeof ResidualPoolRowSchema>;
export type ResidualPoolInsertInput = z.infer<typeof ResidualPoolInsertSchema>;
export type ResidualPoolUpdateInput = z.infer<typeof ResidualPoolUpdateSchema>;
