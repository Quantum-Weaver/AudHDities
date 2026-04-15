// =====================================================
// FILE: validators/generated/prometheus-meta/prometheus_memories.ts
// GENERATED: 2026-04-15T05:16:17.777Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// PrometheusMemories SCHEMAS
// =====================================================

export const PrometheusMemoriesRowSchema = z.object({
  average_duration_ms: z.number(),
  confidence_score: z.number(),
  created_at: z.string(),
  dependencies: z.any().nullable(),
  failure_count: z.number(),
  id: z.string(),
  last_used: z.string().nullable(),
  pattern_hash: z.string(),
  pattern_type: z.string(),
  success_count: z.number(),
  template_recommendation: z.string().nullable(),
  updated_at: z.string(),
});

export const PrometheusMemoriesInsertSchema = z.object({
  average_duration_ms: z.number().optional(),
  confidence_score: z.number().optional(),
  created_at: z.string().optional(),
  dependencies: z.any().nullable().optional(),
  failure_count: z.number().optional(),
  id: z.string().optional(),
  last_used: z.string().nullable().optional(),
  pattern_hash: z.string().optional(),
  pattern_type: z.string().optional(),
  success_count: z.number().optional(),
  template_recommendation: z.string().nullable().optional(),
  updated_at: z.string().optional(),
});

export const PrometheusMemoriesUpdateSchema = z.object({
  average_duration_ms: z.number().optional(),
  confidence_score: z.number().optional(),
  created_at: z.string().optional(),
  dependencies: z.any().nullable().optional(),
  failure_count: z.number().optional(),
  id: z.string().optional(),
  last_used: z.string().nullable().optional(),
  pattern_hash: z.string().optional(),
  pattern_type: z.string().optional(),
  success_count: z.number().optional(),
  template_recommendation: z.string().nullable().optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusMemoriesRowInput = z.infer<typeof PrometheusMemoriesRowSchema>;
export type PrometheusMemoriesInsertInput = z.infer<typeof PrometheusMemoriesInsertSchema>;
export type PrometheusMemoriesUpdateInput = z.infer<typeof PrometheusMemoriesUpdateSchema>;
