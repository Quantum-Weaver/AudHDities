// =====================================================
// FILE: validators/payouts.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

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
  payout_method: z.enum(ENUM_VALUES.payoutMethod),
  payouts_id: z.string(),
  recipient_id: z.string(),
  status: z.enum(ENUM_VALUES.payoutStatus).nullable(),
  stripe_transfer_id: z.string().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const PayoutsInsertSchema = z.object({
  amount_cents: z.number(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  destination: z.string().nullable().optional(),
  disbursement_id: z.string(),
  payout_method: z.enum(ENUM_VALUES.payoutMethod),
  payouts_id: z.string().optional(),
  recipient_id: z.string(),
  status: z.enum(ENUM_VALUES.payoutStatus).nullable().optional(),
  stripe_transfer_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const PayoutsUpdateSchema = z.object({
  amount_cents: z.number().optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  destination: z.string().nullable().optional(),
  disbursement_id: z.string().optional(),
  payout_method: z.enum(ENUM_VALUES.payoutMethod).optional(),
  payouts_id: z.string().optional(),
  recipient_id: z.string().optional(),
  status: z.enum(ENUM_VALUES.payoutStatus).nullable().optional(),
  stripe_transfer_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PayoutsRowInput = z.infer<typeof PayoutsRowSchema>;
export type PayoutsInsertInput = z.infer<typeof PayoutsInsertSchema>;
export type PayoutsUpdateInput = z.infer<typeof PayoutsUpdateSchema>;
