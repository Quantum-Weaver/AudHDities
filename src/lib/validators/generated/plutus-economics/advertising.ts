// =====================================================
// FILE: validators/generated/plutus-economics/advertising.ts
// GENERATED: 2026-04-15T19:30:35.482Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { BID_TYPE } from '@/lib/constants/generated/plutus-economics/bid_type';
import { CAMPAIGN_STATUS } from '@/lib/constants/generated/plutus-economics/campaign_status';

// =====================================================
// Advertising SCHEMAS
// =====================================================

export const AdvertisingRowSchema = z.object({
  advertiser_id: z.string(),
  bid_amount_cents: z.number(),
  bid_type: z.enum(Object.values(BID_TYPE)),
  budget_cents: z.number(),
  campaign_name: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  end_date: z.string().nullable(),
  id: z.string(),
  spent_cents: z.number().nullable(),
  start_date: z.string().nullable(),
  status: z.enum(Object.values(CAMPAIGN_STATUS)).nullable(),
  targeting_criteria: z.any().nullable(),
  updated_at: z.string().nullable(),
  user_share_percent: z.number().nullable(),
});

export const AdvertisingInsertSchema = z.object({
  advertiser_id: z.string().optional(),
  bid_amount_cents: z.number().optional(),
  bid_type: z.enum(Object.values(BID_TYPE)).optional(),
  budget_cents: z.number().optional(),
  campaign_name: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  id: z.string().optional(),
  spent_cents: z.number().nullable().optional(),
  start_date: z.string().nullable().optional(),
  status: z.enum(Object.values(CAMPAIGN_STATUS)).nullable().optional(),
  targeting_criteria: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_share_percent: z.number().nullable().optional(),
});

export const AdvertisingUpdateSchema = z.object({
  advertiser_id: z.string().optional(),
  bid_amount_cents: z.number().optional(),
  bid_type: z.enum(Object.values(BID_TYPE)).optional(),
  budget_cents: z.number().optional(),
  campaign_name: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  id: z.string().optional(),
  spent_cents: z.number().nullable().optional(),
  start_date: z.string().nullable().optional(),
  status: z.enum(Object.values(CAMPAIGN_STATUS)).nullable().optional(),
  targeting_criteria: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_share_percent: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AdvertisingRowInput = z.infer<typeof AdvertisingRowSchema>;
export type AdvertisingInsertInput = z.infer<typeof AdvertisingInsertSchema>;
export type AdvertisingUpdateInput = z.infer<typeof AdvertisingUpdateSchema>;
