// =====================================================
// FILE: validators/calendar.ts
// GENERATED FROM: database.types.ts
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
  house: z.any().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  primary_house: z.any().nullable(),
  recurrence: z.any().nullable(),
  start_date: z.string(),
  title: z.string(),
  type: z.any(),
  updated_at: z.string().nullable(),
  visibility: z.any().nullable(),
});

export const CalendarInsertSchema = z.object({
  all_day: z.boolean().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  house: z.any().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  primary_house: z.any().nullable().optional(),
  recurrence: z.any().nullable().optional(),
  start_date: z.string().optional(),
  title: z.string().optional(),
  type: z.any().optional(),
  updated_at: z.string().nullable().optional(),
  visibility: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CalendarRowInput = z.infer<typeof CalendarRowSchema>;
export type CalendarInsertInput = z.infer<typeof CalendarInsertSchema>;
