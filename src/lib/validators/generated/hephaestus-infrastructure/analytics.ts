// =====================================================
// FILE: validators/analytics.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Analytics SCHEMAS
// =====================================================

export const AnalyticsRowSchema = z.object({
  analytics_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  event_category: z.enum(ENUM_VALUES.analyticsCategory),
  event_name: z.string(),
  ip_address: z.any(),
  metadata: z.any().nullable(),
  session_id: z.string().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
  user_agent: z.string().nullable(),
  user_id: z.string().nullable(),
  value: z.number().nullable(),
});

export const AnalyticsInsertSchema = z.object({
  analytics_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  event_category: z.enum(ENUM_VALUES.analyticsCategory),
  event_name: z.string(),
  ip_address: z.any().optional(),
  metadata: z.any().nullable().optional(),
  session_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  user_id: z.string().nullable().optional(),
  value: z.number().nullable().optional(),
});

export const AnalyticsUpdateSchema = z.object({
  analytics_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  event_category: z.enum(ENUM_VALUES.analyticsCategory).optional(),
  event_name: z.string().optional(),
  ip_address: z.any().optional(),
  metadata: z.any().nullable().optional(),
  session_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
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
