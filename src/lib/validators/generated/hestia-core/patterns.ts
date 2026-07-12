// =====================================================
// FILE: validators/patterns.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Patterns SCHEMAS
// =====================================================

export const PatternsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  example_output: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  pattern_config: z.any().nullable(),
  pattern_type: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  template_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const PatternsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  example_output: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  pattern_config: z.any().nullable().optional(),
  pattern_type: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  template_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const PatternsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  example_output: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  pattern_config: z.any().nullable().optional(),
  pattern_type: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  template_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PatternsRowInput = z.infer<typeof PatternsRowSchema>;
export type PatternsInsertInput = z.infer<typeof PatternsInsertSchema>;
export type PatternsUpdateInput = z.infer<typeof PatternsUpdateSchema>;
