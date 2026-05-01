// =====================================================
// FILE: validators/prometheus_blueprints.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// PrometheusBlueprints SCHEMAS
// =====================================================

export const PrometheusBlueprintsRowSchema = z.object({
  author: z.string(),
  content: z.any(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  generation_count: z.number(),
  prometheus_blueprints_id: z.string(),
  purpose: z.string(),
  status: z.enum(ENUM_VALUES.blueprintStatus),
  success_rate: z.number().nullable(),
  system: z.enum(ENUM_VALUES.blueprintSystem),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  version: z.string(),
});

export const PrometheusBlueprintsInsertSchema = z.object({
  author: z.string(),
  content: z.any(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  generation_count: z.number().optional(),
  prometheus_blueprints_id: z.string().optional(),
  purpose: z.string(),
  status: z.enum(ENUM_VALUES.blueprintStatus).optional(),
  success_rate: z.number().nullable().optional(),
  system: z.enum(ENUM_VALUES.blueprintSystem),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  version: z.string().optional(),
});

export const PrometheusBlueprintsUpdateSchema = z.object({
  author: z.string().optional(),
  content: z.any().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  generation_count: z.number().optional(),
  prometheus_blueprints_id: z.string().optional(),
  purpose: z.string().optional(),
  status: z.enum(ENUM_VALUES.blueprintStatus).optional(),
  success_rate: z.number().nullable().optional(),
  system: z.enum(ENUM_VALUES.blueprintSystem).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  version: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusBlueprintsRowInput = z.infer<typeof PrometheusBlueprintsRowSchema>;
export type PrometheusBlueprintsInsertInput = z.infer<typeof PrometheusBlueprintsInsertSchema>;
export type PrometheusBlueprintsUpdateInput = z.infer<typeof PrometheusBlueprintsUpdateSchema>;
