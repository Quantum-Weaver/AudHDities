// =====================================================
// FILE: validators/stripe_connection.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// StripeConnection SCHEMAS
// =====================================================

export const StripeConnectionRowSchema = z.object({
  account_id: z.string(),
  connected_accounts: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  last_sync_at: z.string().nullable(),
  mode: z.enum(ENUM_VALUES.stripeMode).nullable(),
  operated_by: z.string().nullable(),
  payout_settings: z.any().nullable(),
  products_synced: z.number().nullable(),
  stripe_connection_id: z.string(),
  updated_at: z.string().nullable(),
  webhook_secret: z.string().nullable(),
  webhook_status: z.enum(ENUM_VALUES.webhookStatus).nullable(),
});

export const StripeConnectionInsertSchema = z.object({
  account_id: z.string(),
  connected_accounts: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  last_sync_at: z.string().nullable().optional(),
  mode: z.enum(ENUM_VALUES.stripeMode).nullable().optional(),
  operated_by: z.string().nullable().optional(),
  payout_settings: z.any().nullable().optional(),
  products_synced: z.number().nullable().optional(),
  stripe_connection_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  webhook_secret: z.string().nullable().optional(),
  webhook_status: z.enum(ENUM_VALUES.webhookStatus).nullable().optional(),
});

export const StripeConnectionUpdateSchema = z.object({
  account_id: z.string().optional(),
  connected_accounts: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  last_sync_at: z.string().nullable().optional(),
  mode: z.enum(ENUM_VALUES.stripeMode).nullable().optional(),
  operated_by: z.string().nullable().optional(),
  payout_settings: z.any().nullable().optional(),
  products_synced: z.number().nullable().optional(),
  stripe_connection_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  webhook_secret: z.string().nullable().optional(),
  webhook_status: z.enum(ENUM_VALUES.webhookStatus).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type StripeConnectionRowInput = z.infer<typeof StripeConnectionRowSchema>;
export type StripeConnectionInsertInput = z.infer<typeof StripeConnectionInsertSchema>;
export type StripeConnectionUpdateInput = z.infer<typeof StripeConnectionUpdateSchema>;
