// =====================================================
// FILE: validators/file_registry.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// FileRegistry SCHEMAS
// =====================================================

export const FileRegistryRowSchema = z.object({
  access_token: z.string().nullable(),
  bucket_name: z.string(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  file_hash: z.string().nullable(),
  file_size: z.number().nullable(),
  id: z.string(),
  is_public: z.boolean(),
  mime_type: z.string().nullable(),
  name: z.string(),
  related_id: z.string().nullable(),
  related_table: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  storage_path: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  uploaded_by: z.string().nullable(),
});

export const FileRegistryInsertSchema = z.object({
  access_token: z.string().nullable().optional(),
  bucket_name: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  file_hash: z.string().nullable().optional(),
  file_size: z.number().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().optional(),
  mime_type: z.string().nullable().optional(),
  name: z.string(),
  related_id: z.string().nullable().optional(),
  related_table: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  storage_path: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  uploaded_by: z.string().nullable().optional(),
});

export const FileRegistryUpdateSchema = z.object({
  access_token: z.string().nullable().optional(),
  bucket_name: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  file_hash: z.string().nullable().optional(),
  file_size: z.number().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().optional(),
  mime_type: z.string().nullable().optional(),
  name: z.string().optional(),
  related_id: z.string().nullable().optional(),
  related_table: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  storage_path: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  uploaded_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type FileRegistryRowInput = z.infer<typeof FileRegistryRowSchema>;
export type FileRegistryInsertInput = z.infer<typeof FileRegistryInsertSchema>;
export type FileRegistryUpdateInput = z.infer<typeof FileRegistryUpdateSchema>;
