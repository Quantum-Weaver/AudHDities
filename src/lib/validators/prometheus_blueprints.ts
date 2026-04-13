// =====================================================
// FILE: validators/prometheus_blueprints.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// PrometheusBlueprints SCHEMAS
// =====================================================

export const PrometheusBlueprintsRowSchema = z.object({
  author: z.string(),
  blueprint_id: z.string(),
  content: z.any(),
  created_at: z.string(),
  generation_count: z.number(),
  id: z.string(),
  purpose: z.string(),
  status: z.any(),
  success_rate: z.number().nullable(),
  system: z.any(),
  updated_at: z.string(),
  version: z.string(),
});

export const PrometheusBlueprintsInsertSchema = z.object({
  author: z.string().optional(),
  blueprint_id: z.string().optional(),
  content: z.any().optional(),
  created_at: z.string().optional(),
  generation_count: z.number().optional(),
  id: z.string().optional(),
  purpose: z.string().optional(),
  status: z.any().optional(),
  success_rate: z.number().nullable().optional(),
  system: z.any().optional(),
  updated_at: z.string().optional(),
  version: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusBlueprintsRowInput = z.infer<typeof PrometheusBlueprintsRowSchema>;
export type PrometheusBlueprintsInsertInput = z.infer<typeof PrometheusBlueprintsInsertSchema>;
