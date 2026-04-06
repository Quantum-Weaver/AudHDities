// =====================================================
// FILE: validators/lessons.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Lessons SCHEMAS
// =====================================================

export const LessonsRowSchema = z.object({
  content_body: z.string().nullable(),
  content_type: z.any(),
  content_url: z.string().nullable(),
  created_at: z.string().nullable(),
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
  content_type: z.any().optional(),
  content_url: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
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
