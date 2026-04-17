// =====================================================
// FILE: validators/generated/athena-gamification/progress.ts
// GENERATED: 2026-04-17T20:52:30.941Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { PROGRESS_STATUS } from '@/lib/constants/generated/athena-gamification/progress_status';

// =====================================================
// Progress SCHEMAS
// =====================================================

export const ProgressRowSchema = z.object({
  completed_at: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  last_activity_at: z.string().nullable(),
  lesson_id: z.string().nullable(),
  notes: z.string().nullable(),
  path_id: z.string().nullable(),
  progress_percent: z.number().nullable(),
  score: z.number().nullable(),
  started_at: z.string().nullable(),
  status: z.enum(Object.values(PROGRESS_STATUS)),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const ProgressInsertSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  last_activity_at: z.string().nullable().optional(),
  lesson_id: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  path_id: z.string().nullable().optional(),
  progress_percent: z.number().nullable().optional(),
  score: z.number().nullable().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(Object.values(PROGRESS_STATUS)).optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string(),
});

export const ProgressUpdateSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  last_activity_at: z.string().nullable().optional(),
  lesson_id: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  path_id: z.string().nullable().optional(),
  progress_percent: z.number().nullable().optional(),
  score: z.number().nullable().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(Object.values(PROGRESS_STATUS)).optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProgressRowInput = z.infer<typeof ProgressRowSchema>;
export type ProgressInsertInput = z.infer<typeof ProgressInsertSchema>;
export type ProgressUpdateInput = z.infer<typeof ProgressUpdateSchema>;
