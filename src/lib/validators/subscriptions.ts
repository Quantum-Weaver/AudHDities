// =====================================================
// FILE: validators/subscriptions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

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
  status: z.any().nullable(),
  subscriber_id: z.string(),
  tier_applied: z.string(),
  updated_at: z.string().nullable(),
});

export const SubscriptionsInsertSchema = z.object({
  channel_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  id: z.string().optional(),
  monthly_amount: z.number().optional(),
  status: z.any().nullable().optional(),
  subscriber_id: z.string().optional(),
  tier_applied: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SubscriptionsRowInput = z.infer<typeof SubscriptionsRowSchema>;
export type SubscriptionsInsertInput = z.infer<typeof SubscriptionsInsertSchema>;
