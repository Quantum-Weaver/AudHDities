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
  api_key: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  delivery_status: z.enum(ENUM_VALUES.deliveryStatus).nullable(),
  emails_failed: z.number().nullable(),
  emails_sent: z.number().nullable(),
  from_email: z.string(),
  from_name: z.string(),
  id: z.string(),
  last_sent_at: z.string().nullable(),
  operated_by: z.string().nullable(),
  template_versions: z.any().nullable(),
  templates: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const ResendConnectionInsertSchema = z.object({
  api_key: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  emails_failed: z.number().nullable().optional(),
  emails_sent: z.number().nullable().optional(),
  from_email: z.string(),
  from_name: z.string(),
  id: z.string().optional(),
  last_sent_at: z.string().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  template_versions: z.any().nullable().optional(),
  templates: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const ResendConnectionUpdateSchema = z.object({
  api_key: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  emails_failed: z.number().nullable().optional(),
  emails_sent: z.number().nullable().optional(),
  from_email: z.string().optional(),
  from_name: z.string().optional(),
  id: z.string().optional(),
  last_sent_at: z.string().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  template_versions: z.any().nullable().optional(),
  templates: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ResendConnectionRowInput = z.infer<typeof ResendConnectionRowSchema>;
export type ResendConnectionInsertInput = z.infer<typeof ResendConnectionInsertSchema>;
export type ResendConnectionUpdateInput = z.infer<typeof ResendConnectionUpdateSchema>;
