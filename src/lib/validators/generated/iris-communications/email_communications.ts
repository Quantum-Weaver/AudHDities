// =====================================================
// FILE: validators/email_communications.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// EmailCommunications SCHEMAS
// =====================================================

export const EmailCommunicationsRowSchema = z.object({
  body: z.string(),
  clicked_at: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  email_communications_id: z.string(),
  metadata: z.any().nullable(),
  opened_at: z.string().nullable(),
  provider_message_id: z.string().nullable(),
  recipient_email: z.string(),
  recipient_id: z.string().nullable(),
  sent_at: z.string().nullable(),
  status: z.enum(ENUM_VALUES.emailStatus).nullable(),
  subject: z.string(),
  template_id: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const EmailCommunicationsInsertSchema = z.object({
  body: z.string(),
  clicked_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  email_communications_id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  opened_at: z.string().nullable().optional(),
  provider_message_id: z.string().nullable().optional(),
  recipient_email: z.string(),
  recipient_id: z.string().nullable().optional(),
  sent_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.emailStatus).nullable().optional(),
  subject: z.string(),
  template_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const EmailCommunicationsUpdateSchema = z.object({
  body: z.string().optional(),
  clicked_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  email_communications_id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  opened_at: z.string().nullable().optional(),
  provider_message_id: z.string().nullable().optional(),
  recipient_email: z.string().optional(),
  recipient_id: z.string().nullable().optional(),
  sent_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.emailStatus).nullable().optional(),
  subject: z.string().optional(),
  template_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EmailCommunicationsRowInput = z.infer<typeof EmailCommunicationsRowSchema>;
export type EmailCommunicationsInsertInput = z.infer<typeof EmailCommunicationsInsertSchema>;
export type EmailCommunicationsUpdateInput = z.infer<typeof EmailCommunicationsUpdateSchema>;
