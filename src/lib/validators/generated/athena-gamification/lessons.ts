// =====================================================
// FILE: validators/generated/athena-gamification/lessons.ts
// GENERATED: 2026-04-15T01:41:08.074Z
// SOURCE: database.types.ts
// =====================================================

import type { LessonContentType } from '@/lib/constants/generated/athena-gamification/lesson_content_type';
import z from 'zod';

// =====================================================
// Lessons SCHEMAS
// =====================================================

export const LessonsRowSchema = z.object({
  content_body: z.string().nullable(),
  content_type: z.enum(Object.values('LessonContentType')),
  content_url: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  creator_id: z.string(),
  description: z.string(),
  duration_minutes: z.number().nullable(),
  id: z.string(),
  is_published: z.boolean().nullable(),
  order_index: z.number().nullable(),
  slug: z.string(),
  title: z.string(),
  updated_at: z.string().nullable(),
});

export const LessonsInsertSchema = z.object({
  content_body: z.string().nullable().optional(),
  content_type: z.enum(Object.values('LessonContentType')).optional(),
  content_url: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().optional(),
  duration_minutes: z.number().nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

export const LessonsUpdateSchema = z.object({
  content_body: z.string().nullable().optional(),
  content_type: z.enum(Object.values('LessonContentType')).optional(),
  content_url: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().optional(),
  duration_minutes: z.number().nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LessonsRowInput = z.infer<typeof LessonsRowSchema>;
export type LessonsInsertInput = z.infer<typeof LessonsInsertSchema>;
export type LessonsUpdateInput = z.infer<typeof LessonsUpdateSchema>;
