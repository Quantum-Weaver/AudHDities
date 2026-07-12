// =====================================================
// FILE: validators/localization.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Localization SCHEMAS
// =====================================================

export const LocalizationRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  currency_code: z.string().nullable(),
  currency_symbol: z.string().nullable(),
  date_format: z.string(),
  first_day_of_week: z.number(),
  id: z.string(),
  is_default: z.boolean(),
  language_id: z.string().nullable(),
  number_format: z.string().nullable(),
  region_code: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  time_format: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const LocalizationInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  currency_code: z.string().nullable().optional(),
  currency_symbol: z.string().nullable().optional(),
  date_format: z.string().optional(),
  first_day_of_week: z.number().optional(),
  id: z.string().optional(),
  is_default: z.boolean().optional(),
  language_id: z.string().nullable().optional(),
  number_format: z.string().nullable().optional(),
  region_code: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  time_format: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const LocalizationUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  currency_code: z.string().nullable().optional(),
  currency_symbol: z.string().nullable().optional(),
  date_format: z.string().optional(),
  first_day_of_week: z.number().optional(),
  id: z.string().optional(),
  is_default: z.boolean().optional(),
  language_id: z.string().nullable().optional(),
  number_format: z.string().nullable().optional(),
  region_code: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  time_format: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LocalizationRowInput = z.infer<typeof LocalizationRowSchema>;
export type LocalizationInsertInput = z.infer<typeof LocalizationInsertSchema>;
export type LocalizationUpdateInput = z.infer<typeof LocalizationUpdateSchema>;
