// =====================================================
// FILE: validators/exchanges.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Exchanges SCHEMAS
// =====================================================

export const ExchangesRowSchema = z.object({
  adjustments: z.any().nullable(),
  buyer_id: z.string(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  currency: z.string(),
  gross_amount: z.number(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  net_amount: z.number().nullable(),
  payment_processor_fee: z.number().nullable(),
  platform_fee_percent: z.number(),
  status: z.enum(ENUM_VALUES.exchangeStatus),
  stripe_payment_intent: z.string().nullable(),
  stripe_session_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  ware_id: z.string().nullable(),
  work_id: z.string().nullable(),
});

export const ExchangesInsertSchema = z.object({
  adjustments: z.any().nullable().optional(),
  buyer_id: z.string(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  currency: z.string().optional(),
  gross_amount: z.number(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  net_amount: z.number().nullable().optional(),
  payment_processor_fee: z.number().nullable().optional(),
  platform_fee_percent: z.number().optional(),
  status: z.enum(ENUM_VALUES.exchangeStatus).optional(),
  stripe_payment_intent: z.string().nullable().optional(),
  stripe_session_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  ware_id: z.string().nullable().optional(),
  work_id: z.string().nullable().optional(),
});

export const ExchangesUpdateSchema = z.object({
  adjustments: z.any().nullable().optional(),
  buyer_id: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  currency: z.string().optional(),
  gross_amount: z.number().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  net_amount: z.number().nullable().optional(),
  payment_processor_fee: z.number().nullable().optional(),
  platform_fee_percent: z.number().optional(),
  status: z.enum(ENUM_VALUES.exchangeStatus).optional(),
  stripe_payment_intent: z.string().nullable().optional(),
  stripe_session_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  ware_id: z.string().nullable().optional(),
  work_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ExchangesRowInput = z.infer<typeof ExchangesRowSchema>;
export type ExchangesInsertInput = z.infer<typeof ExchangesInsertSchema>;
export type ExchangesUpdateInput = z.infer<typeof ExchangesUpdateSchema>;
