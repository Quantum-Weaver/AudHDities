// =====================================================
// FILE: validators/generated/prometheus-meta/prometheus_blueprints.ts
// GENERATED: 2026-04-14T22:37:52.711Z
// SOURCE: database.types.ts
// =====================================================

import type { BlueprintStatus } from '@/lib/constants/generated/prometheus-meta/blueprint_status';
import type { BlueprintSystem } from '@/lib/constants/generated/prometheus-meta/blueprint_system';
import z from 'zod';

// =====================================================
// PrometheusBlueprints SCHEMAS
// =====================================================

export const PrometheusBlueprintsRowSchema = z.object({
  author: z.string();
  blueprint_id: z.string();
  content: z.any();
  "created_at": "z.string()";
  generation_count: z.number();
  id: z.string();
  purpose: z.string();
  status: z.enum(Object.values(BlueprintStatus));
  success_rate: z.number().nullable();
  system: z.enum(Object.values(BlueprintSystem));
  "updated_at": "z.string()";
  version: z.string();
}),

export const PrometheusBlueprintsInsertSchema = z.object({
  author: z.string().optional();
  blueprint_id: z.string().optional();
  content: z.any().optional();
  "created_at": "z.string().optional()";
  generation_count: z.number().optional();
  id: z.string().optional();
  purpose: z.string().optional();
  status: z.enum(Object.values(BlueprintStatus)).optional();
  success_rate: z.number().nullable().optional();
  system: z.enum(Object.values(BlueprintSystem)).optional();
  "updated_at": "z.string().optional()";
  version: z.string().optional();
});

export const PrometheusBlueprintsUpdateSchema = z.object({
  author: z.string().optional();
  blueprint_id: z.string().optional();
  content: z.any().optional();
  "created_at": "z.string().optional()";
  generation_count: z.number().optional();
  id: z.string().optional();
  purpose: z.string().optional();
  status: z.enum(Object.values(BlueprintStatus)).optional();
  success_rate: z.number().nullable().optional();
  system: z.enum(Object.values(BlueprintSystem)).optional();
  "updated_at": "z.string().optional()";
  version: z.string().optional();
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusBlueprintsRowInput = z.infer<typeof PrometheusBlueprintsRowSchema>;
export type PrometheusBlueprintsInsertInput = z.infer<typeof PrometheusBlueprintsInsertSchema>;
export type PrometheusBlueprintsUpdateInput = z.infer<typeof PrometheusBlueprintsUpdateSchema>;
