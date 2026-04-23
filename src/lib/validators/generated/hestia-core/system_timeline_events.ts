// =====================================================
// FILE: validators/system_timeline_events.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// SystemTimelineEvents SCHEMAS
// =====================================================

export const SystemTimelineEventsRowSchema = z.object({
  created_at: z.string(),
  description: z.string().nullable(),
  event_type: z.string(),
  id: z.string(),
  metadata: z.any().nullable(),
  severity: z.string().nullable(),
  source: z.string().nullable(),
  title: z.string(),
});

export const SystemTimelineEventsInsertSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  event_type: z.string(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  severity: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  title: z.string(),
});

export const SystemTimelineEventsUpdateSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  event_type: z.string().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  severity: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  title: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SystemTimelineEventsRowInput = z.infer<typeof SystemTimelineEventsRowSchema>;
export type SystemTimelineEventsInsertInput = z.infer<typeof SystemTimelineEventsInsertSchema>;
export type SystemTimelineEventsUpdateInput = z.infer<typeof SystemTimelineEventsUpdateSchema>;
