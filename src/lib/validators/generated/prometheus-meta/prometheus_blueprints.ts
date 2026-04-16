// =====================================================
// FILE: validators/generated/prometheus-meta/prometheus_blueprints.ts
// GENERATED: 2026-04-16T23:20:33.900Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { BLUEPRINT_STATUS } from '@/lib/constants/generated/prometheus-meta/blueprint_status';
import { BLUEPRINT_SYSTEM } from '@/lib/constants/generated/prometheus-meta/blueprint_system';

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
  status: z.enum(Object.values(BLUEPRINT_STATUS)),
  success_rate: z.number().nullable(),
  system: z.enum(Object.values(BLUEPRINT_SYSTEM)),
  updated_at: z.string(),
  version: z.string(),
});

export const PrometheusBlueprintsInsertSchema = z.object({
  author: z.string(),
  blueprint_id: z.string(),
  content: z.any(),
  created_at: z.string().optional(),
  generation_count: z.number().optional(),
  id: z.string().optional(),
  purpose: z.string(),
  status: z.enum(Object.values(BLUEPRINT_STATUS)).optional(),
  success_rate: z.number().nullable().optional(),
  system: z.enum(Object.values(BLUEPRINT_SYSTEM)),
  updated_at: z.string().optional(),
  version: z.string().optional(),
});

export const PrometheusBlueprintsUpdateSchema = z.object({
  author: z.string().optional(),
  blueprint_id: z.string().optional(),
  content: z.any().optional(),
  created_at: z.string().optional(),
  generation_count: z.number().optional(),
  id: z.string().optional(),
  purpose: z.string().optional(),
  status: z.enum(Object.values(BLUEPRINT_STATUS)).optional(),
  success_rate: z.number().nullable().optional(),
  system: z.enum(Object.values(BLUEPRINT_SYSTEM)).optional(),
  updated_at: z.string().optional(),
  version: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusBlueprintsRowInput = z.infer<typeof PrometheusBlueprintsRowSchema>;
export type PrometheusBlueprintsInsertInput = z.infer<typeof PrometheusBlueprintsInsertSchema>;
export type PrometheusBlueprintsUpdateInput = z.infer<typeof PrometheusBlueprintsUpdateSchema>;
