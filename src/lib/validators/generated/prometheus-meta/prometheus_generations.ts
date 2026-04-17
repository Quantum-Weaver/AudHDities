// =====================================================
// FILE: validators/generated/prometheus-meta/prometheus_generations.ts
// GENERATED: 2026-04-17T20:52:30.944Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { GENERATION_STATUS } from '@/lib/constants/generated/prometheus-meta/generation_status';

// =====================================================
// PrometheusGenerations SCHEMAS
// =====================================================

export const PrometheusGenerationsRowSchema = z.object({
  blueprint_id: z.string(),
  completed_at: z.string().nullable(),
  council_involved: z.any().nullable(),
  created_at: z.string(),
  duration_ms: z.number(),
  errors: z.any().nullable(),
  file_paths: z.any().nullable(),
  files_generated: z.number(),
  id: z.string(),
  metadata: z.any().nullable(),
  session_id: z.string(),
  status: z.enum(Object.values(GENERATION_STATUS)),
  ziggy_present: z.boolean(),
});

export const PrometheusGenerationsInsertSchema = z.object({
  blueprint_id: z.string(),
  completed_at: z.string().nullable().optional(),
  council_involved: z.any().nullable().optional(),
  created_at: z.string().optional(),
  duration_ms: z.number().optional(),
  errors: z.any().nullable().optional(),
  file_paths: z.any().nullable().optional(),
  files_generated: z.number().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  session_id: z.string(),
  status: z.enum(Object.values(GENERATION_STATUS)).optional(),
  ziggy_present: z.boolean().optional(),
});

export const PrometheusGenerationsUpdateSchema = z.object({
  blueprint_id: z.string().optional(),
  completed_at: z.string().nullable().optional(),
  council_involved: z.any().nullable().optional(),
  created_at: z.string().optional(),
  duration_ms: z.number().optional(),
  errors: z.any().nullable().optional(),
  file_paths: z.any().nullable().optional(),
  files_generated: z.number().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  session_id: z.string().optional(),
  status: z.enum(Object.values(GENERATION_STATUS)).optional(),
  ziggy_present: z.boolean().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusGenerationsRowInput = z.infer<typeof PrometheusGenerationsRowSchema>;
export type PrometheusGenerationsInsertInput = z.infer<typeof PrometheusGenerationsInsertSchema>;
export type PrometheusGenerationsUpdateInput = z.infer<typeof PrometheusGenerationsUpdateSchema>;
