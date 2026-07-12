// =====================================================
// FILE: validators/generation_templates.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// GenerationTemplates SCHEMAS
// =====================================================

export const GenerationTemplatesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  output_pattern: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  template_content: z.string().nullable(),
  template_type: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  variables: z.any().nullable(),
});

export const GenerationTemplatesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  output_pattern: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  template_content: z.string().nullable().optional(),
  template_type: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  variables: z.any().nullable().optional(),
});

export const GenerationTemplatesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  output_pattern: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  template_content: z.string().nullable().optional(),
  template_type: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  variables: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GenerationTemplatesRowInput = z.infer<typeof GenerationTemplatesRowSchema>;
export type GenerationTemplatesInsertInput = z.infer<typeof GenerationTemplatesInsertSchema>;
export type GenerationTemplatesUpdateInput = z.infer<typeof GenerationTemplatesUpdateSchema>;
