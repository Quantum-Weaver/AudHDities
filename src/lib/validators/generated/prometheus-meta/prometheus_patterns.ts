// =====================================================
// FILE: validators/prometheus_patterns.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// PrometheusPatterns SCHEMAS
// =====================================================

export const PrometheusPatternsRowSchema = z.object({
  contexts: z.any(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  default_template_id: z.string().nullable(),
  dependencies: z.any().nullable(),
  description: z.string(),
  examples: z.any().nullable(),
  generation_order: z.number(),
  is_active: z.boolean(),
  name: z.string(),
  naming_rule: z.string(),
  prometheus_patterns_id: z.string(),
  updated_at: z.string(),
});

export const PrometheusPatternsInsertSchema = z.object({
  contexts: z.any(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  default_template_id: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  description: z.string(),
  examples: z.any().nullable().optional(),
  generation_order: z.number().optional(),
  is_active: z.boolean().optional(),
  name: z.string(),
  naming_rule: z.string(),
  prometheus_patterns_id: z.string().optional(),
  updated_at: z.string().optional(),
});

export const PrometheusPatternsUpdateSchema = z.object({
  contexts: z.any().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  default_template_id: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  description: z.string().optional(),
  examples: z.any().nullable().optional(),
  generation_order: z.number().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  naming_rule: z.string().optional(),
  prometheus_patterns_id: z.string().optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusPatternsRowInput = z.infer<typeof PrometheusPatternsRowSchema>;
export type PrometheusPatternsInsertInput = z.infer<typeof PrometheusPatternsInsertSchema>;
export type PrometheusPatternsUpdateInput = z.infer<typeof PrometheusPatternsUpdateSchema>;
