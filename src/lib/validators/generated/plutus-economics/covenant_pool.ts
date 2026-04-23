// =====================================================
// FILE: validators/covenant_pool.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// CovenantPool SCHEMAS
// =====================================================

export const CovenantPoolRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  current_balance_cents: z.number().nullable(),
  id: z.string(),
  last_distribution_at: z.string().nullable(),
  pledge_percent: z.number(),
  total_pledged_cents: z.number().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const CovenantPoolInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  current_balance_cents: z.number().nullable().optional(),
  id: z.string().optional(),
  last_distribution_at: z.string().nullable().optional(),
  pledge_percent: z.number().optional(),
  total_pledged_cents: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

export const CovenantPoolUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  current_balance_cents: z.number().nullable().optional(),
  id: z.string().optional(),
  last_distribution_at: z.string().nullable().optional(),
  pledge_percent: z.number().optional(),
  total_pledged_cents: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CovenantPoolRowInput = z.infer<typeof CovenantPoolRowSchema>;
export type CovenantPoolInsertInput = z.infer<typeof CovenantPoolInsertSchema>;
export type CovenantPoolUpdateInput = z.infer<typeof CovenantPoolUpdateSchema>;
