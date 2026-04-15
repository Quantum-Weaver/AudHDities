// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/file_type_standards.ts
// GENERATED: 2026-04-15T18:11:44.270Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// FileTypeStandards SCHEMAS
// =====================================================

export const FileTypeStandardsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_name: z.string(),
  emoji: z.string(),
  example_code: z.string().nullable(),
  example_path: z.string().nullable(),
  file_type: z.string(),
  id: z.string(),
  must_handle_errors: z.boolean().nullable(),
  must_have_interfaces: z.boolean().nullable(),
  must_have_loading_state: z.boolean().nullable(),
  must_have_props: z.boolean().nullable(),
  prohibited_patterns: z.any().nullable(),
  required_imports: z.any().nullable(),
  required_patterns: z.any().nullable(),
  updated_at: z.string().nullable(),
  validation_description: z.string().nullable(),
  validation_query: z.string().nullable(),
});

export const FileTypeStandardsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_name: z.string().optional(),
  emoji: z.string().optional(),
  example_code: z.string().nullable().optional(),
  example_path: z.string().nullable().optional(),
  file_type: z.string().optional(),
  id: z.string().optional(),
  must_handle_errors: z.boolean().nullable().optional(),
  must_have_interfaces: z.boolean().nullable().optional(),
  must_have_loading_state: z.boolean().nullable().optional(),
  must_have_props: z.boolean().nullable().optional(),
  prohibited_patterns: z.any().nullable().optional(),
  required_imports: z.any().nullable().optional(),
  required_patterns: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  validation_description: z.string().nullable().optional(),
  validation_query: z.string().nullable().optional(),
});

export const FileTypeStandardsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_name: z.string().optional(),
  emoji: z.string().optional(),
  example_code: z.string().nullable().optional(),
  example_path: z.string().nullable().optional(),
  file_type: z.string().optional(),
  id: z.string().optional(),
  must_handle_errors: z.boolean().nullable().optional(),
  must_have_interfaces: z.boolean().nullable().optional(),
  must_have_loading_state: z.boolean().nullable().optional(),
  must_have_props: z.boolean().nullable().optional(),
  prohibited_patterns: z.any().nullable().optional(),
  required_imports: z.any().nullable().optional(),
  required_patterns: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  validation_description: z.string().nullable().optional(),
  validation_query: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type FileTypeStandardsRowInput = z.infer<typeof FileTypeStandardsRowSchema>;
export type FileTypeStandardsInsertInput = z.infer<typeof FileTypeStandardsInsertSchema>;
export type FileTypeStandardsUpdateInput = z.infer<typeof FileTypeStandardsUpdateSchema>;
