// =====================================================
// FILE: validators/generated/aethelred-connections/stripe_connection.ts
// GENERATED: 2026-04-15T18:11:44.422Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { STRIPE_MODE } from '@/lib/constants/generated/aethelred-connections/stripe_mode';
import { WEBHOOK_STATUS } from '@/lib/constants/generated/aethelred-connections/webhook_status';

// =====================================================
// StripeConnection SCHEMAS
// =====================================================

export const StripeConnectionRowSchema = z.object({
  account_id: z.string(),
  connected_accounts: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  last_sync_at: z.string().nullable(),
  mode: z.enum(Object.values(STRIPE_MODE)).nullable(),
  operated_by: z.string().nullable(),
  payout_settings: z.any().nullable(),
  products_synced: z.number().nullable(),
  updated_at: z.string().nullable(),
  webhook_secret: z.string().nullable(),
  webhook_status: z.enum(Object.values(WEBHOOK_STATUS)).nullable(),
});

export const StripeConnectionInsertSchema = z.object({
  account_id: z.string().optional(),
  connected_accounts: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  last_sync_at: z.string().nullable().optional(),
  mode: z.enum(Object.values(STRIPE_MODE)).nullable().optional(),
  operated_by: z.string().nullable().optional(),
  payout_settings: z.any().nullable().optional(),
  products_synced: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  webhook_secret: z.string().nullable().optional(),
  webhook_status: z.enum(Object.values(WEBHOOK_STATUS)).nullable().optional(),
});

export const StripeConnectionUpdateSchema = z.object({
  account_id: z.string().optional(),
  connected_accounts: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  last_sync_at: z.string().nullable().optional(),
  mode: z.enum(Object.values(STRIPE_MODE)).nullable().optional(),
  operated_by: z.string().nullable().optional(),
  payout_settings: z.any().nullable().optional(),
  products_synced: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  webhook_secret: z.string().nullable().optional(),
  webhook_status: z.enum(Object.values(WEBHOOK_STATUS)).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type StripeConnectionRowInput = z.infer<typeof StripeConnectionRowSchema>;
export type StripeConnectionInsertInput = z.infer<typeof StripeConnectionInsertSchema>;
export type StripeConnectionUpdateInput = z.infer<typeof StripeConnectionUpdateSchema>;
