// =====================================================
// FILE: validators/templates.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Templates SCHEMAS
// =====================================================

export const TemplatesRowSchema = z.object({
  category: z.string(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  default_columns: z.any().nullable(),
  default_indexes: z.any().nullable(),
  default_triggers: z.any().nullable(),
  description: z.string().nullable(),
  has_display_name: z.boolean(),
  has_slug: z.boolean(),
  has_status: z.boolean(),
  has_visual_anchors: z.boolean(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  log: z.any(),
  name: z.string(),
  pk_pattern: z.string(),
  rls_pattern: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const TemplatesInsertSchema = z.object({
  category: z.string(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  default_columns: z.any().nullable().optional(),
  default_indexes: z.any().nullable().optional(),
  default_triggers: z.any().nullable().optional(),
  description: z.string().nullable().optional(),
  has_display_name: z.boolean().optional(),
  has_slug: z.boolean().optional(),
  has_status: z.boolean().optional(),
  has_visual_anchors: z.boolean().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  log: z.any().optional(),
  name: z.string(),
  pk_pattern: z.string(),
  rls_pattern: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const TemplatesUpdateSchema = z.object({
  category: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  default_columns: z.any().nullable().optional(),
  default_indexes: z.any().nullable().optional(),
  default_triggers: z.any().nullable().optional(),
  description: z.string().nullable().optional(),
  has_display_name: z.boolean().optional(),
  has_slug: z.boolean().optional(),
  has_status: z.boolean().optional(),
  has_visual_anchors: z.boolean().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  log: z.any().optional(),
  name: z.string().optional(),
  pk_pattern: z.string().optional(),
  rls_pattern: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TemplatesRowInput = z.infer<typeof TemplatesRowSchema>;
export type TemplatesInsertInput = z.infer<typeof TemplatesInsertSchema>;
export type TemplatesUpdateInput = z.infer<typeof TemplatesUpdateSchema>;
