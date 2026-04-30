// =====================================================
// FILE: validators/prometheus_templates.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// PrometheusTemplates SCHEMAS
// =====================================================

export const PrometheusTemplatesRowSchema = z.object({
  content: z.string(),
  contexts: z.any().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  dependencies: z.any().nullable(),
  is_active: z.boolean(),
  name: z.string(),
  pattern: z.string(),
  prometheus_templates_id: z.string(),
  updated_at: z.string(),
  variables: z.any().nullable(),
  version: z.string(),
});

export const PrometheusTemplatesInsertSchema = z.object({
  content: z.string(),
  contexts: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  is_active: z.boolean().optional(),
  name: z.string(),
  pattern: z.string(),
  prometheus_templates_id: z.string().optional(),
  updated_at: z.string().optional(),
  variables: z.any().nullable().optional(),
  version: z.string().optional(),
});

export const PrometheusTemplatesUpdateSchema = z.object({
  content: z.string().optional(),
  contexts: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  pattern: z.string().optional(),
  prometheus_templates_id: z.string().optional(),
  updated_at: z.string().optional(),
  variables: z.any().nullable().optional(),
  version: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusTemplatesRowInput = z.infer<typeof PrometheusTemplatesRowSchema>;
export type PrometheusTemplatesInsertInput = z.infer<typeof PrometheusTemplatesInsertSchema>;
export type PrometheusTemplatesUpdateInput = z.infer<typeof PrometheusTemplatesUpdateSchema>;
