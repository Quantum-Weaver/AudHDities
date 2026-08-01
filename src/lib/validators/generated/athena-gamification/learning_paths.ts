// =====================================================
// FILE: validators/learning_paths.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// LearningPaths SCHEMAS
// =====================================================

export const LearningPathsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  difficulty: z.string().nullable(),
  display_order: z.number(),
  estimated_duration: z.string().nullable(),
  icon_url: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  path_type: z.string().nullable(),
  prerequisites: z.any().nullable(),
  rewards: z.any().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const LearningPathsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  difficulty: z.string().nullable().optional(),
  display_order: z.number().optional(),
  estimated_duration: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  path_type: z.string().nullable().optional(),
  prerequisites: z.any().nullable().optional(),
  rewards: z.any().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const LearningPathsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  difficulty: z.string().nullable().optional(),
  display_order: z.number().optional(),
  estimated_duration: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  path_type: z.string().nullable().optional(),
  prerequisites: z.any().nullable().optional(),
  rewards: z.any().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LearningPathsRowInput = z.infer<typeof LearningPathsRowSchema>;
export type LearningPathsInsertInput = z.infer<typeof LearningPathsInsertSchema>;
export type LearningPathsUpdateInput = z.infer<typeof LearningPathsUpdateSchema>;
