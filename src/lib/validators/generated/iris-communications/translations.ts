// =====================================================
// FILE: validators/generated/iris-communications/translations.ts
// GENERATED: 2026-04-16T23:20:33.922Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { TRANSLATABLE_TYPE } from '@/lib/constants/generated/iris-communications/translatable_type';

// =====================================================
// Translations SCHEMAS
// =====================================================

export const TranslationsRowSchema = z.object({
  approved_by: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  field_name: z.string(),
  id: z.string(),
  is_approved: z.boolean().nullable(),
  language_id: z.string(),
  translatable_id: z.string(),
  translatable_type: z.enum(Object.values(TRANSLATABLE_TYPE)),
  translation: z.string(),
  translator_id: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const TranslationsInsertSchema = z.object({
  approved_by: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  field_name: z.string(),
  id: z.string().optional(),
  is_approved: z.boolean().nullable().optional(),
  language_id: z.string(),
  translatable_id: z.string(),
  translatable_type: z.enum(Object.values(TRANSLATABLE_TYPE)),
  translation: z.string(),
  translator_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const TranslationsUpdateSchema = z.object({
  approved_by: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  field_name: z.string().optional(),
  id: z.string().optional(),
  is_approved: z.boolean().nullable().optional(),
  language_id: z.string().optional(),
  translatable_id: z.string().optional(),
  translatable_type: z.enum(Object.values(TRANSLATABLE_TYPE)).optional(),
  translation: z.string().optional(),
  translator_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TranslationsRowInput = z.infer<typeof TranslationsRowSchema>;
export type TranslationsInsertInput = z.infer<typeof TranslationsInsertSchema>;
export type TranslationsUpdateInput = z.infer<typeof TranslationsUpdateSchema>;
