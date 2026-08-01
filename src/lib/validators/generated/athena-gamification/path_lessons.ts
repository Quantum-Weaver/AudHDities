// =====================================================
// FILE: validators/path_lessons.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// PathLessons SCHEMAS
// =====================================================

export const PathLessonsRowSchema = z.object({
  created_at: z.string(),
  display_order: z.number(),
  id: z.string(),
  is_required: z.boolean(),
  lesson_id: z.string(),
  path_id: z.string(),
  updated_at: z.string(),
});

export const PathLessonsInsertSchema = z.object({
  created_at: z.string().optional(),
  display_order: z.number().optional(),
  id: z.string().optional(),
  is_required: z.boolean().optional(),
  lesson_id: z.string(),
  path_id: z.string(),
  updated_at: z.string().optional(),
});

export const PathLessonsUpdateSchema = z.object({
  created_at: z.string().optional(),
  display_order: z.number().optional(),
  id: z.string().optional(),
  is_required: z.boolean().optional(),
  lesson_id: z.string().optional(),
  path_id: z.string().optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PathLessonsRowInput = z.infer<typeof PathLessonsRowSchema>;
export type PathLessonsInsertInput = z.infer<typeof PathLessonsInsertSchema>;
export type PathLessonsUpdateInput = z.infer<typeof PathLessonsUpdateSchema>;
