// =====================================================
// FILE: validators/generated/iris-communications/translations.ts
// GENERATED: 2026-04-15T05:16:17.841Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

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
  translatable_type: z.enum(Object.values(TranslatableType)),
  translation: z.string(),
  translator_id: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const TranslationsInsertSchema = z.object({
  approved_by: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  field_name: z.string().optional(),
  id: z.string().optional(),
  is_approved: z.boolean().nullable().optional(),
  language_id: z.string().optional(),
  translatable_id: z.string().optional(),
  translatable_type: z.enum(Object.values(TranslatableType)).optional(),
  translation: z.string().optional(),
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
  translatable_type: z.enum(Object.values(TranslatableType)).optional(),
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
