// =====================================================
// FILE: validators/residual_payouts.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// ResidualPayouts SCHEMAS
// =====================================================

export const ResidualPayoutsRowSchema = z.object({
  amount: z.number(),
  calculation_note: z.string().nullable(),
  contributor_id: z.string(),
  created_at: z.string().nullable(),
  id: z.string(),
  paid_at: z.string().nullable(),
  product_id: z.string(),
  sale_id: z.string(),
  status: z.any().nullable(),
});

export const ResidualPayoutsInsertSchema = z.object({
  amount: z.number().optional(),
  calculation_note: z.string().nullable().optional(),
  contributor_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  id: z.string().optional(),
  paid_at: z.string().nullable().optional(),
  product_id: z.string().optional(),
  sale_id: z.string().optional(),
  status: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ResidualPayoutsRowInput = z.infer<typeof ResidualPayoutsRowSchema>;
export type ResidualPayoutsInsertInput = z.infer<typeof ResidualPayoutsInsertSchema>;
