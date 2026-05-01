// =====================================================
// FILE: validators/progress.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Progress SCHEMAS
// =====================================================

export const ProgressRowSchema = z.object({
  completed_at: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  last_activity_at: z.string().nullable(),
  lesson_id: z.string().nullable(),
  notes: z.string().nullable(),
  path_id: z.string().nullable(),
  progress_id: z.string(),
  progress_percent: z.number().nullable(),
  score: z.number().nullable(),
  started_at: z.string().nullable(),
  status: z.enum(ENUM_VALUES.progressStatus),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
});

export const ProgressInsertSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  last_activity_at: z.string().nullable().optional(),
  lesson_id: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  path_id: z.string().nullable().optional(),
  progress_id: z.string().optional(),
  progress_percent: z.number().nullable().optional(),
  score: z.number().nullable().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.progressStatus).optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
});

export const ProgressUpdateSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  last_activity_at: z.string().nullable().optional(),
  lesson_id: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  path_id: z.string().nullable().optional(),
  progress_id: z.string().optional(),
  progress_percent: z.number().nullable().optional(),
  score: z.number().nullable().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.progressStatus).optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProgressRowInput = z.infer<typeof ProgressRowSchema>;
export type ProgressInsertInput = z.infer<typeof ProgressInsertSchema>;
export type ProgressUpdateInput = z.infer<typeof ProgressUpdateSchema>;
