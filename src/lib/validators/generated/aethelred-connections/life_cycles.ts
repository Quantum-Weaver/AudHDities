// =====================================================
// FILE: validators/life_cycles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// LifeCycles SCHEMAS
// =====================================================

export const LifeCyclesRowSchema = z.object({
  category: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  stage_order: z.number(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const LifeCyclesInsertSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  stage_order: z.number().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const LifeCyclesUpdateSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  stage_order: z.number().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LifeCyclesRowInput = z.infer<typeof LifeCyclesRowSchema>;
export type LifeCyclesInsertInput = z.infer<typeof LifeCyclesInsertSchema>;
export type LifeCyclesUpdateInput = z.infer<typeof LifeCyclesUpdateSchema>;
