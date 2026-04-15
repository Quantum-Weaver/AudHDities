// =====================================================
// FILE: validators/generated/prometheus-meta/prometheus_patterns.ts
// GENERATED: 2026-04-15T01:41:08.118Z
// SOURCE: database.types.ts
// =====================================================

import type { PatternContext } from '@/lib/constants/generated/prometheus-meta/pattern_context';
import z from 'zod';

// =====================================================
// PrometheusPatterns SCHEMAS
// =====================================================

export const PrometheusPatternsRowSchema = z.object({
  contexts: z.any(),
  created_at: z.string(),
  default_template_id: z.string().nullable(),
  dependencies: z.any().nullable(),
  description: z.string(),
  examples: z.any().nullable(),
  generation_order: z.number(),
  id: z.string(),
  is_active: z.boolean(),
  name: z.string(),
  naming_rule: z.string(),
  updated_at: z.string(),
});

export const PrometheusPatternsInsertSchema = z.object({
  contexts: z.any().optional(),
  created_at: z.string().optional(),
  default_template_id: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  description: z.string().optional(),
  examples: z.any().nullable().optional(),
  generation_order: z.number().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  naming_rule: z.string().optional(),
  updated_at: z.string().optional(),
});

export const PrometheusPatternsUpdateSchema = z.object({
  contexts: z.any().optional(),
  created_at: z.string().optional(),
  default_template_id: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  description: z.string().optional(),
  examples: z.any().nullable().optional(),
  generation_order: z.number().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  naming_rule: z.string().optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusPatternsRowInput = z.infer<typeof PrometheusPatternsRowSchema>;
export type PrometheusPatternsInsertInput = z.infer<typeof PrometheusPatternsInsertSchema>;
export type PrometheusPatternsUpdateInput = z.infer<typeof PrometheusPatternsUpdateSchema>;
