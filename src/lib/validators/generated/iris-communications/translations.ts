// =====================================================
// FILE: validators/translations.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Translations SCHEMAS
// =====================================================

export const TranslationsRowSchema = z.object({
  context: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  id: z.string(),
  is_machine_translated: z.boolean(),
  is_verified: z.boolean(),
  language_id: z.string().nullable(),
  namespace: z.string().nullable(),
  source_text: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  translated_text: z.string().nullable(),
  translation_key: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  verified_at: z.string().nullable(),
  verified_by: z.string().nullable(),
});

export const TranslationsInsertSchema = z.object({
  context: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  is_machine_translated: z.boolean().optional(),
  is_verified: z.boolean().optional(),
  language_id: z.string().nullable().optional(),
  namespace: z.string().nullable().optional(),
  source_text: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  translated_text: z.string().nullable().optional(),
  translation_key: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  verified_by: z.string().nullable().optional(),
});

export const TranslationsUpdateSchema = z.object({
  context: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  is_machine_translated: z.boolean().optional(),
  is_verified: z.boolean().optional(),
  language_id: z.string().nullable().optional(),
  namespace: z.string().nullable().optional(),
  source_text: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  translated_text: z.string().nullable().optional(),
  translation_key: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  verified_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TranslationsRowInput = z.infer<typeof TranslationsRowSchema>;
export type TranslationsInsertInput = z.infer<typeof TranslationsInsertSchema>;
export type TranslationsUpdateInput = z.infer<typeof TranslationsUpdateSchema>;
