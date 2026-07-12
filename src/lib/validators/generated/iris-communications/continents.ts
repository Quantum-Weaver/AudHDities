// =====================================================
// FILE: validators/continents.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Continents SCHEMAS
// =====================================================

export const ContinentsRowSchema = z.object({
  code: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  display_order: z.number(),
  icon_url: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ContinentsInsertSchema = z.object({
  code: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ContinentsUpdateSchema = z.object({
  code: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ContinentsRowInput = z.infer<typeof ContinentsRowSchema>;
export type ContinentsInsertInput = z.infer<typeof ContinentsInsertSchema>;
export type ContinentsUpdateInput = z.infer<typeof ContinentsUpdateSchema>;
