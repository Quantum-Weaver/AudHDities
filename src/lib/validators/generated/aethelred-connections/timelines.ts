// =====================================================
// FILE: validators/timelines.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Timelines SCHEMAS
// =====================================================

export const TimelinesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  event_id: z.string().nullable(),
  event_type: z.enum(ENUM_VALUES.timelineEventType),
  occurred_at: z.string(),
  significance_score: z.number().nullable(),
  timelines_id: z.string(),
  title: z.string(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
});

export const TimelinesInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  event_id: z.string().nullable().optional(),
  event_type: z.enum(ENUM_VALUES.timelineEventType),
  occurred_at: z.string(),
  significance_score: z.number().nullable().optional(),
  timelines_id: z.string().optional(),
  title: z.string(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
});

export const TimelinesUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  event_id: z.string().nullable().optional(),
  event_type: z.enum(ENUM_VALUES.timelineEventType).optional(),
  occurred_at: z.string().optional(),
  significance_score: z.number().nullable().optional(),
  timelines_id: z.string().optional(),
  title: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TimelinesRowInput = z.infer<typeof TimelinesRowSchema>;
export type TimelinesInsertInput = z.infer<typeof TimelinesInsertSchema>;
export type TimelinesUpdateInput = z.infer<typeof TimelinesUpdateSchema>;
