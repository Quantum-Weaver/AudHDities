// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/file_registry.ts
// GENERATED: 2026-04-15T18:11:44.270Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// FileRegistry SCHEMAS
// =====================================================

export const FileRegistryRowSchema = z.object({
  category: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  dependencies: z.any().nullable(),
  emoji: z.string(),
  example_usage: z.string().nullable(),
  file_name: z.string(),
  file_path: z.string(),
  file_type: z.string(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  last_validated: z.string().nullable(),
  needs_review: z.boolean().nullable(),
  purpose: z.string().nullable(),
  review_notes: z.string().nullable(),
  standards: z.string().nullable(),
  subcategory: z.string().nullable(),
  updated_at: z.string().nullable(),
  used_by: z.any().nullable(),
  warning: z.string().nullable(),
});

export const FileRegistryInsertSchema = z.object({
  category: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  emoji: z.string().optional(),
  example_usage: z.string().nullable().optional(),
  file_name: z.string().optional(),
  file_path: z.string().optional(),
  file_type: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  last_validated: z.string().nullable().optional(),
  needs_review: z.boolean().nullable().optional(),
  purpose: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  standards: z.string().nullable().optional(),
  subcategory: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  used_by: z.any().nullable().optional(),
  warning: z.string().nullable().optional(),
});

export const FileRegistryUpdateSchema = z.object({
  category: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  emoji: z.string().optional(),
  example_usage: z.string().nullable().optional(),
  file_name: z.string().optional(),
  file_path: z.string().optional(),
  file_type: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  last_validated: z.string().nullable().optional(),
  needs_review: z.boolean().nullable().optional(),
  purpose: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  standards: z.string().nullable().optional(),
  subcategory: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  used_by: z.any().nullable().optional(),
  warning: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type FileRegistryRowInput = z.infer<typeof FileRegistryRowSchema>;
export type FileRegistryInsertInput = z.infer<typeof FileRegistryInsertSchema>;
export type FileRegistryUpdateInput = z.infer<typeof FileRegistryUpdateSchema>;
