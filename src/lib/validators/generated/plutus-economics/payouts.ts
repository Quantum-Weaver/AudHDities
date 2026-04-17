// =====================================================
// FILE: validators/generated/plutus-economics/payouts.ts
// GENERATED: 2026-04-17T17:34:19.783Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { PAYOUT_METHOD } from '@/lib/constants/generated/plutus-economics/payout_method';
import { PAYOUT_STATUS } from '@/lib/constants/generated/plutus-economics/payout_status';

// =====================================================
// Payouts SCHEMAS
// =====================================================

export const PayoutsRowSchema = z.object({
  amount_cents: z.number(),
  completed_at: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  destination: z.string().nullable(),
  disbursement_id: z.string(),
  id: z.string(),
  payout_method: z.enum(Object.values(PAYOUT_METHOD)),
  recipient_id: z.string(),
  status: z.enum(Object.values(PAYOUT_STATUS)).nullable(),
  stripe_transfer_id: z.string().nullable(),
});

export const PayoutsInsertSchema = z.object({
  amount_cents: z.number(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  destination: z.string().nullable().optional(),
  disbursement_id: z.string(),
  id: z.string().optional(),
  payout_method: z.enum(Object.values(PAYOUT_METHOD)),
  recipient_id: z.string(),
  status: z.enum(Object.values(PAYOUT_STATUS)).nullable().optional(),
  stripe_transfer_id: z.string().nullable().optional(),
});

export const PayoutsUpdateSchema = z.object({
  amount_cents: z.number().optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  destination: z.string().nullable().optional(),
  disbursement_id: z.string().optional(),
  id: z.string().optional(),
  payout_method: z.enum(Object.values(PAYOUT_METHOD)).optional(),
  recipient_id: z.string().optional(),
  status: z.enum(Object.values(PAYOUT_STATUS)).nullable().optional(),
  stripe_transfer_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PayoutsRowInput = z.infer<typeof PayoutsRowSchema>;
export type PayoutsInsertInput = z.infer<typeof PayoutsInsertSchema>;
export type PayoutsUpdateInput = z.infer<typeof PayoutsUpdateSchema>;
