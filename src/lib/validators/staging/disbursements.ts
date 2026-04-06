// =====================================================
// FILE: validators/disbursements.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Disbursements SCHEMAS
// =====================================================

export const DisbursementsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  processed_at: z.string().nullable(),
  recipient_count: z.number(),
  source_id: z.string(),
  source_pool: z.any(),
  status: z.any().nullable(),
  total_amount_cents: z.number(),
});

export const DisbursementsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  processed_at: z.string().nullable().optional(),
  recipient_count: z.number().optional(),
  source_id: z.string().optional(),
  source_pool: z.any().optional(),
  status: z.any().nullable().optional(),
  total_amount_cents: z.number().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type DisbursementsRowInput = z.infer<typeof DisbursementsRowSchema>;
export type DisbursementsInsertInput = z.infer<typeof DisbursementsInsertSchema>;
