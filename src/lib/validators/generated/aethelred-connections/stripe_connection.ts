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
  config_key: z.string(),
  config_value: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  enabled_features: z.any().nullable(),
  id: z.string(),
  is_encrypted: z.boolean(),
  last_verified_at: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  stripe_mode: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const StripeConnectionInsertSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  enabled_features: z.any().nullable().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_verified_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  stripe_mode: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const StripeConnectionUpdateSchema = z.object({
  config_key: z.string().optional(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  enabled_features: z.any().nullable().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_verified_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  stripe_mode: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type StripeConnectionRowInput = z.infer<typeof StripeConnectionRowSchema>;
export type StripeConnectionInsertInput = z.infer<typeof StripeConnectionInsertSchema>;
export type StripeConnectionUpdateInput = z.infer<typeof StripeConnectionUpdateSchema>;
