// =====================================================
// FILE: validators/advertising.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Advertising SCHEMAS
// =====================================================

export const AdvertisingRowSchema = z.object({
  advertiser_id: z.string(),
  bid_amount_cents: z.number(),
  bid_type: z.any(),
  budget_cents: z.number(),
  campaign_name: z.string(),
  created_at: z.string().nullable(),
  end_date: z.string().nullable(),
  id: z.string(),
  spent_cents: z.number().nullable(),
  start_date: z.string().nullable(),
  status: z.any().nullable(),
  targeting_criteria: z.any().nullable(),
  updated_at: z.string().nullable(),
  user_share_percent: z.number().nullable(),
});

export const AdvertisingInsertSchema = z.object({
  advertiser_id: z.string().optional(),
  bid_amount_cents: z.number().optional(),
  bid_type: z.any().optional(),
  budget_cents: z.number().optional(),
  campaign_name: z.string().optional(),
  created_at: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  id: z.string().optional(),
  spent_cents: z.number().nullable().optional(),
  start_date: z.string().nullable().optional(),
  status: z.any().nullable().optional(),
  targeting_criteria: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_share_percent: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AdvertisingRowInput = z.infer<typeof AdvertisingRowSchema>;
export type AdvertisingInsertInput = z.infer<typeof AdvertisingInsertSchema>;
