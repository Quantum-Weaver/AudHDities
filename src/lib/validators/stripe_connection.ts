// =====================================================
// FILE: validators/stripe_connection.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// StripeConnection SCHEMAS
// =====================================================

export const StripeConnectionRowSchema = z.object({
  account_id: z.string(),
  connected_accounts: z.any().nullable(),
  created_at: z.string().nullable(),
  id: z.string(),
  last_sync_at: z.string().nullable(),
  mode: z.any().nullable(),
  operated_by: z.string().nullable(),
  payout_settings: z.any().nullable(),
  products_synced: z.number().nullable(),
  updated_at: z.string().nullable(),
  webhook_secret: z.string().nullable(),
  webhook_status: z.any().nullable(),
});

export const StripeConnectionInsertSchema = z.object({
  account_id: z.string().optional(),
  connected_accounts: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  id: z.string().optional(),
  last_sync_at: z.string().nullable().optional(),
  mode: z.any().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  payout_settings: z.any().nullable().optional(),
  products_synced: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  webhook_secret: z.string().nullable().optional(),
  webhook_status: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type StripeConnectionRowInput = z.infer<typeof StripeConnectionRowSchema>;
export type StripeConnectionInsertInput = z.infer<typeof StripeConnectionInsertSchema>;
