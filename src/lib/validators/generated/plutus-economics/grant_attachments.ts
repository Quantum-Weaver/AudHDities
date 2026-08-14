// =====================================================
// FILE: validators/grant_attachments.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// GrantAttachments SCHEMAS
// =====================================================

export const GrantAttachmentsRowSchema = z.object({
  attachment_type: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  description: z.string().nullable(),
  file_size: z.number().nullable(),
  file_url: z.string().nullable(),
  id: z.string(),
  mime_type: z.string().nullable(),
  name: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  tags: z.any().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const GrantAttachmentsInsertSchema = z.object({
  attachment_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  file_size: z.number().nullable().optional(),
  file_url: z.string().nullable().optional(),
  id: z.string().optional(),
  mime_type: z.string().nullable().optional(),
  name: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  tags: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const GrantAttachmentsUpdateSchema = z.object({
  attachment_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  description: z.string().nullable().optional(),
  file_size: z.number().nullable().optional(),
  file_url: z.string().nullable().optional(),
  id: z.string().optional(),
  mime_type: z.string().nullable().optional(),
  name: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  tags: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GrantAttachmentsRowInput = z.infer<typeof GrantAttachmentsRowSchema>;
export type GrantAttachmentsInsertInput = z.infer<typeof GrantAttachmentsInsertSchema>;
export type GrantAttachmentsUpdateInput = z.infer<typeof GrantAttachmentsUpdateSchema>;
