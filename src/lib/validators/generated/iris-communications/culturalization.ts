// =====================================================
// FILE: validators/culturalization.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Culturalization SCHEMAS
// =====================================================

export const CulturalizationRowSchema = z.object({
  communication_style: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  customs: z.any().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_default: z.boolean(),
  language_id: z.string().nullable(),
  name: z.string(),
  region_code: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  visual_preferences: z.any().nullable(),
});

export const CulturalizationInsertSchema = z.object({
  communication_style: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  customs: z.any().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_default: z.boolean().optional(),
  language_id: z.string().nullable().optional(),
  name: z.string(),
  region_code: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  visual_preferences: z.any().nullable().optional(),
});

export const CulturalizationUpdateSchema = z.object({
  communication_style: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  customs: z.any().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_default: z.boolean().optional(),
  language_id: z.string().nullable().optional(),
  name: z.string().optional(),
  region_code: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  visual_preferences: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CulturalizationRowInput = z.infer<typeof CulturalizationRowSchema>;
export type CulturalizationInsertInput = z.infer<typeof CulturalizationInsertSchema>;
export type CulturalizationUpdateInput = z.infer<typeof CulturalizationUpdateSchema>;
