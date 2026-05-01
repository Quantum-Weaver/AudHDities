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
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  event_type: z.string(),
  metadata: z.any().nullable(),
  severity: z.string().nullable(),
  source: z.string().nullable(),
  system_timeline_events_id: z.string(),
  title: z.string(),
  updated_at: z.string().nullable(),
});

export const SystemTimelineEventsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  event_type: z.string(),
  metadata: z.any().nullable().optional(),
  severity: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  system_timeline_events_id: z.string().optional(),
  title: z.string(),
  updated_at: z.string().nullable().optional(),
});

export const SystemTimelineEventsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  event_type: z.string().optional(),
  metadata: z.any().nullable().optional(),
  severity: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  system_timeline_events_id: z.string().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SystemTimelineEventsRowInput = z.infer<typeof SystemTimelineEventsRowSchema>;
export type SystemTimelineEventsInsertInput = z.infer<typeof SystemTimelineEventsInsertSchema>;
export type SystemTimelineEventsUpdateInput = z.infer<typeof SystemTimelineEventsUpdateSchema>;
