// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/calendar.ts
// GENERATED: 2026-04-15T16:13:09.451Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Calendar SCHEMAS
// =====================================================

export const CalendarRowSchema = z.object({
  all_day: z.boolean().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  end_date: z.string().nullable(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable(),
  recurrence: z.any().nullable(),
  start_date: z.string(),
  title: z.string(),
  type: z.enum(Object.values(CALENDAR_EVENT_TYPE)),
  updated_at: z.string().nullable(),
  visibility: z.enum(Object.values(CALENDAR_VISIBILITY)).nullable(),
});

export const CalendarInsertSchema = z.object({
  all_day: z.boolean().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  recurrence: z.any().nullable().optional(),
  start_date: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(Object.values(CALENDAR_EVENT_TYPE)).optional(),
  updated_at: z.string().nullable().optional(),
  visibility: z.enum(Object.values(CALENDAR_VISIBILITY)).nullable().optional(),
});

export const CalendarUpdateSchema = z.object({
  all_day: z.boolean().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  recurrence: z.any().nullable().optional(),
  start_date: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(Object.values(CALENDAR_EVENT_TYPE)).optional(),
  updated_at: z.string().nullable().optional(),
  visibility: z.enum(Object.values(CALENDAR_VISIBILITY)).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CalendarRowInput = z.infer<typeof CalendarRowSchema>;
export type CalendarInsertInput = z.infer<typeof CalendarInsertSchema>;
export type CalendarUpdateInput = z.infer<typeof CalendarUpdateSchema>;
