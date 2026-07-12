// =====================================================
// FILE: validators/resend_connection.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// ResendConnection SCHEMAS
// =====================================================

export const ResendConnectionRowSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  enabled_templates: z.any().nullable(),
  from_address: z.string().nullable(),
  from_name: z.string(),
  id: z.string(),
  is_encrypted: z.boolean(),
  last_verified_at: z.string().nullable(),
  reply_to_address: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ResendConnectionInsertSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  enabled_templates: z.any().nullable().optional(),
  from_address: z.string().nullable().optional(),
  from_name: z.string().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_verified_at: z.string().nullable().optional(),
  reply_to_address: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ResendConnectionUpdateSchema = z.object({
  config_key: z.string().optional(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  enabled_templates: z.any().nullable().optional(),
  from_address: z.string().nullable().optional(),
  from_name: z.string().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_verified_at: z.string().nullable().optional(),
  reply_to_address: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ResendConnectionRowInput = z.infer<typeof ResendConnectionRowSchema>;
export type ResendConnectionInsertInput = z.infer<typeof ResendConnectionInsertSchema>;
export type ResendConnectionUpdateInput = z.infer<typeof ResendConnectionUpdateSchema>;
