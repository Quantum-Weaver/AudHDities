// =====================================================
// FILE: validators/path_lessons.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// PathLessons SCHEMAS
// =====================================================

export const PathLessonsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  lesson_id: z.string(),
  order_index: z.number(),
  path_lessons_id: z.string(),
  updated_at: z.string().nullable(),
});

export const PathLessonsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  lesson_id: z.string(),
  order_index: z.number(),
  path_lessons_id: z.string(),
  updated_at: z.string().nullable().optional(),
});

export const PathLessonsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  lesson_id: z.string().optional(),
  order_index: z.number().optional(),
  path_lessons_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PathLessonsRowInput = z.infer<typeof PathLessonsRowSchema>;
export type PathLessonsInsertInput = z.infer<typeof PathLessonsInsertSchema>;
export type PathLessonsUpdateInput = z.infer<typeof PathLessonsUpdateSchema>;
