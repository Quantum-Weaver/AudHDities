// =====================================================
// FILE: validators/generated/plutus-economics/subscriptions.ts
// GENERATED: 2026-04-17T01:35:45.342Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { SUBSCRIPTION_STATUS } from '@/lib/constants/generated/plutus-economics/subscription_status';

// =====================================================
// Subscriptions SCHEMAS
// =====================================================

export const SubscriptionsRowSchema = z.object({
  channel_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  expires_at: z.string().nullable(),
  id: z.string(),
  monthly_amount: z.number(),
  status: z.enum(Object.values(SUBSCRIPTION_STATUS)).nullable(),
  subscriber_id: z.string(),
  tier_applied: z.string(),
  updated_at: z.string().nullable(),
});

export const SubscriptionsInsertSchema = z.object({
  channel_id: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  id: z.string().optional(),
  monthly_amount: z.number(),
  status: z.enum(Object.values(SUBSCRIPTION_STATUS)).nullable().optional(),
  subscriber_id: z.string(),
  tier_applied: z.string(),
  updated_at: z.string().nullable().optional(),
});

export const SubscriptionsUpdateSchema = z.object({
  channel_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  id: z.string().optional(),
  monthly_amount: z.number().optional(),
  status: z.enum(Object.values(SUBSCRIPTION_STATUS)).nullable().optional(),
  subscriber_id: z.string().optional(),
  tier_applied: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SubscriptionsRowInput = z.infer<typeof SubscriptionsRowSchema>;
export type SubscriptionsInsertInput = z.infer<typeof SubscriptionsInsertSchema>;
export type SubscriptionsUpdateInput = z.infer<typeof SubscriptionsUpdateSchema>;
