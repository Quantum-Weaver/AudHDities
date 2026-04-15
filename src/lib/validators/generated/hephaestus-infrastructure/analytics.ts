// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/analytics.ts
// GENERATED: 2026-04-15T18:11:44.253Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { ANALYTICS_CATEGORY } from '@/lib/constants/generated/hephaestus-infrastructure/analytics_category';

// =====================================================
// Analytics SCHEMAS
// =====================================================

export const AnalyticsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  event_category: z.enum(Object.values(ANALYTICS_CATEGORY)),
  event_name: z.string(),
  id: z.string(),
  ip_address: z.any(),
  metadata: z.any().nullable(),
  session_id: z.string().nullable(),
  user_agent: z.string().nullable(),
  user_id: z.string().nullable(),
  value: z.number().nullable(),
});

export const AnalyticsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  event_category: z.enum(Object.values(ANALYTICS_CATEGORY)).optional(),
  event_name: z.string().optional(),
  id: z.string().optional(),
  ip_address: z.any().optional(),
  metadata: z.any().nullable().optional(),
  session_id: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  user_id: z.string().nullable().optional(),
  value: z.number().nullable().optional(),
});

export const AnalyticsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  event_category: z.enum(Object.values(ANALYTICS_CATEGORY)).optional(),
  event_name: z.string().optional(),
  id: z.string().optional(),
  ip_address: z.any().optional(),
  metadata: z.any().nullable().optional(),
  session_id: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  user_id: z.string().nullable().optional(),
  value: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AnalyticsRowInput = z.infer<typeof AnalyticsRowSchema>;
export type AnalyticsInsertInput = z.infer<typeof AnalyticsInsertSchema>;
export type AnalyticsUpdateInput = z.infer<typeof AnalyticsUpdateSchema>;
