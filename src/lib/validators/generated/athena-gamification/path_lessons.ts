// =====================================================
// FILE: validators/generated/athena-gamification/path_lessons.ts
// GENERATED: 2026-04-17T01:35:45.278Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// PathLessons SCHEMAS
// =====================================================

export const PathLessonsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  lesson_id: z.string(),
  order_index: z.number(),
  path_id: z.string(),
});

export const PathLessonsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  lesson_id: z.string(),
  order_index: z.number(),
  path_id: z.string(),
});

export const PathLessonsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  lesson_id: z.string().optional(),
  order_index: z.number().optional(),
  path_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PathLessonsRowInput = z.infer<typeof PathLessonsRowSchema>;
export type PathLessonsInsertInput = z.infer<typeof PathLessonsInsertSchema>;
export type PathLessonsUpdateInput = z.infer<typeof PathLessonsUpdateSchema>;
