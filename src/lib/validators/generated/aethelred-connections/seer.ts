// =====================================================
// FILE: validators/generated/aethelred-connections/seer.ts
// GENERATED: 2026-04-17T01:35:45.334Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Seer SCHEMAS
// =====================================================

export const SeerRowSchema = z.object({
  anomaly_detection: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  insight_queue: z.any().nullable(),
  last_prediction_accuracy: z.number().nullable(),
  pattern_library: z.any().nullable(),
  prophecies: z.any().nullable(),
  trend_analysis: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const SeerInsertSchema = z.object({
  anomaly_detection: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string(),
  insight_queue: z.any().nullable().optional(),
  last_prediction_accuracy: z.number().nullable().optional(),
  pattern_library: z.any().nullable().optional(),
  prophecies: z.any().nullable().optional(),
  trend_analysis: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const SeerUpdateSchema = z.object({
  anomaly_detection: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  insight_queue: z.any().nullable().optional(),
  last_prediction_accuracy: z.number().nullable().optional(),
  pattern_library: z.any().nullable().optional(),
  prophecies: z.any().nullable().optional(),
  trend_analysis: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SeerRowInput = z.infer<typeof SeerRowSchema>;
export type SeerInsertInput = z.infer<typeof SeerInsertSchema>;
export type SeerUpdateInput = z.infer<typeof SeerUpdateSchema>;
