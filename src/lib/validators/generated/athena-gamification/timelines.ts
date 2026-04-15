// =====================================================
// FILE: validators/generated/athena-gamification/timelines.ts
// GENERATED: 2026-04-15T19:30:35.534Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { TIMELINE_EVENT_TYPE } from '@/lib/constants/generated/athena-gamification/timeline_event_type';

// =====================================================
// Timelines SCHEMAS
// =====================================================

export const TimelinesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  event_id: z.string().nullable(),
  event_type: z.enum(Object.values(TIMELINE_EVENT_TYPE)),
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
  event_type: z.enum(Object.values(TIMELINE_EVENT_TYPE)).optional(),
  id: z.string().optional(),
  occurred_at: z.string().optional(),
  significance_score: z.number().nullable().optional(),
  title: z.string().optional(),
  user_id: z.string().optional(),
});

export const TimelinesUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  event_id: z.string().nullable().optional(),
  event_type: z.enum(Object.values(TIMELINE_EVENT_TYPE)).optional(),
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
export type TimelinesUpdateInput = z.infer<typeof TimelinesUpdateSchema>;
