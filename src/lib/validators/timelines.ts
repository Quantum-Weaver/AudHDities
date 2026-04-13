// =====================================================
// FILE: validators/timelines.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Timelines SCHEMAS
// =====================================================

export const TimelinesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  event_id: z.string().nullable(),
  event_type: z.any(),
  id: z.string(),
  occurred_at: z.string(),
  significance_score: z.number().nullable(),
  title: z.string(),
  user_id: z.string(),
});

export const TimelinesInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  event_id: z.string().nullable().optional(),
  event_type: z.any().optional(),
  id: z.string().optional(),
  occurred_at: z.string().optional(),
  significance_score: z.number().nullable().optional(),
  title: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TimelinesRowInput = z.infer<typeof TimelinesRowSchema>;
export type TimelinesInsertInput = z.infer<typeof TimelinesInsertSchema>;
