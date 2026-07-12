// =====================================================
// FILE: validators/languages.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Languages SCHEMAS
// =====================================================

export const LanguagesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  direction: z.string(),
  display_order: z.number(),
  fallback_language_id: z.string().nullable(),
  icon_url: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  iso_code: z.string(),
  iso_code_3: z.string().nullable(),
  name: z.string(),
  native_name: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const LanguagesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  direction: z.string().optional(),
  display_order: z.number().optional(),
  fallback_language_id: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  iso_code: z.string(),
  iso_code_3: z.string().nullable().optional(),
  name: z.string(),
  native_name: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const LanguagesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  direction: z.string().optional(),
  display_order: z.number().optional(),
  fallback_language_id: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  iso_code: z.string().optional(),
  iso_code_3: z.string().nullable().optional(),
  name: z.string().optional(),
  native_name: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LanguagesRowInput = z.infer<typeof LanguagesRowSchema>;
export type LanguagesInsertInput = z.infer<typeof LanguagesInsertSchema>;
export type LanguagesUpdateInput = z.infer<typeof LanguagesUpdateSchema>;
