// =====================================================
// FILE: validators/payouts.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Payouts SCHEMAS
// =====================================================

export const PayoutsRowSchema = z.object({
  amount_cents: z.number(),
  completed_at: z.string().nullable(),
  created_at: z.string().nullable(),
  destination: z.string().nullable(),
  disbursement_id: z.string(),
  id: z.string(),
  payout_method: z.any(),
  recipient_id: z.string(),
  status: z.any().nullable(),
  stripe_transfer_id: z.string().nullable(),
});

export const PayoutsInsertSchema = z.object({
  amount_cents: z.number().optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  destination: z.string().nullable().optional(),
  disbursement_id: z.string().optional(),
  id: z.string().optional(),
  payout_method: z.any().optional(),
  recipient_id: z.string().optional(),
  status: z.any().nullable().optional(),
  stripe_transfer_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PayoutsRowInput = z.infer<typeof PayoutsRowSchema>;
export type PayoutsInsertInput = z.infer<typeof PayoutsInsertSchema>;
