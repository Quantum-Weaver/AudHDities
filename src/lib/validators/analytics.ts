// =====================================================
// FILE: validators/analytics.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Analytics SCHEMAS
// =====================================================

export const AnalyticsRowSchema = z.object({
  created_at: z.string().nullable(),
  event_category: z.any(),
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
  event_category: z.any().optional(),
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
