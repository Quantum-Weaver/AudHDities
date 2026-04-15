// =====================================================
// FILE: validators/generated/plutus-economics/sales.ts
// GENERATED: 2026-04-15T18:11:44.417Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { PAYMENT_STATUS } from '@/lib/constants/generated/plutus-economics/payment_status';
import { USER_TIER } from '@/lib/constants/generated/plutus-economics/user_tier';

// =====================================================
// Sales SCHEMAS
// =====================================================

export const SalesRowSchema = z.object({
  amount_cents: z.number(),
  bigot_tax_applied: z.boolean().nullable(),
  buyer_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  creator_earnings_cents: z.number(),
  gross_amount: z.number(),
  id: z.string(),
  nd_price_applied: z.boolean().nullable(),
  net_amount: z.number().nullable(),
  payment_processor_fee: z.number().nullable(),
  payment_status: z.enum(Object.values(PAYMENT_STATUS)).nullable(),
  platform_fee_cents: z.number(),
  product_id: z.string(),
  stripe_payment_intent: z.string().nullable(),
  stripe_session_id: z.string().nullable(),
  tier_applied: z.enum(Object.values(USER_TIER)),
  to_creator_immediate: z.number().nullable(),
  to_infrastructure: z.number().nullable(),
  to_residual_pool: z.number().nullable(),
});

export const SalesInsertSchema = z.object({
  amount_cents: z.number().optional(),
  bigot_tax_applied: z.boolean().nullable().optional(),
  buyer_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_earnings_cents: z.number().optional(),
  gross_amount: z.number().optional(),
  id: z.string().optional(),
  nd_price_applied: z.boolean().nullable().optional(),
  net_amount: z.number().nullable().optional(),
  payment_processor_fee: z.number().nullable().optional(),
  payment_status: z.enum(Object.values(PAYMENT_STATUS)).nullable().optional(),
  platform_fee_cents: z.number().optional(),
  product_id: z.string().optional(),
  stripe_payment_intent: z.string().nullable().optional(),
  stripe_session_id: z.string().nullable().optional(),
  tier_applied: z.enum(Object.values(USER_TIER)).optional(),
  to_creator_immediate: z.number().nullable().optional(),
  to_infrastructure: z.number().nullable().optional(),
  to_residual_pool: z.number().nullable().optional(),
});

export const SalesUpdateSchema = z.object({
  amount_cents: z.number().optional(),
  bigot_tax_applied: z.boolean().nullable().optional(),
  buyer_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_earnings_cents: z.number().optional(),
  gross_amount: z.number().optional(),
  id: z.string().optional(),
  nd_price_applied: z.boolean().nullable().optional(),
  net_amount: z.number().nullable().optional(),
  payment_processor_fee: z.number().nullable().optional(),
  payment_status: z.enum(Object.values(PAYMENT_STATUS)).nullable().optional(),
  platform_fee_cents: z.number().optional(),
  product_id: z.string().optional(),
  stripe_payment_intent: z.string().nullable().optional(),
  stripe_session_id: z.string().nullable().optional(),
  tier_applied: z.enum(Object.values(USER_TIER)).optional(),
  to_creator_immediate: z.number().nullable().optional(),
  to_infrastructure: z.number().nullable().optional(),
  to_residual_pool: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SalesRowInput = z.infer<typeof SalesRowSchema>;
export type SalesInsertInput = z.infer<typeof SalesInsertSchema>;
export type SalesUpdateInput = z.infer<typeof SalesUpdateSchema>;
