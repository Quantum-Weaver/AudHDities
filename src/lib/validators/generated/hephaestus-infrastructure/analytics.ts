// =====================================================
// FILE: validators/analytics.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Analytics SCHEMAS
// =====================================================

export const AnalyticsRowSchema = z.object({
  created_at: z.string(),
  dimension: z.string().nullable(),
  dimension_value: z.string().nullable(),
  id: z.string(),
  metric_name: z.string(),
  metric_unit: z.string().nullable(),
  metric_value: z.number(),
  notes: z.string().nullable(),
  period: z.string(),
  period_end: z.string().nullable(),
  period_start: z.string().nullable(),
  source_table: z.string().nullable(),
});

export const AnalyticsInsertSchema = z.object({
  created_at: z.string().optional(),
  dimension: z.string().nullable().optional(),
  dimension_value: z.string().nullable().optional(),
  id: z.string().optional(),
  metric_name: z.string(),
  metric_unit: z.string().nullable().optional(),
  metric_value: z.number(),
  notes: z.string().nullable().optional(),
  period: z.string().optional(),
  period_end: z.string().nullable().optional(),
  period_start: z.string().nullable().optional(),
  source_table: z.string().nullable().optional(),
});

export const AnalyticsUpdateSchema = z.object({
  created_at: z.string().optional(),
  dimension: z.string().nullable().optional(),
  dimension_value: z.string().nullable().optional(),
  id: z.string().optional(),
  metric_name: z.string().optional(),
  metric_unit: z.string().nullable().optional(),
  metric_value: z.number().optional(),
  notes: z.string().nullable().optional(),
  period: z.string().optional(),
  period_end: z.string().nullable().optional(),
  period_start: z.string().nullable().optional(),
  source_table: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AnalyticsRowInput = z.infer<typeof AnalyticsRowSchema>;
export type AnalyticsInsertInput = z.infer<typeof AnalyticsInsertSchema>;
export type AnalyticsUpdateInput = z.infer<typeof AnalyticsUpdateSchema>;
