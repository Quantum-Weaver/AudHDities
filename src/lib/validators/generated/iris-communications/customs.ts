// =====================================================
// FILE: validators/customs.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Customs SCHEMAS
// =====================================================

export const CustomsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  culturalization_id: z.string().nullable(),
  custom_type: z.string().nullable(),
  description: z.string().nullable(),
  guidance: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  practice: z.string().nullable(),
  region_id: z.string().nullable(),
  significance: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const CustomsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  culturalization_id: z.string().nullable().optional(),
  custom_type: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  guidance: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  practice: z.string().nullable().optional(),
  region_id: z.string().nullable().optional(),
  significance: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const CustomsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  culturalization_id: z.string().nullable().optional(),
  custom_type: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  guidance: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  practice: z.string().nullable().optional(),
  region_id: z.string().nullable().optional(),
  significance: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CustomsRowInput = z.infer<typeof CustomsRowSchema>;
export type CustomsInsertInput = z.infer<typeof CustomsInsertSchema>;
export type CustomsUpdateInput = z.infer<typeof CustomsUpdateSchema>;
