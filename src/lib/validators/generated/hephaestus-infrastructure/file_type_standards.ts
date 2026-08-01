// =====================================================
// FILE: validators/file_type_standards.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// FileTypeStandards SCHEMAS
// =====================================================

export const FileTypeStandardsRowSchema = z.object({
  bucket_name: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  extensions: z.any().nullable(),
  id: z.string(),
  max_file_size: z.number().nullable(),
  mime_types: z.any().nullable(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const FileTypeStandardsInsertSchema = z.object({
  bucket_name: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  extensions: z.any().nullable().optional(),
  id: z.string().optional(),
  max_file_size: z.number().nullable().optional(),
  mime_types: z.any().nullable().optional(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const FileTypeStandardsUpdateSchema = z.object({
  bucket_name: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  extensions: z.any().nullable().optional(),
  id: z.string().optional(),
  max_file_size: z.number().nullable().optional(),
  mime_types: z.any().nullable().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type FileTypeStandardsRowInput = z.infer<typeof FileTypeStandardsRowSchema>;
export type FileTypeStandardsInsertInput = z.infer<typeof FileTypeStandardsInsertSchema>;
export type FileTypeStandardsUpdateInput = z.infer<typeof FileTypeStandardsUpdateSchema>;
